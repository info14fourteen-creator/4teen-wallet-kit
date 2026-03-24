function assertTarget(target) {
  if (!target) {
    throw new Error("target is required");
  }

  return target;
}

function assertNonEmpty(value, fieldName) {
  const normalized = String(value || "").trim();

  if (!normalized) {
    throw new Error(fieldName + " is required");
  }

  return normalized;
}

function normalizeOptional(value) {
  if (value == null) {
    return "";
  }

  return String(value).trim();
}

function normalizeSlug(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "");
}

function bytesToHex(bytes) {
  return Array.from(bytes, function (byte) {
    return byte.toString(16).padStart(2, "0");
  }).join("");
}

async function sha256Hex(value) {
  const data = new TextEncoder().encode(value);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return "0x" + bytesToHex(new Uint8Array(hashBuffer));
}

function getZeroBytes32() {
  return "0x0000000000000000000000000000000000000000000000000000000000000000";
}

function getConnectedTronWeb() {
  const tronWeb = window.tronWeb;

  if (!tronWeb || !tronWeb.defaultAddress || !tronWeb.defaultAddress.base58) {
    throw new Error("Tron wallet is not connected");
  }

  return tronWeb;
}

function normalizeBaseUrl(value) {
  return assertNonEmpty(value, "backendBaseUrl").replace(/\/+$/, "");
}

async function readJson(response) {
  try {
    return await response.json();
  } catch (_) {
    return null;
  }
}

async function checkSlugAvailability(backendBaseUrl, slug) {
  const response = await fetch(
    normalizeBaseUrl(backendBaseUrl) + "/slug/check?slug=" + encodeURIComponent(slug),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  const payload = await readJson(response);

  if (!response.ok || !payload || !payload.ok) {
    throw new Error((payload && payload.error) || "Failed to check slug");
  }

  if (!payload.available) {
    throw new Error("Slug is already taken");
  }

  return payload;
}

async function completeRegistration(backendBaseUrl, payload) {
  const response = await fetch(normalizeBaseUrl(backendBaseUrl) + "/ambassador/register-complete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const result = await readJson(response);

  if (!response.ok || !result || !result.ok) {
    throw new Error((result && result.error) || "Failed to complete registration");
  }

  return result.result;
}

function buildReferralLink(value) {
  const normalized = assertNonEmpty(value, "referralLink");

  if (/^https?:\/\//i.test(normalized)) {
    return normalized;
  }

  if (normalized.startsWith("?")) {
    return window.location.origin + "/" + normalized;
  }

  if (normalized.startsWith("/")) {
    return window.location.origin + normalized;
  }

  return window.location.origin + "/" + normalized;
}

function createMarkup(options, state) {
  return `
    <div class="fourteen-ambassador-register">
      <div class="far-card">
        <div class="far-head">
          <div class="far-title">${options.title}</div>
          <div class="far-description">${options.description}</div>
        </div>

        <div class="far-body">
          <label class="far-label">
            <span class="far-label-text">Referral slug</span>
            <input
              class="far-input"
              id="far-slug"
              type="text"
              autocomplete="off"
              placeholder="stan"
              value="${state.slug}"
            />
          </label>

          <label class="far-label">
            <span class="far-label-text">Meta (optional)</span>
            <input
              class="far-input"
              id="far-meta"
              type="text"
              autocomplete="off"
              placeholder="about me"
              value="${state.meta}"
            />
          </label>

          <button class="far-button" id="far-submit" ${state.loading ? "disabled" : ""}>
            ${state.loading ? "Registering..." : "Register Ambassador"}
          </button>

          ${
            state.error
              ? `<div class="far-message far-error">${state.error}</div>`
              : ""
          }

          ${
            state.success
              ? `
                <div class="far-message far-success">Registration completed</div>
                <div class="far-result">
                  <div class="far-result-row"><strong>Slug:</strong> ${state.success.slug}</div>
                  <div class="far-result-row"><strong>Referral link:</strong></div>
                  <div class="far-result-row far-link-wrap">
                    <a class="far-link" href="${state.success.referralLink}" target="_blank" rel="noreferrer">
                      ${state.success.referralLink}
                    </a>
                  </div>
                  <div class="far-result-row far-tx"><strong>Tx:</strong> ${state.success.txid}</div>
                </div>
              `
              : ""
          }
        </div>
      </div>
    </div>
  `;
}

function createState(options) {
  return {
    slug: normalizeOptional(options.defaultSlug),
    meta: normalizeOptional(options.defaultMeta),
    loading: false,
    error: "",
    success: null
  };
}

function createOptions(options) {
  return {
    backendBaseUrl: normalizeBaseUrl(options.backendBaseUrl),
    controllerContractAddress: assertNonEmpty(
      options.controllerContractAddress || "TF8yhohRfMxsdVRr7fFrYLh5fxK8sAFkeZ",
      "controllerContractAddress"
    ),
    title: normalizeOptional(options.title) || "Become a 4TEEN Ambassador",
    description:
      normalizeOptional(options.description) ||
      "Reserve your referral slug and create your ambassador link.",
    defaultSlug: normalizeOptional(options.defaultSlug),
    defaultMeta: normalizeOptional(options.defaultMeta)
  };
}

function mountAmbassadorRegister(target, inputOptions) {
  const root = assertTarget(target);
  const options = createOptions(inputOptions || {});
  const state = createState(options);

  function bindEvents() {
    const slugInput = root.querySelector("#far-slug");
    const metaInput = root.querySelector("#far-meta");
    const submitButton = root.querySelector("#far-submit");

    if (!slugInput || !metaInput || !submitButton) {
      return;
    }

    slugInput.addEventListener("input", function () {
      state.slug = slugInput.value;
    });

    metaInput.addEventListener("input", function () {
      state.meta = metaInput.value;
    });

    submitButton.addEventListener("click", async function () {
      if (state.loading) {
        return;
      }

      state.loading = true;
      state.error = "";
      state.success = null;
      render();

      try {
        const tronWeb = getConnectedTronWeb();
        const wallet = assertNonEmpty(tronWeb.defaultAddress.base58, "wallet");
        const slug = normalizeSlug(state.slug);
        const meta = normalizeOptional(state.meta);

        if (!slug) {
          throw new Error("Slug is required");
        }

        await checkSlugAvailability(options.backendBaseUrl, slug);

        const slugHash = await sha256Hex(slug);
        const metaHash = meta ? await sha256Hex(meta) : getZeroBytes32();

        const contract = await tronWeb.contract().at(options.controllerContractAddress);
        const txid = await contract.registerAsAmbassador(slugHash, metaHash).send();

        const completed = await completeRegistration(options.backendBaseUrl, {
          slug: slug,
          slugHash: slugHash,
          wallet: wallet
        });

        state.success = {
          slug: slug,
          referralLink: buildReferralLink(completed.referralLink),
          txid: assertNonEmpty(txid, "txid")
        };
      } catch (error) {
        state.error =
          error && typeof error === "object" && typeof error.message === "string"
            ? error.message.trim() || "Registration failed"
            : typeof error === "string" && error.trim()
              ? error.trim()
              : "Registration failed";
      } finally {
        state.loading = false;
        render();
      }
    });
  }

  function render() {
    root.innerHTML = createMarkup(options, state);
    bindEvents();
  }

  render();

  return {
    refresh: render
  };
}

export { mountAmbassadorRegister };

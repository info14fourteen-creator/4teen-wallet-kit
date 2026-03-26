import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";

const ROOT = process.cwd();
const REPO_NAME = "4teen-wallet-kit";

const AI_DIR = path.join(ROOT, "ai");
const LATEST_DIR = path.join(AI_DIR, "latest");
const REPO_DIR = path.join(LATEST_DIR, REPO_NAME);

const MAP_FILE = path.join(REPO_DIR, `${REPO_NAME}__ai-project-map.txt`);
const MANIFEST_FILE = path.join(REPO_DIR, `${REPO_NAME}__manifest.json`);
const LINKS_FILE = path.join(REPO_DIR, `${REPO_NAME}__links.txt`);
const ZIP_FILE = path.join(LATEST_DIR, `${REPO_NAME}.zip`);
const RULES_FILE = path.join(ROOT, "ai", "WORKING_RULES.md");

const IGNORE_DIRS = new Set([
  ".git",
  ".github-cache",
  ".idea",
  ".vscode",
  "coverage",
  "dist",
  "node_modules"
]);

const IGNORE_PREFIXES = [
  "ai/latest/"
];

const IGNORE_FILES = new Set([
  ".env",
  ".env.local",
  ".env.production",
  ".env.development",
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock"
]);

const ALLOWED_EXTENSIONS = new Set([
  ".cjs",
  ".css",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mjs",
  ".svg",
  ".ts",
  ".tsx",
  ".txt",
  ".yml",
  ".yaml"
]);

const MAX_OUTPUT_FILES = 10;
const MAX_SOURCE_FILE_BYTES = 220 * 1024;
const MAX_SECTION_BYTES = 1_400_000;
const MAX_TOTAL_SELECTED_FILES = 120;

const SECTION_DEFS = [
  {
    key: "01_PROJECT_OVERVIEW",
    title: "PROJECT OVERVIEW",
    matchers: ["README.md", "package.json", "ai/WORKING_RULES.md"]
  },
  {
    key: "02_BUILD_AND_RELEASE",
    title: "BUILD AND RELEASE",
    matchers: [".github/workflows/", "scripts/"]
  },
  {
    key: "03_ENTRYPOINTS_AND_EXPORTS",
    title: "ENTRYPOINTS AND EXPORTS",
    matchers: ["src/index", "src/main", "src/entry", "src/export"]
  },
  {
    key: "04_WALLET_CONNECTION",
    title: "WALLET CONNECTION",
    matchers: ["src/wallet/", "src/connect", "src/providers/", "src/adapters/", "src/tron/"]
  },
  {
    key: "05_SHARED_UTILS_AND_CONFIG",
    title: "SHARED UTILS AND CONFIG",
    matchers: ["src/shared/", "src/utils/", "src/config/", "src/constants/"]
  },
  {
    key: "06_WIDGETS_SWAP",
    title: "WIDGETS SWAP",
    matchers: ["src/widgets/swap/"]
  },
  {
    key: "07_WIDGETS_OTHER",
    title: "WIDGETS OTHER",
    matchers: ["src/widgets/"],
    exclude: ["src/widgets/swap/"]
  },
  {
    key: "08_COMPONENTS_AND_UI",
    title: "COMPONENTS AND UI",
    matchers: ["src/components/"]
  },
  {
    key: "09_REMAINING_CRITICAL_FILES",
    title: "REMAINING CRITICAL FILES",
    matchers: []
  }
];

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function toPosix(value) {
  return value.replace(/\\/g, "/");
}

function rel(absPath) {
  return toPosix(path.relative(ROOT, absPath));
}

function shouldIgnore(relativePath) {
  const posix = toPosix(relativePath);

  if (IGNORE_PREFIXES.some((prefix) => posix.startsWith(prefix))) {
    return true;
  }

  if (IGNORE_FILES.has(path.basename(posix))) {
    return true;
  }

  return false;
}

function walk(dirPath, out = []) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith(".") && ![".github"].includes(entry.name)) {
      continue;
    }

    const absPath = path.join(dirPath, entry.name);
    const relativePath = rel(absPath);

    if (shouldIgnore(relativePath)) {
      continue;
    }

    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) {
        continue;
      }

      walk(absPath, out);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      continue;
    }

    out.push(relativePath);
  }

  return out;
}

function fileSize(relativePath) {
  try {
    return fs.statSync(path.join(ROOT, relativePath)).size;
  } catch {
    return 0;
  }
}

function readText(relativePath) {
  try {
    return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
  } catch {
    return "";
  }
}

function repoInfo() {
  const repository = process.env.GITHUB_REPOSITORY || `info14fourteen-creator/${REPO_NAME}`;
  const branch = process.env.GITHUB_REF_NAME || "main";

  return {
    repository,
    branch,
    repoPrefixUrl: `https://raw.githubusercontent.com/${repository}/${branch}/ai/latest/${REPO_NAME}`,
    zipUrl: `https://raw.githubusercontent.com/${repository}/${branch}/ai/latest/${REPO_NAME}.zip`,
    rulesUrl: `https://raw.githubusercontent.com/${repository}/${branch}/ai/WORKING_RULES.md`
  };
}

function matchesRule(file, rule) {
  const normalizedFile = toPosix(file);
  const normalizedRule = toPosix(rule);

  if (!normalizedRule) return false;

  if (normalizedRule.endsWith("/")) {
    return normalizedFile.startsWith(normalizedRule);
  }

  return (
    normalizedFile === normalizedRule ||
    normalizedFile.startsWith(`${normalizedRule}/`) ||
    normalizedFile.startsWith(`${normalizedRule}.`)
  );
}

function buildSelectedFiles() {
  const all = walk(ROOT).sort((a, b) => a.localeCompare(b));
  const filtered = all.filter((file) => fileSize(file) <= MAX_SOURCE_FILE_BYTES);

  const selected = [];
  const seen = new Set();

  for (const section of SECTION_DEFS) {
    for (const file of filtered) {
      const inSection = section.matchers.some((rule) => matchesRule(file, rule));
      if (!inSection) continue;

      if (Array.isArray(section.exclude) && section.exclude.some((rule) => matchesRule(file, rule))) {
        continue;
      }

      if (!seen.has(file)) {
        selected.push(file);
        seen.add(file);
      }
    }
  }

  for (const file of filtered) {
    if (selected.length >= MAX_TOTAL_SELECTED_FILES) break;
    if (!seen.has(file)) {
      selected.push(file);
      seen.add(file);
    }
  }

  return selected.slice(0, MAX_TOTAL_SELECTED_FILES);
}

function groupFiles(files) {
  const assigned = new Set();
  const groups = [];

  for (const section of SECTION_DEFS) {
    if (section.key === "09_REMAINING_CRITICAL_FILES") continue;

    const matched = files.filter((file) => {
      const ok = section.matchers.some((rule) => matchesRule(file, rule));
      if (!ok) return false;

      if (Array.isArray(section.exclude) && section.exclude.some((rule) => matchesRule(file, rule))) {
        return false;
      }

      return true;
    });

    let bytes = 0;
    const bounded = [];

    for (const file of matched) {
      const size = fileSize(file);
      if (bytes + size > MAX_SECTION_BYTES) continue;

      bounded.push(file);
      assigned.add(file);
      bytes += size;
    }

    groups.push({
      key: section.key,
      title: section.title,
      files: bounded
    });
  }

  const remaining = [];
  let remainingBytes = 0;

  for (const file of files) {
    if (assigned.has(file)) continue;

    const size = fileSize(file);
    if (remainingBytes + size > MAX_SECTION_BYTES) continue;

    remaining.push(file);
    remainingBytes += size;
  }

  groups.push({
    key: "09_REMAINING_CRITICAL_FILES",
    title: "REMAINING CRITICAL FILES",
    files: remaining
  });

  return groups.slice(0, MAX_OUTPUT_FILES - 1);
}

function buildTree(files) {
  const tree = {};

  for (const file of files) {
    const parts = toPosix(file).split("/");
    let current = tree;

    for (let i = 0; i < parts.length; i += 1) {
      const part = parts[i];
      const isLast = i === parts.length - 1;

      if (!current[part]) {
        current[part] = isLast ? null : {};
      }

      current = current[part];
    }
  }

  function render(node, indent = "") {
    const keys = Object.keys(node).sort((a, b) => {
      const aDir = node[a] !== null;
      const bDir = node[b] !== null;
      if (aDir !== bDir) return aDir ? -1 : 1;
      return a.localeCompare(b);
    });

    let out = "";
    for (const key of keys) {
      if (node[key] === null) {
        out += `${indent}- ${key}\n`;
      } else {
        out += `${indent}- ${key}/\n`;
        out += render(node[key], `${indent}  `);
      }
    }
    return out;
  }

  return render(tree);
}

function detectLang(file) {
  const ext = path.extname(file).toLowerCase();
  if (ext === ".ts") return "ts";
  if (ext === ".tsx") return "tsx";
  if (ext === ".js") return "js";
  if (ext === ".mjs") return "js";
  if (ext === ".cjs") return "js";
  if (ext === ".jsx") return "jsx";
  if (ext === ".json") return "json";
  if (ext === ".md") return "md";
  if (ext === ".css") return "css";
  if (ext === ".html") return "html";
  if (ext === ".svg") return "svg";
  if (ext === ".yml" || ext === ".yaml") return "yml";
  return "txt";
}

function buildSectionDoc(section, allFiles, info) {
  const lines = [];

  lines.push(`# ${REPO_NAME} — ${section.title}`);
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push(`Repository: ${info.repository}`);
  lines.push(`Branch: ${info.branch}`);
  lines.push("");

  lines.push("## Snapshot rules");
  lines.push("");
  lines.push("- This is a curated AI snapshot, not a full raw dump.");
  lines.push("- Files are grouped for easier reading.");
  lines.push("- Every file in this snapshot belongs to the repository shown above.");
  lines.push("");

  if (section.key === "01_PROJECT_OVERVIEW") {
    lines.push("## Project tree");
    lines.push("");
    lines.push("```txt");
    lines.push(buildTree(allFiles).trimEnd());
    lines.push("```");
    lines.push("");
  }

  lines.push("## Included files");
  lines.push("");
  if (section.files.length === 0) {
    lines.push("- none");
    lines.push("");
    return lines.join("\n");
  }

  for (const file of section.files) {
    lines.push(`- ${REPO_NAME} :: ${file}`);
  }

  lines.push("");

  for (const file of section.files) {
    const lang = detectLang(file);
    const content = readText(file);

    lines.push(`---`);
    lines.push("");
    lines.push(`## FILE: ${REPO_NAME} :: ${file}`);
    lines.push("");
    lines.push("```" + lang);
    lines.push(content.trimEnd());
    lines.push("```");
    lines.push("");
  }

  return lines.join("\n");
}

function writeMap(allFiles, info, groups) {
  const lines = [];

  lines.push(`# ${REPO_NAME} — AI PROJECT MAP`);
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push(`Repository: ${info.repository}`);
  lines.push(`Branch: ${info.branch}`);
  lines.push("");

  lines.push("## Links");
  lines.push("");
  lines.push(`- Repo snapshot dir: ${info.repoPrefixUrl}/`);
  lines.push(`- Zip archive: ${info.zipUrl}`);
  lines.push(`- Working rules: ${info.rulesUrl}`);
  lines.push("");

  lines.push("## Snapshot files");
  lines.push("");
  for (const group of groups) {
    const outputName = `${REPO_NAME}__${group.key}.md`;
    lines.push(`- ${outputName}`);
  }
  lines.push("");

  lines.push("## Curated project tree");
  lines.push("");
  lines.push("```txt");
  lines.push(buildTree(allFiles).trimEnd());
  lines.push("```");
  lines.push("");

  fs.writeFileSync(MAP_FILE, lines.join("\n"), "utf8");
}

function writeLinks(info, groups) {
  const lines = [];
  lines.push(`${REPO_NAME} AI LINKS`);
  lines.push("");
  lines.push(`Snapshot dir: ${info.repoPrefixUrl}/`);
  lines.push(`Zip archive: ${info.zipUrl}`);
  lines.push(`Working rules: ${info.rulesUrl}`);
  lines.push("");
  lines.push("Files:");
  lines.push("");
  for (const group of groups) {
    lines.push(`- ${info.repoPrefixUrl}/${REPO_NAME}__${group.key}.md`);
  }
  lines.push("");

  fs.writeFileSync(LINKS_FILE, lines.join("\n"), "utf8");
}

function writeManifest(allFiles, groups, info) {
  const manifest = {
    generatedAt: new Date().toISOString(),
    repository: info.repository,
    branch: info.branch,
    repoName: REPO_NAME,
    zipUrl: info.zipUrl,
    outputDir: `${info.repoPrefixUrl}/`,
    sourceFilesIncluded: allFiles,
    snapshotFiles: groups.map((group) => ({
      name: `${REPO_NAME}__${group.key}.md`,
      title: group.title,
      files: group.files
    }))
  };

  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2), "utf8");
}

function writeSections(allFiles, groups, info) {
  for (const group of groups) {
    const outFile = path.join(REPO_DIR, `${REPO_NAME}__${group.key}.md`);
    const content = buildSectionDoc(group, allFiles, info);
    fs.writeFileSync(outFile, content, "utf8");
  }
}

function createZip() {
  if (fs.existsSync(ZIP_FILE)) {
    fs.rmSync(ZIP_FILE, { force: true });
  }

  const zipBinary =
    process.platform === "win32" ? "powershell" : "zip";

  if (process.platform === "win32") {
    const command = [
      "-NoProfile",
      "-Command",
      `Compress-Archive -Path "${REPO_DIR}\\*" -DestinationPath "${ZIP_FILE}" -Force`
    ];

    const result = spawnSync(zipBinary, command, { stdio: "inherit" });
    if (result.status !== 0) {
      throw new Error("Failed to create zip archive");
    }
    return;
  }

  const result = spawnSync(
    zipBinary,
    ["-r", ZIP_FILE, REPO_NAME],
    {
      cwd: LATEST_DIR,
      stdio: "inherit"
    }
  );

  if (result.status !== 0) {
    throw new Error("Failed to create zip archive");
  }
}

function main() {
  ensureDir(REPO_DIR);

  const info = repoInfo();
  const allFiles = buildSelectedFiles();
  const groups = groupFiles(allFiles);

  writeSections(allFiles, groups, info);
  writeMap(allFiles, info, groups);
  writeLinks(info, groups);
  writeManifest(allFiles, groups, info);
  createZip();

  console.log(`Built AI snapshot for ${REPO_NAME}`);
  console.log(`Output dir: ${REPO_DIR}`);
  console.log(`Zip: ${ZIP_FILE}`);
}

main();

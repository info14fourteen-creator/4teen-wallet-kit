# REPOSITORY: 4teen-wallet-kit
# SECTION: BUILD AND TOOLING
# GENERATED_AT: 2026-03-25T17:07:08.201Z

## INCLUDED FILES

- .github/workflows/build-and-publish-ai-bundle.yml
- .github/workflows/build-and-publish.yml
- scripts/build-ai-bundle.js
- vite.config.js

## REPOSITORY LINK BASE

- https://raw.githubusercontent.com/info14fourteen-creator/4teen-wallet-kit/main/ai/latest/4teen-wallet-kit

---

## FILE: .github/workflows/build-and-publish-ai-bundle.yml

```yml
name: Build and Publish AI Bundle

on:
  workflow_dispatch:
  push:
    branches:
      - main
    paths-ignore:
      - 'ai/latest/**'

permissions:
  contents: write

jobs:
  build-and-publish:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Build AI bundle
        run: npm run build:ai

      - name: Commit and push generated AI files
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"

          git add ai/latest

          if git diff --cached --quiet; then
            echo "No AI bundle changes to commit."
          else
            git commit -m "chore: update AI bundle [skip ci]"
            git push
          fi

      - name: Print links
        run: |
          echo "AI bundle:"
          echo "https://raw.githubusercontent.com/${GITHUB_REPOSITORY}/${GITHUB_REF_NAME}/ai/latest/ai-project-bundle.txt"
          echo
          echo "AI map:"
          echo "https://raw.githubusercontent.com/${GITHUB_REPOSITORY}/${GITHUB_REF_NAME}/ai/latest/ai-project-map.txt"
          echo
          echo "Working rules:"
          echo "https://raw.githubusercontent.com/${GITHUB_REPOSITORY}/${GITHUB_REF_NAME}/ai/WORKING_RULES.md"

      - name: Add workflow summary
        run: |
          {
            echo "## AI bundle links"
            echo
            echo "- AI bundle: https://raw.githubusercontent.com/${GITHUB_REPOSITORY}/${GITHUB_REF_NAME}/ai/latest/ai-project-bundle.txt"
            echo "- AI map: https://raw.githubusercontent.com/${GITHUB_REPOSITORY}/${GITHUB_REF_NAME}/ai/latest/ai-project-map.txt"
            echo "- Working rules: https://raw.githubusercontent.com/${GITHUB_REPOSITORY}/${GITHUB_REF_NAME}/ai/WORKING_RULES.md"
          } >> "$GITHUB_STEP_SUMMARY"
```

---

## FILE: .github/workflows/build-and-publish.yml

```yml
name: Build and publish library

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: write

concurrency:
  group: build-and-publish
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      VITE_REOWN_PROJECT_ID: ${{ secrets.VITE_REOWN_PROJECT_ID }}

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 24

      - name: Install dependencies
        run: npm install

      - name: Build library
        run: npm run build

      - name: Stamp build version
        run: echo "${GITHUB_SHA}" > dist/version.txt

      - name: Upload dist artifact
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist

      - name: Publish dist to gh-pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          force_orphan: true
```

---

## FILE: scripts/build-ai-bundle.js

```js
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";

const ROOT = process.cwd();
const REPO_NAME = "4teen-wallet-kit";

const AI_DIR = path.join(ROOT, "ai");
const LATEST_DIR = path.join(AI_DIR, "latest");
const REPO_OUTPUT_DIR = path.join(LATEST_DIR, REPO_NAME);

const RULES_FILE = path.join(ROOT, "ai", "WORKING_RULES.md");

const IGNORE_DIRS = new Set([
  ".git",
  ".github-cache",
  ".idea",
  ".vscode",
  "coverage",
  "dist",
  "node_modules",
  "ai/latest"
]);

const IGNORE_EXACT = new Set([
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock"
]);

const IGNORE_PREFIXES = [
  "ai/latest/"
];

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

const SECTIONS = [
  {
    file: "01_PROJECT_OVERVIEW.md",
    title: "PROJECT OVERVIEW",
    includes: [
      "package.json",
      "README.md",
      "ai/WORKING_RULES.md"
    ]
  },
  {
    file: "02_BUILD_AND_TOOLING.md",
    title: "BUILD AND TOOLING",
    includes: [
      ".github/",
      "scripts/",
      "vite.config",
      "vite.config.js",
      "vite.config.mjs",
      "vite.config.ts"
    ]
  },
  {
    file: "03_ENTRY_AND_EXPORTS.md",
    title: "ENTRY AND EXPORTS",
    includes: [
      "src/index",
      "src/main",
      "src/entry",
      "src/export"
    ]
  },
  {
    file: "04_WALLET_CONNECTION.md",
    title: "WALLET CONNECTION",
    includes: [
      "src/connect",
      "src/connector",
      "src/wallet",
      "src/adapters",
      "src/providers"
    ]
  },
  {
    file: "05_BLOCKCHAIN_AND_CONTRACTS.md",
    title: "BLOCKCHAIN AND CONTRACTS",
    includes: [
      "src/blockchain",
      "src/contracts",
      "src/tron",
      "src/web3",
      "src/api"
    ]
  },
  {
    file: "06_WIDGETS_AND_COMPONENTS.md",
    title: "WIDGETS AND COMPONENTS",
    includes: [
      "src/widgets",
      "src/components",
      "src/ui"
    ]
  },
  {
    file: "07_HOOKS_AND_STATE.md",
    title: "HOOKS AND STATE",
    includes: [
      "src/hooks",
      "src/store",
      "src/state",
      "src/context"
    ]
  },
  {
    file: "08_PAGES_AND_FLOWS.md",
    title: "PAGES AND FLOWS",
    includes: [
      "src/pages",
      "src/routes",
      "src/flows"
    ]
  },
  {
    file: "09_SHARED_UTILS_AND_STYLES.md",
    title: "SHARED UTILS AND STYLES",
    includes: [
      "src/utils",
      "src/lib",
      "src/helpers",
      "src/styles",
      "src/assets"
    ]
  }
];

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function toPosix(value) {
  return value.replace(/\\/g, "/");
}

function toRelative(absPath) {
  return toPosix(path.relative(ROOT, absPath));
}

function shouldIgnore(relativePath) {
  const rel = toPosix(relativePath);

  if (IGNORE_EXACT.has(path.basename(rel))) return true;
  if (IGNORE_PREFIXES.some((prefix) => rel.startsWith(prefix))) return true;

  return false;
}

function isAllowedFile(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  return ALLOWED_EXTENSIONS.has(ext);
}

function walk(dirPath, results = []) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const abs = path.join(dirPath, entry.name);
    const rel = toRelative(abs);

    if (shouldIgnore(rel)) continue;

    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(rel) || IGNORE_DIRS.has(entry.name)) continue;
      if (entry.name.startsWith(".") && entry.name !== ".github") continue;

      walk(abs, results);
      continue;
    }

    if (!isAllowedFile(entry.name)) continue;
    results.push(rel);
  }

  return results;
}

function readUtf8(relPath) {
  try {
    return fs.readFileSync(path.join(ROOT, relPath), "utf8");
  } catch {
    return "";
  }
}

function getRepositoryInfo() {
  const repository = process.env.GITHUB_REPOSITORY || `info14fourteen-creator/${REPO_NAME}`;
  const branch = process.env.GITHUB_REF_NAME || "main";

  return {
    repository,
    branch,
    outputBaseUrl: `https://raw.githubusercontent.com/${repository}/${branch}/ai/latest/${REPO_NAME}`,
    rulesUrl: `https://raw.githubusercontent.com/${repository}/${branch}/ai/WORKING_RULES.md`
  };
}

function matchesInclude(relPath, includeRule) {
  const rel = toPosix(relPath);
  const rule = toPosix(includeRule);

  if (rule.endsWith("/")) {
    return rel.startsWith(rule);
  }

  return (
    rel === rule ||
    rel.startsWith(`${rule}/`) ||
    rel.startsWith(`${rule}.`)
  );
}

function groupFiles(files) {
  const assigned = new Set();
  const groups = [];

  for (const section of SECTIONS) {
    const sectionFiles = files.filter((file) =>
      section.includes.some((rule) => matchesInclude(file, rule))
    );

    for (const file of sectionFiles) {
      assigned.add(file);
    }

    groups.push({
      file: section.file,
      title: section.title,
      files: Array.from(new Set(sectionFiles)).sort()
    });
  }

  const unassigned = files.filter((file) => !assigned.has(file)).sort();

  if (unassigned.length > 0) {
    groups.push({
      file: "10_REMAINING_FILES.md",
      title: "REMAINING FILES",
      files: unassigned
    });
  }

  return groups;
}

function buildTree(files) {
  const rootNode = {};

  for (const file of files) {
    const parts = toPosix(file).split("/");
    let node = rootNode;

    for (let i = 0; i < parts.length; i += 1) {
      const part = parts[i];
      const isLast = i === parts.length - 1;

      if (!node[part]) {
        node[part] = isLast ? null : {};
      }

      node = node[part];
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

  return render(rootNode);
}

function detectLanguage(relPath) {
  const ext = path.extname(relPath).toLowerCase();

  const map = {
    ".js": "js",
    ".mjs": "js",
    ".cjs": "js",
    ".ts": "ts",
    ".tsx": "tsx",
    ".jsx": "jsx",
    ".json": "json",
    ".css": "css",
    ".html": "html",
    ".md": "md",
    ".svg": "svg",
    ".yml": "yml",
    ".yaml": "yaml",
    ".txt": "text"
  };

  return map[ext] || "text";
}

function buildMapFile(files, repoInfo, groups) {
  const lines = [];

  lines.push(`# AI MAP — ${REPO_NAME}`);
  lines.push("");
  lines.push(`- Generated: ${new Date().toISOString()}`);
  lines.push(`- Repository: ${repoInfo.repository}`);
  lines.push(`- Branch: ${repoInfo.branch}`);
  lines.push(`- Total source files included: ${files.length}`);
  lines.push(`- Output folder: ai/latest/${REPO_NAME}`);
  lines.push(`- Zip archive: ai/latest/${REPO_NAME}.zip`);
  lines.push("");

  lines.push("## Snapshot files");
  lines.push("");

  for (const group of groups) {
    lines.push(`- ${group.file} — ${group.title} (${group.files.length} files)`);
  }

  lines.push("");
  lines.push("## Project tree");
  lines.push("");
  lines.push("```text");
  lines.push(buildTree(files).trimEnd());
  lines.push("```");
  lines.push("");
  lines.push("## Raw links");
  lines.push("");
  lines.push(`- Folder base: ${repoInfo.outputBaseUrl}`);
  lines.push(`- Working rules: ${repoInfo.rulesUrl}`);
  lines.push("");

  return lines.join("\n");
}

function buildSectionFile(sectionTitle, files, repoInfo) {
  const lines = [];

  lines.push(`# REPOSITORY: ${REPO_NAME}`);
  lines.push(`# SECTION: ${sectionTitle}`);
  lines.push(`# GENERATED_AT: ${new Date().toISOString()}`);
  lines.push("");

  lines.push("## INCLUDED FILES");
  lines.push("");

  for (const file of files) {
    lines.push(`- ${file}`);
  }

  lines.push("");
  lines.push(`## REPOSITORY LINK BASE`);
  lines.push("");
  lines.push(`- ${repoInfo.outputBaseUrl}`);
  lines.push("");

  for (const file of files) {
    const content = readUtf8(file);
    const lang = detectLanguage(file);

    lines.push("---");
    lines.push("");
    lines.push(`## FILE: ${file}`);
    lines.push("");
    lines.push(`\`\`\`${lang}`);
    lines.push(content.trimEnd());
    lines.push("```");
    lines.push("");
  }

  return lines.join("\n");
}

function buildSnapshotInfo(files, groups, repoInfo) {
  const lines = [];

  lines.push(`# SNAPSHOT INFO — ${REPO_NAME}`);
  lines.push("");
  lines.push(`- Generated: ${new Date().toISOString()}`);
  lines.push(`- Repository: ${repoInfo.repository}`);
  lines.push(`- Branch: ${repoInfo.branch}`);
  lines.push(`- Files captured: ${files.length}`);
  lines.push(`- Snapshot documents: ${groups.length + 2}`);
  lines.push(`- Zip archive: ai/latest/${REPO_NAME}.zip`);
  lines.push("");

  lines.push("## Notes");
  lines.push("");
  lines.push("- Every snapshot file contains real file contents.");
  lines.push("- Files are grouped for easier AI reading.");
  lines.push("- Repository name is embedded in every snapshot file.");
  lines.push("- Working rules remain in ai/WORKING_RULES.md.");
  lines.push("");

  if (fs.existsSync(RULES_FILE)) {
    lines.push("## WORKING RULES");
    lines.push("");
    lines.push(readUtf8("ai/WORKING_RULES.md").trim());
    lines.push("");
  }

  return lines.join("\n");
}

function writeManifest(files, groups, repoInfo) {
  const manifest = {
    generatedAt: new Date().toISOString(),
    repoName: REPO_NAME,
    repository: repoInfo.repository,
    branch: repoInfo.branch,
    totalFiles: files.length,
    outputDir: `ai/latest/${REPO_NAME}`,
    zipPath: `ai/latest/${REPO_NAME}.zip`,
    groups: groups.map((group) => ({
      file: group.file,
      title: group.title,
      totalFiles: group.files.length,
      files: group.files
    }))
  };

  fs.writeFileSync(
    path.join(REPO_OUTPUT_DIR, "manifest.json"),
    JSON.stringify(manifest, null, 2),
    "utf8"
  );
}

function writeLegacyPointers(repoInfo, groups) {
  const mapPointer = [
    `AI snapshot folder: ai/latest/${REPO_NAME}`,
    `Zip archive: ai/latest/${REPO_NAME}.zip`,
    `Repository: ${repoInfo.repository}`,
    `Branch: ${repoInfo.branch}`,
    "",
    "Snapshot files:",
    ...groups.map((group) => `- ${REPO_NAME}/${group.file}`)
  ].join("\n");

  fs.writeFileSync(path.join(LATEST_DIR, "ai-project-map.txt"), mapPointer, "utf8");

  const bundlePointer = [
    `Use folder snapshots instead of a single mega-bundle.`,
    `Primary folder: ai/latest/${REPO_NAME}`,
    `Zip archive: ai/latest/${REPO_NAME}.zip`,
    "",
    `Map file: ai/latest/${REPO_NAME}/00_AI_MAP.md`,
    `Info file: ai/latest/${REPO_NAME}/99_SNAPSHOT_INFO.md`
  ].join("\n");

  fs.writeFileSync(path.join(LATEST_DIR, "ai-project-bundle.txt"), bundlePointer, "utf8");

  const links = [
    "AI SNAPSHOT LINKS",
    "",
    `Folder base: ${repoInfo.outputBaseUrl}`,
    `Map: ${repoInfo.outputBaseUrl}/00_AI_MAP.md`,
    `Info: ${repoInfo.outputBaseUrl}/99_SNAPSHOT_INFO.md`,
    `Working rules: ${repoInfo.rulesUrl}`,
    ""
  ].join("\n");

  fs.writeFileSync(path.join(REPO_OUTPUT_DIR, "links.txt"), links, "utf8");
}

function createZipArchive() {
  const zipTarget = path.join(LATEST_DIR, `${REPO_NAME}.zip`);

  if (fs.existsSync(zipTarget)) {
    fs.rmSync(zipTarget, { force: true });
  }

  const result = spawnSync(
    "zip",
    ["-r", zipTarget, REPO_NAME],
    {
      cwd: LATEST_DIR,
      stdio: "inherit"
    }
  );

  if (result.status !== 0) {
    console.warn(`zip command failed for ${REPO_NAME}. Snapshot folder was still created.`);
  }
}

function main() {
  ensureDir(REPO_OUTPUT_DIR);

  const allFiles = walk(ROOT)
    .filter((file) => !shouldIgnore(file))
    .sort((a, b) => a.localeCompare(b));

  const repoInfo = getRepositoryInfo();
  const groups = groupFiles(allFiles);

  fs.writeFileSync(
    path.join(REPO_OUTPUT_DIR, "00_AI_MAP.md"),
    buildMapFile(allFiles, repoInfo, groups),
    "utf8"
  );

  for (const group of groups) {
    fs.writeFileSync(
      path.join(REPO_OUTPUT_DIR, group.file),
      buildSectionFile(group.title, group.files, repoInfo),
      "utf8"
    );
  }

  fs.writeFileSync(
    path.join(REPO_OUTPUT_DIR, "99_SNAPSHOT_INFO.md"),
    buildSnapshotInfo(allFiles, groups, repoInfo),
    "utf8"
  );

  writeManifest(allFiles, groups, repoInfo);
  writeLegacyPointers(repoInfo, groups);
  createZipArchive();

  console.log(`Snapshot folder created: ai/latest/${REPO_NAME}/`);
  console.log(`Zip archive created: ai/latest/${REPO_NAME}.zip`);
}

main();
```

---

## FILE: vite.config.js

```js
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      buffer: 'buffer/',
      crypto: resolve('node_modules/crypto-browserify'),
      stream: resolve('node_modules/readable-stream')
    }
  },
  define: {
    global: 'globalThis'
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    cssCodeSplit: false,
    target: 'es2020',
    lib: {
      entry: 'src/index.js',
      name: 'FourteenConnect',
      fileName: (format) => `fourteen-connect.${format}.js`,
      formats: ['es', 'umd']
    },
    rolldownOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.names && assetInfo.names.some((name) => name.endsWith('.css'))) {
            return '4teen-wallet-kit.css';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  }
});
```

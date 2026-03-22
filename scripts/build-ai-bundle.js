import fs from 'fs';
import path from 'path';

const root = process.cwd();

const OUTPUT_DIR = path.join(root, 'ai', 'latest');
const MAP_FILE = path.join(OUTPUT_DIR, 'ai-project-map.txt');
const BUNDLE_FILE = path.join(OUTPUT_DIR, 'ai-project-bundle.txt');
const LINKS_FILE = path.join(OUTPUT_DIR, 'links.txt');
const MANIFEST_FILE = path.join(OUTPUT_DIR, 'manifest.json');
const RULES_FILE = path.join(root, 'ai', 'WORKING_RULES.md');

const IGNORE_DIRS = new Set([
  '.git',
  '.github-cache',
  '.idea',
  '.vscode',
  'coverage',
  'dist',
  'node_modules'
]);

const IGNORE_RELATIVE_PREFIXES = [
  'ai/latest/'
];

const ALLOWED_EXTENSIONS = new Set([
  '.cjs',
  '.css',
  '.html',
  '.js',
  '.json',
  '.jsx',
  '.md',
  '.mjs',
  '.svg',
  '.ts',
  '.tsx',
  '.txt',
  '.yml',
  '.yaml'
]);

function toPosixPath(value) {
  return value.replace(/\\/g, '/');
}

function toRelativePath(absolutePath) {
  return toPosixPath(path.relative(root, absolutePath));
}

function shouldIgnorePath(relativePath) {
  return IGNORE_RELATIVE_PREFIXES.some((prefix) => relativePath.startsWith(prefix));
}

function ensureDirectory(directoryPath) {
  fs.mkdirSync(directoryPath, { recursive: true });
}

function walkDirectory(directoryPath) {
  const results = [];
  const entries = fs.readdirSync(directoryPath, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith('.') && !['.github'].includes(entry.name)) {
      continue;
    }

    const absolutePath = path.join(directoryPath, entry.name);
    const relativePath = toRelativePath(absolutePath);

    if (shouldIgnorePath(relativePath)) {
      continue;
    }

    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) {
        continue;
      }

      results.push(...walkDirectory(absolutePath));
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(extension)) {
      continue;
    }

    results.push(absolutePath);
  }

  return results;
}

function buildTree(files) {
  const rootNode = {};

  for (const file of files) {
    const parts = toRelativePath(file).split('/');
    let current = rootNode;

    for (let index = 0; index < parts.length; index += 1) {
      const part = parts[index];
      const isFile = index === parts.length - 1;

      if (!current[part]) {
        current[part] = isFile ? null : {};
      }

      current = current[part];
    }
  }

  function renderNode(node, indent = '') {
    const keys = Object.keys(node).sort((left, right) => {
      const leftIsDir = node[left] !== null;
      const rightIsDir = node[right] !== null;

      if (leftIsDir !== rightIsDir) {
        return leftIsDir ? -1 : 1;
      }

      return left.localeCompare(right);
    });

    let output = '';

    for (const key of keys) {
      if (node[key] === null) {
        output += `${indent}${key}\n`;
      } else {
        output += `${indent}${key}/\n`;
        output += renderNode(node[key], `${indent}  `);
      }
    }

    return output;
  }

  return renderNode(rootNode);
}

function readFileContent(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function getRepositoryInfo() {
  const repository = process.env.GITHUB_REPOSITORY || 'REPO_OWNER/REPO_NAME';
  const branch = process.env.GITHUB_REF_NAME || 'main';

  return {
    repository,
    branch,
    bundleUrl: `https://raw.githubusercontent.com/${repository}/${branch}/ai/latest/ai-project-bundle.txt`,
    mapUrl: `https://raw.githubusercontent.com/${repository}/${branch}/ai/latest/ai-project-map.txt`,
    rulesUrl: `https://raw.githubusercontent.com/${repository}/${branch}/ai/WORKING_RULES.md`
  };
}

function buildProjectMap(files, repositoryInfo) {
  let output = '';

  output += '===== AI PROJECT MAP =====\n';
  output += `Generated: ${new Date().toISOString()}\n`;
  output += `Repository: ${repositoryInfo.repository}\n`;
  output += `Branch: ${repositoryInfo.branch}\n`;
  output += `Total files: ${files.length}\n`;
  output += '\n';

  output += '===== LINKS =====\n';
  output += `AI bundle: ${repositoryInfo.bundleUrl}\n`;
  output += `AI map: ${repositoryInfo.mapUrl}\n`;
  output += `Working rules: ${repositoryInfo.rulesUrl}\n`;
  output += '\n';

  output += '===== PROJECT TREE =====\n';
  output += buildTree(files);
  output += '\n';

  output += '===== FILE LIST =====\n';
  for (const file of files) {
    output += `${toRelativePath(file)}\n`;
  }

  output += '\n';
  return output;
}

function buildProjectBundle(files, repositoryInfo) {
  let output = '';

  output += '===== AI PROJECT SNAPSHOT =====\n';
  output += `Generated: ${new Date().toISOString()}\n`;
  output += `Repository: ${repositoryInfo.repository}\n`;
  output += `Branch: ${repositoryInfo.branch}\n`;
  output += `Total files: ${files.length}\n`;
  output += '\n';

  output += '===== LINKS =====\n';
  output += `AI bundle: ${repositoryInfo.bundleUrl}\n`;
  output += `AI map: ${repositoryInfo.mapUrl}\n`;
  output += `Working rules: ${repositoryInfo.rulesUrl}\n`;
  output += '\n';

  if (fs.existsSync(RULES_FILE)) {
    output += '===== WORKING RULES =====\n\n';
    output += readFileContent(RULES_FILE).trim();
    output += '\n\n';
  }

  output += '===== PROJECT TREE =====\n';
  output += buildTree(files);
  output += '\n';

  output += '===== FILE LIST =====\n';
  for (const file of files) {
    output += `${toRelativePath(file)}\n`;
  }
  output += '\n';

  for (const file of files) {
    const relativePath = toRelativePath(file);
    const extension = path.extname(file).slice(1).toLowerCase() || 'text';
    const content = readFileContent(file);

    output += '================================================================\n';
    output += `FILE: ${relativePath}\n`;
    output += `TYPE: ${extension}\n`;
    output += '================================================================\n\n';
    output += content;
    output += '\n\n';
  }

  return output;
}

function writeLinksFile(repositoryInfo) {
  const content = [
    'AI BUNDLE LINKS',
    '',
    `AI bundle: ${repositoryInfo.bundleUrl}`,
    `AI map: ${repositoryInfo.mapUrl}`,
    `Working rules: ${repositoryInfo.rulesUrl}`,
    ''
  ].join('\n');

  fs.writeFileSync(LINKS_FILE, content, 'utf8');
}

function writeManifest(files, repositoryInfo) {
  const manifest = {
    generatedAt: new Date().toISOString(),
    repository: repositoryInfo.repository,
    branch: repositoryInfo.branch,
    totalFiles: files.length,
    bundleUrl: repositoryInfo.bundleUrl,
    mapUrl: repositoryInfo.mapUrl,
    rulesUrl: repositoryInfo.rulesUrl,
    files: files.map((file) => toRelativePath(file))
  };

  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2), 'utf8');
}

function main() {
  ensureDirectory(OUTPUT_DIR);

  const files = walkDirectory(root)
    .filter((file) => !shouldIgnorePath(toRelativePath(file)))
    .sort((left, right) => toRelativePath(left).localeCompare(toRelativePath(right)));

  const repositoryInfo = getRepositoryInfo();

  const mapOutput = buildProjectMap(files, repositoryInfo);
  const bundleOutput = buildProjectBundle(files, repositoryInfo);

  fs.writeFileSync(MAP_FILE, mapOutput, 'utf8');
  fs.writeFileSync(BUNDLE_FILE, bundleOutput, 'utf8');

  writeLinksFile(repositoryInfo);
  writeManifest(files, repositoryInfo);

  console.log(`AI map created: ${toRelativePath(MAP_FILE)}`);
  console.log(`AI bundle created: ${toRelativePath(BUNDLE_FILE)}`);
  console.log(`Links file created: ${toRelativePath(LINKS_FILE)}`);
  console.log(`Manifest created: ${toRelativePath(MANIFEST_FILE)}`);
  console.log(`AI bundle URL: ${repositoryInfo.bundleUrl}`);
}

main();

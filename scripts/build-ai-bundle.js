import fs from 'fs';
import path from 'path';

const root = process.cwd();
const OUTPUT_FILE = 'ai-project-bundle.txt';

// что исключаем
const IGNORE_DIRS = new Set([
  'node_modules',
  'dist',
  '.git',
  '.idea',
  '.vscode'
]);

const ALLOWED_EXT = new Set([
  '.js', '.ts', '.jsx', '.tsx',
  '.css', '.html',
  '.json', '.md'
]);

function walk(dir) {
  const results = [];

  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      if (IGNORE_DIRS.has(entry)) continue;
      results.push(...walk(full));
    } else {
      if (ALLOWED_EXT.has(path.extname(full))) {
        results.push(full);
      }
    }
  }

  return results;
}

function rel(p) {
  return path.relative(root, p).replace(/\\/g, '/');
}

function buildTree(files) {
  const tree = {};

  for (const file of files) {
    const parts = rel(file).split('/');
    let current = tree;

    parts.forEach((part, i) => {
      if (!current[part]) {
        current[part] = (i === parts.length - 1) ? null : {};
      }
      current = current[part];
    });
  }

  function print(node, indent = '') {
    let out = '';

    for (const key of Object.keys(node).sort()) {
      if (node[key] === null) {
        out += `${indent}${key}\n`;
      } else {
        out += `${indent}${key}/\n`;
        out += print(node[key], indent + '  ');
      }
    }

    return out;
  }

  return print(tree);
}

function main() {
  const files = walk(root).sort((a, b) => rel(a).localeCompare(rel(b)));

  let output = '';

  // HEADER
  output += `===== AI PROJECT SNAPSHOT =====\n`;
  output += `Generated: ${new Date().toISOString()}\n`;
  output += `Total files: ${files.length}\n\n`;

  // TREE
  output += `===== PROJECT TREE =====\n`;
  output += buildTree(files);
  output += `\n`;

  // FILE LIST
  output += `===== FILE LIST =====\n`;
  files.forEach(f => {
    output += rel(f) + '\n';
  });
  output += `\n`;

  // FILE CONTENTS
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');

    output += `================================================================\n`;
    output += `FILE: ${rel(file)}\n`;
    output += `TYPE: ${path.extname(file).slice(1)}\n`;
    output += `================================================================\n\n`;

    output += content + '\n\n';
  }

  fs.writeFileSync(path.join(root, OUTPUT_FILE), output, 'utf8');

  console.log(`✅ AI bundle created: ${OUTPUT_FILE}`);
}

main();

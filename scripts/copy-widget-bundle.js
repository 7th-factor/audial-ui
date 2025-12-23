#!/usr/bin/env node

/**
 * Script to copy the widget bundle for local development and preview
 *
 * Checks these locations in order:
 * 1. node_modules/@7th-factor/audial-widget/dist/bundle.mjs (if package installed)
 * 2. ../lavoz/widget/dist/bundle.mjs (sibling repo for local dev)
 *
 * If no bundle found, creates a placeholder that logs a helpful message.
 */

import { existsSync, copyFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const targetDir = join(projectRoot, 'public', 'widget');
const targetFile = join(targetDir, 'bundle.mjs');

// Ensure target directory exists
mkdirSync(targetDir, { recursive: true });

// Possible source locations
const sources = [
  {
    path: join(projectRoot, 'node_modules', '@7th-factor', 'audial-widget', 'dist', 'bundle.mjs'),
    name: 'npm package'
  },
  {
    path: join(projectRoot, '..', 'lavoz', 'widget', 'dist', 'bundle.mjs'),
    name: 'lavoz sibling repo'
  }
];

let copied = false;

for (const source of sources) {
  if (existsSync(source.path)) {
    try {
      copyFileSync(source.path, targetFile);
      console.log(`✅ Widget bundle copied from ${source.name}`);
      console.log(`   ${source.path} → ${targetFile}`);
      copied = true;
      break;
    } catch (err) {
      console.warn(`⚠️  Failed to copy from ${source.name}: ${err.message}`);
    }
  }
}

if (!copied) {
  // Create a placeholder that provides helpful feedback
  const placeholder = `
// Widget bundle placeholder
// The actual bundle was not found during build.
//
// To get the widget bundle for local preview:
// 1. Install the package: npm install @7th-factor/audial-widget (requires GitHub auth)
// 2. Or build from lavoz repo: cd ../lavoz/widget && npm run build
//
// For production, the embed code uses: https://app.audial.co/widget/bundle.mjs

console.warn('[Audial Widget] Bundle not found. See public/widget/bundle.mjs for instructions.');

window.audial = {
  loadWidget: (config) => {
    console.warn('[Audial Widget] Placeholder mode - bundle not installed');
    console.log('[Audial Widget] Would load with config:', config);
  }
};
`;

  writeFileSync(targetFile, placeholder.trim());
  console.log('ℹ️  Widget bundle not found - created placeholder');
  console.log('   To install: npm install @7th-factor/audial-widget');
  console.log('   Or build from: ../lavoz/widget');
}

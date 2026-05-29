#!/usr/bin/env node

/**
 * Environment Variable Verification Script
 *
 * - Fails the build only when variables required for server start are missing
 *   (matches backend/src/index.ts: CMS_API_TOKEN in development).
 * - Warns when optional feature env (email, ATS, HR, procurement) is incomplete.
 *
 * Usage: node scripts/verify-env.js
 */

require('dotenv').config();

const chalk = require('chalk');

function isPlaceholder(value) {
  if (!value || String(value).trim() === '') return true;
  const v = String(value);
  if (v.includes('your_')) return true;
  if (v.includes('yourdomain')) return true;
  if (v.toLowerCase().includes('placeholder')) return true;
  return false;
}

function isConfigured(varName) {
  return !isPlaceholder(process.env[varName]);
}

const SENSITIVE_VARS = new Set([
  'CMS_API_TOKEN',
  'PROCUREMENT_EMAIL_PASS',
  'HR_EMAIL_PASS',
  'ENQUIRY_EMAIL_PASS',
  'EMAIL_PASS',
  'RECAPTCHA_SECRET_KEY',
  'ATS_PGPASSWORD',
  'ATS_DATABASE_URL',
]);

const OPTIONAL_DISPLAY = [
  'PORT',
  'NODE_ENV',
  'CMS_API_URL',
  'CMS_NEWS_API_ID',
  'CMS_NEWS_PANEL_API_ID',
  'CORS_ORIGIN',
  'EMAIL_HOST',
  'EMAIL_PORT',
  'RECAPTCHA_SECRET_KEY',
  'ATS_DATABASE_URL',
  'ATS_PGHOST',
  'ATS_PGPORT',
  'ATS_PGDATABASE',
  'ATS_PGUSER',
];

console.log(chalk.blue.bold('\n🔍 Environment Variable Verification\n'));

let hasErrors = false;
let hasWarnings = false;

// --- Required for dev start (see backend/src/index.ts) ---
console.log(chalk.yellow('Required for server start:'));
if (!isConfigured('CMS_API_TOKEN')) {
  console.log(chalk.red('  ❌ CMS_API_TOKEN: Not set or still a placeholder'));
  hasErrors = true;
} else if (
  process.env.CMS_API_TOKEN &&
  process.env.CMS_API_TOKEN.startsWith('945a7c504ca0964b7ff6e2de950c357e')
) {
  console.log(chalk.red('  ❌ CRITICAL: Known exposed token — rotate immediately'));
  hasErrors = true;
} else {
  console.log(chalk.green('  ✅ CMS_API_TOKEN: Set'));
}

// --- Feature: Contact form SMTP ---
console.log(chalk.yellow('\nContact form (SMTP):'));
const enquiryViaDedicated =
  isConfigured('ENQUIRY_EMAIL_USER') && isConfigured('ENQUIRY_EMAIL_PASS');
const enquiryViaLegacy =
  isConfigured('EMAIL_USER') && isConfigured('EMAIL_PASS');
if (enquiryViaDedicated || enquiryViaLegacy) {
  console.log(
    chalk.green(
      `  ✅ Enquiry SMTP: ${enquiryViaDedicated ? 'ENQUIRY_*' : 'EMAIL_USER / EMAIL_PASS'}`,
    ),
  );
} else {
  console.log(
    chalk.yellow(
      '  ⚠️  Set ENQUIRY_EMAIL_USER + ENQUIRY_EMAIL_PASS or EMAIL_USER + EMAIL_PASS — contact form will return 502 until SMTP is configured',
    ),
  );
  hasWarnings = true;
}

// --- Feature: Careers / jobs (ATS DB) ---
console.log(chalk.yellow('\nJob listings (ATS database):'));
const atsOk =
  isConfigured('ATS_DATABASE_URL') ||
  (isConfigured('ATS_PGPASSWORD') && isConfigured('ATS_PGUSER'));
if (atsOk) {
  console.log(chalk.green('  ✅ ATS connection env present'));
} else {
  console.log(
    chalk.yellow(
      '  ⚠️  ATS_DATABASE_URL or ATS_PGUSER + ATS_PGPASSWORD not set — /api/jobs may fail or return empty',
    ),
  );
  hasWarnings = true;
}

// --- Feature: HR applications ---
console.log(chalk.yellow('\nJob applications email:'));
if (
  isConfigured('HR_EMAIL_USER') &&
  isConfigured('HR_EMAIL_PASS')
) {
  console.log(chalk.green('  ✅ HR email configured'));
} else {
  console.log(
    chalk.yellow(
      '  ⚠️  HR_EMAIL_USER / HR_EMAIL_PASS missing — application submissions may fail',
    ),
  );
  hasWarnings = true;
}

// --- Feature: Vendor portal ---
console.log(chalk.yellow('\nVendor portal email:'));
if (
  isConfigured('PROCUREMENT_EMAIL_USER') &&
  isConfigured('PROCUREMENT_EMAIL_PASS')
) {
  console.log(chalk.green('  ✅ Procurement email configured'));
} else {
  console.log(
    chalk.yellow(
      '  ⚠️  PROCUREMENT_* missing — vendor registration emails may fail',
    ),
  );
  hasWarnings = true;
}

// --- Optional vars (informational) ---
console.log(chalk.yellow('\nOptional variables:'));
OPTIONAL_DISPLAY.forEach((varName) => {
  const value = process.env[varName];
  if (!value) {
    console.log(chalk.gray(`  ⚪ ${varName}: Not set (using default)`));
  } else if (isPlaceholder(value)) {
    console.log(chalk.yellow(`  ⚠️  ${varName}: Looks like a placeholder`));
    hasWarnings = true;
  } else {
    const displayValue = SENSITIVE_VARS.has(varName)
      ? '✅ Set (hidden)'
      : `✅ Set: ${value}`;
    console.log(chalk.green(`  ${displayValue}`));
  }
});

console.log(chalk.blue.bold('\n📋 Summary:'));
if (hasErrors) {
  console.log(chalk.red('❌ Fix required variables above — dev server will not start without CMS_API_TOKEN'));
  console.log(chalk.yellow('💡 Copy backend/.env.example → backend/.env and set real values'));
  process.exit(1);
}
if (hasWarnings) {
  console.log(
    chalk.yellow('⚠️  Some features need more env vars — server can still start'),
  );
} else {
  console.log(chalk.green('✅ Core checks passed'));
}

console.log(chalk.blue('\n🚀 Ready to start the application\n'));

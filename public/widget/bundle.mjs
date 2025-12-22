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
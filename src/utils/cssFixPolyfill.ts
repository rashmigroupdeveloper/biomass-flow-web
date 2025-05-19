/**
 * This utility patches the CSSStyleSheet API to work around issues with constructed stylesheets
 * and @import rules. It's designed to fix the error:
 * "@import rules are not allowed here. See https://github.com/WICG/construct-stylesheets/issues/119#issuecomment-588352418."
 */

export function applyCSSFixPolyfill() {
  if (typeof window !== 'undefined' && 'CSSStyleSheet' in window) {
    // Save the original replaceSync method
    const originalReplaceSync = CSSStyleSheet.prototype.replaceSync;
    
    // Patch replaceSync to filter out @import rules
    CSSStyleSheet.prototype.replaceSync = function(cssText: string) {
      // Remove any @import rules from the CSS text
      const filteredCSSText = cssText
        .replace(/@import\s+[^;]*;/g, '')
        .replace(/@import\s+url\([^)]*\)\s*[^;]*;/g, '');
      
      // Call the original method with cleaned CSS
      return originalReplaceSync.call(this, filteredCSSText);
    };
    
    console.info('Applied CSS @import polyfill for constructed stylesheets');
  }
} 
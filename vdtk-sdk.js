/**
 * VidyoTalk (.vdtk) Client-Side Core SDK
 * Open-source parser protocol for modern interactive video engines.
 */
class VidyoTalkSDK {
  constructor() {
    this.activeTimeline = [];
    this.isLoaded = false;
  }

  /**
   * Parses and validates a raw .vdtk JSON layout string
   * @param {string} jsonString - Raw string read from a local .vdtk file drop
   * @returns {boolean} True if parsing and compliance checks pass
   */
  loadPayload(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      
      // Basic Spec Verification
      if (!data.vdtkVersion || !Array.isArray(data.lensTimeline)) {
        throw new Error("Invalid format: Missing critical vdtkVersion or lensTimeline cluster.");
      }

      // Chronological sort ensuring timestamps align perfectly forward
      this.activeTimeline = data.lensTimeline.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
      this.isLoaded = true;
      
      console.log(`[VidyoTalk SDK] Registered .vdtk spec version ${data.vdtkVersion} successfully.`);
      console.log(`[VidyoTalk SDK] Total indexed intelligence milestones mapped: ${this.activeTimeline.length}`);
      return true;
    } catch (err) {
      console.error("[VidyoTalk SDK] Parsing Error: System blueprint non-compliant.", err.message);
      this.isLoaded = false;
      return false;
    }
  }

  /**
   * Direct media player hook function.
   * Call this inside an HTML5 video 'timeupdate' listener loop to catch matches.
   * @param {number} currentTimeInSeconds - Current time asset of player monitor
   * @param {function} callback - Triggers when player timestamp crosses a milestone
   */
  monitorPlayback(currentTimeInSeconds, callback) {
    if (!this.isLoaded) return;

    // Convert numeric media player playback seconds to string match 'HH:MM:SS'
    const hours = Math.floor(currentTimeInSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((currentTimeInSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = Math.floor(currentTimeInSeconds % 60).toString().padStart(2, '0');
    const playerTimePrefix = `${hours}:${minutes}:${seconds}`;

    // Search manifest array for a matching token trigger timeframe
    const triggeredEvents = this.activeTimeline.filter(event => event.timestamp.startsWith(playerTimePrefix));
    
    if (triggeredEvents.length > 0) {
      triggeredEvents.forEach(event => {
        // Output to developer panel
        console.log(`[VidyoTalk Target Trigger] Hit Milestone at ${event.timestamp} | Lens: ${event.lensToken}`);
        // Execute UI updates downstream
        if (typeof callback === 'function') callback(event);
      });
    }
  }
}

// Export module framework for browser integrations and native extensions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VidyoTalkSDK;
} else {
  window.VidyoTalkSDK = VidyoTalkSDK;
}

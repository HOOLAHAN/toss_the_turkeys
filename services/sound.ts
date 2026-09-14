export type GameSound = 'toss' | 'land' | 'score' | 'plucked' | 'thanksgiving';

/** Stable audio boundary for future production assets. Intentionally silent in the MVP. */
export const soundService = {
  async play(_sound: GameSound, enabled: boolean): Promise<void> {
    if (!enabled) return;
    // Add preloaded Expo Audio clips here without coupling sound files to game rules.
  },
};

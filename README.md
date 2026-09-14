# Toss the Turkeys

A polished 2D pass-and-play push-your-luck game for 2–8 players, built with Expo, React Native, TypeScript, Expo Router, Zustand, Reanimated, Haptics, and AsyncStorage.

## Run

```bash
npm install
npx expo start
```

Press `i` for iOS, `a` for Android, or scan the QR code with Expo Go.

## Verify

```bash
npm test
npm run typecheck
```

## Architecture

- `game/` contains pure, UI-independent probability, scoring, banking, rotation, winning, and statistics rules.
- `store/` adapts the engine to Zustand and persists settings, recent player names, and lifetime stats with AsyncStorage.
- `components/Turkey.tsx` is the rendering boundary. It maps domain positions to 2D art; game rules never know about image files.
- `app/` contains Expo Router screens for home, setup, play, winner, Turkeydex, instructions, and settings.
- `assets/turkeys/` contains the six generated transparent character poses.

Each turkey is rolled independently from the centrally configured normalized weights in `constants/turkeyPositions.ts`. Scoring is a pure function in `game/scoring.ts`: mixed common poses pluck the turn; common doubles score 1; scoring poses add; scoring doubles score 4× base value. Double Wattle Wobble scores 60 and presents as Thanksgiving.

## 2D now, 3D later

The current turkey renderer is deliberately implemented in 2D for the MVP. Once gameplay and visual direction are validated, `Turkey` can be replaced by a 3D renderer with models, six resting poses, tumbling, bounce, wobble, camera effects, and swipe throwing. The engine will still decide both results before animation begins; probabilities, scoring, player state, statistics, and wins will not change.

## Assumptions

- Sound is represented by a settings-ready abstraction point; production audio assets are intentionally deferred.
- Unfinished matches are not restored, as permitted by the MVP brief. Recent names are restored.
- A custom target has a minimum of 10 points.
- `totalPointsScored` records landed points, including points later lost to a pluck.

## Next sensible steps

Playtest turn pacing and probability feel, add production sound, improve accessibility testing, add deterministic store integration tests, then prototype the renderer-only 3D replacement.

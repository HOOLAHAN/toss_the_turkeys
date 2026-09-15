import { createContext, ReactNode, useContext, useEffect, useRef } from 'react';
import { setAudioModeAsync, useAudioPlayer } from 'expo-audio';
import { useSettingsStore } from '@/store/settingsStore';

export type GameSound = 'land' | 'bank' | 'plucked' | 'thanksgiving';
type Player = ReturnType<typeof useAudioPlayer>;
const AudioContext = createContext<{ play: (sound: GameSound) => void; playGobble: () => void }>({ play: () => undefined, playGobble: () => undefined });

export function AudioProvider({ children }: { children: ReactNode }) {
  const enabled = useSettingsStore(state => state.sound);
  const musicEnabled = useSettingsStore(state => state.music);
  const background = useAudioPlayer(require('../assets/sounds/farm-background.mp3'));
  const effects: Record<GameSound, Player> = {
    land: useAudioPlayer(require('../assets/sounds/land.wav')),
    bank: useAudioPlayer(require('../assets/sounds/bank.wav')),
    plucked: useAudioPlayer(require('../assets/sounds/plucked.wav')),
    thanksgiving: useAudioPlayer(require('../assets/sounds/thanksgiving.wav')),
  };
  const gobbles = [
    useAudioPlayer(require('../assets/sounds/gobble-1.mp3')),
    useAudioPlayer(require('../assets/sounds/gobble-2.mp3')),
    useAudioPlayer(require('../assets/sounds/gobble-3.mp3')),
    useAudioPlayer(require('../assets/sounds/gobble-4.mp3')),
    useAudioPlayer(require('../assets/sounds/gobble-5.mp3')),
    useAudioPlayer(require('../assets/sounds/gobble-6.mp3')),
  ];
  const previousGobble = useRef(-1);

  useEffect(() => { setAudioModeAsync({ playsInSilentMode: true, interruptionMode: 'mixWithOthers' }).catch(() => undefined); background.loop=true;background.volume=.16; }, [background]);
  useEffect(() => { if(musicEnabled) background.play(); else background.pause(); }, [background,musicEnabled]);
  const replay = (player: Player) => { player.seekTo(0).then(() => player.play()).catch(() => undefined); };
  const play = (sound: GameSound) => { if (enabled) replay(effects[sound]); };
  const playGobble = () => {
    if (!enabled) return;
    let index = Math.floor(Math.random() * gobbles.length);
    if (index === previousGobble.current) index = (index + 1) % gobbles.length;
    previousGobble.current = index;
    replay(gobbles[index]);
  };
  return <AudioContext.Provider value={{ play, playGobble }}>{children}</AudioContext.Provider>;
}

export const useGameAudio = () => useContext(AudioContext);

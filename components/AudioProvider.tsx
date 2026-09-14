import { createContext, ReactNode, useContext, useEffect } from 'react';
import { setAudioModeAsync, useAudioPlayer } from 'expo-audio';
import { useSettingsStore } from '@/store/settingsStore';

export type GameSound = 'toss' | 'land' | 'bank' | 'plucked' | 'thanksgiving';
type SoundPlayers = Record<GameSound, ReturnType<typeof useAudioPlayer>>;
const AudioContext = createContext<{ play: (sound: GameSound) => void }>({ play: () => undefined });

export function AudioProvider({ children }: { children: ReactNode }) {
  const enabled = useSettingsStore(state => state.sound);
  const players: SoundPlayers = {
    toss: useAudioPlayer(require('../assets/sounds/turkey-gobble.wav')),
    land: useAudioPlayer(require('../assets/sounds/land.wav')),
    bank: useAudioPlayer(require('../assets/sounds/bank.wav')),
    plucked: useAudioPlayer(require('../assets/sounds/turkey-gobble.wav')),
    thanksgiving: useAudioPlayer(require('../assets/sounds/turkey-gobble.wav')),
  };
  useEffect(() => { setAudioModeAsync({ playsInSilentMode: true, interruptionMode: 'mixWithOthers' }).catch(() => undefined); }, []);
  const play = (sound: GameSound) => {
    if (!enabled) return;
    const player = players[sound];
    player.seekTo(0).then(() => player.play()).catch(() => undefined);
  };
  return <AudioContext.Provider value={{ play }}>{children}</AudioContext.Provider>;
}

export const useGameAudio = () => useContext(AudioContext);

import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Asset } from 'expo-asset';
import { useFonts as useBaloo, Baloo2_700Bold, Baloo2_800ExtraBold } from '@expo-google-fonts/baloo-2';
import { useFonts as useNunito, Nunito_400Regular, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import { AudioProvider } from '@/components/AudioProvider';
import { LaunchScreen } from '@/components/LaunchScreen';
import { AIRBORNE_TURKEY_ASSETS, TURKEY_ASSETS } from '@/components/Turkey';

export default function Layout() {
  const [balooReady] = useBaloo({ Baloo2_700Bold, Baloo2_800ExtraBold });
  const [nunitoReady] = useNunito({ Nunito_400Regular, Nunito_700Bold, Nunito_800ExtraBold });
  const [artReady, setArtReady] = useState(false);
  const [introReady, setIntroReady] = useState(false);
  useEffect(() => { Asset.loadAsync([...Object.values(TURKEY_ASSETS), ...AIRBORNE_TURKEY_ASSETS]).finally(() => setArtReady(true)); }, []);
  useEffect(() => { const timer=setTimeout(()=>setIntroReady(true),700);return()=>clearTimeout(timer); }, []);
  if (!balooReady || !nunitoReady || !artReady || !introReady) return <LaunchScreen />;
  return <AudioProvider><StatusBar style="dark" /><Stack screenOptions={{ headerShown: false, animation: 'fade' }}><Stack.Screen name="game/play" options={{ gestureEnabled: false }} /></Stack></AudioProvider>;
}

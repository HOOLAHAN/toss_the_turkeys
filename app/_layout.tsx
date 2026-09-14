import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Asset } from 'expo-asset';
import { useFonts as useBaloo, Baloo2_700Bold, Baloo2_800ExtraBold } from '@expo-google-fonts/baloo-2';
import { useFonts as useNunito, Nunito_400Regular, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import { View } from 'react-native';
import { AudioProvider } from '@/components/AudioProvider';
import { TURKEY_ASSETS } from '@/components/Turkey';

export default function Layout() {
  const [balooReady] = useBaloo({ Baloo2_700Bold, Baloo2_800ExtraBold });
  const [nunitoReady] = useNunito({ Nunito_400Regular, Nunito_700Bold, Nunito_800ExtraBold });
  const [artReady, setArtReady] = useState(false);
  useEffect(() => { Asset.loadAsync(Object.values(TURKEY_ASSETS)).finally(() => setArtReady(true)); }, []);
  if (!balooReady || !nunitoReady || !artReady) return <View />;
  return <AudioProvider><StatusBar style="dark" /><Stack screenOptions={{ headerShown: false, animation: 'fade' }}><Stack.Screen name="game/play" options={{ gestureEnabled: false }} /></Stack></AudioProvider>;
}

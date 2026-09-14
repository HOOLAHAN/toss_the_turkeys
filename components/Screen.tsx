import { ReactNode } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { C } from '@/constants/colours';

export function Screen({ children, scroll = true, style }: { children: ReactNode; scroll?: boolean; style?: ViewStyle }) {
  return (
    <LinearGradient colors={[C.cream, '#FFF3D9', C.parchment]} locations={[0, 0.58, 1]} style={s.fill}>
      <View pointerEvents="none" style={[s.glow, s.glowTop]} />
      <View pointerEvents="none" style={[s.glow, s.glowBottom]} />
      <SafeAreaView style={s.fill}>
        {scroll ? <ScrollView contentContainerStyle={[s.content, style]} showsVerticalScrollIndicator={false}>{children}</ScrollView> : <View style={[s.content, s.fill, style]}>{children}</View>}
      </SafeAreaView>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  fill: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 22 },
  glow: { position: 'absolute', borderRadius: 999, backgroundColor: 'rgba(255,255,255,.34)' },
  glowTop: { width: 280, height: 280, top: -130, right: -120 },
  glowBottom: { width: 330, height: 330, bottom: -190, left: -150 },
});

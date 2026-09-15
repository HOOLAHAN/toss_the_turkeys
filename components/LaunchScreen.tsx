import { ActivityIndicator, ImageBackground, StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { C } from '@/constants/colours';

const SPLASH_ART = require('@/assets/branding/splash-farm.png');

export function LaunchScreen() {
  return (
    <ImageBackground source={SPLASH_ART} resizeMode="cover" style={styles.fill} onLoadEnd={() => SplashScreen.hideAsync()} onError={() => SplashScreen.hideAsync()}>
      <View style={styles.skyFade} />
      <View style={styles.brand}>
        <Text style={styles.kicker}>THE PUSH-YOUR-LUCK PARTY GAME</Text>
        <Text style={styles.title}>TOSS THE TURKEYS</Text>
        <View style={styles.loadingRow}>
          <ActivityIndicator color={C.gold} size="small" />
          <Text style={styles.loading}>ROUNDING UP THE FLOCK…</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, justifyContent: 'flex-start', alignItems: 'center' },
  skyFade: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(67,31,18,.08)' },
  brand: {
    width: '88%',
    marginTop: '12%',
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: 'rgba(72,32,18,.88)',
    borderWidth: 2,
    borderColor: 'rgba(255,224,151,.85)',
  },
  kicker: { color: '#FFD369', fontSize: 10, fontWeight: '900', letterSpacing: 2.1 },
  title: { color: '#FFF7E5', fontSize: 35, lineHeight: 40, fontWeight: '900', textAlign: 'center' },
  loadingRow: { marginTop: 7, flexDirection: 'row', alignItems: 'center', gap: 8 },
  loading: { color: '#F9DBA2', fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
});

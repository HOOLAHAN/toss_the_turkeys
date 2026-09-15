import { router } from 'expo-router';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { GameButton } from '@/components/GameButton';
import { Turkey } from '@/components/Turkey';
import { C } from '@/constants/colours';
import { useGameStore } from '@/store/gameStore';

export default function Home() {
  const { height } = useWindowDimensions();
  const compact = height < 750;
  const gameStatus=useGameStore(state=>state.status);
  const hasGame=gameStatus==='playing'||gameStatus==='animating';
  return (
    <Screen scroll={false} style={s.wrap}>
      <View style={s.brand}>
        <Text style={s.kicker}>—  THE PUSH-YOUR-LUCK PARTY GAME  —</Text>
        <Text style={[s.title, compact && s.titleCompact]}>TOSS{`\n`}THE{`\n`}TURKEYS</Text>
        <Text style={s.tag}>Risk it. Bank it. <Text style={s.tagStrong}>Don't get plucked.</Text></Text>
      </View>
      <View style={[s.hero, compact && s.heroCompact]}>
        <View style={s.sunOuter} /><View style={s.sun} />
        <Turkey position="wattle_wobble" size={compact ? 220 : 255} />
        <View style={s.badge}><Text style={s.badgeText}>READY TO RISK IT?</Text></View>
      </View>
      <View style={s.actions}>
        {hasGame?<View style={s.gameChoices}><GameButton style={s.choiceButton} title="CONTINUE" onPress={() => router.push('/game/play')} /><GameButton style={s.choiceButton} variant="secondary" title="NEW GAME" onPress={() => router.push('/game/setup')} /></View>:<GameButton title="PLAY" onPress={() => router.push('/game/setup')} />}
        <Text style={s.tabHint}>Rules, trophies and settings are always one tap away below.</Text>
      </View>
    </Screen>
  );
}

const s = StyleSheet.create({
  wrap: { justifyContent: 'space-between', gap: 8, paddingBottom: 12 }, brand: { alignItems: 'center' },
  kicker: { fontFamily: 'Nunito_800ExtraBold', fontSize: 9, letterSpacing: 1.45, color: C.red, textAlign: 'center' },
  title: { fontFamily: 'Baloo2_800ExtraBold', fontSize: 57, lineHeight: 64, color: C.brown, textAlign: 'center', marginTop: 8, paddingTop: 5, textShadowColor: '#F3B850', textShadowOffset: { width: 4, height: 5 }, textShadowRadius: 0 },
  titleCompact: { fontSize: 49, lineHeight: 55 }, tag: { fontFamily: 'Nunito_700Bold', fontSize: 14, color: C.muted, textAlign: 'center', marginTop: 4 }, tagStrong: { color: C.brown },
  hero: { height: 275, alignItems: 'center', justifyContent: 'center' }, heroCompact: { height: 215 },
  sunOuter: { position: 'absolute', width: 236, height: 236, borderRadius: 118, borderWidth: 1, borderColor: 'rgba(185,45,43,.13)' }, sun: { position: 'absolute', width: 215, height: 215, borderRadius: 108, backgroundColor: '#F7CC6C' },
  badge: { position: 'absolute', right: 2, bottom: 23, backgroundColor: C.brown, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 6, transform: [{ rotate: '4deg' }] }, badgeText: { fontFamily: 'Nunito_800ExtraBold', fontSize: 8, letterSpacing: 1, color: C.gold },
  actions: { gap: 8 }, gameChoices:{flexDirection:'row',gap:8},choiceButton:{flex:1,minHeight:50,paddingHorizontal:8},tabHint: { fontFamily: 'Nunito_700Bold', fontSize: 10, lineHeight: 15, color: C.muted, textAlign: 'center', paddingHorizontal: 25 },
});

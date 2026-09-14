import { useEffect } from 'react';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Screen } from '@/components/Screen';
import { GameButton } from '@/components/GameButton';
import { Turkey } from '@/components/Turkey';
import { C } from '@/constants/colours';
import { TURKEY_POSITIONS } from '@/constants/turkeyPositions';
import { useGameStore } from '@/store/gameStore';
import { useSettingsStore } from '@/store/settingsStore';
import { TurkeyPosition } from '@/types/turkey';
import { useGameAudio } from '@/components/AudioProvider';

function TossingTurkey({ side, position, tossing, size }: { side: 1 | -1; position: TurkeyPosition; tossing: boolean; size: number }) {
  const y = useSharedValue(0), rotation = useSharedValue(0), x = useSharedValue(0), scale = useSharedValue(1);
  useEffect(() => {
    if (!tossing) return;
    y.value = withSequence(withTiming(-82, { duration: 400, easing: Easing.out(Easing.quad) }), withTiming(0, { duration: 690, easing: Easing.bounce }));
    rotation.value = withSequence(withTiming(side * 420, { duration: 720 }), withTiming(side * 360, { duration: 370 }));
    x.value = withSequence(withTiming(side * 18, { duration: 400 }), withTiming(0, { duration: 690 }));
    scale.value = withSequence(withTiming(1.08, { duration: 400 }), withTiming(1, { duration: 690 }));
  }, [side, tossing, x, y, rotation, scale]);
  const style = useAnimatedStyle(() => ({ transform: [{ translateY: y.value }, { translateX: x.value }, { rotate: `${rotation.value}deg` }, { scale: scale.value }] }));
  return <Animated.View style={style}><Turkey position={position} size={size} /></Animated.View>;
}

export default function Play() {
  const game = useGameStore();
  const settings = useSettingsStore();
  const { play: playAudio } = useGameAudio();
  const { height, width } = useWindowDimensions();
  const current = game.players[game.currentPlayerIndex];
  const result = game.lastToss;
  const compact = height < 760;
  const turkeySize = Math.min(compact ? 136 : 154, width * 0.39);

  useEffect(() => { if (game.status === 'finished') router.replace('/game/winner'); }, [game.status]);

  const toss = () => {
    playAudio('toss');
    if (settings.haptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    game.beginToss();
    setTimeout(() => {
      game.resolveToss();
      const landed = useGameStore.getState().lastToss;
      if (landed) playAudio(landed.isPlucked ? 'plucked' : landed.isThanksgiving ? 'thanksgiving' : 'land');
      if (!settings.haptics || !landed) return;
      if (landed.isPlucked) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      else if (landed.isThanksgiving) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      else if (landed.points >= 10) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }, settings.animations ? 1150 : 120);
  };

  const bank = () => { playAudio('bank'); game.bank(); };

  return (
    <Screen scroll={false} style={s.screen}>
      <View style={s.headerRow}>
        <Pressable onPress={() => router.replace('/')} hitSlop={12} style={s.close}><Text style={s.closeText}>×</Text></Pressable>
        <View style={s.heading}><Text style={s.eyebrow}>FIRST TO {game.targetScore}</Text><Text style={s.turn}>{current.name.toUpperCase()}'S TURN</Text></View>
        <View style={s.turnBadge}><Text style={s.turnBadgeText}>#{game.totalTurns + 1}</Text></View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.scores}>
        {game.players.map((player, index) => <View key={player.id} style={[s.scoreChip, index === game.currentPlayerIndex && s.activeChip]}><Text style={[s.chipName, index === game.currentPlayerIndex && s.activeText]} numberOfLines={1}>{player.name}</Text><Text style={[s.chipScore, index === game.currentPlayerIndex && s.activeText]}>{player.score}</Text></View>)}
      </ScrollView>

      <View style={s.counters}>
        <View style={s.counterHalf}><Text style={s.counterLabel}>SAFE IN THE BANK</Text><Text style={s.counter}>{current.score}</Text></View>
        <View style={s.divider} />
        <View style={s.counterHalf}><Text style={s.counterLabel}>AT RISK</Text><Text style={[s.counter, s.risk]}>{game.turnScore}</Text></View>
      </View>

      <View style={[s.arena, compact && s.arenaCompact]}>
        <View style={s.arenaHalo} /><View style={s.table} /><View style={s.tableEdge} />
        <View style={s.turkeys}>
          <TossingTurkey side={-1} tossing={game.status === 'animating'} position={result?.turkeyA ?? 'gobbler'} size={turkeySize} />
          <TossingTurkey side={1} tossing={game.status === 'animating'} position={result?.turkeyB ?? 'turkey_trot'} size={turkeySize} />
        </View>
        <View style={[s.resultCard, result?.isPlucked && s.resultDanger, result?.isThanksgiving && s.resultGold]}>
          {game.status === 'animating' ? <><Text style={s.flying}>FLYING FOWL</Text><Text style={s.resultHint}>Hold onto your feathers…</Text></> : result ? <><Text style={[s.resultTitle, result.isPlucked && s.lightText]}>{result.title}</Text><Text style={[s.names, result.isPlucked && s.lightMuted]}>{TURKEY_POSITIONS[result.turkeyA].name}  +  {TURKEY_POSITIONS[result.turkeyB].name}</Text><Text style={[s.points, result.isPlucked && s.lightText]}>{result.isPlucked ? 'TURN SCORE LOST' : `+${result.points}`}</Text></> : <><Text style={s.ready}>READY TO TOSS?</Text><Text style={s.resultHint}>Land points. Bank before you're plucked.</Text></>}
        </View>
        {result?.isThanksgiving && <Text style={s.confetti}>✨  🪶  🎉  🪶  ✨</Text>}
      </View>

      <View style={s.actions}>
        <GameButton title={game.status === 'animating' ? 'TOSSING…' : 'TOSS THE TURKEYS'} onPress={toss} disabled={game.status === 'animating'} />
        <GameButton title={game.turnScore ? `BANK ${game.turnScore} POINTS` : 'BANK POINTS'} variant="secondary" onPress={bank} disabled={!game.turnScore || game.status === 'animating'} />
      </View>
    </Screen>
  );
}

const s = StyleSheet.create({
  screen: { gap: 10 }, headerRow: { flexDirection: 'row', alignItems: 'center', minHeight: 54 }, heading: { flex: 1, alignItems: 'center' },
  close: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(91,45,29,.08)', alignItems: 'center', justifyContent: 'center' }, closeText: { fontFamily: 'Nunito_400Regular', fontSize: 31, lineHeight: 33, color: C.brown },
  turnBadge: { width: 38, height: 38, borderRadius: 19, backgroundColor: C.brown, alignItems: 'center', justifyContent: 'center' }, turnBadgeText: { fontFamily: 'Nunito_800ExtraBold', fontSize: 11, color: C.gold },
  eyebrow: { fontFamily: 'Nunito_800ExtraBold', fontSize: 9, letterSpacing: 2, color: C.muted }, turn: { fontFamily: 'Baloo2_800ExtraBold', fontSize: 27, lineHeight: 31, color: C.ink },
  scores: { gap: 7, paddingVertical: 2, paddingHorizontal: 1 }, scoreChip: { minWidth: 82, paddingVertical: 6, paddingHorizontal: 11, borderRadius: 14, backgroundColor: 'rgba(255,255,255,.7)', borderWidth: 1.5, borderColor: C.line, alignItems: 'center' }, activeChip: { backgroundColor: C.brown, borderColor: C.brown }, chipName: { fontFamily: 'Nunito_700Bold', fontSize: 11, color: C.muted, maxWidth: 76 }, chipScore: { fontFamily: 'Baloo2_700Bold', fontSize: 20, lineHeight: 23, color: C.ink }, activeText: { color: C.white },
  counters: { flexDirection: 'row', alignItems: 'center', minHeight: 72, backgroundColor: 'rgba(255,255,255,.88)', borderRadius: 20, paddingVertical: 5, borderWidth: 1.5, borderColor: C.line, shadowColor: C.brown, shadowOpacity: .07, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } }, counterHalf: { flex: 1, alignItems: 'center', justifyContent: 'center' }, counterLabel: { fontFamily: 'Nunito_800ExtraBold', fontSize: 9, lineHeight: 14, letterSpacing: 1.2, color: C.muted }, counter: { fontFamily: 'Baloo2_800ExtraBold', fontSize: 34, lineHeight: 46, paddingTop: 5, marginTop: -3, color: C.brown }, risk: { color: C.red }, divider: { height: 44, width: 1, backgroundColor: C.line },
  arena: { flex: 1, minHeight: 320, borderRadius: 28, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,250,238,.55)', borderWidth: 1, borderColor: 'rgba(230,205,168,.65)' }, arenaCompact: { minHeight: 278 }, arenaHalo: { position: 'absolute', top: 20, width: 230, height: 230, borderRadius: 115, backgroundColor: 'rgba(247,204,108,.25)' },
  table: { position: 'absolute', width: '116%', height: 76, bottom: 58, borderRadius: 100, backgroundColor: '#D99655', transform: [{ scaleY: .42 }] }, tableEdge: { position: 'absolute', width: '116%', height: 12, bottom: 81, backgroundColor: '#B96D36', opacity: .72 },
  turkeys: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: -36 },
  resultCard: { position: 'absolute', bottom: 12, minWidth: '78%', alignItems: 'center', backgroundColor: C.white, borderRadius: 17, paddingHorizontal: 18, paddingVertical: 8, borderWidth: 1.5, borderColor: C.line }, resultDanger: { backgroundColor: C.red, borderColor: C.redDark }, resultGold: { backgroundColor: '#FFF1B7', borderColor: C.orange },
  resultTitle: { fontFamily: 'Baloo2_800ExtraBold', fontSize: 21, lineHeight: 30, paddingTop: 3, color: C.brown }, names: { fontFamily: 'Nunito_700Bold', fontSize: 10, color: C.muted }, points: { fontFamily: 'Baloo2_800ExtraBold', fontSize: 26, lineHeight: 35, paddingTop: 2, color: C.green }, lightText: { color: C.white }, lightMuted: { color: '#FFE6D8' },
  ready: { fontFamily: 'Baloo2_800ExtraBold', fontSize: 20, color: C.brown }, resultHint: { fontFamily: 'Nunito_700Bold', fontSize: 10, color: C.muted }, flying: { fontFamily: 'Baloo2_800ExtraBold', fontSize: 20, color: C.red, letterSpacing: 1.5 }, confetti: { position: 'absolute', top: 12, fontSize: 21, letterSpacing: 4 },
  actions: { gap: 8 },
});

import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { ScreenTitle } from '@/components/ScreenTitle';
import { Turkey } from '@/components/Turkey';
import { C } from '@/constants/colours';
import { TURKEY_POSITION_LIST } from '@/constants/turkeyPositions';

const steps = [
  ['1', 'TOSS', 'Toss two turkeys. Each lands independently.'],
  ['2', 'RISK IT', 'Keep tossing to build your score for the turn.'],
  ['3', 'BANK IT', 'Lock in the points before you get plucked.'],
];

export default function How() {
  return (
    <Screen>
      <ScreenTitle title="HOW TO PLAY" subtitle="Risk it, bank it, and know when to stop." />
      <View style={s.hero}>
        <View style={s.heroCopy}><Text style={s.heroEyebrow}>THE AIM</Text><Text style={s.heroTitle}>FIRST TO THE{`\n`}TARGET WINS.</Text><Text style={s.heroText}>Only banked points count.</Text></View>
        <View style={s.heroArt}><View style={s.heroSun} /><Turkey position="turkey_trot" size={154} /></View>
      </View>

      <View style={s.stepCard}>
        {steps.map(([number, title, copy], index) => <View style={[s.step, index < steps.length - 1 && s.stepBorder]} key={number}><Text style={s.number}>{number}</Text><View style={s.stepCopy}><Text style={s.stepTitle}>{title}</Text><Text style={s.copy}>{copy}</Text></View></View>)}
      </View>

      <View style={s.sectionHeading}><Text style={s.section}>THE SIX LANDINGS</Text><Text style={s.sectionHint}>BASE VALUE</Text></View>
      <View style={s.grid}>
        {TURKEY_POSITION_LIST.map(position => <View key={position.id} style={s.pos}><View style={s.posArt}><Turkey position={position.id} size={86} /></View><Text style={s.posName}>{position.name}</Text><View style={[s.pointsBadge, position.basePoints >= 10 && s.pointsBadgeRare]}><Text style={s.posPoints}>{position.basePoints} PTS</Text></View></View>)}
      </View>

      <View style={s.plucked}>
        <View style={s.warningBadge}><Text style={s.warningMark}>!</Text></View>
        <View style={s.pluckedCopyWrap}><Text style={s.pluckedTitle}>PRONE + BEAKY = PLUCKED IT!</Text><Text style={s.pluckedCopy}>Your unbanked turn score is lost. Everything already banked stays safe.</Text></View>
      </View>
      <View style={s.tip}><Text style={s.tipLabel}>DOUBLE UP</Text><Text style={s.note}>Matching scoring positions earn 4× their base value. Double Wattle Wobble scores 60 and triggers <Text style={s.noteStrong}>Thanksgiving!</Text></Text></View>
    </Screen>
  );
}

const s = StyleSheet.create({
  hero: { minHeight: 205, flexDirection: 'row', alignItems: 'center', backgroundColor: C.brown, borderRadius: 25, overflow: 'hidden', marginBottom: 16 },
  heroCopy: { width: '54%', paddingLeft: 20, zIndex: 2 }, heroEyebrow: { fontFamily: 'Nunito_800ExtraBold', fontSize: 9, letterSpacing: 2, color: '#E7B780', marginBottom: 6 }, heroTitle: { fontFamily: 'Baloo2_800ExtraBold', fontSize: 24, lineHeight: 30, paddingTop: 3, color: C.gold }, heroText: { fontFamily: 'Nunito_700Bold', fontSize: 12, color: C.parchment, marginTop: 7 },
  heroArt: { width: '46%', height: 205, justifyContent: 'center', alignItems: 'center' }, heroSun: { position: 'absolute', width: 145, height: 145, borderRadius: 73, backgroundColor: 'rgba(255,196,71,.18)' },
  stepCard: { backgroundColor: 'rgba(255,255,255,.75)', borderWidth: 1.5, borderColor: C.line, borderRadius: 21, paddingHorizontal: 15, marginBottom: 22 }, step: { flexDirection: 'row', gap: 13, alignItems: 'center', minHeight: 76 }, stepBorder: { borderBottomWidth: 1, borderBottomColor: C.line }, number: { width: 39, height: 39, borderRadius: 20, textAlign: 'center', lineHeight: 39, backgroundColor: C.orange, color: C.white, fontFamily: 'Baloo2_800ExtraBold', fontSize: 22 }, stepCopy: { flex: 1 }, stepTitle: { fontFamily: 'Baloo2_800ExtraBold', fontSize: 18, lineHeight: 20, color: C.ink }, copy: { fontFamily: 'Nunito_400Regular', fontSize: 12, lineHeight: 17, color: C.muted },
  sectionHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }, section: { fontFamily: 'Nunito_800ExtraBold', fontSize: 12, letterSpacing: 1.5, color: C.brown }, sectionHint: { fontFamily: 'Nunito_800ExtraBold', fontSize: 8, letterSpacing: 1, color: C.muted },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, pos: { width: '31.7%', backgroundColor: 'rgba(255,255,255,.86)', borderRadius: 17, alignItems: 'center', paddingBottom: 10, borderWidth: 1.5, borderColor: C.line }, posArt: { width: '100%', height: 88, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF5DF', borderTopLeftRadius: 15, borderTopRightRadius: 15 }, posName: { fontFamily: 'Nunito_800ExtraBold', fontSize: 9, color: C.ink, textAlign: 'center', marginTop: 6, minHeight: 13 }, pointsBadge: { marginTop: 4, paddingHorizontal: 7, paddingVertical: 2, borderRadius: 7, backgroundColor: '#FCE2D2' }, pointsBadgeRare: { backgroundColor: '#FFF0B9' }, posPoints: { fontFamily: 'Nunito_800ExtraBold', fontSize: 8, color: C.red },
  plucked: { flexDirection: 'row', alignItems: 'center', gap: 13, backgroundColor: C.red, borderRadius: 20, padding: 15, marginTop: 17, borderBottomWidth: 4, borderBottomColor: C.redDark }, warningBadge: { width: 42, height: 42, borderRadius: 21, backgroundColor: C.white, alignItems: 'center', justifyContent: 'center' }, warningMark: { fontFamily: 'Baloo2_800ExtraBold', fontSize: 28, lineHeight: 38, color: C.red }, pluckedCopyWrap: { flex: 1 }, pluckedTitle: { fontFamily: 'Baloo2_800ExtraBold', fontSize: 17, lineHeight: 24, paddingTop: 2, color: C.white }, pluckedCopy: { fontFamily: 'Nunito_700Bold', fontSize: 11, lineHeight: 16, color: '#FFE3D1' },
  tip: { backgroundColor: 'rgba(255,255,255,.5)', borderRadius: 16, padding: 14, marginTop: 12 }, tipLabel: { fontFamily: 'Nunito_800ExtraBold', fontSize: 9, letterSpacing: 1.5, color: C.orange }, note: { fontFamily: 'Nunito_700Bold', fontSize: 12, lineHeight: 18, color: C.brown, marginTop: 3 }, noteStrong: { color: C.red },
});

import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { ScreenTitle } from '@/components/ScreenTitle';
import { Turkey } from '@/components/Turkey';
import { C } from '@/constants/colours';
import { TURKEY_POSITION_LIST } from '@/constants/turkeyPositions';

export default function Turkeydex() {
  return <Screen><ScreenTitle title="TURKEYDEX" subtitle="Every landing, rarity, and scoring secret." />
    {TURKEY_POSITION_LIST.map(position => <View key={position.id} style={s.card}><View style={s.art}><Turkey position={position.id} size={108} /></View><View style={s.copy}><Text style={s.name}>{position.name.toUpperCase()}</Text><Text style={[s.rarity, s[position.rarity]]}>{position.rarity.toUpperCase()}</Text><Text style={s.points}>{position.basePoints} POINTS</Text><Text style={s.description}>{position.description}</Text>{position.basePoints > 0 && <Text style={s.double}>DOUBLE · {position.basePoints * 4} POINTS{position.id === 'wattle_wobble' ? ' · THANKSGIVING!' : ''}</Text>}</View></View>)}
    <View style={s.warning}><Text style={s.warningTitle}>PLUCKED IT!</Text><Text style={s.warningCopy}>Prone Poultry + Beaky One ends your turn and wipes its unbanked points.</Text></View>
  </Screen>;
}

const s = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,.9)', borderRadius: 20, borderWidth: 1.5, borderColor: C.line, marginBottom: 12, padding: 10 },
  art: { width: 116, height: 116, backgroundColor: '#FFF3D6', borderRadius: 16, alignItems: 'center', justifyContent: 'center' }, copy: { flex: 1, paddingLeft: 14 },
  name: { fontFamily: 'Baloo2_800ExtraBold', fontSize: 18, lineHeight: 26, paddingTop: 2, color: C.ink }, rarity: { alignSelf: 'flex-start', fontFamily: 'Nunito_800ExtraBold', fontSize: 8, letterSpacing: 1, paddingHorizontal: 7, paddingVertical: 3, borderRadius: 7, overflow: 'hidden' },
  common: { backgroundColor: '#E4E0D9', color: C.muted }, uncommon: { backgroundColor: '#DCEAD7', color: C.green }, rare: { backgroundColor: '#DCE7F8', color: '#315A8A' }, legendary: { backgroundColor: '#FFF0BB', color: '#9A6000' },
  points: { fontFamily: 'Nunito_800ExtraBold', fontSize: 12, color: C.red, marginTop: 7 }, description: { fontFamily: 'Nunito_400Regular', fontSize: 12, color: C.muted, marginTop: 2 }, double: { fontFamily: 'Nunito_800ExtraBold', fontSize: 9, color: C.brown, marginTop: 7 },
  warning: { backgroundColor: C.red, borderRadius: 20, padding: 18, marginTop: 4, borderBottomWidth: 4, borderBottomColor: C.redDark }, warningTitle: { fontFamily: 'Baloo2_800ExtraBold', fontSize: 25, lineHeight: 34, paddingTop: 2, color: C.white }, warningCopy: { fontFamily: 'Nunito_700Bold', fontSize: 13, lineHeight: 18, color: '#FFE7D4' },
});

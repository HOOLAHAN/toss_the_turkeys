import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { C } from '@/constants/colours';

export function Header({ title }: { title: string }) {
  return <View style={s.row}><Pressable accessibilityLabel="Go back" onPress={() => router.back()} hitSlop={12} style={s.back}><Text style={s.chevron}>‹</Text></Pressable><Text style={s.title}>{title}</Text><View style={s.spacer} /></View>;
}

const s = StyleSheet.create({
  row: { minHeight: 56, flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  back: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(91,45,29,.08)' },
  chevron: { fontSize: 39, lineHeight: 40, color: C.brown, marginTop: -3 },
  title: { flex: 1, textAlign: 'center', fontFamily: 'Baloo2_800ExtraBold', fontSize: 27, lineHeight: 32, color: C.ink },
  spacer: { width: 40 },
});

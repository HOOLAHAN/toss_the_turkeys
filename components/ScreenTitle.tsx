import { StyleSheet, Text, View } from 'react-native';
import { C } from '@/constants/colours';

export function ScreenTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return <View style={s.wrap}><Text style={s.title}>{title}</Text>{subtitle ? <Text style={s.subtitle}>{subtitle}</Text> : null}</View>;
}

const s = StyleSheet.create({
  wrap: { marginTop: 8, marginBottom: 18 },
  title: { fontFamily: 'Baloo2_800ExtraBold', fontSize: 31, lineHeight: 42, paddingTop: 3, color: C.ink, textAlign: 'center' },
  subtitle: { fontFamily: 'Nunito_400Regular', fontSize: 14, lineHeight: 20, color: C.muted, textAlign: 'center', marginTop: 1 },
});

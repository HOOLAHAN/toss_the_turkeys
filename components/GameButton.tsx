import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { C } from '@/constants/colours';

export function GameButton({ title, onPress, variant = 'primary', disabled = false, style }: { title: string; onPress: () => void; variant?: 'primary' | 'secondary' | 'ghost'; disabled?: boolean; style?: ViewStyle }) {
  return <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress} style={({ pressed }) => [s.button, s[variant], pressed && s.pressed, disabled && s.disabled, style]}><Text style={[s.text, variant === 'ghost' && s.ghostText]}>{title}</Text></Pressable>;
}

const s = StyleSheet.create({
  button: { minHeight: 56, borderRadius: 18, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, borderWidth: 2, borderBottomWidth: 5 },
  primary: { backgroundColor: C.red, borderColor: C.redDark, shadowColor: C.redDark, shadowOpacity: 0.18, shadowRadius: 10, shadowOffset: { width: 0, height: 6 } },
  secondary: { backgroundColor: C.orange, borderColor: '#B86013' },
  ghost: { backgroundColor: 'rgba(255,255,255,.34)', borderColor: C.brown },
  pressed: { transform: [{ translateY: 3 }], borderBottomWidth: 2 },
  disabled: { opacity: 0.38 },
  text: { fontFamily: 'Baloo2_700Bold', fontSize: 18, color: C.white, letterSpacing: 1.2 },
  ghostText: { color: C.brown },
});

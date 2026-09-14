import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ColorValue } from 'react-native';
import { C } from '@/constants/colours';
import { TurkeyTrackIcon } from '@/components/TurkeyTrackIcon';

const icon = (outline: keyof typeof Ionicons.glyphMap, filled: keyof typeof Ionicons.glyphMap) => ({ color, size, focused }: { color: ColorValue; size: number; focused: boolean }) => <Ionicons name={focused ? filled : outline} size={size} color={color} />;

export default function TabLayout() {
  return <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: C.red, tabBarInactiveTintColor: C.muted, tabBarStyle: { position: 'absolute', left: 20, right: 20, bottom: 8, height: 62, paddingTop: 5, paddingBottom: 5, backgroundColor: '#FFF9EC', borderColor: C.line, borderWidth: 1.5, borderTopWidth: 1.5, borderRadius: 31, shadowColor: C.brown, shadowOpacity: .13, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } }, tabBarItemStyle: { borderRadius: 23 }, tabBarLabelStyle: { fontFamily: 'Nunito_800ExtraBold', fontSize: 8, letterSpacing: .2 } }}>
    <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color, size }) => <TurkeyTrackIcon color={String(color)} size={size} /> }} />
    <Tabs.Screen name="how-to-play" options={{ title: 'How to Play', tabBarIcon: icon('trail-sign-outline', 'trail-sign') }} />
    <Tabs.Screen name="turkeydex" options={{ title: 'Turkeydex', tabBarIcon: icon('library-outline', 'library') }} />
    <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: icon('options-outline', 'options') }} />
  </Tabs>;
}

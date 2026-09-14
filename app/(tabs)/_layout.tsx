import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ColorValue } from 'react-native';
import { C } from '@/constants/colours';

const icon = (outline: keyof typeof Ionicons.glyphMap, filled: keyof typeof Ionicons.glyphMap) => ({ color, size, focused }: { color: ColorValue; size: number; focused: boolean }) => <Ionicons name={focused ? filled : outline} size={size} color={color} />;

export default function TabLayout() {
  return <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: C.red, tabBarInactiveTintColor: C.muted, tabBarStyle: { position: 'absolute', left: 14, right: 14, bottom: 8, height: 68, paddingTop: 7, paddingBottom: 7, backgroundColor: '#FFF9EC', borderColor: C.line, borderWidth: 1.5, borderTopWidth: 1.5, borderRadius: 34, shadowColor: C.brown, shadowOpacity: .13, shadowRadius: 12, shadowOffset: { width: 0, height: 5 } }, tabBarItemStyle: { borderRadius: 25 }, tabBarLabelStyle: { fontFamily: 'Nunito_800ExtraBold', fontSize: 9, letterSpacing: .25 } }}>
    <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: icon('paw-outline', 'paw') }} />
    <Tabs.Screen name="how-to-play" options={{ title: 'How to Play', tabBarIcon: icon('trail-sign-outline', 'trail-sign') }} />
    <Tabs.Screen name="turkeydex" options={{ title: 'Turkeydex', tabBarIcon: icon('library-outline', 'library') }} />
    <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: icon('options-outline', 'options') }} />
  </Tabs>;
}

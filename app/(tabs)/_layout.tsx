import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ColorValue } from 'react-native';
import { C } from '@/constants/colours';

const icon = (outline: keyof typeof Ionicons.glyphMap, filled: keyof typeof Ionicons.glyphMap) => ({ color, size, focused }: { color: ColorValue; size: number; focused: boolean }) => <Ionicons name={focused ? filled : outline} size={size} color={color} />;

export default function TabLayout() {
  return <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: C.red, tabBarInactiveTintColor: C.muted, tabBarStyle: { height: 82, paddingTop: 8, paddingBottom: 10, backgroundColor: '#FFF9EC', borderTopColor: C.line, borderTopWidth: 1 }, tabBarLabelStyle: { fontFamily: 'Nunito_800ExtraBold', fontSize: 10, letterSpacing: .35 } }}>
    <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: icon('home-outline', 'home') }} />
    <Tabs.Screen name="how-to-play" options={{ title: 'How to Play', tabBarIcon: icon('help-circle-outline', 'help-circle') }} />
    <Tabs.Screen name="turkeydex" options={{ title: 'Turkeydex', tabBarIcon: icon('book-outline', 'book') }} />
    <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: icon('settings-outline', 'settings') }} />
  </Tabs>;
}

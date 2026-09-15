import { Tabs } from 'expo-router';
import { BottomNavBar } from '@/components/BottomNavBar';

export default function TabLayout() {
  return <Tabs tabBar={()=><BottomNavBar/>} screenOptions={{ headerShown: false }}>
    <Tabs.Screen name="index" options={{ title: 'Home' }} />
    <Tabs.Screen name="how-to-play" options={{ title: 'How to Play' }} />
    <Tabs.Screen name="trophy-coop" options={{ title: 'Trophy Coop' }} />
    <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
  </Tabs>;
}

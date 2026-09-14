import { StyleSheet, View } from 'react-native';

export function TurkeyTrackIcon({ color, size = 24 }: { color: string; size?: number }) {
  const scale = size / 24;
  return <View style={{ width: size, height: size }}><View style={[s.foot, { backgroundColor: color, transform: [{ scale }] }]}><View style={[s.toe, s.left, { backgroundColor: color }]} /><View style={[s.toe, s.middle, { backgroundColor: color }]} /><View style={[s.toe, s.right, { backgroundColor: color }]} /><View style={[s.heel, { backgroundColor: color }]} /></View></View>;
}

const s = StyleSheet.create({ foot: { position: 'absolute', width: 24, height: 24, transformOrigin: 'top left' }, toe: { position: 'absolute', width: 4, height: 13, borderRadius: 3, top: 1 }, left: { left: 5, transform: [{ rotate: '-42deg' }] }, middle: { left: 10, top: 0 }, right: { right: 5, transform: [{ rotate: '42deg' }] }, heel: { position: 'absolute', width: 8, height: 8, borderRadius: 5, left: 8, bottom: 3 } });

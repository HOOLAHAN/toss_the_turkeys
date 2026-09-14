import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { TurkeyPosition } from '@/types/turkey';

export const TURKEY_ASSETS: Record<TurkeyPosition, number> = {
  prone_poultry: require('../assets/turkeys/prone-poultry.png'), beaky_one: require('../assets/turkeys/beaky-one.png'), gobbler: require('../assets/turkeys/gobbler.png'), turkey_trot: require('../assets/turkeys/turkey-trot.png'), jiblets: require('../assets/turkeys/jiblets.png'), wattle_wobble: require('../assets/turkeys/wattle-wobble.png'),
};
export function Turkey({ position, size = 150 }: { position: TurkeyPosition; size?: number; animated?: boolean }) {
  return <Image source={TURKEY_ASSETS[position]} contentFit="contain" cachePolicy="memory-disk" transition={120} style={[s.image, { width: size, height: size }]} />;
}
const s = StyleSheet.create({ image: { alignSelf: 'center' } });

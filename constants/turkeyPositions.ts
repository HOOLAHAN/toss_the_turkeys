import { TurkeyPosition, TurkeyPositionConfig } from '@/types/turkey';
export const TURKEY_POSITIONS:Record<TurkeyPosition,TurkeyPositionConfig>={
 prone_poultry:{id:'prone_poultry',name:'Prone Poultry',probability:.349,basePoints:0,rarity:'common',description:'Flat out. Literally.'},
 beaky_one:{id:'beaky_one',name:'Beaky One',probability:.302,basePoints:0,rarity:'common',description:'A bold landing with a point.'},
 gobbler:{id:'gobbler',name:'Gobbler',probability:.224,basePoints:5,rarity:'uncommon',description:'Chest out. Volume up.'},
 turkey_trot:{id:'turkey_trot',name:'Turkey Trot',probability:.088,basePoints:5,rarity:'uncommon',description:'Quick feet, tidy points.'},
 jiblets:{id:'jiblets',name:'Jiblets',probability:.03,basePoints:10,rarity:'rare',description:'Upside down. Points up.'},
 wattle_wobble:{id:'wattle_wobble',name:'Wattle Wobble',probability:.006,basePoints:15,rarity:'legendary',description:'A balancing act few turkeys live to tell about.'}
};
export const TURKEY_POSITION_LIST=Object.values(TURKEY_POSITIONS);

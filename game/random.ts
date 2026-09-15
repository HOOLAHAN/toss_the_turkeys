import { TURKEY_POSITION_LIST } from '@/constants/turkeyPositions';
import { TurkeyPosition, TurkeyToss } from '@/types/turkey';
const total=TURKEY_POSITION_LIST.reduce((sum,p)=>sum+p.probability,0);
export function generateTurkeyPosition(randomValue:number=Math.random()):TurkeyPosition { const value=Math.max(0,Math.min(.999999999,randomValue))*total; let cumulative=0; for(const p of TURKEY_POSITION_LIST){ cumulative+=p.probability; if(value<cumulative)return p.id; } return TURKEY_POSITION_LIST.at(-1)!.id; }
export function generateTurkeyToss(rng:()=>number=Math.random):TurkeyToss { return {turkeyA:generateTurkeyPosition(rng()),turkeyB:generateTurkeyPosition(rng())}; }
export const FOWL_PLAY_CHANCE=.02;
export const FOWL_PLAY_OPENING_GRACE=4;
export const FOWL_PLAY_COOLDOWN=12;
export function shouldTriggerFowlPlay(totalTosses:number,lastFowlPlayToss:number|null|undefined,rng:()=>number=Math.random){if(totalTosses<FOWL_PLAY_OPENING_GRACE)return false;if(lastFowlPlayToss!=null&&totalTosses-lastFowlPlayToss<FOWL_PLAY_COOLDOWN)return false;return rng()<FOWL_PLAY_CHANCE;}

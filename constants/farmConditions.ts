import { TossScoreResult } from '@/types/turkey';

export type FarmConditionId='clear'|'windy'|'muddy'|'harvest'|'golden'|'fox';
export interface FarmCondition { id:FarmConditionId; name:string; icon:string; description:string; tint:string; wind:number; bounce:number }

export const FARM_CONDITIONS:FarmCondition[]=[
  {id:'clear',name:'Clear Skies',icon:'☀️',description:'Classic rules and a perfect tossing day.',tint:'#F7CC6C',wind:0,bounce:.48},
  {id:'windy',name:'Crosswind',icon:'🌬️',description:'A barnyard breeze pushes every flight.',tint:'#B9D9D3',wind:105,bounce:.48},
  {id:'muddy',name:'Muddy Meadow',icon:'🌧️',description:'Soft ground makes landings settle faster.',tint:'#BFA47A',wind:0,bounce:.3},
  {id:'harvest',name:'Harvest Festival',icon:'🌽',description:'Jiblets and Wattle Wobble earn +5 each.',tint:'#F4A640',wind:0,bounce:.48},
  {id:'golden',name:'Golden Hour',icon:'✨',description:'Every scoring landing earns +2.',tint:'#F6C85F',wind:0,bounce:.52},
  {id:'fox',name:'Fox Alert',icon:'🦊',description:'Risky ground: scoring tosses earn +5.',tint:'#D8733D',wind:35,bounce:.56},
];

export function farmConditionForTurn(totalTurns:number,playerCount:number,enabled=true){if(!enabled)return FARM_CONDITIONS[0];const round=Math.floor(totalTurns/Math.max(1,playerCount));return FARM_CONDITIONS[round%FARM_CONDITIONS.length];}
export function applyFarmCondition(result:TossScoreResult,condition:FarmCondition){if(result.isPlucked)return result;if(condition.id==='harvest'){const bonus=[result.turkeyA,result.turkeyB].filter(p=>p==='jiblets'||p==='wattle_wobble').length*5;return bonus?{...result,points:result.points+bonus}:result;}if(condition.id==='golden'&&result.points>0)return {...result,points:result.points+2};if(condition.id==='fox'&&result.points>0)return {...result,points:result.points+5};return result;}

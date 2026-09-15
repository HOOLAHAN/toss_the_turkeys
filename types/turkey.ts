export type TurkeyPosition = 'prone_poultry'|'beaky_one'|'gobbler'|'turkey_trot'|'jiblets'|'wattle_wobble';
export type TurkeyRarity = 'common'|'uncommon'|'rare'|'legendary';
export interface TurkeyPositionConfig { id:TurkeyPosition; name:string; probability:number; basePoints:number; rarity:TurkeyRarity; description:string }
export interface TurkeyToss { turkeyA:TurkeyPosition; turkeyB:TurkeyPosition }
export interface TossScoreResult extends TurkeyToss { points:number; isPlucked:boolean; isFowlPlay:boolean; isDouble:boolean; isThanksgiving:boolean; title:string }

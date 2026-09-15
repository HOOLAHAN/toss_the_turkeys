import { describe,expect,it } from 'vitest';
import { applyFarmCondition, FARM_CONDITIONS, farmConditionForTurn } from './farmConditions';
import { calculateTossScore } from '@/game/scoring';

describe('farm conditions',()=>{
  it('rotates on every completed turn',()=>{expect(farmConditionForTurn(0,3).id).toBe('clear');expect(farmConditionForTurn(1,3).id).toBe('windy');expect(farmConditionForTurn(2,3).id).toBe('muddy');expect(farmConditionForTurn(6,3).id).toBe('clear')});
  it('can be disabled',()=>expect(farmConditionForTurn(99,3,false).id).toBe('clear'));
  it('adds harvest points only for rare landings',()=>{const harvest=FARM_CONDITIONS[3];expect(applyFarmCondition(calculateTossScore('jiblets','wattle_wobble'),harvest).points).toBe(35);expect(applyFarmCondition(calculateTossScore('gobbler','turkey_trot'),harvest).points).toBe(10)});
  it('applies golden hour and fox alert bonuses only to scoring tosses',()=>{const scoring=calculateTossScore('gobbler','turkey_trot'),plucked=calculateTossScore('prone_poultry','beaky_one');expect(applyFarmCondition(scoring,FARM_CONDITIONS[4]).points).toBe(scoring.points+2);expect(applyFarmCondition(scoring,FARM_CONDITIONS[5]).points).toBe(scoring.points+5);expect(applyFarmCondition(plucked,FARM_CONDITIONS[5]).points).toBe(0)});
});

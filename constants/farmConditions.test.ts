import { describe,expect,it } from 'vitest';
import { applyFarmCondition, FARM_CONDITIONS, farmConditionForTurn } from './farmConditions';
import { calculateTossScore } from '@/game/scoring';

describe('farm conditions',()=>{
  it('rotates after every complete player round',()=>{expect(farmConditionForTurn(0,3).id).toBe('clear');expect(farmConditionForTurn(2,3).id).toBe('clear');expect(farmConditionForTurn(3,3).id).toBe('windy');expect(farmConditionForTurn(12,3).id).toBe('clear')});
  it('can be disabled',()=>expect(farmConditionForTurn(99,3,false).id).toBe('clear'));
  it('adds harvest points only for rare landings',()=>{const harvest=FARM_CONDITIONS[3];expect(applyFarmCondition(calculateTossScore('jiblets','wattle_wobble'),harvest).points).toBe(35);expect(applyFarmCondition(calculateTossScore('gobbler','turkey_trot'),harvest).points).toBe(10)});
});

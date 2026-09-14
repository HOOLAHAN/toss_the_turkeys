import { expect,it } from 'vitest'; import { generateTurkeyPosition,generateTurkeyToss } from './random';
it('uses deterministic normalized probability boundaries',()=>{expect(generateTurkeyPosition(0)).toBe('prone_poultry');expect(generateTurkeyPosition(.35)).toBe('beaky_one');expect(generateTurkeyPosition(.999999)).toBe('wattle_wobble')});
it('calls the RNG independently for each turkey',()=>{const values=[0,.999999];expect(generateTurkeyToss(()=>values.shift()!)).toEqual({turkeyA:'prone_poultry',turkeyB:'wattle_wobble'})});

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand'; import { createJSONStorage, persist } from 'zustand/middleware';
interface SettingsState { music:boolean; sound:boolean; haptics:boolean; animations:boolean; farmConditions:boolean; toggle:(key:'music'|'sound'|'haptics'|'animations'|'farmConditions')=>void }
export const useSettingsStore=create<SettingsState>()(persist((set)=>({music:true,sound:true,haptics:true,animations:true,farmConditions:true,toggle:key=>set(s=>({...s,[key]:!s[key]}))}),{name:'turkey-settings',storage:createJSONStorage(()=>AsyncStorage)}));

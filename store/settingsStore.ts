import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand'; import { createJSONStorage, persist } from 'zustand/middleware';
interface SettingsState { sound:boolean; haptics:boolean; animations:boolean; toggle:(key:'sound'|'haptics'|'animations')=>void }
export const useSettingsStore=create<SettingsState>()(persist((set)=>({sound:true,haptics:true,animations:true,toggle:key=>set(s=>({...s,[key]:!s[key]}))}),{name:'turkey-settings',storage:createJSONStorage(()=>AsyncStorage)}));

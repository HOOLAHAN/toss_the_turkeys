import Ionicons from '@expo/vector-icons/Ionicons';
import { router, usePathname } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C } from '@/constants/colours';

function TurkeyMark({ active }: { active: boolean }) {
  const brown=active?C.red:C.muted;
  return <View style={s.mark}><View style={[s.tail,s.tailLeft,{borderColor:brown}]}/><View style={[s.tail,s.tailRight,{borderColor:brown}]}/><View style={[s.head,{backgroundColor:brown}]}><View style={s.eye}/><View style={s.beak}/><View style={s.wattle}/></View></View>;
}

const items=[
  {key:'home',label:'Home',path:'/' as const},
  {key:'rules',label:'How to Play',path:'/(tabs)/how-to-play' as const,icon:'trail-sign-outline' as const,activeIcon:'trail-sign' as const},
  {key:'dex',label:'Turkeydex',path:'/(tabs)/turkeydex' as const,icon:'library-outline' as const,activeIcon:'library' as const},
  {key:'settings',label:'Settings',path:'/(tabs)/settings' as const,icon:'options-outline' as const,activeIcon:'options' as const},
];

export function BottomNavBar({ embedded=false }: { embedded?: boolean }) {
  const path=usePathname(),insets=useSafeAreaInsets();
  const active=path.includes('how-to-play')?'rules':path.includes('turkeydex')?'dex':path.includes('settings')?'settings':path.includes('/game/')?'game':'home';
  return <View style={[s.safeDock,{height:70+insets.bottom,paddingBottom:embedded?8:8+insets.bottom},embedded&&{marginBottom:-insets.bottom}]}><View style={s.pill}>{items.map(item=>{const selected=active===item.key;return <Pressable key={item.key} accessibilityRole="tab" accessibilityState={{selected}} onPress={()=>router.replace(item.path)} style={[s.item,selected&&s.selected]}>{item.key==='home'?<TurkeyMark active={selected}/>:<Ionicons name={selected?item.activeIcon:item.icon} size={20} color={selected?C.red:C.muted}/>}<Text style={[s.label,selected&&s.activeLabel]}>{item.label}</Text></Pressable>})}</View></View>;
}

const s=StyleSheet.create({safeDock:{justifyContent:'flex-end',backgroundColor:'transparent'},pill:{height:62,marginHorizontal:20,borderWidth:1.5,borderColor:C.line,borderRadius:31,backgroundColor:'#FFF9EC',flexDirection:'row',alignItems:'center',paddingHorizontal:7,shadowColor:C.brown,shadowOpacity:.13,shadowRadius:10,shadowOffset:{width:0,height:4}},item:{flex:1,height:48,borderRadius:24,alignItems:'center',justifyContent:'center'},selected:{backgroundColor:'rgba(185,45,43,.07)'},label:{fontFamily:'Nunito_800ExtraBold',fontSize:8,color:C.muted,marginTop:1},activeLabel:{color:C.red},mark:{width:25,height:21,alignItems:'center'},head:{position:'absolute',width:14,height:15,borderRadius:8,left:6,top:2},eye:{position:'absolute',width:4,height:4,borderRadius:2,backgroundColor:C.white,right:2,top:3},beak:{position:'absolute',width:0,height:0,borderTopWidth:3,borderBottomWidth:3,borderLeftWidth:7,borderTopColor:'transparent',borderBottomColor:'transparent',borderLeftColor:C.orange,right:-6,top:6},wattle:{position:'absolute',width:4,height:7,borderRadius:3,backgroundColor:C.red,right:-1,bottom:-4},tail:{position:'absolute',width:12,height:13,borderWidth:2,borderRadius:8,top:4},tailLeft:{left:1,transform:[{rotate:'-28deg'}]},tailRight:{right:0,transform:[{rotate:'28deg'}]}});

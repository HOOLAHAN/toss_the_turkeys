import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { ScreenTitle } from '@/components/ScreenTitle';
import { Turkey } from '@/components/Turkey';
import { C } from '@/constants/colours';
import { useSettingsStore } from '@/store/settingsStore';
import { useStatisticsStore } from '@/store/statisticsStore';

const landingNames={pronePoultryCount:'Prone Poultry',beakyOneCount:'Beaky One',gobblerCount:'Gobbler',turkeyTrotCount:'Turkey Trot',jibletsCount:'Jiblets',wattleWobbleCount:'Wattle Wobble'} as const;

export default function Settings(){
  const settings=useSettingsStore(),stats=useStatisticsStore();
  const favourite=(Object.keys(landingNames) as (keyof typeof landingNames)[]).reduce((best,key)=>stats[key]>stats[best]?key:best,'gobblerCount');
  const pluckRate=stats.totalTosses?Math.round(stats.pluckedCount/stats.totalTosses*100):0;
  return <Screen>
    <ScreenTitle title="SETTINGS" subtitle="Make the coop feel just right."/>
    <View style={s.hero}><View style={s.heroCopy}><Text style={s.heroEyebrow}>YOUR COOP</Text><Text style={s.heroTitle}>PLAY IT YOUR WAY</Text><Text style={s.heroText}>Every switch is saved on this device.</Text></View><Turkey position="turkey_trot" size={104}/></View>
    <Text style={s.section}>GAME FEEL</Text>
    <View style={s.card}><Toggle icon="volume-high" label="Turkey sounds" detail="Gobbles, landings and celebrations" value={settings.sound} onPress={()=>settings.toggle('sound')}/><Toggle icon="phone-portrait" label="Haptic bumps" detail="Feel impacts and risky results" value={settings.haptics} onPress={()=>settings.toggle('haptics')}/><Toggle icon="sparkles" label="Full animation" detail="Physics, feathers and flapping" value={settings.animations} onPress={()=>settings.toggle('animations')} last/></View>
    <Text style={s.section}>LUCK REPORT</Text>
    <View style={s.report}><View><Text style={s.reportLabel}>FAVOURITE LANDING</Text><Text style={s.reportValue}>{stats.totalTosses?landingNames[favourite]:'No tosses yet'}</Text></View><View style={s.rate}><Text style={s.rateValue}>{pluckRate}%</Text><Text style={s.rateLabel}>PLUCK RATE</Text></View></View>
    <View style={s.stats}><Stat icon="game-controller" label="GAMES" value={stats.gamesPlayed}/><Stat icon="repeat" label="TOSSES" value={stats.totalTosses}/><Stat icon="star" label="POINTS" value={stats.totalPointsScored}/><Stat icon="alert-circle" label="PLUCKED" value={stats.pluckedCount}/><Stat icon="trending-up" label="BEST TURN" value={stats.highestTurnScore}/><Stat icon="trophy" label="BEST TOSS" value={stats.highestSingleTossScore}/></View>
  </Screen>;
}

function Toggle({icon,label,detail,value,onPress,last=false}:{icon:keyof typeof Ionicons.glyphMap;label:string;detail:string;value:boolean;onPress:()=>void;last?:boolean}){return <Pressable accessibilityRole="switch" accessibilityState={{checked:value}} onPress={onPress} style={[s.row,!last&&s.border]}><View style={[s.iconBadge,value&&s.iconBadgeOn]}><Ionicons name={icon} size={19} color={value?C.red:C.muted}/></View><View style={s.rowCopy}><Text style={s.label}>{label}</Text><Text style={s.detail}>{detail}</Text></View><View style={[s.toggle,value&&s.toggleOn]}><View style={[s.knob,value&&s.knobOn]}/></View></Pressable>}
function Stat({icon,label,value}:{icon:keyof typeof Ionicons.glyphMap;label:string;value:number}){return <View style={s.stat}><Ionicons name={icon} size={15} color={C.tan}/><Text style={s.value}>{value}</Text><Text style={s.statLabel}>{label}</Text></View>}

const s=StyleSheet.create({hero:{height:116,borderRadius:22,backgroundColor:C.brown,overflow:'hidden',paddingLeft:20,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},heroCopy:{flex:1,zIndex:2},heroEyebrow:{fontFamily:'Nunito_800ExtraBold',fontSize:9,letterSpacing:1.8,color:C.gold},heroTitle:{fontFamily:'Baloo2_800ExtraBold',fontSize:21,lineHeight:28,color:C.white,paddingTop:2},heroText:{fontFamily:'Nunito_700Bold',fontSize:10,color:C.parchment},section:{fontFamily:'Nunito_800ExtraBold',fontSize:11,letterSpacing:1.6,color:C.muted,marginTop:20,marginBottom:8},card:{backgroundColor:C.white,borderRadius:20,borderWidth:1.5,borderColor:C.line,paddingHorizontal:14},row:{minHeight:70,flexDirection:'row',alignItems:'center',gap:11},border:{borderBottomWidth:1,borderBottomColor:C.line},iconBadge:{width:38,height:38,borderRadius:13,backgroundColor:'#EFE9E1',alignItems:'center',justifyContent:'center'},iconBadgeOn:{backgroundColor:'#FCE8DD'},rowCopy:{flex:1},label:{fontFamily:'Nunito_800ExtraBold',fontSize:13,color:C.ink},detail:{fontFamily:'Nunito_400Regular',fontSize:9.5,lineHeight:14,color:C.muted},toggle:{width:48,height:28,borderRadius:14,backgroundColor:'#D5C9BD',padding:3},toggleOn:{backgroundColor:C.green},knob:{width:22,height:22,borderRadius:11,backgroundColor:C.white},knobOn:{alignSelf:'flex-end'},report:{minHeight:72,borderRadius:18,backgroundColor:'#FFF1D7',borderWidth:1.5,borderColor:C.line,paddingHorizontal:16,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},reportLabel:{fontFamily:'Nunito_800ExtraBold',fontSize:8,letterSpacing:1.1,color:C.muted},reportValue:{fontFamily:'Baloo2_800ExtraBold',fontSize:18,color:C.brown},rate:{alignItems:'center',paddingLeft:16,borderLeftWidth:1,borderLeftColor:C.line},rateValue:{fontFamily:'Baloo2_800ExtraBold',fontSize:23,lineHeight:27,color:C.red},rateLabel:{fontFamily:'Nunito_800ExtraBold',fontSize:7,color:C.muted,letterSpacing:.7},stats:{flexDirection:'row',flexWrap:'wrap',backgroundColor:C.brown,borderRadius:20,paddingVertical:7,marginTop:9,marginBottom:12},stat:{width:'33.33%',alignItems:'center',paddingVertical:8},value:{fontFamily:'Baloo2_800ExtraBold',fontSize:22,lineHeight:27,paddingTop:1,color:C.gold},statLabel:{fontFamily:'Nunito_800ExtraBold',fontSize:7.5,color:C.parchment,letterSpacing:.5}});

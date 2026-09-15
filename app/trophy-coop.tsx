import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BottomNavBar } from '@/components/BottomNavBar';
import { Header } from '@/components/Header';
import { Screen } from '@/components/Screen';
import { Turkey } from '@/components/Turkey';
import { C } from '@/constants/colours';
import { useStatisticsStore } from '@/store/statisticsStore';

export default function TrophyCoop(){const x=useStatisticsStore();const trophies=[
  ['FIRST GOBBLE','Complete your first toss',x.totalTosses>=1,'volume-high'],
  ['FEATHERED FORTUNE','Score 100 lifetime points',x.totalPointsScored>=100,'sparkles'],
  ['BRAVE BIRD','Bank 25 points in one turn',x.highestTurnScore>=25,'trending-up'],
  ['DOUBLE TROUBLE','Land any scoring double',x.doubleGobblerCount+x.doubleTurkeyTrotCount+x.doubleJibletsCount+x.doubleWattleWobbleCount>=1,'copy'],
  ['THANKSGIVING','Discover Double Wattle Wobble',x.doubleWattleWobbleCount>=1,'star'],
  ['COOP CHAMPION','Win your first game',x.gamesPlayed>=1,'trophy'],
] as const;const unlocked=trophies.filter(t=>t[2]).length;return <Screen scroll={false} style={s.screen}><Header title="TROPHY COOP"/><ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}><View style={s.hero}><View><Text style={s.kicker}>YOUR CABINET</Text><Text style={s.heroTitle}>{unlocked} OF {trophies.length} UNLOCKED</Text><Text style={s.heroText}>Keep tossing to fill the roost with glory.</Text></View><Turkey position="wattle_wobble" size={100}/></View><View style={s.grid}>{trophies.map(([name,detail,earned,icon])=><View key={name} style={[s.trophy,!earned&&s.locked]}><View style={[s.medal,earned&&s.medalOn]}><Ionicons name={earned?icon:'lock-closed'} size={25} color={earned?C.brown:C.muted}/></View><Text style={s.name}>{name}</Text><Text style={s.detail}>{detail}</Text><Text style={[s.state,earned&&s.earned]}>{earned?'UNLOCKED':'LOCKED'}</Text></View>)}</View><Pressable onPress={()=>router.back()} style={s.back}><Text style={s.backText}>BACK TO THE COOP</Text></Pressable></ScrollView><BottomNavBar embedded/></Screen>}

const s=StyleSheet.create({screen:{gap:4,paddingBottom:6},content:{paddingBottom:18},hero:{height:108,borderRadius:22,paddingLeft:18,backgroundColor:C.brown,flexDirection:'row',alignItems:'center',justifyContent:'space-between',overflow:'hidden'},kicker:{fontFamily:'Nunito_800ExtraBold',fontSize:8,letterSpacing:1.6,color:C.gold},heroTitle:{fontFamily:'Baloo2_800ExtraBold',fontSize:23,lineHeight:28,paddingTop:2,color:C.white},heroText:{fontFamily:'Nunito_700Bold',fontSize:9,color:'#F6D9C7'},grid:{flexDirection:'row',flexWrap:'wrap',gap:8,marginTop:11},trophy:{width:'48.8%',minHeight:150,borderRadius:18,padding:12,backgroundColor:C.white,borderWidth:1.5,borderColor:C.line,alignItems:'center'},locked:{opacity:.55,backgroundColor:'#EFE9E1'},medal:{width:50,height:50,borderRadius:25,backgroundColor:'#DED5CC',alignItems:'center',justifyContent:'center'},medalOn:{backgroundColor:C.gold,borderWidth:3,borderColor:'#F7D982'},name:{fontFamily:'Baloo2_800ExtraBold',fontSize:14,lineHeight:18,paddingTop:5,color:C.brown,textAlign:'center'},detail:{fontFamily:'Nunito_700Bold',fontSize:8,lineHeight:11,color:C.muted,textAlign:'center',flex:1},state:{fontFamily:'Nunito_800ExtraBold',fontSize:7,letterSpacing:1,color:C.muted},earned:{color:C.green},back:{height:42,borderRadius:14,backgroundColor:C.brown,alignItems:'center',justifyContent:'center',marginTop:10},backText:{fontFamily:'Nunito_800ExtraBold',fontSize:10,letterSpacing:1.2,color:C.white}});

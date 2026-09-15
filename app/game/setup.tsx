import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { BottomNavBar } from '@/components/BottomNavBar';
import { GameButton } from '@/components/GameButton';
import { Header } from '@/components/Header';
import { Screen } from '@/components/Screen';
import { Turkey } from '@/components/Turkey';
import { C } from '@/constants/colours';
import { TURKEY_POSITIONS } from '@/constants/turkeyPositions';
import { useGameStore } from '@/store/gameStore';
import { TurkeyPosition } from '@/types/turkey';

const targets=[50,100,150,200];
const avatars:TurkeyPosition[]=['gobbler','turkey_trot','wattle_wobble','jiblets','prone_poultry','beaky_one'];

export default function Setup(){
  const recent=useGameStore(s=>s.recentNames),start=useGameStore(s=>s.startGame);
  const[count,setCount]=useState(Math.max(2,recent.length));
  const[names,setNames]=useState(Array.from({length:8},(_,i)=>recent[i]??`Player ${i+1}`));
  const[playerAvatars,setPlayerAvatars]=useState<TurkeyPosition[]>(Array.from({length:8},(_,i)=>avatars[i%avatars.length]));
  const[target,setTarget]=useState(100),[custom,setCustom]=useState('');
  const update=(i:number,v:string)=>setNames(n=>n.map((x,j)=>j===i?v:x));
  const cycleAvatar=(i:number)=>setPlayerAvatars(current=>current.map((avatar,j)=>j===i?avatars[(avatars.indexOf(avatar)+1)%avatars.length]:avatar));
  const play=()=>{const score=custom?Math.max(10,Number(custom)||100):target;start(names.slice(0,count),score,playerAvatars.slice(0,count));router.replace('/game/play')};
  return <Screen scroll={false} style={s.screen}>
    <Header title="ASSEMBLE YOUR FLOCK"/>
    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={s.content}>
      <View style={s.hero}><View style={s.heroWords}><Text style={s.heroEyebrow}>WELCOME TO THE COOP</Text><Text style={s.heroTitle}>WHO'S READY TO GET PLUCKED?</Text><Text style={s.heroCopy}>Name your birds, choose their look, then race to the roost.</Text></View><Turkey position="turkey_trot" size={104}/></View>
      <View style={s.sectionTitle}><Text style={s.label}>PLAYERS</Text><View style={s.step}><Pressable accessibilityLabel="Remove player" onPress={()=>setCount(Math.max(2,count-1))} style={s.stepBtn}><Text style={s.stepText}>−</Text></Pressable><Text style={s.count}>{count}</Text><Pressable accessibilityLabel="Add player" onPress={()=>setCount(Math.min(8,count+1))} style={s.stepBtn}><Text style={s.stepText}>+</Text></Pressable></View></View>
      <Text style={s.tip}>Tap a turkey to change that player's avatar.</Text>
      {names.slice(0,count).map((name,i)=>{const avatar=playerAvatars[i];return <View key={i} style={s.playerCard}><Pressable accessibilityLabel={`Change ${name}'s turkey avatar`} onPress={()=>cycleAvatar(i)} style={[s.avatar,i%2===0?s.avatarGold:s.avatarRed]}><Turkey position={avatar} size={68}/><View style={s.swap}><Text style={s.swapText}>↻</Text></View></Pressable><View style={s.playerCopy}><Text style={s.playerLabel}>PLAYER {i+1} · {TURKEY_POSITIONS[avatar].name.toUpperCase()}</Text><TextInput value={name} onChangeText={v=>update(i,v)} selectTextOnFocus maxLength={18} style={s.input}/></View></View>})}
      <Text style={s.label}>RACE TO THE ROOST</Text>
      <View style={s.targets}>{targets.map(n=><Pressable key={n} onPress={()=>{setTarget(n);setCustom('')}} style={[s.pill,target===n&&!custom&&s.selected]}><Text style={[s.pillNumber,target===n&&!custom&&s.selectedText]}>{n}</Text><Text style={[s.pointsLabel,target===n&&!custom&&s.selectedText]}>POINTS</Text></Pressable>)}</View>
      <TextInput keyboardType="number-pad" value={custom} onChangeText={setCustom} placeholder="Or enter a custom target" placeholderTextColor={C.muted} style={s.custom}/>
      <GameButton title={`OPEN THE GATE · ${count} PLAYERS`} onPress={play}/>
    </ScrollView>
    <BottomNavBar embedded/>
  </Screen>;
}

const s=StyleSheet.create({screen:{gap:4,paddingBottom:6},content:{paddingBottom:18},hero:{minHeight:116,borderRadius:22,backgroundColor:C.brown,paddingLeft:18,paddingVertical:14,flexDirection:'row',alignItems:'center',overflow:'hidden'},heroWords:{flex:1},heroEyebrow:{fontFamily:'Nunito_800ExtraBold',fontSize:8,letterSpacing:1.6,color:C.gold},heroTitle:{fontFamily:'Baloo2_800ExtraBold',fontSize:21,lineHeight:24,color:C.white,maxWidth:245,marginTop:4},heroCopy:{fontFamily:'Nunito_700Bold',fontSize:9,lineHeight:12,color:'#F6D9C7',maxWidth:225,marginTop:3},sectionTitle:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:14},label:{fontFamily:'Nunito_800ExtraBold',fontSize:10,letterSpacing:1.6,color:C.muted,marginTop:14,marginBottom:7},step:{flexDirection:'row',alignItems:'center',gap:8},stepBtn:{width:31,height:29,borderRadius:10,backgroundColor:C.brown,alignItems:'center',justifyContent:'center'},stepText:{fontFamily:'Baloo2_700Bold',color:C.white,fontSize:22,lineHeight:25},count:{fontFamily:'Baloo2_800ExtraBold',fontSize:25,lineHeight:29,color:C.ink,minWidth:26,textAlign:'center'},tip:{fontFamily:'Nunito_700Bold',fontSize:9,color:C.muted,marginBottom:7},playerCard:{minHeight:78,flexDirection:'row',alignItems:'center',gap:11,marginBottom:7,padding:7,borderRadius:18,backgroundColor:'rgba(255,255,255,.88)',borderWidth:1.5,borderColor:C.line},avatar:{width:66,height:64,borderRadius:17,alignItems:'center',justifyContent:'center',overflow:'hidden'},avatarGold:{backgroundColor:'#FBE5A8'},avatarRed:{backgroundColor:'#F9DDD1'},swap:{position:'absolute',right:3,bottom:3,width:18,height:18,borderRadius:9,backgroundColor:C.brown,alignItems:'center',justifyContent:'center'},swapText:{fontFamily:'Nunito_800ExtraBold',fontSize:11,color:C.white},playerCopy:{flex:1},playerLabel:{fontFamily:'Nunito_800ExtraBold',fontSize:7.5,letterSpacing:.7,color:C.muted,marginBottom:3},input:{height:39,borderWidth:1.5,borderColor:C.line,borderRadius:11,backgroundColor:C.white,paddingHorizontal:11,fontFamily:'Nunito_700Bold',fontSize:15,color:C.ink},targets:{flexDirection:'row',gap:6},pill:{flex:1,height:49,borderRadius:14,borderWidth:1.5,borderColor:C.line,alignItems:'center',justifyContent:'center',backgroundColor:C.white},selected:{backgroundColor:C.brown,borderColor:C.brown},pillNumber:{fontFamily:'Baloo2_800ExtraBold',fontSize:19,lineHeight:20,color:C.brown},pointsLabel:{fontFamily:'Nunito_800ExtraBold',fontSize:6.5,letterSpacing:.7,color:C.muted},selectedText:{color:C.white},custom:{height:42,borderRadius:13,borderWidth:1.5,borderColor:C.line,backgroundColor:C.white,textAlign:'center',fontFamily:'Nunito_700Bold',fontSize:14,marginTop:7,marginBottom:10,color:C.ink}});

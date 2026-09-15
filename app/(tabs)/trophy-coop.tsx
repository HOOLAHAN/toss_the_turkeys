import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { ScreenTitle } from '@/components/ScreenTitle';
import { Turkey } from '@/components/Turkey';
import { C } from '@/constants/colours';
import { useStatisticsStore } from '@/store/statisticsStore';

type IconName=keyof typeof Ionicons.glyphMap;
type Trophy={name:string;detail:string;value:number;goal:number;icon:IconName};
type TrophyGroup={title:string;subtitle:string;colour:string;trophies:Trophy[]};

const trophy=(name:string,detail:string,value:number,goal:number,icon:IconName):Trophy=>({name,detail,value,goal,icon});

export default function TrophyCoop(){
  const x=useStatisticsStore();
  const doubles=x.doubleGobblerCount+x.doubleTurkeyTrotCount+x.doubleJibletsCount+x.doubleWattleWobbleCount;
  const landings=x.pronePoultryCount+x.beakyOneCount+x.gobblerCount+x.turkeyTrotCount+x.jibletsCount+x.wattleWobbleCount;
  const groups:TrophyGroup[]=[
    {title:'BARNYARD BEGINNINGS',subtitle:'Every legend starts with one toss.',colour:'#F7CC6C',trophies:[
      trophy('First Gobble','Complete your first toss',x.totalTosses,1,'volume-high'),
      trophy('Getting the Wing of It','Complete 25 tosses',x.totalTosses,25,'repeat'),
      trophy('Frequent Flyer','Complete 100 tosses',x.totalTosses,100,'airplane'),
      trophy('Coop Regular','Complete 250 tosses',x.totalTosses,250,'home'),
    ]},
    {title:'HIGH ROLLERS',subtitle:'Pile those points high.',colour:'#F6A54A',trophies:[
      trophy('Feathered Fortune','Score 100 lifetime points',x.totalPointsScored,100,'sparkles'),
      trophy('Corn Millionaire','Score 500 lifetime points',x.totalPointsScored,500,'cash'),
      trophy('Golden Gobbler','Score 1,000 lifetime points',x.totalPointsScored,1000,'star'),
      trophy('Big Bird Energy','Score 20 in one toss',x.highestSingleTossScore,20,'flash'),
    ]},
    {title:'BRAVE BIRDS',subtitle:'Risk it long enough to earn the feathers.',colour:'#E86B55',trophies:[
      trophy('First Plucking','Get Plucked It once',x.pluckedCount,1,'alert-circle'),
      trophy('Glutton for Punishment','Get plucked 10 times',x.pluckedCount,10,'flame'),
      trophy('Unpluckable Spirit','Get plucked 25 times',x.pluckedCount,25,'shield'),
      trophy('Brave Bird','Bank 25 in one turn',x.highestTurnScore,25,'trending-up'),
      trophy('Nerves of Steel','Bank 50 in one turn',x.highestTurnScore,50,'diamond'),
    ]},
    {title:'LANDING LEGENDS',subtitle:`${landings} turkey landings witnessed.`,colour:'#91B66B',trophies:[
      trophy('Flat Out','Find Prone Poultry',x.pronePoultryCount,1,'remove'),
      trophy('Point Taken','Find Beaky One',x.beakyOneCount,1,'arrow-down'),
      trophy('Volume Up','Find a Gobbler',x.gobblerCount,1,'megaphone'),
      trophy('Quick Feet','Find Turkey Trot',x.turkeyTrotCount,1,'footsteps'),
      trophy('Rare Bird','Find Jiblets',x.jibletsCount,1,'ribbon'),
      trophy('Wobble Wonder','Find Wattle Wobble',x.wattleWobbleCount,1,'eye'),
    ]},
    {title:'DOUBLE TROUBLE',subtitle:'Matching birds mean magnificent rewards.',colour:'#BBA0D5',trophies:[
      trophy('Seeing Double','Land any scoring double',doubles,1,'copy'),
      trophy('Double Gobbler','Land Double Gobbler',x.doubleGobblerCount,1,'volume-high'),
      trophy('Trot Twins','Land Double Turkey Trot',x.doubleTurkeyTrotCount,1,'footsteps'),
      trophy('Jiblets Jackpot','Land Double Jiblets',x.doubleJibletsCount,1,'gift'),
      trophy('Thanksgiving!','Land Double Wattle Wobble',x.doubleWattleWobbleCount,1,'star'),
    ]},
    {title:'COOP CHAMPIONS',subtitle:'Only banked points win trophies.',colour:'#E9B95E',trophies:[
      trophy('Coop Champion','Win your first game',x.gamesPlayed,1,'trophy'),
      trophy('Roost Ruler','Win 5 games',x.gamesPlayed,5,'medal'),
      trophy('Turkey Royalty','Win 10 games',x.gamesPlayed,10,'star'),
    ]},
  ];
  const all=groups.flatMap(group=>group.trophies),unlocked=all.filter(item=>item.value>=item.goal).length;
  return <Screen><ScreenTitle title="TROPHY COOP" subtitle="Achievements, rare finds and barnyard glory."/>
    <View style={s.hero}><View><Text style={s.kicker}>YOUR CABINET</Text><Text style={s.heroTitle}>{unlocked} OF {all.length} UNLOCKED</Text><View style={s.heroTrack}><View style={[s.heroFill,{width:`${unlocked/all.length*100}%`}]}/></View><Text style={s.heroText}>Keep tossing to fill the roost with glory.</Text></View><Turkey position="wattle_wobble" size={100}/></View>
    {groups.map(group=><View key={group.title} style={s.group}><View style={s.groupHeading}><View style={[s.groupMark,{backgroundColor:group.colour}]}/><View><Text style={s.groupTitle}>{group.title}</Text><Text style={s.groupSubtitle}>{group.subtitle}</Text></View></View><View style={s.grid}>{group.trophies.map(item=><TrophyCard key={item.name} item={item} colour={group.colour}/>)}</View></View>)}
  </Screen>;
}

function TrophyCard({item,colour}:{item:Trophy;colour:string}){const earned=item.value>=item.goal,shown=Math.min(item.value,item.goal),progress=Math.min(100,item.value/item.goal*100);return <View style={[s.trophy,!earned&&s.locked]}><View style={[s.medal,earned&&{backgroundColor:colour}]}><Ionicons name={earned?item.icon:'lock-closed'} size={22} color={earned?C.brown:C.muted}/></View><View style={s.trophyCopy}><Text style={s.name}>{item.name.toUpperCase()}</Text><Text style={s.detail}>{item.detail}</Text><View style={s.progressRow}><View style={s.track}><View style={[s.fill,{width:`${progress}%`,backgroundColor:earned?C.green:colour}]}/></View><Text style={[s.progress,earned&&s.earned]}>{earned?'DONE':`${shown}/${item.goal}`}</Text></View></View></View>}

const s=StyleSheet.create({hero:{height:112,borderRadius:22,paddingLeft:18,backgroundColor:C.brown,flexDirection:'row',alignItems:'center',justifyContent:'space-between',overflow:'hidden'},kicker:{fontFamily:'Nunito_800ExtraBold',fontSize:8,letterSpacing:1.6,color:C.gold},heroTitle:{fontFamily:'Baloo2_800ExtraBold',fontSize:23,lineHeight:28,paddingTop:2,color:C.white},heroText:{fontFamily:'Nunito_700Bold',fontSize:8.5,color:'#F6D9C7',marginTop:4},heroTrack:{height:5,width:170,borderRadius:3,backgroundColor:'rgba(255,255,255,.18)',overflow:'hidden'},heroFill:{height:'100%',borderRadius:3,backgroundColor:C.gold},group:{marginTop:16},groupHeading:{flexDirection:'row',alignItems:'center',gap:8,marginBottom:7},groupMark:{width:8,height:32,borderRadius:4},groupTitle:{fontFamily:'Nunito_800ExtraBold',fontSize:10,letterSpacing:1.25,color:C.brown},groupSubtitle:{fontFamily:'Nunito_700Bold',fontSize:8.5,color:C.muted},grid:{gap:7},trophy:{minHeight:76,borderRadius:17,padding:9,backgroundColor:C.white,borderWidth:1.5,borderColor:C.line,flexDirection:'row',alignItems:'center',gap:10},locked:{backgroundColor:'rgba(255,255,255,.62)'},medal:{width:46,height:46,borderRadius:23,backgroundColor:'#DED5CC',alignItems:'center',justifyContent:'center'},trophyCopy:{flex:1},name:{fontFamily:'Baloo2_800ExtraBold',fontSize:13,lineHeight:17,paddingTop:2,color:C.brown},detail:{fontFamily:'Nunito_700Bold',fontSize:8.5,lineHeight:11,color:C.muted},progressRow:{flexDirection:'row',alignItems:'center',gap:7,marginTop:5},track:{height:5,flex:1,borderRadius:3,backgroundColor:'#E9E0D8',overflow:'hidden'},fill:{height:'100%',borderRadius:3},progress:{width:38,fontFamily:'Nunito_800ExtraBold',fontSize:7,color:C.muted,textAlign:'right'},earned:{color:C.green}});

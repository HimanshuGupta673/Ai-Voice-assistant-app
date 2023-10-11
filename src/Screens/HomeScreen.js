import { View, Text,Image } from 'react-native'
import React, { useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Features from '../components/Features';
import { dummyMessages } from '../constants';
const HomeScreen = () => {
  const [messages,setMessages] = useState([])
  return (
    <View style={{display:'flex',flexGrow:1,backgroundColor:'white'}}>
    <SafeAreaView style={{display:'flex',flexGrow:1,backgroundColor:'white'}}>
      <View style={{flexDirection:'row',justifyContent:'center'}}>
        <Image source={require('../../assets/images/bot.png')} style={{height:hp(15),width:hp(15)}}/>
      </View>
    </SafeAreaView>
   {
    messages.length>0?(
      <View>

      </View>
    ):(
      <Features/>
    )
   }
    </View>
  )
}

export default HomeScreen
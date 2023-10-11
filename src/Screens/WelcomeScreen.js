import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{display:'flex',flexGrow:1,justifyContent:'space-around',backgroundColor:'white'}}>
      <View style={{}}>
        <Text style={styles.title}>Ai_Voice</Text>
        <Text style={{textAlign:'center',color:'gray',fontWeight:'400',fontSize:wp(4)}}>
          The Future is here, powered by AI.
        </Text>
      </View>
      <View style={{flexDirection:'row',justifyContent:'center'}}>
        <Image style={{width:wp(75),height:wp(75)}} source = {require('../../assets/images/welcome.png')}/>
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate('HomeScreen')} style={{backgroundColor:'#44b87a',marginHorizontal:20,padding:16,borderRadius:14}}>
        <Text style={{textAlign:'center',fontWeight:'bold',color:'white',fontSize:wp(6)}}>
          Get Started
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: wp(10), 
    fontWeight: 'bold',
    color: '#383838', 
  }
});
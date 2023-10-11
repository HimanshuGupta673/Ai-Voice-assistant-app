import React from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';
export default function Features() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Features</Text>

      <View style={[styles.featureBox,styles.green]}>
        <View style={styles.featureInfo}>
          <Image style={styles.featureIcon} source={require('../../assets/images/chatgptIcon.png')} />
          <Text style={styles.featureName}>ChatGPT</Text>
        </View>
        <Text style={styles.featureDescription}>
          ChatGPT can provide you with instant and knowledgeable responses, assist you with creative ideas on a wide range of topics.
        </Text>
      </View>
      <View style={[styles.featureBox,styles.purple]}>
        <View style={styles.featureInfo}>
          <Image style={styles.featureIcon} source={require('../../assets/images/dalleIcon.png')} />
          <Text style={styles.featureName}>DALL-E</Text>
        </View>
        <Text style={styles.featureDescription}>
        DALL-E can generate imaginative and diverse images from textual descriptions, expanding the boundaries of visual creativity.
        </Text>
      </View>
      <View style={[styles.featureBox,styles.sky]}>
        <View style={styles.featureInfo}>
          <Image style={styles.featureIcon} source={require('../../assets/images/smartaiIcon.png')} />
          <Text style={styles.featureName}>Smart AI</Text>
        </View>
        <Text style={styles.featureDescription}>
        A powerful voice assistant with the abilities of ChatGPT and Dall-E, providing you the best of both worlds.
        </Text>
      </View>

    </ScrollView>
  );
}
const styles = StyleSheet.create({
    container: {
    //   height: '60%', 
       marginHorizontal:16
    },
    heading: {
      fontSize: wp(6.5),
      fontWeight: '600',
      color: '#383838', 
      marginBottom: 6, 
    },
    featureBox: {
      padding: 15,
      borderRadius: 16,
      marginBottom: 32, 
      display: 'flex',
      flexDirection: 'column',
    },
    featureInfo: {
      display: 'flex',
      flexDirection:'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    featureIcon: {
      height: hp(4), 
      width: hp(4), 
      borderRadius: wp(2), 
    },
    featureName: {
      fontSize: wp(4.8),
      fontWeight: '600', 
      color: '#383838', 
      marginLeft: 16, 
    },
    featureDescription: {
      fontSize: wp(3.8), 
      fontWeight: '500', 
      color: '#383838', 
      textAlign:'justify'
    },
    green:{
        backgroundColor:'#a6e3c9',
    },
    purple:{
        backgroundColor:'#e3ace3'
    },
    sky:{
        backgroundColor:'#8298e0'
    }
  });

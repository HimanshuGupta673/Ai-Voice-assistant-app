import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Features from '../components/Features';
import { dummyMessages } from '../constants';
import Voice from '@react-native-community/voice';
import { apiCall } from '../api/OpenAi';
import { useRef } from 'react';
// import {Gif} from 'react-native-gif'
const HomeScreen = () => {
  const [messages, setMessages] = useState(dummyMessages);
  const [recording, setRecording] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [result, setResult] = useState('')
  const ScrollViewRef = useRef();
  const [loading, setLoading] = useState(false)

  const clear = () => {
    setMessages([]);
  }
  const stopSpeaking = () => {
    setSpeaking(false)
  }

  const speechStartHandler = e => {
    console.log('speech start event', e);
  };
  const speechEndHandler = e => {
    setRecording(false);
    console.log('speech stop event', e);
  };
  const speechResultsHandler = e => {
    console.log('speech event: ', e);
    const text = e.value[0];
    setResult(text);
  };

  const speechErrorHandler = e => {
    console.log('speech error: ', e);
  }


  const startRecording = async () => {
    setRecording(true);
    // Tts.stop(); 
    try {
      await Voice.start('en-GB'); // en-US
    } catch (error) {
      console.log('error', error);
    }
  };
  const stopRecording = async () => {

    try {
      await Voice.stop();
      setRecording(false);
      fetchResponse();
    } catch (error) {
      console.log('error', error);
    }
  };


  const fetchResponse = async () => {
    if (result.trim().length > 0) {
      // setLoading(true);
      let newMessages = [...messages];
      newMessages.push({ role: 'user', content: result.trim() });
      setMessages([...newMessages]);

      // scroll to the bottom of the view
      updateScrollView();
      setLoading(true);
      // fetching response from chatGPT with our prompt and old messages
      apiCall(result.trim(), newMessages)
        .then((res) => {
          // console.log('got api data', res);
          setLoading(false);
          if (res.success) {
            setMessages([...res.data]);
            setResult('');
            updateScrollView();
            // now play the response to user
            // startTextToSpeach(res.data[res.data.length-1]);

          } else {
            Alert.alert('Error', res.msg);
          }

        })
        .catch((error) => {
          console.error('An error occurred:', error);
        });

      // setLoading(false);

    }
  }



  const updateScrollView = () => {
    setTimeout(() => {
      ScrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 200)
  }

  // const startTextToSpeach = message=>{
  //   if(!message.content.includes('https')){
  //     setSpeaking(true);
  //     // playing response with the voice id and voice speed
  //     Tts.speak(message.content, {
  //       iosVoiceId: 'com.apple.ttsbundle.Samantha-compact',
  //       rate: 0.5,
  //     });
  //   }
  // }


  useEffect(() => {

    // voice handler events
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    Voice.onSpeechError = speechErrorHandler;

    // text to speech events
    // Tts.setDefaultLanguage('en-IE');
    // Tts.addEventListener('tts-start', event => console.log('start', event));
    // Tts.addEventListener('tts-finish', event => {console.log('finish', event); setSpeaking(false)});
    // Tts.addEventListener('tts-cancel', event => console.log('cancel', event));



    return () => {
      // destroy the voice instance after component unmounts
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <SafeAreaView style={{ backgroundColor: 'white', marginVertical: 18 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Image source={require('../../assets/images/bot.png')} style={{ height: hp(15), width: hp(15) }} />
        </View>
      </SafeAreaView>
      {messages.length > 0 ? (
        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
          <Text style={{ fontSize: wp(5), color: 'gray', fontWeight: '600' }}>
            Assistant
          </Text>
          <View style={{ height: hp(58), backgroundColor: '#e0e0e0', borderRadius: 8, padding: 10 }}>
            <ScrollView ref={ScrollViewRef}>
              {messages.map((message, idx) => {
                if (message.role === 'assistant') {
                  if (message.content.includes('https')) {
                    return (
                      <View key={idx} style={{ flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 10 }}>
                        <View style={{ padding: 2, display: "flex", borderRadius: 10, backgroundColor: '#a6ffc6', borderTopLeftRadius: 0 }}>
                          <Image source={{ uri: message.content }} style={{ borderRadius: 10, resizeMode: 'contain', height: wp(60), width: wp(60) }} />
                        </View>
                      </View>
                    )
                  } else {
                    return (
                      <View key={idx} style={{ width: wp(70), marginVertical: 10 }}>
                        <View style={{ width: wp(70), backgroundColor: '#a6ffc6', borderRadius: 6, padding: 4, borderTopLeftRadius: 0 }}>
                          <Text style={{ fontSize: wp(4), color: 'black', paddingVertical: 4 }}>
                            {message.content}
                          </Text>
                        </View>
                      </View>
                    );
                  }
                } else {
                  return (
                    <View key={idx} style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                      <View style={{ width: wp(70), backgroundColor: 'white', borderRadius: 6, padding: 4, borderTopEndRadius: 0 }}>
                        <Text style={{ fontSize: wp(4), color: 'black' }}>
                          {message.content}
                        </Text>
                      </View>
                    </View>
                  );
                }
              })}
            </ScrollView>
          </View>
        </View>
      ) : (
        <Features />
      )}

      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 16 }}>
        {
          loading ? (
            <Image source={require('../../assets/images/loading.gif')} style={{borderRadius:100,width:hp(10),height:hp(10) ,}}/>
          ) :
            recording ? (
              <TouchableOpacity onPress={stopRecording}>
                <Image style={{ borderRadius: 10, width: hp(10), height: hp(10) }} source={require('./../../assets/images/voiceLoading.gif')} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={startRecording}>
                <Image style={{ borderRadius: 10, width: hp(10), height: hp(10) }} source={require('./../../assets/images/recordingIcon.png')} />
              </TouchableOpacity>

            )
        }

        {
          messages.length > 0 && (
            <TouchableOpacity style={{ backgroundColor: '#e0e0e0', borderRadius: 15, padding: 8, position: 'absolute', right: 40 }}>
              <Text onPress={clear} style={{ color: 'white', fontWeight: '400' }}>Clear</Text>
            </TouchableOpacity>
          )
        }
        {
          speaking && (
            <TouchableOpacity style={{ backgroundColor: '#f28d92', borderRadius: 15, padding: 8, position: 'absolute', left: 40 }}>
              <Text onPress={stopSpeaking} style={{ color: 'white', fontWeight: '400' }}>Stop</Text>
            </TouchableOpacity>
          )
        }
      </View>
    </View>
  );
}

export default HomeScreen;

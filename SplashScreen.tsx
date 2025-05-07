// import React, { useEffect } from 'react';
// import { Image, ImageBackground, StyleSheet, Text, View, Dimensions } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import type { RootStackParamList } from './App';

// const { height, width } = Dimensions.get('window');

// const Splashscreen = () => {
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigation.navigate('Logo');
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [navigation]);

//   return (
//     <View style={styles.container}>
//       <ImageBackground
//         source={require('./assets/images/backgroundImage.png')}
//         style={styles.background}
//         resizeMode="cover"
//       >
//         <Image
//           source={require('./assets/images/splashscreen.png')}
//           style={{ width: width * 1.1, height: height * 0.7, alignSelf: 'flex-end' }}
//           resizeMode="contain"
//         />
//         <View style={styles.textContainer}>
//           <Text style={styles.text1}>Easy Way to Confirm Your Attendance</Text>
//           <Text style={styles.text2}>
//             Effortlessly manage your attendance. Just Check-In or Check-Out and stay on track!
//           </Text>
//         </View>
//       </ImageBackground>
//     </View>
//   );
// };

// export default Splashscreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   background: {
//     flex: 1,
//   },
//   textContainer: {
//     marginTop: height * 0.05,
//     marginHorizontal: width * 0.05,
//   },
//   text1: {
//     fontFamily: 'ClashDisplay-Variable',
//     fontSize: width * 0.07,
//     color: '#FFFFFF',
//   },
//   text2: {
//     marginTop: 15,
//     fontFamily: 'ClashDisplay-Variable',
//     fontSize: width * 0.045,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
// });

import React, { useEffect } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';
import { height, width } from './constants';

const Splashscreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Logo');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/images/backgroundImage.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <Image
          source={require('./assets/images/splashscreen.png')}
          style={{ width: width * 1.1, height: height * 0.7, alignSelf: 'flex-end' }}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text style={styles.text1}>Easy Way to Confirm Your Attendance</Text>
          <Text style={styles.text2}>
            Effortlessly manage your attendance. Just Check-In or Check-Out and stay on track!
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Splashscreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1 },
  textContainer: {
    marginTop: height * 0.05,
    marginHorizontal: width * 0.05,
  },
  text1: {
    fontFamily: 'ClashDisplay-Variable',
    fontSize: width * 0.07,
    color: '#FFFFFF',
  },
  text2: {
    marginTop: 15,
    fontFamily: 'ClashDisplay-Variable',
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

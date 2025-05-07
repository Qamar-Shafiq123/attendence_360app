// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import React from 'react';
// import {
//   StyleSheet,
//   View,
//   Image,
//   ImageBackground,
//   Text,
//   TextInput,
//   TouchableOpacity,
// } from 'react-native';
// import { RootStackParamList } from './App';

// const Login = () => {

// const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
// const handleLogin = () =>
// {
//   console.log("Button is pressed");
//   navigation.navigate('Dashboard');
// }

//   return (
//     <ImageBackground
//       source={require('./assets/images/backgroundImage.png')} 
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <View style={styles.container}>
//         <Image source={require('./assets/images/logo.png')} style={styles.logo} />

//         <View style={styles.formContainer}>
//           <Text style={styles.heading}>Join the Movement</Text>
//           <TextInput
//             placeholder="Phone Number"
//             placeholderTextColor="#ccc"
//             keyboardType="phone-pad"
//             style={styles.input}
//           />
//           <TouchableOpacity style={styles.button} onPress={handleLogin}>
//             <Text style={styles.buttonText}>Open New Doors!</Text>
//             <Text style={styles.arrow}>→</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ImageBackground>
//   );
// };

// export default Login;

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'space-between',
//     paddingVertical: 80,
//     paddingHorizontal: 20,
//   },
//   logo: {
//     width: 200,
//     height: 60,
//     resizeMode: 'contain',
//     alignSelf: 'center',
//     marginTop: 60,
//   },
//   formContainer: {
//     backgroundColor: '#1e1e1e',
//     borderRadius: 20,
//     padding: 20,
//   },
//   heading: {
//     textAlign: 'center',
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//     marginBottom: 15,
//   },
//   input: {
//     backgroundColor: '#121212',
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     color: '#fff',
//     marginBottom: 20,
//     fontWeight:'500'
//   },
//   button: {
//     flexDirection: 'row',
//     backgroundColor: '#e50914',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontFamily: "ClashDisplay-Variable"
//   },
//   arrow: {
//     color: '#fff',
//     fontSize: 18,
//     marginLeft: 10,
//   },
// });

import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';
import { width } from './constants';

const Login = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogin = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      })
    );
  };

  return (
    <ImageBackground
      source={require('./assets/images/backgroundImage.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Image source={require('./assets/images/logo.png')} style={styles.logo} />
        <View style={styles.formContainer}>
          <Text style={styles.heading}>Join the Movement</Text>
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor="#ccc"
            keyboardType="phone-pad"
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Open New Doors!</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 60,
  },
  formContainer: {
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
    padding: 20,
  },
  heading: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#121212',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#fff',
    marginBottom: 20,
    fontWeight: '500',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#e50914',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'ClashDisplay-Variable',
  },
  arrow: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
});

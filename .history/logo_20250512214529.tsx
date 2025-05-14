import React, { useEffect } from 'react';
import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';
import { width, height } from './constants';

const Logo = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login');
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
          source={require('./assets/images/logo.png')}
          style={{ width: width * 0.55, height: height * 0.12, resizeMode: 'contain' }}
        />
      </ImageBackground>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

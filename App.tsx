// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React from 'react';
// import type {PropsWithChildren} from 'react';
// import {
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   /*
//    * To keep the template simple and small we're adding padding to prevent view
//    * from rendering under the System UI.
//    * For bigger apps the recommendation is to use `react-native-safe-area-context`:
//    * https://github.com/AppAndFlow/react-native-safe-area-context
//    *
//    * You can read more about it here:
//    * https://github.com/react-native-community/discussions-and-proposals/discussions/827
//    */
//   const safePadding = '5%';

//   return (
//     <View style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         style={backgroundStyle}>
//         <View style={{paddingRight: safePadding}}>
//           <Header/>
//         </View>
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//             paddingHorizontal: safePadding,
//             paddingBottom: safePadding,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;


// import { Button, StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// export type props = {
//   name:string;
//   level?:number;
// };

// const App: React.FC<props> = ({name,level=0,}) =>
// {
//   const [plevel, setplevel] = React.useState(level);

//   const onIncrement= () =>
//   {
//     setplevel(level+1);
//   }
//   const onDecrement= () =>
//   {
//     setplevel(level > 0 ? level-1 : 0);

//     const getExclamationMarks = (numChars: number) => numChars>0 ? Array(numChars+1).join('!') : '';

//     return(<View style={styles.container}>
//       <Text style={styles.greeting}>Hello{name} {getExclamationMarks(level)}</Text>
//       <View>
//         <Button title="Increase Level" onPress={onIncrement} accessibilityLabel="increment" color="blue">

//         </Button>
//         <Button title="Decrement Level" onPress={onDecrement} accessibilityLabel="increment" color="red">
//         </Button>
//       </View>
//     </View>)
//   }
// }


// const styles = StyleSheet.create({
//   container:
//   {
//     flex:1,
//     alignItems:"center",
//     justifyContent:"center",
//   },
//   greeting:
//   {
//     fontSize:20,
//     fontWeight:"bold",
//     margin:16,
//   }
// })

// export default App

//This is the example of typescript react-native documentation
// import { Button, StyleSheet, Text, View } from 'react-native';
// import React from 'react';

// export type Props = {
//   name: string;
//   level?: number;
// };

// const App: React.FC<Props> = ({ name, level = 0 }) => {
//   const [plevel, setPlevel] = React.useState(level);

//   const onIncrement = () => {
//     setPlevel(plevel + 1);
//   };

//   const onDecrement = () => {
//     setPlevel(plevel > 0 ? plevel - 1 : 0);
//   };

//   const getExclamationMarks = (numChars: number) =>
//     numChars > 0 ? '!'.repeat(numChars) : '';

//   return (
//     <View style={styles.container}>
//       <Text style={styles.greeting}>
//         Hello {name}
//         {getExclamationMarks(plevel)}
//       </Text>
//       <View>
//         <Button
//           title="Increase Level"
//           onPress={onIncrement}
//           accessibilityLabel="increment"
//           color="blue"
//         />
//         <Button
//           title="Decrease Level"
//           onPress={onDecrement}
//           accessibilityLabel="decrement"
//           color="red"
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   greeting: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     margin: 16,
//   },
// });

// export default App;


import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Splashscreen from './SplashScreen'

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
    <Splashscreen/>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container:
  {
    flex:1
  },
})
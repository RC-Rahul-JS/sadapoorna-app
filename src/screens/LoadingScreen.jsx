import React, { useEffect, useRef } from "react";
import {
  View,
  Image,
  StyleSheet,
  Animated,
  StatusBar,
  Dimensions,
  Easing
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const THEME = {
  primary: "#EE2726", // Red accent
  bgGradient: ["#fdfcf0", "#f1cb6a"], // Soft cream to gold
  barBg: "rgba(0,0,0,0.05)",
};

export default function LoadingScreen() {
  const navigation = useNavigation();
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Entrance Fade & Scale
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      })
    ]).start();

    // 2. Loop the Progress Bar
    Animated.loop(
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      })
    ).start();

    // 3. Navigation Timer
    const timer = setTimeout(() => {
      navigation.replace('Login'); 
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  // Interpolate the progress bar movement
  const translateX = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-150, 150], // Moves the inner bar across the container
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <LinearGradient
        colors={THEME.bgGradient}
        style={styles.background}
      />

      <Animated.View style={[
        styles.logoContainer, 
        { 
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }] 
        }
      ]}>
        <Image
          source={{ uri: "https://sadapoorna.in/icons/Group.png" }}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      <View style={styles.footer}>
        <View style={styles.loadingBarContainer}>
          <Animated.View style={[
            styles.loadingBar,
            { transform: [{ translateX }] }
          ]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  background: { 
    position: "absolute", 
    left: 0, 
    right: 0, 
    top: 0, 
    bottom: 0 
  },
  logoContainer: { 
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5, // Android shadow
  },
  logo: { 
    width: width * 0.55, 
    height: 120 
  },
  footer: { 
    position: "absolute", 
    bottom: 80, 
    width: "100%", 
    alignItems: "center" 
  },
  loadingBarContainer: { 
    width: 140, 
    height: 3, 
    backgroundColor: THEME.barBg, 
    borderRadius: 10, 
    overflow: "hidden" 
  },
  loadingBar: { 
    width: 60, 
    height: "100%", 
    backgroundColor: THEME.primary, 
    borderRadius: 10 
  }
});
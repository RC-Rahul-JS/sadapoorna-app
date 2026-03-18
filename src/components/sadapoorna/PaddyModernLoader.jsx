import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  StatusBar,
  Text,
  ImageBackground,
  Modal
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';

export default function PaddyModernLoader({ visible }) {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.inOut(Easing.sine),
            useNativeDriver: false, // Set to false for width interpolation
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 1500,
            easing: Easing.inOut(Easing.sine),
            useNativeDriver: false,
          }),
        ])
      ).start();
    }
  }, [visible]);

  const scale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.15],
  });

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.container}>
        <StatusBar hidden />
        <LinearGradient
          colors={['#F4F1EA', '#E8E2D2']}
          style={StyleSheet.absoluteFill}
        />
        <ImageBackground 
          source={{ uri: 'https://www.transparenttextures.com/patterns/stardust.png' }} 
          style={StyleSheet.absoluteFill}
          imageStyle={{ opacity: 0.2, resizeMode: 'repeat' }}
        />

        <View style={styles.content}>
          <Animated.View style={[styles.paddyWrapper, { transform: [{ scale }] }]}>
            <View style={[styles.grain, styles.grainLeft]} />
            <View style={[styles.grain, styles.grainRight]} />
            <View style={styles.stem} />
          </Animated.View>

          <View style={styles.textContainer}>
            <Text style={styles.brandText}>SADAPOORNA</Text>
            <View style={styles.loadingTrack}>
              <Animated.View style={[styles.loadingProgress, { 
                  width: pulseAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['10%', '100%']
                  }) 
              }]} />
            </View>
            <Text style={styles.statusText}>HARVESTING DATA...</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  content: { alignItems: "center" },
  paddyWrapper: { width: 60, height: 100, justifyContent: 'center', alignItems: 'center' },
  grain: { position: 'absolute', width: 25, height: 45, borderRadius: 25, borderTopRightRadius: 2, backgroundColor: '#EE2726' },
  grainLeft: { left: 0, top: 20, transform: [{ rotate: '-15deg' }], opacity: 0.9 },
  grainRight: { right: 0, top: 10, transform: [{ rotate: '15deg' }] },
  stem: { width: 2, height: 60, backgroundColor: '#8B6F2D', borderRadius: 1, marginTop: 30, opacity: 0.3 },
  textContainer: { marginTop: 50, alignItems: 'center' },
  brandText: { fontSize: 18, fontWeight: '800', color: '#333', letterSpacing: 6, marginBottom: 10 },
  loadingTrack: { width: 120, height: 2, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 1, overflow: 'hidden' },
  loadingProgress: { height: '100%', backgroundColor: '#EE2726' },
  statusText: { marginTop: 10, fontSize: 9, fontWeight: '600', color: '#8B6F2D', letterSpacing: 2, opacity: 0.6 }
});
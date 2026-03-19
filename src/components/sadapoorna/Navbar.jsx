import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import React, { useEffect } from "react";
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar, // Added StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// 1. Import useSafeAreaInsets
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const THEME = {
  primary: "#EE2726",
  textMain: "#FFFFFF",
  navyDark: "#f1cb6a", 
  navyLight: "#ede5b0",
};

export const Navbar = ({ cartCount, onCartPress }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets(); // 2. Get the notch height (top)
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    const startShimmer = () => {
      animatedValue.setValue(0);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 2500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => startShimmer());
    };
    startShimmer();
  }, []);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-180, 180],
  });

  return (
    <View style={styles.navContainer}>
      {/* 3. Make Status Bar transparent so the gradient shows behind it */}
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      <LinearGradient
        colors={[THEME.navyDark, THEME.navyLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.backgroundGradient}
      />

      {/* 4. Apply dynamic paddingTop based on the device notch */}
      <View style={[styles.nav, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity 
          activeOpacity={0.8} 
          style={styles.profileBtn}
          onPress={() => navigation.navigate('/profile')} 
        >
          <View style={styles.avatarBorder}>
            <Text style={styles.avatarText}>RA</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.logoWrapper}>
          <Image
            source={{ uri: "https://sadapoorna.in/icons/Group.png" }}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Animated.View
            style={[styles.shimmerBox, { transform: [{ translateX }] }]}
          >
            <LinearGradient
              colors={["transparent", "rgba(255, 255, 255, 0.4)", "transparent"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.shimmerGradient}
            />
          </Animated.View>
        </View>

        <TouchableOpacity onPress={onCartPress} activeOpacity={0.7}>
          <View style={styles.iconWrapper}>
            <Ionicons name="bag-handle-outline" size={28} color="#FFFFFF" />
            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    width: "100%",
    zIndex: 10,
  },
  backgroundGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    // Removed fixed paddingTop: 50
    paddingBottom: 15,
  },
  // ... rest of your styles stay the same
  profileBtn: { elevation: 5 },
  avatarBorder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: THEME.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFF",
  },
  avatarText: { color: "#FFF", fontWeight: "800", fontSize: 14 },
  logoWrapper: { width: 150, height: 40, overflow: "hidden", justifyContent: "center" },
  logoImage: { width: "100%", height: "100%" },
  shimmerBox: { position: "absolute", top: 0, bottom: 0, width: 100 },
  shimmerGradient: { flex: 1 },
  iconWrapper: { position: "relative", padding: 5 },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: THEME.primary,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#FFF",
  },
  badgeText: { color: "#FFF", fontSize: 9, fontWeight: "900" },
});
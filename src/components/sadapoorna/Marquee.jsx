import Ionicons from 'react-native-vector-icons/Ionicons';

import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

const MARQUEE_DATA = [
  "🔥 Imperial Basmati - 500+ sold today!",
  "✨ 20% Off on Organic Pulses",
  "⭐ Pure Mustard Oil: Top Rated this week",
  "📦 Free delivery on orders above ₹999",
];


export const Marquee = ({ primaryColor, textColor }) => {
  const [activeMarquee, setActiveMarquee] = useState(0);
  const marqueeRef = useRef<FlatList>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      let nextIndex = (activeMarquee + 1) % MARQUEE_DATA.length;
      marqueeRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setActiveMarquee(nextIndex);
    }, 3500);
    return () => clearInterval(timer);
  }, [activeMarquee]);

  return (
    <View style={styles.marqueeWrapper}>
      <View style={styles.marqueeContainer}>
        <View style={[styles.trendingBadge, { backgroundColor: primaryColor }]}>
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <Ionicons name="flash" size={12} color="#FFF" />
          </Animated.View>
          <Text style={styles.badgeText}>LIVE</Text>
        </View>

        <FlatList
          ref={marqueeRef}
          data={MARQUEE_DATA}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.marqueeItem}>
              <Text
                style={[styles.marqueeText, { color: textColor }]}
                numberOfLines={1}
              >
                {item}
              </Text>
            </View>
          )}
        />

        <View style={styles.dotContainer}>
          {MARQUEE_DATA.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor: i === activeMarquee ? primaryColor : "#DDD",
                  width: i === activeMarquee ? 12 : 4,
                },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  marqueeWrapper: {
    paddingVertical: 5,
    marginBottom: 20,
    // --- OVERLAP & SHIFT LOGIC ---
    marginTop: -30, // Shifted up 2px more (from -18 to -20)
    marginLeft: 2,
    zIndex: 10,
  },
  marqueeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    // --- BORDER LOGIC ---
    borderWidth: 1,
    borderColor: "#EEEEEE", // Added a visible light gray border
  },
  trendingBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 12,
  },
  badgeText: {
    color: "#FFF",
    fontSize: 9,
    fontWeight: "900",
    marginLeft: 4,
  },
  marqueeItem: {
    width: width - 164,
    justifyContent: "center",
  },
  marqueeText: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: -0.2,
  },
  dotContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  dot: {
    height: 4,
    borderRadius: 2,
    marginHorizontal: 2,
  },
});

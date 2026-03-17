import React, { useEffect, useRef } from "react";
import {
  Dimensions,
  Animated,
  StyleSheet,
  Text,
  View,
  Easing,
} from "react-native";

// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get("window");

const THEME = {
  primary: "#EE2726",
  textMain: "#000000",
  textMuted: "#666666",
  border: "#EEEEEE",
};

const PROMISE_DATA = [
  { id: "1", title: "Farm to Table", desc: "Direct from farmers.", icon: "bus" },
  { id: "2", title: "Pure & Organic", desc: "Zero pesticides.", icon: "shield-checkmark" },
  { id: "3", title: "Quality Tested", desc: "Batch checked.", icon: "checkmark-done-circle" },
];

// We double the data to create a seamless loop
const SCROLL_DATA = [...PROMISE_DATA, ...PROMISE_DATA];
const CARD_WIDTH = width * 0.45;
const GAP = 12;
const TOTAL_WIDTH = (CARD_WIDTH + GAP) * PROMISE_DATA.length;

export const PromiseSection = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      // Reset to 0 immediately (no animation)
      scrollX.setValue(0);
      
      // Animate to the end of one set of cards
      Animated.timing(scrollX, {
        toValue: -TOTAL_WIDTH,
        duration: 15000, // Adjust speed here (higher = slower)
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => startAnimation()); // Loop forever
    };

    startAnimation();
  }, [scrollX]);

  return (
    <View style={styles.promiseSection}>
      <Text style={styles.sectionTitle}>The Sadapoorna Promise</Text>
      <Text style={styles.subTitleText}>
        Rooted in Purity, Delivered with Care.
      </Text>

      <View style={styles.overflowContainer}>
        <Animated.View
          style={[
            styles.movingContainer,
            { transform: [{ translateX: scrollX }] },
          ]}
        >
          {SCROLL_DATA.map((item, index) => (
            <View key={`${item.id}-${index}`} style={styles.promiseCard}>
              <Ionicons name={item.icon} size={24} color={THEME.primary} />
              <Text style={styles.promiseCardTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.promiseCardDesc} numberOfLines={2}>{item.desc}</Text>
            </View>
          ))}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  promiseSection: { marginBottom: 25 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: THEME.textMain,
    marginBottom: 12,
    paddingHorizontal: 25,
  },
  subTitleText: {
    color: THEME.textMuted,
    fontSize: 12,
    marginTop: -8,
    marginBottom: 15,
    paddingHorizontal: 25,
  },
  overflowContainer: {
    overflow: 'hidden',
    width: width,
  },
  movingContainer: {
    flexDirection: "row",
    paddingLeft: 25,
  },
  promiseCard: {
    width: CARD_WIDTH,
    padding: 15,
    borderRadius: 20,
    backgroundColor: "#F9F9F9",
    marginRight: GAP,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  promiseCardTitle: {
    fontWeight: "900",
    fontSize: 14,
    marginTop: 8,
    color: THEME.textMain,
  },
  promiseCardDesc: {
    fontSize: 10,
    color: THEME.textMuted,
    marginTop: 4,
    lineHeight: 14,
  },
});
import Ionicons from 'react-native-vector-icons/Ionicons';

import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

const THEME = {
  primary: "#EE2726",
  textMain: "#000000",
  textMuted: "#666666",
  border: "#EEEEEE",
};

const PROMISE_DATA = [
  {
    id: "1",
    title: "Farm to Table",
    desc: "Direct sourcing from local farmers.",
    icon: "bus",
  },
  {
    id: "2",
    title: "Pure & Organic",
    desc: "Zero pesticides or harmful chemicals.",
    icon: "shield-checkmark",
  },
  {
    id: "3",
    title: "Quality Tested",
    desc: "Rigorous checks for every batch.",
    icon: "checkmark-done-circle",
  },
];

export const PromiseSection = () => {
  return (
    <View style={styles.promiseSection}>
      <Text style={styles.sectionTitle}>The Sadapoorna Promise</Text>
      <Text style={styles.subTitleText}>
        Rooted in Purity, Delivered with Care.
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.promiseScroll}
      >
        {PROMISE_DATA.map((item) => (
          <View key={item.id} style={styles.promiseCard}>
            <Ionicons name={item.icon} size={30} color={THEME.primary} />
            <Text style={styles.promiseCardTitle}>{item.title}</Text>
            <Text style={styles.promiseCardDesc}>{item.desc}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  promiseSection: { marginBottom: 30 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: THEME.textMain,
    marginBottom: 15,
  },
  subTitleText: {
    color: THEME.textMuted,
    fontSize: 14,
    marginTop: -10,
    marginBottom: 15,
  },
  promiseScroll: { paddingRight: 25 },
  promiseCard: {
    width: width * 0.45,
    padding: 20,
    borderRadius: 25,
    backgroundColor: "#F9F9F9",
    marginRight: 15,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  promiseCardTitle: {
    fontWeight: "900",
    fontSize: 16,
    marginTop: 10,
    color: THEME.textMain,
  },
  promiseCardDesc: {
    fontSize: 12,
    color: THEME.textMuted,
    marginTop: 5,
    lineHeight: 18,
  },
});

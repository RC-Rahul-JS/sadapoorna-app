import React from "react";
import { ScrollView, Image, StyleSheet, Dimensions, View } from "react-native";

const { width } = Dimensions.get("window");

export const PromoBanners = () => {
  const banners = [
    "https://img.freepik.com/free-vector/organic-food-banner-template_23-2148902501.jpg",
    "https://img.freepik.com/free-vector/flat-agriculture-horizontal-banner-template_23-2148888491.jpg",
  ];

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled>
        {banners.map((url, i) => (
          <Image key={i} source={{ uri: url }} style={styles.banner} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  banner: { width: width - 50, height: 150, borderRadius: 20, marginRight: 10 },
});
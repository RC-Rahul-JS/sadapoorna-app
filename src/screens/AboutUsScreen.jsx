import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  Image,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const THEME = {
  bg: "#FFFFFF",
  primary: "#EE2726",
  accent: "#eac15a",
  secondaryBg: "#f8efda",
  textMain: "#000000",
  textMuted: "#666666",
  border: "#EEEEEE",
};

export default function AboutUsScreen() {
  const navigation = useNavigation();

  const openURL = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <View style={styles.secondBackground} />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.miniBack}>
            <Ionicons name="chevron-back" size={24} color={THEME.textMain} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About Sadapoorna</Text>
          <View style={{ width: 42 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.heroContainer}>
            <Image
              source={{ uri: "https://png.pngtree.com/thumb_back/fh260/background/20240923/pngtree-raw-organic-uncooked-white-rice-in-wooden-bowl-with-green-plant-image_16243933.jpg" }}
              style={styles.heroImage}
            />
            <LinearGradient colors={["transparent", "rgba(0,0,0,0.8)"]} style={styles.heroOverlay}>
              <Text style={styles.heroTag}>Trusted Name in Premium Rice</Text>
              <Text style={styles.heroTitle}>Sadapoorna Traders</Text>
            </LinearGradient>
          </View>

          <View style={styles.content}>
            <Text style={styles.sectionTitle}>Organic & Healthy Rice</Text>
            <Text style={styles.paragraph}>
              Sadapoorna is a premium rice brand dedicated to delivering the purest and most authentic rice to households across India.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.bg },
  secondBackground: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: THEME.secondaryBg, zIndex: -1 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingTop: 20, paddingBottom: 15 },
  miniBack: { width: 42, height: 42, borderRadius: 14, backgroundColor: "#FFF", justifyContent: "center", alignItems: "center", elevation: 3 },
  headerTitle: { fontSize: 18, fontWeight: "900", color: THEME.textMain },
  heroContainer: { width: width, height: 220 },
  heroImage: { width: "100%", height: "100%", resizeMode: "cover" },
  heroOverlay: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 20, paddingTop: 40 },
  heroTag: { color: THEME.accent, fontSize: 10, fontWeight: "800", textTransform: "uppercase" },
  heroTitle: { color: "#FFF", fontSize: 26, fontWeight: "900" },
  content: { padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: "900", color: THEME.textMain, marginBottom: 12 },
  paragraph: { fontSize: 13, color: THEME.textMuted, lineHeight: 20 },
});
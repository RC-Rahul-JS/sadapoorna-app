import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar 
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

const THEME = {
  bg: "#FFFFFF",
  primary: "#EE2726",
  secondaryBg: "#f8efda",
  textMain: "#000000",
  textMuted: "#666666",
};

export default function ComingSoonScreen({ route }) {
  const navigation = useNavigation();
  // Get the title from route params if passed, otherwise default to "Feature"
  const featureName = route?.params?.title || "This Feature";

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.backgroundCircle} />
      
      <SafeAreaView style={styles.safe}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color={THEME.textMain} />
        </TouchableOpacity>

        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons name="rocket-outline" size={80} color={THEME.primary} />
          </View>
          
          <Text style={styles.title}>Coming Soon!</Text>
          <Text style={styles.subtitle}>
            We're working hard to bring you the {featureName} experience. 
            Stay tuned for updates!
          </Text>

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.footerText}>Version 2.0.4</Text>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.bg },
  safe: { flex: 1, alignItems: 'center',marginTop: 20 },
  backgroundCircle: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: THEME.secondaryBg,
    zIndex: -1,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 20,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: THEME.secondaryBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: THEME.textMain,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: THEME.textMuted,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  button: {
    backgroundColor: THEME.primary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 3,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  footerText: {
    fontSize: 12,
    color: "#CCC",
    marginBottom: 20,
  }
});
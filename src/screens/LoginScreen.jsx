import React, { useState, useEffect, useRef } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  Image, SafeAreaView, KeyboardAvoidingView, Platform, 
  Dimensions, ScrollView, Animated, Easing, ActivityIndicator, Alert 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { API_URL, API_KEY } from '@env';
import axios from 'axios';

const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // New State for Sign Up
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  // Logo Shine Animation Setup
  const shineAnim = useRef(new Animated.Value(-width * 0.4)).current; 

  useEffect(() => {
    const shineLoop = Animated.loop(
      Animated.timing(shineAnim, {
        toValue: width * 0.4, 
        duration: 2500,        
        easing: Easing.linear,
        useNativeDriver: true, 
      })
    );
    shineLoop.start();
    return () => shineLoop.stop();
  }, [shineAnim]);

  const handleSendOtp = async () => {
    if (phoneNumber.length !== 10) {
      Alert.alert("Invalid Number", "Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    try {
      // Adjust the endpoint path according to your actual backend API
      const endpoint = '/auth/send-otp';
      // const endpoint = isSignUp ? '/auth/register' : '/auth/login';
      
      const response = await axios.post(`${API_URL}${endpoint}`, {
        phone: `${phoneNumber}`,
      });

      if (response.status === 200) {
        setIsOtpSent(true);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong. Please try again.";
      Alert.alert("Request Failed", errorMsg);
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter the 6-digit code.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/verify-otp`, {
        phone: `${phoneNumber}`,
        otp: `${otp}`
      });

      if (response.data.token) {
        // Save token here (e.g., AsyncStorage) then navigate
        Alert.alert(response.data?.status);
        navigation.replace("Home");
      }
    } catch (error) {
      Alert.alert("Verification Failed", "The OTP you entered is incorrect.");
    } finally {
      setLoading(false);
    }
  };
return (
    <LinearGradient 
      colors={['#F1DBA2', '#F9F1DC', '#FDFAF3']} 
      start={{ x: 0, y: 0.5 }} 
      end={{ x: 1, y: 0.5 }} 
      style={styles.gradientBg}
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
            
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Image 
                  source={{ uri: 'https://sadapoorna.in/icons/Group.png' }} 
                  style={styles.logoSmall}
                  resizeMode="contain"
                />
                <Animated.View 
                  style={[
                    styles.shineLine, 
                    { transform: [{ translateX: shineAnim }] }
                  ]} 
                />
              </View>
              <Text style={styles.brandTitle}>Trusted partner in rice, grains, and essential commodities.</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.welcomeText}>
                {isSignUp ? "Namaste! 🙏" : "Welcome back!"}
              </Text>

              <Text style={styles.title}>
                {isOtpSent ? "Verify OTP" : (isSignUp ? "Create Account" : "Login")}
              </Text>

              <Text style={styles.subtitle}>
                {isOtpSent 
                  ? "Enter the 6-digit code sent to your WhatsApp" 
                  : `Enter your mobile number to ${isSignUp ? 'register' : 'login'} via WhatsApp`}
              </Text>

              {!isOtpSent ? (
                <View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.countryCode}>+91</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Mobile Number"
                      keyboardType="phone-pad"
                      maxLength={10}
                      placeholderTextColor="#999"
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                      editable={!loading}
                    />
                  </View>

                  <TouchableOpacity 
                    style={[styles.redButton, loading && { opacity: 0.7 }]} 
                    onPress={handleSendOtp}
                    disabled={loading}
                  >
                    {loading ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={styles.buttonText}>
                            {isSignUp ? "REGISTER VIA WHATSAPP" : "GET OTP VIA WHATSAPP"}
                        </Text>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity 
                    onPress={() => setIsSignUp(!isSignUp)}
                    style={styles.toggleContainer}
                    disabled={loading}
                  >
                    <Text style={styles.toggleText}>
                      {isSignUp ? "Already have an account? " : "Don't have an account? "}
                      <Text style={styles.toggleAction}>{isSignUp ? "Login" : "Sign Up"}</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <TextInput
                    style={styles.otpInput}
                    placeholder="0 0 0 0 0 0"
                    keyboardType="number-pad"
                    maxLength={6}
                    textAlign="center"
                    placeholderTextColor="#DDD"
                    value={otp}
                    onChangeText={setOtp}
                    autoFocus
                    editable={!loading}
                  />
                  
                  <TouchableOpacity 
                    style={[styles.redButton, loading && { opacity: 0.7 }]} 
                    onPress={handleVerifyOtp}
                    disabled={loading}
                  >
                    {loading ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={styles.buttonText}>VERIFY & {isSignUp ? "REGISTER" : "LOGIN"}</Text>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => setIsOtpSent(false)} disabled={loading}>
                    <Text style={styles.changeText}>Change Mobile Number</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Rooted in Purity • Delivered with Care</Text>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  gradientBg: { flex: 1 },
  container: { flex: 1 }, 
  scrollContent: { flexGrow: 1, justifyContent: 'center', paddingVertical: 20 },
  header: { alignItems: 'center', marginBottom: 30 },
  logoContainer: { width: 200, height: 58, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  logoSmall: { width: '100%', height: '100%' }, 
  shineLine: { 
    position: 'absolute', 
    top: -20, 
    left: 0, 
    width: 40, 
    height: 100, 
    backgroundColor: 'rgba(255, 255, 255, 0.4)', 
    opacity: 0.8,
    transform: [{ rotate: '25deg' }], 
  },
  brandTitle: { fontSize: 10, fontWeight: 'bold', color: '#C02E2E', letterSpacing: 2, marginTop: 10,textAlign:'center' },

  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
    marginHorizontal: 25,
    padding: 25,
    borderRadius: 20,
    elevation: 8, 
    shadowColor: '#000', 
    shadowOpacity: 0.12,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 5 },
    borderWidth: 1,
    borderColor: 'rgba(240, 230, 210, 0.5)',
  },
  welcomeText: { textAlign: 'center', color: '#C02E2E', fontSize: 14, fontWeight: '600', marginBottom: 5 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', textAlign: 'center' },
  subtitle: { fontSize: 13, color: '#666', textAlign: 'center', marginTop: 10, marginBottom: 25, lineHeight: 18 },

  inputWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderBottomWidth: 1.5, 
    borderBottomColor: '#C02E2E', 
    marginBottom: 30,
    paddingBottom: 5
  },
  countryCode: { fontSize: 18, fontWeight: 'bold', color: '#333', marginRight: 10 },
  input: { flex: 1, fontSize: 18, color: '#333', height: 45 },

  otpInput: { fontSize: 28, letterSpacing: 15, color: '#C02E2E', fontWeight: 'bold', marginBottom: 30 },

  redButton: { 
    backgroundColor: '#C02E2E', 
    paddingVertical: 15, 
    borderRadius: 10, 
    alignItems: 'center',
    shadowColor: '#C02E2E',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 14, letterSpacing: 1 },
  
  toggleContainer: { marginTop: 20, alignItems: 'center' },
  toggleText: { color: '#666', fontSize: 13 },
  toggleAction: { color: '#C02E2E', fontWeight: 'bold' },

  changeText: { textAlign: 'center', marginTop: 15, color: '#C02E2E', fontSize: 13, fontWeight: '500' },
  
  footer: { marginTop: 40, alignItems: 'center' },
  footerText: { color: 'rgba(170, 170, 170, 0.7)', fontSize: 11, fontStyle: 'italic' }
});

export default LoginScreen;
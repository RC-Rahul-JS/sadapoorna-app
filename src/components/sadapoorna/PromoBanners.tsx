import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

// --- TYPESCRIPT FIX ---
// This line tells TypeScript to stop complaining about the missing declaration file
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get("window");

// --- LAYOUT SETTINGS ---
const CARD_WIDTH = width - 40;
const CARD_HEIGHT = 180; // Set to 180 as requested
const BORDER_RADIUS = 25; // Set to 25 as requested
const THEME = {
  primary: "#EE2726",
  accent: "#eac15a",
};

interface BannerItem {
  id: string;
  title: string;
  offer: string;
  image: string;
  tag: string;
}

const BANNERS: BannerItem[] = [
  {
    id: "1",
    title: "Premium\nBasmati Rice",
    offer: "Flat 20% OFF",
    image: "https://cpimg.tistatic.com/6219303/b/4/ponni-rice.jpg",
    tag: "FRESH HARVEST",
  },
  {
    id: "2",
    title: "Organic\nPulses & Dals",
    offer: "Extra ₹100 Off",
    image: "https://images.unsplash.com/photo-1585994193063-da402927230b?w=800",
    tag: "FARM DIRECT",
  },
  {
    id: "3",
    title: "Cold Pressed\nMustard Oil",
    offer: "Best Price",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800",
    tag: "PURE & NATURAL",
  },
];

export const PromoBanners = () => {
  const [activeBanner, setActiveBanner] = useState(0);
  const bannerRef = useRef<FlatList<BannerItem>>(null);
  const isAutoScrolling = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      isAutoScrolling.current = true;
      let nextIndex = (activeBanner + 1) % BANNERS.length;
      
      bannerRef.current?.scrollToIndex({ 
        index: nextIndex, 
        animated: true,
        viewPosition: 0.5 
      });
      
      setActiveBanner(nextIndex);
      setTimeout(() => { isAutoScrolling.current = false; }, 600);
    }, 4000);

    return () => clearInterval(timer);
  }, [activeBanner]);

  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!isAutoScrolling.current) {
        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        if (index >= 0 && index < BANNERS.length) {
            setActiveBanner(index);
        }
    }
  };

  const renderItem = ({ item }: { item: BannerItem }) => (
    <View style={styles.bannerWrapper}>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.promoCard}
        imageStyle={{ borderRadius: BORDER_RADIUS }}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={styles.overlay}
        >
          <View style={styles.content}>
            <View style={styles.tagBadge}>
              <Text style={styles.tagText}>{item.tag}</Text>
            </View>
            <Text style={styles.promoTitle}>{item.title}</Text>
            <TouchableOpacity activeOpacity={0.8} style={styles.promoBtn}>
              <Text style={styles.promoBtnText}>{item.offer}</Text>
              <Ionicons name="arrow-forward" size={14} color="#000" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={bannerRef}
        data={BANNERS}
        horizontal
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        snapToInterval={width}
        snapToAlignment="center"
        decelerationRate="fast"
        onMomentumScrollEnd={onMomentumScrollEnd}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      <View style={styles.dotContainer}>
        {BANNERS.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              activeBanner === i ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    marginVertical: 10,
  },
  bannerWrapper: { 
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoCard: {
    height: CARD_HEIGHT, 
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: BORDER_RADIUS,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  overlay: {
    flex: 1,
    padding: 18,
    justifyContent: "flex-end",
  },
  content: { zIndex: 1 },
  tagBadge: {
    backgroundColor: THEME.accent,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  tagText: {
    color: "#000",
    fontSize: 9,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  promoTitle: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "900",
    lineHeight: 24,
  },
  promoBtn: {
    backgroundColor: "#FFF",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  promoBtnText: {
    fontWeight: "900",
    fontSize: 11,
    color: "#000",
    marginRight: 6,
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: { height: 4, borderRadius: 2, marginHorizontal: 3 },
  activeDot: { width: 20, backgroundColor: THEME.primary },
  inactiveDot: { width: 6, backgroundColor: "#E0E0E0" },
});
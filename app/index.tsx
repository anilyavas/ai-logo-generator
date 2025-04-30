import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Pressable,
  StyleSheet,
  StatusBar,
  Platform,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { createLogo } from '~/utils/createLogo';

const logoStyle = [
  { title: 'No Style', logo: '' },
  { title: 'Monogram', logo: require('../assets/logo/monogram.png') },
  { title: 'Abstract', logo: require('../assets/logo/abstract.png') },
  { title: 'Mascot', logo: require('../assets/logo/mascot.png') },
];

export default function Home() {
  const [selectedTitle, setSelectedTitle] = useState('No Style');
  const [prompt, setPrompt] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  const generateLogo = async () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt');
      return;
    }
    setLoading(true);
    try {
      const imageUrl = await createLogo(prompt, selectedTitle);
      setUrl(imageUrl);
      setIsReady(true);
    } catch (error) {
      console.error('Logo generation failed:', error);
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1">
      <LinearGradient style={{ flex: 1 }} colors={['#09090B', '#1C55FF', '#C26CFF', '#09090B']}>
        <BlurView intensity={210} style={StyleSheet.absoluteFill} tint="dark">
          <SafeAreaView
            style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
            className="flex-1">
            <View className="items-center p-2">
              <Text className="text-lg font-extrabold text-[#FAFAFA]">AI Logo</Text>
            </View>
            {loading && (
              <View className="m-4 flex-row rounded-md bg-[#27272A]">
                <ActivityIndicator
                  size="large"
                  style={{ backgroundColor: '#18181B', width: 70, height: 70 }}
                />
                <View className="justify-center p-4">
                  <Text className="text-xl font-extrabold text-[#FAFAFA]">
                    Creating Your Design...
                  </Text>
                  <Text className="text-sm font-semibold text-[#71717A]">Ready in 2 minutes</Text>
                </View>
              </View>
            )}
            {!loading && isReady && url && (
              <Link
                href={{
                  pathname: '/result',
                  params: { prompt, style: selectedTitle, imageUrl: url },
                }}
                asChild>
                <Pressable className="m-4 flex-row items-center overflow-hidden rounded-xl">
                  <Image
                    source={{ uri: url }}
                    style={{
                      width: 70,
                      height: 70,
                      borderTopLeftRadius: 12,
                      borderBottomLeftRadius: 12,
                    }}
                  />
                  <LinearGradient
                    colors={['#2938DC', '#943DFF']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      flex: 1,
                      paddingVertical: 16,
                      paddingHorizontal: 20,
                      borderTopRightRadius: 12,
                      borderBottomRightRadius: 12,
                    }}>
                    <Text className="text-lg font-extrabold text-white">Your Design is Ready!</Text>
                    <Text className="text-sm font-medium text-white/80">Tap to see it.</Text>
                  </LinearGradient>
                </Pressable>
              </Link>
            )}
            {!loading && hasError && (
              <Pressable
                onPress={generateLogo}
                className="m-4 flex-row items-center overflow-hidden rounded-xl">
                <View className="h-[70px] w-[70px] items-center justify-center bg-[#EF4444]/70">
                  <MaterialIcons name="error-outline" size={30} color="#fff" />
                </View>
                <View className="h-[70px] flex-1 bg-[#EF4444] px-4 py-3">
                  <Text className="text-base font-extrabold text-white">
                    Oops, something went wrong!
                  </Text>
                  <Text className="text-sm font-medium text-white/80">Click to try again.</Text>
                </View>
              </Pressable>
            )}
            <View className="mx-4 flex-row items-center justify-between p-2">
              <Text className="text-2xl font-extrabold text-[#FAFAFA]">Enter Your Prompt</Text>
              <Pressable>
                <Text className="text-sm text-[#FAFAFA]">Surprise Me</Text>
              </Pressable>
            </View>
            <View className="m-4 h-1/3  justify-between rounded-lg bg-[#27272A] p-4">
              <TextInput
                value={prompt}
                onChangeText={setPrompt}
                multiline
                maxLength={500}
                placeholder="A blue lion logo reading 'HEXA' in bold letters"
                placeholderTextColor="#71717A"
                style={{ color: '#FAFAFA', fontSize: 17 }}
              />
              <Text className="text-sm text-[#71717A]">{prompt.length}/500</Text>
            </View>
            <View className="flex-1 gap-4 p-6">
              <Text className="text-2xl font-extrabold text-[#FAFAFA]">Logo Styles</Text>
              <FlatList
                data={logoStyle}
                horizontal
                contentContainerClassName="gap-6"
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                  const isSelected = item.title === selectedTitle;

                  return (
                    <Pressable
                      key={item.title}
                      className="items-center gap-2"
                      onPress={() => setSelectedTitle(item.title)}>
                      {item.logo === '' ? (
                        <View
                          style={{
                            width: 90,
                            height: 90,
                            borderColor: isSelected ? 'red' : 'transparent',
                            borderWidth: isSelected ? 2 : 0,
                            borderRadius: 16,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <MaterialIcons name="block" size={30} color="#FAFAFA" />
                        </View>
                      ) : (
                        <Image
                          source={item.logo}
                          style={{
                            width: 90,
                            height: 90,
                            borderColor: isSelected ? 'red' : 'transparent',
                            borderWidth: isSelected ? 2 : 0,
                            borderRadius: 16,
                          }}
                        />
                      )}
                      <Text className="text-[#FAFAFA]">{item.title}</Text>
                    </Pressable>
                  );
                }}
              />
            </View>
            <Pressable className="w-full px-6 pb-4" onPress={generateLogo}>
              <LinearGradient
                colors={['#2938DC', '#943DFF']}
                style={{ borderRadius: 30 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
                <Text className="m-4 text-center text-lg font-extrabold text-[#FAFAFA]">
                  Create
                </Text>
              </LinearGradient>
            </Pressable>
          </SafeAreaView>
          <StatusBar barStyle="light-content" />
        </BlurView>
      </LinearGradient>
    </View>
  );
}

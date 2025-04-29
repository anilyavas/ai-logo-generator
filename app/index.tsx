import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Pressable,
  ScrollView,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
export default function Home() {
  return (
    <View className="flex-1">
      <LinearGradient style={{ flex: 1 }} colors={['#09090B', '#1C55FF', '#C26CFF', '#09090B']}>
        <BlurView intensity={210} style={StyleSheet.absoluteFill} tint="dark">
          <SafeAreaView
            style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
            <View className="items-center p-2">
              <Text className="text-lg font-extrabold text-[#FAFAFA]">AI Logo</Text>
            </View>
            <View className="mx-4 flex-row items-center justify-between p-2">
              <Text className="text-2xl font-extrabold text-[#FAFAFA]">Enter Your Prompt</Text>
              <Pressable>
                <Text className="text-sm text-[#FAFAFA]">Surprise Me</Text>
              </Pressable>
            </View>
            <View className="m-4 h-2/5  justify-between rounded-lg bg-[#27272A] p-2">
              <TextInput
                placeholder="A blue lion logo reading ‘HEXA’ in bold letters"
                placeholderTextColor="#71717A"
                style={{ color: '#FAFAFA' }}
              />
              <Text className="text-sm text-[#71717A]/15">0/50</Text>
            </View>
            <View className="p-6">
              <Text className="text-2xl font-extrabold text-[#FAFAFA]">Logo Styles</Text>
            </View>
            <Pressable className="w-full px-10">
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

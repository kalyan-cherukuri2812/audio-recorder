import React from "react";
import { View, SafeAreaView, StyleSheet, StyleProp, ViewStyle, StatusBar, Platform } from "react-native";

interface ScreenWrapperProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

function ScreenWrapper({ children, style }: ScreenWrapperProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default ScreenWrapper;

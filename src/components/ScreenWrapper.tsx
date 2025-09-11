import React from "react";
import { View, SafeAreaView, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";

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
  },
  container: {
    paddingTop: responsiveHeight(3),
    flex: 1,
    backgroundColor: "white",
  },
});

export default ScreenWrapper;

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import RecordScreen from "../screens/RecordScreen";
import ListScreen from "../screens/ListScreen";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="RecordScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="ListScreen"
          component={ListScreen}
        />
        <Stack.Screen
          name="RecordScreen"
          component={RecordScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

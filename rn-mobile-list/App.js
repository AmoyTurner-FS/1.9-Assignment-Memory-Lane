import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home";
import Manage from "./screens/Manage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Movies" }}
        />
        <Stack.Screen name="Manage" component={Manage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

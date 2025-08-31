import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home";
import Manage from "./screens/Manage";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Protected from "./screens/Protected";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Manage" component={Manage} />
        <Stack.Screen name="Protected" component={Protected} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

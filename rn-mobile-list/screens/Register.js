import { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { register } from "../lib/api";

export default function Register({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await register(username, password);
      navigation.navigate("Login");
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
});

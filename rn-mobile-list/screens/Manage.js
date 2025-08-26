import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  Alert,
} from "react-native";
import styles from "../appStyles";
import { API, json } from "../lib/api";

export default function Manage({ route, navigation }) {
  const id = route?.params?.id;
  const isEdit = Boolean(id);
  const [form, setForm] = useState({ title: "", year: "", rating: "" });
  const [loading, setLoading] = useState(false);

  function onChange(name, value) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  useEffect(() => {
    async function fetchOne() {
      if (!isEdit) return;
      setLoading(true);
      try {
        const res = await fetch(`${API}/api/movies/${id}`);
        const data = await res.json();
        setForm({
          title: data.title ?? "",
          year: String(data.year ?? ""),
          rating: String(data.rating ?? ""),
        });
      } catch (e) {
        console.error("Fetch one error", e);
        Alert.alert("Error", "Unable to load movie.");
      } finally {
        setLoading(false);
      }
    }
    fetchOne();
  }, [id, isEdit]);

  async function onSubmit() {
    const payload = {
      title: form.title.trim(),
      year: Number(form.year),
      rating: Number(form.rating),
    };

    try {
      if (isEdit) {
        await fetch(`${API}/api/movies/${id}`, json("PATCH", payload));
      } else {
        await fetch(`${API}/api/movies`, json("POST", payload));
      }
      navigation.navigate("Home");
    } catch (e) {
      console.error("Submit error", e);
      Alert.alert("Error", "Unable to save movie.");
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <Text>Loading…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.heading}>
          {isEdit ? "Edit Movie" : "Add Movie"}
        </Text>

        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={form.title}
          onChangeText={(t) => onChange("title", t)}
          placeholder="e.g., Inside Out"
        />

        <Text style={styles.label}>Year</Text>
        <TextInput
          style={styles.input}
          value={form.year}
          onChangeText={(t) => onChange("year", t)}
          placeholder="e.g., 2024"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Rating (0–10)</Text>
        <TextInput
          style={styles.input}
          value={form.rating}
          onChangeText={(t) => onChange("rating", t)}
          placeholder="e.g., 8.5"
          keyboardType="decimal-pad"
        />

        <View style={styles.btnRow}>
          <Button title={isEdit ? "Save" : "Create"} onPress={onSubmit} />
          <Button
            title="Cancel"
            color="#6b7280"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

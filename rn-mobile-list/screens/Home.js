import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import styles from "../appStyles";
import { API } from "../lib/api";

export default function Home({ navigation }) {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const res = await fetch(`${API}/api/movies`);
      const data = await res.json();
      setMovies(data);
    } catch (e) {
      console.error("Load error", e);
    } finally {
      setLoading(false);
    }
  }

  async function remove(id) {
    const ok =
      typeof window !== "undefined"
        ? window.confirm("Delete this movie?")
        : true; // fallback for devices without confirm
    if (!ok) return;

    await fetch(`${API}/api/movies/${id}`, { method: "DELETE" });
    setMovies((prev) => prev.filter((m) => m._id !== id));
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", load);
    return unsubscribe;
  }, [navigation]);

  if (loading)
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <Text>Loading…</Text>
        </View>
      </SafeAreaView>
    );

  if (!movies || movies.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <Text style={styles.heading}>Movies</Text>
          <Text style={styles.empty}>No movies yet.</Text>
          <Button
            title="Add Movie"
            onPress={() => navigation.navigate("Manage")}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.heading}>Movies</Text>

        <View style={styles.actionsRow}>
          <Button
            title="Add Movie"
            onPress={() => navigation.navigate("Manage")}
          />
        </View>

        <FlatList
          style={styles.list}
          data={movies}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.titleLine}>{item.title}</Text>
              <Text style={styles.meta}>
                {item.year} • {item.rating}/10
              </Text>

              <View style={styles.actionsRow}>
                <Button
                  title="Edit"
                  onPress={() =>
                    navigation.navigate("Manage", { id: item._id })
                  }
                />
                <Button
                  title="Delete"
                  color="#b91c1c"
                  onPress={() => remove(item._id)}
                />
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

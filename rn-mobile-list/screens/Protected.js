import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { getMovies } from "../lib/api";

export default function Protected() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies().then(setMovies).catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Protected Movies</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.title}</Text>
            <Text>{item.director}</Text>
            <Text>{item.year}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  card: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
});

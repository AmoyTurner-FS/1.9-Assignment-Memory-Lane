import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, padding: 16 },

  heading: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    ...Platform.select({
      ios: { color: "tomato" },
      android: { color: "royalblue" },
      default: { color: "#0f172a" },
    }),
  },

  list: { marginTop: 8 },
  card: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  titleLine: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  meta: { color: "#6b7280" },

  actionsRow: { flexDirection: "row", gap: 12, marginTop: 10 },

  label: { fontWeight: "600", marginTop: 10, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 10,
  },
  btnRow: { flexDirection: "row", gap: 12, marginTop: 16 },

  empty: { color: "#6b7280", marginBottom: 12 },
  link: { color: "#0b3380", fontWeight: "600" },
});

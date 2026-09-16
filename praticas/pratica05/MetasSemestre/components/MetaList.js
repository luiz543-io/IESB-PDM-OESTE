import React from "react";

import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";

export default function MetaList({
  metas,
  removerMeta,
}) {
  return (
    <View style={styles.list}>
      <FlatList
        data={metas}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Nenhuma meta adicionada ainda.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {item.texto}
            </Text>

            <Pressable
              style={styles.deleteButton}
              onPress={() => removerMeta(item.id)}
              android_ripple={{ color: "#dddddd" }}
            >
              <Text style={styles.deleteText}>
                Excluir
              </Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },

  item: {
    marginBottom: 8,
    padding: 15,
    backgroundColor: "#eeeeee",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  itemText: {
    flex: 1,
    fontSize: 16,
  },

  deleteButton: {
    backgroundColor: "#dc2626",
    padding: 8,
    borderRadius: 6,
    marginLeft: 10,
  },

  deleteText: {
    color: "#ffffff",
    fontWeight: "bold",
  },

  emptyText: {
    color: "#666666",
    fontSize: 16,
    marginTop: 10,
  },
});
import React from "react";

import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
} from "react-native";

import {
  INPUT_PLACEHOLDER,
  BUTTON_TEXT,
} from "../labels";

export default function MetaInput({
  texto,
  setTexto,
  adicionarMeta,
}) {
  return (
    <View style={styles.inputRow}>
      <TextInput
        style={styles.input}
        placeholder={INPUT_PLACEHOLDER}
        value={texto}
        onChangeText={setTexto}
      />

      <Pressable
        style={styles.button}
        onPress={adicionarMeta}
        android_ripple={{ color: "#dddddd" }}
      >
        <Text style={styles.buttonText}>
          {BUTTON_TEXT}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#999999",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },

  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
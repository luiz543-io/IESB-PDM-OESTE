import React from "react";

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
} from "react-native";

import {
  SafeAreaView,
  SafeAreaProvider,
} from "react-native-safe-area-context";

import {
  APP_TITLE,
  INPUT_PLACEHOLDER,
  BUTTON_TEXT,
  LIST_TITLE,
} from "./labels";

const disciplinas = [
  "Programação para Dispositivos Móveis",
  "Banco de Dados",
  "Engenharia de Software",
  "Desenvolvimento Web",
];

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        <Text style={styles.title}>
          {APP_TITLE}
        </Text>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder={INPUT_PLACEHOLDER}
          />

          <View style={styles.buttonContainer}>
            <Button
              title={BUTTON_TEXT}
              onPress={() => {}}
            />
          </View>
        </View>

        <Text style={styles.listTitle}>
          {LIST_TITLE}
        </Text>

        <View style={styles.list}>
          {disciplinas.map((disciplina, index) => (
            <Text
              key={index}
              style={styles.item}
            >
              {disciplina}
            </Text>
          ))}
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  input: {
    width: "70%",
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    padding: 10,
  },

  buttonContainer: {
    flex: 1,
    marginLeft: 10,
  },

  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  list: {
    flex: 1,
  },

  item: {
    margin: 5,
    padding: 15,
    backgroundColor: "#eeeeee",
    borderRadius: 8,
  },
});
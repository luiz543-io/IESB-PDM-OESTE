import React, { useState, useEffect } from "react";
import {StyleSheet, View, Text, Image } from "react-native";
import {
  SafeAreaView,
  SafeAreaProvider,
} from "react-native-safe-area-context";

import AsyncStorage from "@react-native-async-storage/async-storage";

import MetaInput from "./components/MetaInput";
import MetaList from "./components/MetaList";

import {
  APP_TITLE,
  LIST_TITLE,
} from "./labels";

export default function App() {
  const [texto, setTexto] = useState("");
  const [metas, setMetas] = useState([]);

  useEffect(() => {
  async function carregarMetas() {
    try {
      const metasSalvas = await AsyncStorage.getItem(
        "@metas_semestre"
      );

      if (metasSalvas !== null) {
        setMetas(JSON.parse(metasSalvas));
      }
    } catch (error) {
      console.log("Erro ao carregar metas:", error);
    }
  }

  carregarMetas();
}, []);

useEffect(() => {
  async function salvarMetas() {
    try {
      await AsyncStorage.setItem(
        "@metas_semestre",
        JSON.stringify(metas)
      );
    } catch (error) {
      console.log("Erro ao salvar metas:", error);
    }
  }

  salvarMetas();
}, [metas]);

  function adicionarMeta() {
    const textoLimpo = texto.trim();

    if (textoLimpo === "") {
      return;
    }

    const novaMeta = {
      id: Date.now().toString(),
      texto: textoLimpo,
      criadaEm: new Date().toISOString(),
    };

    setMetas((metasAnteriores) => [
      ...metasAnteriores,
      novaMeta,
    ]);

    setTexto("");
  }

  function removerMeta(id) {
    setMetas((metasAnteriores) =>
      metasAnteriores.filter((meta) => meta.id !== id)
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Image source={require('./assets/favicon.png')} style={styles.Image} />
        <Text style={styles.title}>
          {APP_TITLE}
        </Text>

        <MetaInput
          texto={texto}
          setTexto={setTexto}
          adicionarMeta={adicionarMeta}
        />

        <Text style={styles.listTitle}>
          {LIST_TITLE}
        </Text>

        <MetaList
          metas={metas}
          removerMeta={removerMeta}
        />
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

  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  Image: {
    width: 30,
    height: 30,
    marginBottom: 12,
  },
});
import { TextInput, Button, StyleSheet, Text, View } from 'react-native';
import { rotulo_input_meta, rotulo_btn_cadastro_meta, rotulo_lista_metas } from './mensagens.js'

export default function App() {
//Colocar as funções

  return (
    <View style={styles.mainContainer}>
      <View style={{width:150}}>
        <View style={{width: 150}}>
          <TextInput style={styles.inputText} placeholder={rotulo_input_meta} />
        </View>

        <View style={{width: 150}}>
          <Button title={rotulo_btn_cadastro_meta} />
        </View>
      </View>

      <View style={styles.metaContainer}>
        <Text style={styles.Text}>{rotulo_lista_metas}</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({                          
  container: {
    flex: 1,
    backgroundColor: '#eaefff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    padding: 30,
    //tag de estilo
    inputText: {
      borderColor: '#cccccc',
      borderWidth: 1
    }
  },
});
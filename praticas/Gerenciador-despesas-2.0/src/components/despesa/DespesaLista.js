import { FlatList, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DespesaItem from './DespesaItem';

function Vazio() {
  return (
    <View style={styles.empty}>
      <Ionicons name="wallet-outline" size={48} color="#999" />
      <Text style={styles.emptyText}>Nenhuma despesa. Toque em + para adicionar.</Text>
    </View>
  );
}

export default function DespesaLista({ expenses }) {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <DespesaItem {...item} />}
      ListEmptyComponent={Vazio}
    />
  );
}

const styles = StyleSheet.create({
  empty: { alignItems: 'center', marginTop: 60 },
  emptyText: { marginTop: 12, color: '#666', textAlign: 'center' },
});
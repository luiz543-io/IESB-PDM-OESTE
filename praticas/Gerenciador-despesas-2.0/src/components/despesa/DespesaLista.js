import { FlatList, View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DespesaItem from './DespesaItem';
import { theme } from '../../constants/theme';

function Vazio() {
  const colors = theme[useColorScheme() === 'dark' ? 'dark' : 'light'];
  return (
    <View style={styles.empty}>
      <Ionicons name="wallet-outline" size={48} color={colors.subtext} />
      <Text style={[styles.emptyText, { color: colors.subtext }]}>
        Nenhuma despesa. Toque em + para adicionar.
      </Text>
    </View>
  );
}

export default function DespesaLista({ expenses }) {
  const colors = theme[useColorScheme() === 'dark' ? 'dark' : 'light'];
  return (
    <FlatList
      style={{ backgroundColor: colors.background }}
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <DespesaItem {...item} />}
      ListEmptyComponent={Vazio}
    />
  );
}

const styles = StyleSheet.create({
  empty: { alignItems: 'center', marginTop: 60 },
  emptyText: { marginTop: 12, textAlign: 'center' },
});
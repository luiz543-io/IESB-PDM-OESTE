import { View, Text, StyleSheet } from 'react-native';

export default function DespesaSumario({ expenses }) {
  const total = expenses.reduce((soma, item) => soma + Number(item.amount), 0);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{expenses.length} despesa(s)</Text>
      <Text style={styles.text}>Total: R$ {total.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginHorizontal: 12,
    marginTop: 12,
    backgroundColor: '#e8e8ff',
    borderRadius: 8,
  },
  text: { fontWeight: 'bold' },
});
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { theme } from '../../constants/theme';

export default function DespesaSumario({ expenses }) {
  const colors = theme[useColorScheme() === 'dark' ? 'dark' : 'light'];
  const total = expenses.reduce((soma, item) => soma + Number(item.amount), 0);

  return (
    <View style={[styles.container, { backgroundColor: colors.summary }]}>
      <Text style={[styles.text, { color: colors.text }]}>{expenses.length} despesa(s)</Text>
      <Text style={[styles.text, { color: colors.text }]}>Total: R$ {total.toFixed(2)}</Text>
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
    borderRadius: 8,
  },
  text: { fontWeight: 'bold' },
});
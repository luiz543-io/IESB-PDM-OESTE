import { useMemo, useState } from 'react';
import { View, TextInput, StyleSheet, useColorScheme } from 'react-native';
import { useExpenses } from '../store/expenses-context';
import useDebounce from '../hooks/useDebounce';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { theme } from '../constants/theme';

export default function TodasDespesas() {
  const colors = theme[useColorScheme() === 'dark' ? 'dark' : 'light'];
  const { expenses } = useExpenses();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);

  const filtered = useMemo(() => {
    const termo = debouncedSearch.trim().toLowerCase();
    if (!termo) return expenses;
    return expenses.filter((e) => e.description.toLowerCase().includes(termo));
  }, [expenses, debouncedSearch]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TextInput
        style={[
          styles.search,
          { backgroundColor: colors.card, borderColor: colors.border, color: colors.text },
        ]}
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar por descrição..."
        placeholderTextColor={colors.subtext}
      />
      <DespesaSaida expenses={filtered} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  search: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    margin: 12,
    marginBottom: 0,
  },
});
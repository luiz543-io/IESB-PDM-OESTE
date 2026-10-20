import { Pressable, View, Text, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function DespesaItem({ id, description, amount, date, category }) {
  const navigation = useNavigation();

  function pressHandler() {
    navigation.navigate('GerenciarDespesa', { expenseId: id });
  }

  return (
    <Pressable onPress={pressHandler} style={({ pressed }) => pressed && styles.pressed}>
      <View style={styles.card}>
        <View style={styles.info}>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.small}>
            {new Date(date).toLocaleDateString('pt-BR')} · {category}
          </Text>
        </View>
        <Text style={styles.amount}>R$ {Number(amount).toFixed(2)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: { opacity: 0.7 },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 12,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: { elevation: 3 },
    }),
  },
  info: { flex: 1 },
  description: { fontSize: 16, fontWeight: 'bold' },
  small: { fontSize: 12, color: '#666', marginTop: 4 },
  amount: { fontSize: 16, fontWeight: 'bold' },
});
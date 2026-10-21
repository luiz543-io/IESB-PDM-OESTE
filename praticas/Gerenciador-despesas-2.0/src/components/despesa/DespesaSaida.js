import { View, useColorScheme } from 'react-native';
import DespesaSumario from './DespesaSumario';
import DespesaLista from './DespesaLista';
import { theme } from '../../constants/theme';

export default function DespesaSaida({ expenses }) {
  const colors = theme[useColorScheme() === 'dark' ? 'dark' : 'light'];
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <DespesaSumario expenses={expenses} />
      <DespesaLista expenses={expenses} />
    </View>
  );
}
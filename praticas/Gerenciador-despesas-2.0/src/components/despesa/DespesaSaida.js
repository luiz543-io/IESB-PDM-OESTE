import { View } from 'react-native';
import DespesaSumario from './DespesaSumario';
import DespesaLista from './DespesaLista';

export default function DespesaSaida({ expenses }) {
  return (
    <View style={{ flex: 1 }}>
      <DespesaSumario expenses={expenses} />
      <DespesaLista expenses={expenses} />
    </View>
  );
}
import { useExpenses } from '../store/expenses-context';
import DespesaSaida from '../components/despesa/DespesaSaida';

export default function DespesasRecentes() {
  const { expenses } = useExpenses();

  const seteDiasAtras = new Date();
  seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);
  const recentes = expenses.filter((e) => new Date(e.date) >= seteDiasAtras);

  return <DespesaSaida expenses={recentes} />;
}
import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@expenses';

// O "gerente": recebe um pedido (action) e devolve uma lista NOVA
function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'UPDATE':
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
    case 'DELETE':
      return state.filter((item) => item.id !== action.payload);
    case 'SET':
      return action.payload;
    default:
      return state;
  }
}

const ExpensesContext = createContext(null);

export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1) Ao abrir o app: LER o caderno
  useEffect(() => {
    async function load() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          dispatch({ type: 'SET', payload: JSON.parse(saved) });
        }
      } catch (error) {
        console.warn('Erro ao carregar despesas:', error);
      } finally {
        setIsLoaded(true); // só agora está liberado para salvar
      }
    }
    load();
  }, []);

  // 2) Sempre que a lista mudar: ESCREVER no caderno
  useEffect(() => {
    if (!isLoaded) return; // evita apagar tudo com a lista vazia inicial
    async function save() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      } catch (error) {
        console.warn('Erro ao salvar despesas:', error);
      }
    }
    save();
  }, [expenses, isLoaded]);

  function addExpense(data) {
    dispatch({ type: 'ADD', payload: { ...data, id: Date.now().toString() } });
  }
  function updateExpense(id, data) {
    dispatch({ type: 'UPDATE', payload: { ...data, id } });
  }
  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  return (
    <ExpensesContext.Provider
      value={{ expenses, addExpense, updateExpense, deleteExpense }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses deve ser usado dentro de um ExpensesContextProvider');
  }
  return context;
}
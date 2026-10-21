import { useLayoutEffect, useState } from 'react';
import {
  View, Text, TextInput, Pressable, Modal, FlatList, ScrollView,
  KeyboardAvoidingView, Platform, Alert, StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useExpenses } from '../store/expenses-context';
import IconButton from '../components/IconButton';
import { CATEGORIES } from '../constants/categories';

// O "porteiro": confere os dados e devolve um objeto com os erros
function validate(values) {
  const errors = {};

  if (values.description.trim().length < 3) {
    errors.description = 'A descrição precisa ter no mínimo 3 caracteres.';
  }

  const amount = parseFloat(values.amount);
  if (isNaN(amount) || amount <= 0) {
    errors.amount = 'Informe um valor maior que zero.';
  }

  const fimDeHoje = new Date();
  fimDeHoje.setHours(23, 59, 59, 999);
  if (values.date > fimDeHoje) {
    errors.date = 'A data não pode ser futura.';
  }

  if (!values.category) {
    errors.category = 'Escolha uma categoria.';
  }

  return errors;
}

export default function GerenciarDespesa({ route, navigation }) {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const existing = expenses.find((e) => e.id === expenseId);

  // Um único objeto para o formulário inteiro
  const [form, setForm] = useState({
    description: existing ? existing.description : '',
    amount: existing ? String(existing.amount) : '',
    date: existing ? new Date(existing.date) : new Date(),
    category: existing ? existing.category : '',
  });
  const [errors, setErrors] = useState({});
  const [showPicker, setShowPicker] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Título do cabeçalho muda conforme o modo
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar despesa' : 'Nova despesa',
    });
  }, [navigation, isEditing]);

  // Copia o form antigo e troca só o campo que mudou
  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined })); // erro some ao corrigir
  }

  function handleAmountChange(text) {
    const limpo = text.replace(',', '.'); // alguns teclados BR usam vírgula
    if (/^\d*\.?\d{0,2}$/.test(limpo)) {
      handleChange('amount', limpo);
    }
  }

  function handleDateChange(event, selected) {
    setShowPicker(Platform.OS === 'ios');
    if (selected) handleChange('date', selected);
  }

  function saveHandler() {
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return; // tem erro: não salva

    const data = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: form.date.toISOString(),
      category: form.category,
    };

    if (isEditing) {
      updateExpense(expenseId, data);
    } else {
      addExpense(data);
    }
    navigation.goBack();
  }

  function deleteHandler() {
    Alert.alert('Excluir despesa', 'Tem certeza que deseja excluir?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          deleteExpense(expenseId);
          navigation.goBack();
        },
      },
    ]);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, errors.description && styles.inputError]}
          value={form.description}
          onChangeText={(text) => handleChange('description', text)}
          placeholder="Ex.: Almoço"
        />
        {errors.description && <Text style={styles.error}>{errors.description}</Text>}

        <Text style={styles.label}>Valor (R$)</Text>
        <TextInput
          style={[styles.input, errors.amount && styles.inputError]}
          value={form.amount}
          onChangeText={handleAmountChange}
          keyboardType="decimal-pad"
          placeholder="0.00"
        />
        {errors.amount && <Text style={styles.error}>{errors.amount}</Text>}

        <Text style={styles.label}>Data</Text>
        <Pressable
          style={[styles.input, errors.date && styles.inputError]}
          onPress={() => setShowPicker(true)}
        >
          <Text>{form.date.toLocaleDateString('pt-BR')}</Text>
        </Pressable>
        {errors.date && <Text style={styles.error}>{errors.date}</Text>}
        {showPicker && (
          <DateTimePicker
            value={form.date}
            mode="date"
            onChange={handleDateChange}
          />
        )}

        <Text style={styles.label}>Categoria</Text>
        <Pressable
          style={[styles.input, errors.category && styles.inputError]}
          onPress={() => setShowModal(true)}
        >
          <Text style={!form.category && styles.placeholder}>
            {form.category || 'Selecione uma categoria'}
          </Text>
        </Pressable>
        {errors.category && <Text style={styles.error}>{errors.category}</Text>}

        <Pressable style={styles.saveButton} onPress={saveHandler}>
          <Text style={styles.saveText}>Salvar</Text>
        </Pressable>

        {isEditing && (
          <View style={styles.deleteArea}>
            <IconButton icon="trash" size={28} color="#c00" onPress={deleteHandler} />
          </View>
        )}
      </ScrollView>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>Escolha a categoria</Text>
            <FlatList
              data={CATEGORIES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.option}
                  onPress={() => {
                    handleChange('category', item);
                    setShowModal(false);
                  }}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </Pressable>
              )}
            />
            <Pressable onPress={() => setShowModal(false)}>
              <Text style={styles.cancel}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontWeight: 'bold', marginTop: 16, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  inputError: { borderColor: '#d00' },
  error: { color: '#d00', marginTop: 4, fontSize: 12 },
  placeholder: { color: '#999' },
  saveButton: {
    backgroundColor: '#4a4aff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  saveText: { color: '#fff', fontWeight: 'bold' },
  deleteArea: { alignItems: 'center', marginTop: 24 },
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
  sheet: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '60%',
  },
  sheetTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
  option: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#eee' },
  optionText: { fontSize: 16 },
  cancel: { textAlign: 'center', color: '#d00', marginTop: 12, fontWeight: 'bold' },
});
import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_DOACAO = '@instituto_mao_amiga:doacao';

export default function CadastroDoacao() {
  const [tipoItem, setTipoItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [pontoDestino, setPontoDestino] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregarDoacao() {
      const salvo = await AsyncStorage.getItem(CHAVE_DOACAO);

      if (salvo) {
        const doacao = JSON.parse(salvo);

        setTipoItem(doacao.tipoItem);
        setQuantidade(doacao.quantidade);
        setPontoDestino(doacao.pontoDestino);
      }
    }

    carregarDoacao();
  }, []);

  async function validarDoacao() {
    if (tipoItem.trim() === '') {
      setErro('O tipo do item não pode ficar vazio.');
      return;
    }

    const quantidadeNumerica = Number(
      quantidade.trim()
    );

    if (
      quantidade.trim() === '' ||
      isNaN(quantidadeNumerica) ||
      quantidadeNumerica <= 0
    ) {
      setErro(
        'A quantidade precisa ser um número maior que zero.'
      );
      return;
    }

    if (pontoDestino.trim() === '') {
      setErro('O ponto de destino não pode ficar vazio.');
      return;
    }

    const doacao = {
      tipoItem: tipoItem.trim(),
      quantidade: quantidade.trim(),
      pontoDestino: pontoDestino.trim(),
    };

    await AsyncStorage.setItem(
      CHAVE_DOACAO,
      JSON.stringify(doacao)
    );

    setErro('');

    Alert.alert(
      'Sucesso',
      'Doação salva localmente.'
    );
  }

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['bottom', 'left', 'right']}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : 'height'
        }
      >
        <Text style={styles.titulo}>
          Cadastro de Doação
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Tipo do item"
          value={tipoItem}
          onChangeText={setTipoItem}
        />

        <TextInput
          style={styles.input}
          placeholder="Quantidade"
          value={quantidade}
          onChangeText={setQuantidade}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Ponto de destino"
          value={pontoDestino}
          onChangeText={setPontoDestino}
        />

        {erro !== '' && (
          <Text style={styles.erro}>
            {erro}
          </Text>
        )}

        <Button
          title="Cadastrar doação"
          onPress={validarDoacao}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },

  erro: {
    color: '#C62828',
    marginBottom: 12,
  },
});
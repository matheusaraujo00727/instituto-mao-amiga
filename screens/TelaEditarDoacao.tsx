import { useEffect, useState } from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  Doacao,
  listarDoacoes,
  atualizarDoacao,
} from '../storage/doacoesStorage';

type RootStackParamList = {
  DetalheDoacao: {
    doacaoId: string;
  };
  EditarDoacao: {
    doacaoId: string;
  };
};

type Props = NativeStackScreenProps<
  RootStackParamList,
  'EditarDoacao'
>;

export default function TelaEditarDoacao({
  route,
  navigation,
}: Props) {
  const { doacaoId } = route.params;

  const [doacao, setDoacao] = useState<Doacao | null>(null);

  const [tipoItem, setTipoItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [pontoDestino, setPontoDestino] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregarDoacao() {
      const doacoes = await listarDoacoes();

      const encontrada = doacoes.find(
        (item) => item.id === doacaoId
      );

      if (encontrada) {
        setDoacao(encontrada);
        setTipoItem(encontrada.tipoItem);
        setQuantidade(encontrada.quantidade.toString());
        setPontoDestino(encontrada.pontoDestino);
      }
    }

    carregarDoacao();
  }, [doacaoId]);

  async function salvarAlteracoes() {
    if (!doacao) {
      return;
    }

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

    setErro('');

    const doacaoAtualizada: Doacao = {
      ...doacao,
      tipoItem: tipoItem.trim(),
      quantidade: quantidadeNumerica,
      pontoDestino: pontoDestino.trim(),
    };

    await atualizarDoacao(doacaoAtualizada);

    navigation.goBack();
  }

  if (!doacao) {
    return (
      <SafeAreaView style={styles.container}>
         <KeyboardAvoidingView
    style={styles.conteudo}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  >
        <Text style={styles.titulo}>
          Doação não encontrada.
        </Text>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
    style={styles.conteudo}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  >
      <Text style={styles.titulo}>
        Editar Doação
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
        title="Salvar alterações"
        onPress={salvarAlteracoes}
      />
       </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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

  conteudo: {
  flex: 1,
},
});
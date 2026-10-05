import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  Doacao,
  listarDoacoes,
  excluirDoacao,
} from '../storage/doacoesStorage';

type RootStackParamList = {
  HistoricoDoacoes: undefined;
  DetalheDoacao: {
    doacaoId: string;
  };
};

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Detalhe Doacao'
>;

export default function TelaDetalheDoacao({
  route,
  navigation,
}: Props) {
  const { doacaoId } = route.params;

  const [doacao, setDoacao] = useState<Doacao | null>(null);

  useEffect(() => {
    async function carregarDoacao() {
      const doacoes = await listarDoacoes();

      const encontrada = doacoes.find(
        (item) => item.id === doacaoId
      );

      setDoacao(encontrada ?? null);
    }

    carregarDoacao();
  }, [doacaoId]);

  async function confirmarExclusao() {
    await excluirDoacao(doacaoId);

    navigation.goBack();
  }

  if (!doacao) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.titulo}>
          Doação não encontrada.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>
        Detalhe da Doação
      </Text>

      <Text style={styles.label}>
        Tipo do item
      </Text>

      <Text style={styles.valor}>
        {doacao.tipoItem}
      </Text>

      <Text style={styles.label}>
        Quantidade
      </Text>

      <Text style={styles.valor}>
        {doacao.quantidade}
      </Text>

      <Text style={styles.label}>
        Ponto de destino
      </Text>

      <Text style={styles.valor}>
        {doacao.pontoDestino}
      </Text>

      <Text style={styles.label}>
        Data da doação
      </Text>

      <Text style={styles.valor}>
        {new Date(doacao.criadoEm).toLocaleString('pt-BR')}
      </Text>
      

      <Button
        title="Excluir Doação"
        onPress={() =>
          Alert.alert(
            'Excluir doação',
            'Tem certeza que deseja excluir esta doação?',
            [
              {
                text: 'Cancelar',
                style: 'cancel',
              },
              {
                text: 'Excluir',
                style: 'destructive',
                onPress: confirmarExclusao,
              },
            ]
          )
        }
      />
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

  label: {
    fontWeight: 'bold',
    marginTop: 12,
  },

  valor: {
    fontSize: 16,
    marginTop: 4,
  },
});
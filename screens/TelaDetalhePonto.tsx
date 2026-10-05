import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { pontosMock } from '../data/pontosMock';

type RootStackParamList = {
  ListaPontos: undefined;
  DetalhePonto: {
    pontoId: string;
  };
  CadastroDoacao: undefined;
};

type Props = NativeStackScreenProps<
  RootStackParamList,
  'DetalhePonto'
>;

export default function TelaDetalhePonto({
  route,
}: Props) {
  const { pontoId } = route.params;

  const ponto = pontosMock.find(
    (ponto) => ponto.id === pontoId
  );

  if (!ponto) {
    return (
      <View style={styles.container}>
        <Text>Ponto não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {ponto.nome}
      </Text>

      <Text style={styles.campo}>
        Endereço: {ponto.endereco}
      </Text>

      <Text style={styles.campo}>
        Dias e horários: {ponto.horario}
      </Text>

      <Text style={styles.campo}>
        Recebe/Distribui: {ponto.recebeDistribui}
      </Text>
    </View>
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

  campo: {
    fontSize: 16,
    marginBottom: 15,
  },
});
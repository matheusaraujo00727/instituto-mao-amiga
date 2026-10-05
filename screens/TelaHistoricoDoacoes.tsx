import { useCallback, useState } from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Doacao,
  listarDoacoes,
} from '../storage/doacoesStorage';

type RootStackParamList = {
  HistoricoDoacoes: undefined;
  DetalheDoacao: {
    doacaoId: string;
  };
};

type Props = NativeStackScreenProps<
  RootStackParamList,
  'HistoricoDoacoes'
>;

export default function TelaHistoricoDoacoes({
  navigation,
  }: Props) {

  const [doacoes, setDoacoes] = useState<Doacao[]>([]);
  const [filtroTipo, setFiltroTipo] = useState('Todos');

  const tipos = [
  'Todos',
  ...Array.from(
    new Set(doacoes.map((doacao) => doacao.tipoItem))
  ),
];

  useFocusEffect(
    useCallback(() => {
      async function carregarDoacoes() {
        const lista = await listarDoacoes();
        setDoacoes(lista);
      }

      carregarDoacoes();
    }, [])
  );

  const doacoesFiltradas =
  filtroTipo === 'Todos'
    ? doacoes
    : doacoes.filter(
        (doacao) => doacao.tipoItem === filtroTipo
      );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>
        Histórico de Doações
      </Text>

      <View style={styles.filtros}>
  {tipos.map((tipo) => (
    <Button
      key={tipo}
      title={tipo}
      onPress={() => setFiltroTipo(tipo)}
    />
  ))}
</View>

      <FlatList
        data={doacoesFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
        <TouchableOpacity
        style={styles.item}
        onPress={() =>
        navigation.navigate('DetalheDoacao', {
        doacaoId: item.id,
      })
    }
  >
    <Text style={styles.tipo}>
      {item.tipoItem}
    </Text>

    <Text>
      Quantidade: {item.quantidade}
    </Text>

    <Text>
      Destino: {item.pontoDestino}
    </Text>
  </TouchableOpacity>
)}
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

  item: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
  },

  tipo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  filtros: {
  marginBottom: 15,
},

});
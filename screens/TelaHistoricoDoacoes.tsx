import { useCallback, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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
  const [filtroTipo, setFiltroTipo] = useState('');

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
  filtroTipo.trim() === ''
    ? doacoes
    : doacoes.filter((doacao) =>
        doacao.tipoItem
          .toLowerCase()
          .includes(filtroTipo.trim().toLowerCase())
      );

      const resumoPorTipo = Object.entries(
  doacoes.reduce((resumo, doacao) => {
    const tipo = doacao.tipoItem.trim();

    if (!resumo[tipo]) {
      resumo[tipo] = {
        quantidade: 0,
        doacoes: 0,
      };
    }

    resumo[tipo].quantidade += doacao.quantidade;
    resumo[tipo].doacoes += 1;

    return resumo;
  }, {} as Record<string, { quantidade: number; doacoes: number }>)
)
  .map(([tipo, dados]) => ({
    tipo,
    quantidade: dados.quantidade,
    doacoes: dados.doacoes,
  }))
  .sort((a, b) => b.quantidade - a.quantidade);

      
  return (
    <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView
    style={styles.conteudo}
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
>
  <Text style={styles.titulo}>
    Histórico de Doações
  </Text>

  <Text style={styles.resumoTitulo}>
    Resumo das doações
  </Text>

  {doacoes.length === 0 ? (
    <Text style={styles.resumoVazio}>
      Ainda não há doações registradas.
    </Text>
  ) : (
    <>
      <Text style={styles.totalDoacoes}>
        Total de doações: {doacoes.length}
      </Text>

      {resumoPorTipo.map((item) => (
        <Text
          key={item.tipo}
          style={styles.resumoItem}
        >
          {item.tipo}: {item.quantidade} unidades em {item.doacoes} doações
        </Text>
      ))}
    </>
  )}

  <TextInput
    style={styles.filtroInput}
    placeholder="Filtrar por tipo de item"
    value={filtroTipo}
    onChangeText={setFiltroTipo}
  />

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
    ListEmptyComponent={
      <Text style={styles.mensagemVazia}>
        Nenhuma doação encontrada para "{filtroTipo}".
      </Text>
    }
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

  conteudo: {
  flex: 1,
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

mensagemVazia: {
  textAlign: 'center',
  marginTop: 20,
},

resumoTitulo: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 8,
},

totalDoacoes: {
  marginBottom: 5,
},

resumoItem: {
  marginBottom: 4,
},

resumoVazio: {
  marginBottom: 10,
},

filtroInput: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  padding: 10,
  marginBottom: 15,
},

});
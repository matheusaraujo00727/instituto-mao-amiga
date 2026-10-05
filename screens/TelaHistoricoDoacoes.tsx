import { useCallback, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  Doacao,
  listarDoacoes,
} from '../storage/doacoesStorage';

export default function TelaHistoricoDoacoes() {
  const [doacoes, setDoacoes] = useState<Doacao[]>([]);

  useFocusEffect(
    useCallback(() => {
      async function carregarDoacoes() {
        const lista = await listarDoacoes();
        setDoacoes(lista);
      }

      carregarDoacoes();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>
        Histórico de Doações
      </Text>

      <FlatList
        data={doacoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.tipo}>
              {item.tipoItem}
            </Text>

            <Text>
              Quantidade: {item.quantidade}
            </Text>

            <Text>
              Destino: {item.pontoDestino}
            </Text>
          </View>
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
});
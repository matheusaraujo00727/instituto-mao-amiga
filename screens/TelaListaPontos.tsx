import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import PontoItem from '../components/PontoItem';
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
  'ListaPontos'
>;

export default function TelaListaPontos({
  navigation,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Pontos de Coleta e Distribuição
      </Text>

      <Button
        title="Cadastrar Doação"
        onPress={() =>
          navigation.navigate('CadastroDoacao')
        }
      />

      <View style={{ height: 15 }} />

      <FlatList
        data={pontosMock}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PontoItem
            ponto={item}
            onPress={() =>
              navigation.navigate('DetalhePonto', {
                pontoId: item.id,
              })
            }
          />
        )}
        showsVerticalScrollIndicator={false}
      />
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
});
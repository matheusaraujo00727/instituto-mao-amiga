import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Ponto = {
  id: string;
  nome: string;
  endereco: string;
  horario: string;
  recebeDistribui: string;
};

type RootStackParamList = {
  ListaPontos: undefined;
  DetalhePonto: {
    pontoId: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const pontosMock: Ponto[] = [
  {
    id: '1',
    nome: 'Ponto de Coleta Centro',
    endereco: 'Rua 10, nº 250 - Centro, Goiânia - GO',
    horario: 'Segunda a sexta, das 8h às 17h',
    recebeDistribui:
      'Recebe alimentos não perecíveis, roupas e produtos de higiene. Distribui cestas básicas para famílias cadastradas.',
  },
  {
    id: '2',
    nome: 'Ponto de Coleta Setor Oeste',
    endereco: 'Avenida Oeste, nº 820 - Setor Oeste, Goiânia - GO',
    horario: 'Terça, quinta e sábado, das 9h às 16h',
    recebeDistribui:
      'Recebe roupas, calçados e cobertores. Distribui roupas para famílias em situação de vulnerabilidade.',
  },
  {
    id: '3',
    nome: 'Ponto de Coleta Jardim América',
    endereco: 'Rua C-120, nº 45 - Jardim América, Goiânia - GO',
    horario: 'Segunda, quarta e sexta, das 8h às 14h',
    recebeDistribui:
      'Recebe alimentos não perecíveis e produtos de higiene. Distribui cestas básicas e kits de higiene.',
  },
  {
    id: '4',
    nome: 'Ponto de Distribuição Campinas',
    endereco: 'Rua 24 de Maio, nº 310 - Campinas, Goiânia - GO',
    horario: 'Segunda e quarta, das 10h às 16h',
    recebeDistribui:
      'Distribui alimentos, roupas e produtos de higiene para famílias previamente cadastradas.',
  },
  {
    id: '5',
    nome: 'Ponto de Coleta Setor Bueno',
    endereco: 'Avenida T-4, nº 1250 - Setor Bueno, Goiânia - GO',
    horario: 'Terça a sexta, das 9h às 18h',
    recebeDistribui:
      'Recebe alimentos, roupas infantis e brinquedos. Distribui os itens arrecadados para famílias atendidas pelo instituto.',
  },
  {
    id: '6',
    nome: 'Ponto de Coleta Jardim Novo Mundo',
    endereco: 'Avenida New York, nº 560 - Jardim Novo Mundo, Goiânia - GO',
    horario: 'Quarta e sábado, das 8h às 15h',
    recebeDistribui:
      'Recebe alimentos, roupas e cobertores. Distribui cestas básicas e agasalhos durante os períodos de maior necessidade.',
  },
  {
    id: '7',
    nome: 'Ponto de Distribuição Vila Nova',
    endereco: 'Rua 209, nº 180 - Vila Nova, Goiânia - GO',
    horario: 'Segunda, terça e quinta, das 13h às 18h',
    recebeDistribui:
      'Distribui alimentos, roupas e kits de higiene para famílias cadastradas no programa de assistência.',
  },
  {
    id: '8',
    nome: 'Ponto de Coleta Setor Universitário',
    endereco: 'Rua 261, nº 95 - Setor Universitário, Goiânia - GO',
    horario: 'Segunda a sexta, das 8h às 16h',
    recebeDistribui:
      'Recebe alimentos, roupas, livros e materiais escolares. Distribui materiais escolares e alimentos para famílias atendidas.',
  },
];

type ListaPontosProps = NativeStackScreenProps<
  RootStackParamList,
  'ListaPontos'
>;

type DetalhePontoProps = NativeStackScreenProps<
  RootStackParamList,
  'DetalhePonto'
>;

function PontoItem({
  ponto,
  onPress,
}: {
  ponto: Ponto;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.nome}>{ponto.nome}</Text>
      <Text style={styles.endereco}>{ponto.endereco}</Text>
    </TouchableOpacity>
  );
}

function TelaListaPontos({ navigation }: ListaPontosProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pontos de Coleta e Distribuição</Text>

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

function DetalhePonto({ ponto }: { ponto: Ponto }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{ponto.nome}</Text>

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

function TelaDetalhePonto({ route }: DetalhePontoProps) {
  const { pontoId } = route.params;

  const ponto = pontosMock.find((ponto) => ponto.id === pontoId);

  if (!ponto) {
    return (
      <View style={styles.container}>
        <Text>Ponto não encontrado.</Text>
      </View>
    );
  }

  return <DetalhePonto ponto={ponto} />;
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListaPontos">
        <Stack.Screen
          name="ListaPontos"
          component={TelaListaPontos}
          options={{ title: 'Pontos de Coleta' }}
        />

        <Stack.Screen
          name="DetalhePonto"
          component={TelaDetalhePonto}
          options={{ title: 'Detalhe do Ponto' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
    marginBottom: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },

  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  endereco: {
    fontSize: 14,
  },

  campo: {
    fontSize: 16,
    marginBottom: 15,
  },
});
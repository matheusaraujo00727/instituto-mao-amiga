import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
    endereco: 'Rua 10, nº 250 - Centro',
    horario: 'Segunda a sexta, das 8h às 17h',
    recebeDistribui:
      'Recebe alimentos e roupas e distribui para famílias cadastradas.',
  },
  {
    id: '2',
    nome: 'Ponto de Coleta Setor Oeste',
    endereco: 'Avenida Oeste, nº 820 - Setor Oeste',
    horario: 'Terça, quinta e sábado, das 9h às 16h',
    recebeDistribui:
      'Recebe roupas, calçados e cobertores.',
  },
  {
    id: '3',
    nome: 'Ponto de Coleta Jardim América',
    endereco: 'Rua C-120, nº 45 - Jardim América',
    horario: 'Segunda, quarta e sexta, das 8h às 14h',
    recebeDistribui:
      'Recebe alimentos não perecíveis e distribui cestas básicas.',
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

function TelaListaPontos({
  navigation,
}: ListaPontosProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pontos de Coleta</Text>

      {pontosMock.map((ponto) => (
        <PontoItem
          key={ponto.id}
          ponto={ponto}
          onPress={() =>
            navigation.navigate('DetalhePonto', {
              pontoId: ponto.id,
            })
          }
        />
      ))}
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
        Horário: {ponto.horario}
      </Text>

      <Text style={styles.campo}>
        Recebe/Distribui: {ponto.recebeDistribui}
      </Text>
    </View>
  );
}

function TelaDetalhePonto({
  route,
}: DetalhePontoProps) {
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

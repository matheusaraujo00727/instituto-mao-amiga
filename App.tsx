import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CadastroDoacao from './CadastroDoacao';
import TelaListaPontos from './screens/TelaListaPontos';
import TelaDetalhePonto from './screens/TelaDetalhePonto';
import TelaHistoricoDoacoes from './screens/TelaHistoricoDoacoes';
import TelaDetalheDoacao from './screens/TelaDetalheDoacao';

type RootStackParamList = {
  ListaPontos: undefined;
  DetalhePonto: {
    pontoId: string;
  };
  CadastroDoacao: undefined;
};

const Stack =
  createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListaPontos">

        <Stack.Screen
          name="ListaPontos"
          component={TelaListaPontos}
          options={{
            title: 'Pontos de Coleta',
          }}
        />

        <Stack.Screen
          name="DetalhePonto"
          component={TelaDetalhePonto}
          options={{
            title: 'Detalhe do Ponto',
          }}
        />

        <Stack.Screen
          name="CadastroDoacao"
          component={CadastroDoacao}
          options={{
            title: 'Cadastrar Doação',
          }}
        />

        <Stack.Screen
         name="HistoricoDoacoes"
         component={TelaHistoricoDoacoes}
        />

        <Stack.Screen
         name="DetalheDoacao"
         component={TelaDetalheDoacao}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
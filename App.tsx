import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

type Ponto = {
  nome: string; 
  endereco: string;
  horario: string; 
  recebeDistribui: string;
};

const pontoMock: Ponto = {
nome: 'Ponto de Coleta Centro', 
endereco: 'Rua 10, nº 250 - Centro', 
horario: 'Segunda a sexta, das 8h às 17h', 
recebeDistribui: 'Recebe alimentos e roupas e distribui para famílias cadastradas.',
};

function DetalhePonto({ ponto }: { ponto: Ponto }) {
 return (
 <View style={styles.container}>
 <Text style={styles.nome}>{ponto.nome}</Text>
 <Text style={styles.campo}>{ponto.endereco}</Text>
 <Text style={styles.campo}>{ponto.horario}</Text>
 <Text style={styles.campo}>{ponto.recebeDistribui}</Text>
</View>
 ); 
}

export default function TelaDetalhePonto() {
  return <DetalhePonto ponto={pontoMock} />;
}

const styles = StyleSheet.create({
 container: {
 flex: 1,
 padding: 20,
 justifyContent: 'center',
 },
 nome: {
 fontSize: 24,
 fontWeight:
 'bold',
 marginBottom: 16,
 },
 campo: {
 fontSize: 16,
 marginBottom: 12,
 },
});

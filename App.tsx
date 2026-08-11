import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

type Ponto = {
  nome: string; 
  endereco: string;
  horario: string; 
  recebeDistribui: string;
};

const pontosMock: Ponto = [
  {
  id: '1',
  nome: 'Ponto de Coleta Centro',
  endereco: 'Rua 10, nº 250 - Centro',
  horario: 'Segunda a sexta, das 8h às 17h',
  recebeDistribui:'Recebe alimentos e roupas e distribui para famílias cadastradas.',
},

{
   id: '2',
  nome: 'Ponto de Coleta Setor Oeste',
  endereco: 'Avenida Oeste, nº 820 - Setor Oeste',
  horario: 'Terça, quinta e sábado, das 9h às 16h',
  recebeDistribui: 'Recebe roupas, calçados e cobertores.',
},

{
 id: '3',
  nome: 'Ponto de Coleta Jardim América',
  endereco: 'Rua C-120, nº 45 - Jardim América',
  horario: 'Segunda, quarta e sexta, das 8h às 14h',
  recebeDistribui: 'Recebe alimentos não perecíveis e distribui cestas básicas.',
},
];

function PontoItem({ ponto }: { ponto: Ponto }) {
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
  return (
 <View style={styles.container}>
 <Text style={styles.titulo}>Pontos de Coleta</Text>

 {pontosMock.map((ponto) => (
 <PontoItem
 key={ponto.id}
 ponto={ponto}
 />
 ))}
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
 campo: {
 fontSize: 14,
 marginBottom: 5,
 },
});

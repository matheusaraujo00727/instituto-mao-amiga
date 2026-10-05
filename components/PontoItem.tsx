import {
  Text,
  TouchableOpacity,
} from 'react-native';

import { Ponto } from '../types/Ponto';

type PontoItemProps = {
  ponto: Ponto;
  onPress: () => void;
};

export default function PontoItem({
  ponto,
  onPress,
}: PontoItemProps) {
  return (
    <TouchableOpacity
      style={{
        padding: 15,
        marginBottom: 15,
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 8,
        }}
      >
        {ponto.nome}
      </Text>

      <Text style={{ fontSize: 14 }}>
        {ponto.endereco}
      </Text>
    </TouchableOpacity>
  );
}
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Doacao = {
  id: string;
  tipoItem: string;
  quantidade: number;
  pontoDestino: string;
  criadoEm: string;
};

const CHAVE_DOACOES = '@instituto-mao-amiga:doacoes';

export async function listarDoacoes(): Promise<Doacao[]> {
  const dados = await AsyncStorage.getItem(CHAVE_DOACOES);

  if (!dados) {
    return [];
  }

  return JSON.parse(dados);
}

export async function salvarDoacao(
  doacao: Doacao
): Promise<void> {
  const doacoes = await listarDoacoes();

  doacoes.push(doacao);

  await AsyncStorage.setItem(
    CHAVE_DOACOES,
    JSON.stringify(doacoes)
  );

  }

  export async function excluirDoacao(
  id: string
): Promise<void> {
  const doacoes = await listarDoacoes();

  const novasDoacoes = doacoes.filter(
    (doacao) => doacao.id !== id
  );

  await AsyncStorage.setItem(
    CHAVE_DOACOES,
    JSON.stringify(novasDoacoes)
  );
}


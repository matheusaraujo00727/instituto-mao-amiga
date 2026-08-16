# Exercício Prático — Aula 05

**Nome:** Matheus Araujo de Azevedo   **Data:** 16/08/2026

Crie um pequeno fluxo com 2 telas navegáveis (Stack Navigator), passando pelo menos 1 parâmetro de uma tela para a outra.

**1. Descreva as 2 telas e o que cada uma faz:**

Tela 1: Lista de Pontos — mostra os pontos de coleta e distribuição disponíveis.

Tela 2: Detalhe do Ponto — mostra as informações do ponto selecionado, como nome, endereço, horário e o que recebe ou distribui.

**2. Qual parâmetro é passado da Tela 1 para a Tela 2:**

O parâmetro pontoId, que identifica qual ponto foi selecionado na lista.

**3. O que muda na Tela 2 por causa do parâmetro recebido:**

A Tela 2 mostra os dados do ponto correspondente ao pontoId recebido. Assim, cada ponto da lista abre seu próprio detalhe.

**4. Cole aqui o código de navegação (o `navigate` e a leitura do `route.params`):**

navigation.navigate('DetalhePonto', {
  pontoId: ponto.id,
});

const { pontoId } = route.params;
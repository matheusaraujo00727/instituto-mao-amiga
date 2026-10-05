# Roteiro de Demonstração

## 1. Registrar uma doação
- Abrir o aplicativo.
- Entrar em um ponto de coleta.
- Clicar em **Cadastrar Doação**.
- Informar o tipo do item, quantidade e ponto de destino.
- Salvar a doação.

## 2. Ver o histórico
- Voltar para a lista de pontos.
- Clicar em **Histórico de Doações**.
- Mostrar a doação cadastrada.

## 3. Filtrar
- No campo de filtro, digitar o tipo de item cadastrado.
- Mostrar que apenas as doações correspondentes são exibidas.
- Limpar o campo para mostrar novamente todas as doações.

## 4. Editar
- Selecionar uma doação no histórico.
- Clicar em **Editar Doação**.
- Alterar algum dado, como a quantidade.
- Clicar em **Salvar alterações**.
- Mostrar que o histórico foi atualizado.

## 5. Excluir
- Abrir novamente os detalhes da doação.
- Clicar em **Excluir Doação**.
- Confirmar a exclusão.
- Mostrar que a doação não aparece mais no histórico.

## 6. Fechar e reabrir
- Cadastrar uma nova doação.
- Fechar o aplicativo completamente.
- Abrir o aplicativo novamente.
- Entrar no histórico.
- Mostrar que a doação continua salva.

## 7. Explicação técnica
O aplicativo utiliza o AsyncStorage para manter as doações salvas mesmo depois de fechar o aplicativo. O acesso ao armazenamento foi centralizado no arquivo `doacoesStorage.ts`, deixando as telas responsáveis apenas pela interface e pelas ações do usuário.
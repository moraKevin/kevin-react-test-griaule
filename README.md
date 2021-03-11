# Griaule React Test

No ano de 2021 a Griaule venceu uma licitação que garantia à empresa a responsabilidade de implementar um sistema biométrico para identificação de pokémons. O projeto encontra-se em estágio inicial de concepção e desenvolvimento, neste primeiro momento, exige-se que a aplicação apresente 2 funcionalidades: 

- Listagem de pokémons;
- Escolha dos pokémons iniciais da jornada do mestre pokémon.

Um dos integrantes do time criou a estrutura básica do projeto, porém teve que sair às pressas para uma batalha no ginásio de Veridian, de forma que coube a você continuar o trabalho do colega. Para piorar a situação, o gerente de projeto sumiu após prestar um treinamento na cidade de Saffron, deixando as seguintes orientações do projeto:

## Tela de lista de pokémons

A tela deve consistir em uma exibição de lista de pokémons, onde cada criatura seja representada em um card que contenha uma imagem e algumas informações básicas sobre o pokémon. É necessário que a lista seja navegável através de páginas de 20 items, com botões no canto inferior que permitam avançar e retroceder entre as páginas.
Para a implementação da página, será consumida a API *pokeapi*, cuja documentação pode ser encontrada [neste link](https://pokeapi.co/docs/v2#info).

Dica: a imagem de cada pokémon é definida na API pela chave *sprite*.

## Tela de escolha de pokémon inicial

Inspirado pelas histórias de jornada pokémon, a segunda tela deve apresentar dois quadros posicionados lado a lado, onde o quadro da direita encontra-se inicialmente vazio e o da esquerda contenha os três pokémons iniciais possíveis de serem escolhidos e que, utilizando os eventos *drag and drop* nativos do navegador, seja possível selecionar o pokémon desejado, arrastando seu card para o quadro da direita e recebendo um feedback da escolha realizada. É necessário que, ao arrastar e soltar o card do pokémon escolhido, este não esteja mais renderizado no quadro da esquerda e somente apareça no quadro da direita.

### Algumas informações úteis:
- O projeto deve consistir em uma aplicação web utilizando o framework ReactJS.
- Recomenda-se a utilização dos seguintes stacks:
  1. NodeJS 12.x.x
  2. Yarn 1.22.x
  3. ReactJS 16.11.x
- O teste tem como objetivo colher informações da capacidade do candidato em implementar features de uma aplicação web frontend, não sendo obrigatório conhecimentos sobre design;
- Cada tela deve apresentar uma rota de navegação única;
- Os componentes implementados devem ser do tipo *stateless* e o padrão ECMAScript de sintaxe fica a escolha do candidato;
- As opções de pokémons iniciais podem ser apenas aquelas apresentadas na 1ª geração de criaturas do desenho: Squirtle, Bulbasaur e Charmander;

### Forma de entrega e avaliação

- A solução do candidato deve ser enviada através de um link de um repositório git. A privacidade do repositório pode ficar à escolha do candidato;
- A organização do fluxo de trabalho, bem como commits e branches é livre para o candidato realizar da maneira que achar mais conveniente;

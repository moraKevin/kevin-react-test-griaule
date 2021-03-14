import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./Dropbox/Dropbox";
import Dropbox from "./Dropbox/Dropbox";
import "./Escolha.css";
import "./Inicial/Inicial";
import Inicial from "./Inicial/Inicial";

const Escolha = () => {
  // Variável de estado dos dados detalhados dos pokemons
  const [dadosPokemon, setdadosPokemon] = useState("");

  // Variável de estado para definir quando terminou a resposta da API (evita erros de undefined)
  const [carregando, setCarregando] = useState(true);

  // Variável de estado responsável por indicar qual card deve ficar vazio (pokemon escolhido)
  // Caso haja troca de geração, reset[3] é utilizado para resetar o pokemon em display
  const [reset, setReset] = useState([false, false, false, false]);
  const geracoes = [1, 2, 3, 4, 5, 6, 7, 8];
  const url = "https://pokeapi.co/api/v2/pokemon/";
  var urls = [
    "https://pokeapi.co/api/v2/pokemon/",
    "https://pokeapi.co/api/v2/pokemon/",
    "https://pokeapi.co/api/v2/pokemon/",
  ];
  /**
   * *useEffect()
   * Função de ciclo de vida que roda somente uma vez, após o carregamento da tela
   */
  useEffect(() => {
    urls = [url + 1, url + 4, url + 7];
    fetchDadosIniciais();
  }, []);

  /**
   * *fetchDadosIniciais()
   * Função responsável por iniciar os GETs dos dados dos pokemons iniciais
   */
  async function fetchDadosIniciais() {
    setCarregando(true);
    let arrayPokemon = await Promise.all(
      urls.map(async (url) => {
        let gravaPokemon = await getPokemonDetalhado(url);
        return gravaPokemon;
      })
    );
    //Variável de estado é atualizada aqui com os dados detalhados dos 3 pokemons iniciais
    setdadosPokemon(arrayPokemon);
    setCarregando(false);
  }

  /**
   * *getPokemonDetalhado()
   * Função que faz o fetch dos dados específicos de cada pokemon, os retornando
   * na função map de getDadosDetalhados() para compor o vetor final de dados pokemon
   * @param url Url detalhada de cada pokemon inicial
   * @returns a resolução da Promise com o vetor de objetos contendo as informações detalhadas
   *          do pokemon específico da url parâmetro
   */
  async function getPokemonDetalhado(url) {
    return new Promise((sucesso, falha) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          sucesso(data);
        });
    });
  }

  function mudaGeracao(geracao) {
    var id;
    switch (geracao) {
      case 1:
        id = 1;
        break;
      case 2:
        id = 152;
        break;
      case 3:
        id = 252;
        break;
      case 4:
        id = 387;
        break;
      case 5:
        id = 495;
        break;
      case 6:
        id = 650;
        break;
      case 7:
        id = 722;
        break;
      case 8:
        id = 810;
        break;
    }

    urls = [url + id, url + (id + 3), url + (id + 6)];
    // Envia uma flag true em reset[3] para que o componente Dropbox possa resetar o
    // Pokemon em display
    setReset([false, false, false, true]);
    fetchDadosIniciais();
  }

  function montaGeracao(geracao) {
    return (
      <div
        key={geracao}
        onClick={() => mudaGeracao(geracao)}
        className="Geracao-card"
      >
        {geracao}
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="Container-escolha">
        <header className="Header-escolha">
          <img src="./logo_griaule_small_inv.png" width="170"></img>
          <img src="./Pokemon-Logo.png" width="170"></img>
        </header>
        <p className="Titulo">Escolha seu Inicial!</p>
        <div className="Geracao-escolha">
          <p className="Geracao-texto">Geração: </p>
          {geracoes.map(montaGeracao)}
        </div>
        <div className="Container-cards">
          <div className="Card-esquerda">
            <div className="Card-inicial-1">
              {carregando ? (
                <p style={{ color: "black" }}>Carregando Pokemons</p>
              ) : (
                <Inicial
                  dadoPokemon={dadosPokemon[0]}
                  setReset={setReset}
                  apaga={reset[0]}
                  card={1}
                />
              )}
            </div>
            <div className="Card-inicial-2">
              {carregando ? (
                <p>Carregando Pokemons</p>
              ) : (
                <Inicial
                  dadoPokemon={dadosPokemon[1]}
                  setReset={setReset}
                  apaga={reset[1]}
                  card={2}
                />
              )}
            </div>
            <div className="Card-inicial-3">
              {carregando ? (
                <p>Carregando Pokemons</p>
              ) : (
                <Inicial
                  dadoPokemon={dadosPokemon[2]}
                  setReset={setReset}
                  apaga={reset[2]}
                  card={3}
                />
              )}
            </div>
          </div>
          <div className="Card-direita">
            <div className="Caixa-selecao">
              <Dropbox vazio={reset[3]} />
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Escolha;

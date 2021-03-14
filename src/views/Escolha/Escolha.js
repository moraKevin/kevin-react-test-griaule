import "./Escolha.css";
import "./Dropbox/Dropbox";
import "./Inicial/Inicial";
import { PrimeIcons } from "primereact/api";
import { DndProvider, useDrag } from "react-dnd";
import React, { useEffect, useState } from "react";
import Inicial from "./Inicial/Inicial";
import Dropbox from "./Dropbox/Dropbox";
import { HTML5Backend } from "react-dnd-html5-backend";

const Escolha = () => {
  // Variável de estado dos dados detalhados dos pokemons
  const [dadosPokemon, setdadosPokemon] = useState("");
  // Variável de estado para definir quando terminou a resposta da API (evita erros de undefined)
  const [carregando, setCarregando] = useState(true);
  const [reset, setReset] = useState([false, false, false]);
  const urls = [
    "https://pokeapi.co/api/v2/pokemon/1",
    "https://pokeapi.co/api/v2/pokemon/4",
    "https://pokeapi.co/api/v2/pokemon/7",
  ];

  /**
   * *useEffect()
   * Função de ciclo de vida que roda somente uma vez, após o carregamento da tela
   */
  useEffect(() => {
    fetchDadosIniciais();
  }, []);

  /**
   * *fetchDadosIniciais()
   * Função responsável por iniciar os GETs dos dados dos pokemons iniciais
   */
  async function fetchDadosIniciais() {
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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="Escolha">
        <header className="Escolha-header">
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
                <Dropbox />
              </div>
            </div>
          </div>
        </header>
      </div>
    </DndProvider>
  );
};

export default Escolha;

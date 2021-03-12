import { useEffect, useState } from "react";
import "./Lista.css";

const Lista = () => {
  // Variável de estado dos dados detalhados dos pokemons
  const [dadosPokemon, setdadosPokemon] = useState("");
  // Variável de estado para definir quando terminou a resposta da API (evita erros de undefined)
  const [carregando, setCarregando] = useState(true);
  const url = "https://pokeapi.co/api/v2/pokemon/";

  /**
   * *useEffect()
   * Função de ciclo de vida que roda somente uma vez, após o carregamento da tela
   */
  useEffect(() => {
    fetchDadosIniciais();
  }, []);

  /**
   * *fetchDadosIniciais()
   * Função responsável por iniciar os GETs dos dados dos pokemons
   */
  async function fetchDadosIniciais() {
    let res = await getDadosIniciais(url);
    await getDadosDetalhados(res.results);
    setCarregando(false);
  }

  /**
   * *getDadosIniciais()
   * Função responsável por fazer o primeiro fetch, que irá trazer os nomes dos pokemons com
   * seus respectivos endpoints, contendo dados mais detalhados
   * @param url url inicial, que contém os nomes dos pokemons e seus respectivos endpoints
   * @returns a resolução da Promise com o vetor de objetos [{nome:, url:}]
   */
  async function getDadosIniciais(url) {
    return new Promise((sucesso, falha) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          sucesso(data);
        });
    });
  }

  /**
   * *getDadosDetalhados()
   * Função responsável por iterar sobre o vetor de pokemons obtidos em getDadosIniciais,
   * fazendo um fetch para cada url específica do pokemon
   * @param dados Vetor de objetos pokemon contendo [{nome:, url:}]
   */
  async function getDadosDetalhados(dados) {
    let arrayPokemon = await Promise.all(
      dados.map(async (pokemon) => {
        let gravaPokemon = await getPokemonDetalhado(pokemon.url);
        return gravaPokemon;
      })
    );
    //Variável de estado é atualizada aqui com os dados detalhados dos pokemons
    setdadosPokemon(arrayPokemon);
  }

  /**
   * *getPokemonDetalhado()
   * Função que faz o fetch dos dados específicos de cada pokemon, os retornando
   * na função map de getDadosDetalhados() para compor o vetor final de dados pokemon
   * @param url Url detalhada de cada pokemon
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
    <div className="Lista">
      <header className="Lista-header">
        {carregando ? (
          <p>Carregando pokemons...</p>
        ) : (
          <p>
            O pokemon {dadosPokemon[16].name} tem id {dadosPokemon[16].id}
          </p>
        )}
      </header>
    </div>
  );
};

export default Lista;

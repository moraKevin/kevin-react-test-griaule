import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import "./Lista.css";

const Lista = () => {
  // Variável de estado dos dados detalhados dos pokemons
  const [dadosPokemon, setdadosPokemon] = useState("");
  // Variável de estado para definir quando terminou a resposta da API (evita erros de undefined)
  const [carregando, setCarregando] = useState(true);
  const url = "https://pokeapi.co/api/v2/pokemon?limit=1118";

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
        let gravaPokemon;
        // Por algum motivo, nos pokemons 160, 164 e 428 o endpoint fornecido retorna 404,
        // sendo necessário remover o ultimo caracter '/' para pegar os dados destes 2 pokemons
        if (
          pokemon.url === "https://pokeapi.co/api/v2/pokemon/160/" ||
          pokemon.url === "https://pokeapi.co/api/v2/pokemon/164/" ||
          pokemon.url === "https://pokeapi.co/api/v2/pokemon/428/"
        ) {
          gravaPokemon = await getPokemonDetalhado(
            // remoção do último caracter do endpoint fornecido
            pokemon.url.replace(/.$/, "")
          );
        } else {
          gravaPokemon = await getPokemonDetalhado(pokemon.url);
        }
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

  /**
   * *pokemonImageTemplate
   * Constante de tratamento de dados para retornar a imagem correta do pokemon
   * @param rowData dados da linha da tabela
   * @returns
   */
  const pokemonImageTemplate = (rowData) => {
    return (
      <img
        src={rowData.sprites.front_default}
        width="48"
        className="product-image"
      />
    );
  };

  /**
   * *pokemonTypeTemplate
   * Constante de tratamento de dados para retornar a imagem do tipo correta do pokemon
   * @param rowData dados da linha da tabela
   * @returns
   */
  const pokemonTypeTemplate = (rowData) => {
    // Caso para quando há só um tipo
    if (rowData.types.length === 1) {
      return (
        <img
          src={"/assets/typeImages/" + rowData.types[0].type.name + ".png"}
          width="48"
          className="product-image"
          alt={rowData.types[0].type.name}
        />
      );
      // Caso para quando há dois tipos
    } else if (rowData.types.length === 2) {
      return (
        <div className="Container-duoType">
          <img
            src={"/assets/typeImages/" + rowData.types[0].type.name + ".png"}
            width="48"
            className="product-image"
            alt={rowData.types[0].type.name}
          />
          <img
            src={"/assets/typeImages/" + rowData.types[1].type.name + ".png"}
            width="48"
            className="product-image"
            alt={rowData.types[0].type.name}
          />
        </div>
      );
    }
  };

  const pokemonHeightTemplate = (rowData) => {
    // Altura é dada em decímetro por algum motivo
    return (rowData.height * 10).toFixed(1) + " cm";
  };

  const pokemonWeightTemplate = (rowData) => {
    // Peso é dado em hectograma por algum motivo
    return (rowData.weight * 0.1).toFixed(1) + " Kg";
  };

  return (
    <div className="Container-lista">
      <header className="Header-lista">
        <img src="./logo_griaule_small_inv.png" width="170"></img>
        <img src="./Pokemon-Logo.png" width="170"></img>
      </header>
      <p className="Titulo">Pokedéx Griaule</p>
      <div className="Container-tela">
        {carregando ? (
          <div className="Container-loading">
            <img src="/assets/loadingGif.gif" width="200"></img>
            <p>Carregando pokemons...</p>
          </div>
        ) : (
          <div className="Container-tabela">
            <DataTable
              value={dadosPokemon}
              paginator
              paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Pokemons"
              rows={20}
            >
              <Column field="id" header="Id"></Column>
              <Column field="name" header="Name"></Column>
              <Column header="Image" body={pokemonImageTemplate}></Column>
              <Column header="Height" field={pokemonHeightTemplate}></Column>
              <Column header="Weight" field={pokemonWeightTemplate}></Column>
              <Column header="Type" body={pokemonTypeTemplate}></Column>
            </DataTable>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lista;

import "./Home.css";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";

const Home = () => {
  return (
    <div className="Container-home">
      <header className="Header-home">
        <img src="./logo_griaule_small_inv.png" width="170"></img>
        <img src="./Pokemon-Logo.png" width="170"></img>
      </header>

      <p>Kevin's Griaule PokeTest</p>
      <div className="Div-buttons">
        <Link to="/Lista" style={{ textDecoration: "none" }}>
          <div className="Card-lista">
            <p className="Texto-card">Lista de Pokemons</p>
            <img src="./pokedex.png" width="300"></img>
          </div>
        </Link>
        <Link to="/Escolha" style={{ textDecoration: "none" }}>
          <div className="Card-escolha">
            <p className="Texto-card">Escolha de Pokemon Inicial</p>
            <img src="./oakLab.jpg" width="300"></img>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;

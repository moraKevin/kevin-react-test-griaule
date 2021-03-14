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
        {/* Botão para navegar para a tela de Lista de Pokemons */}
        <Link to="/Lista" style={{ textDecoration: "none" }}>
          <Button
            label="Lista de Pokemons"
            className="Navigation-buttons p-button-outlined p-button-success"
          />
        </Link>

        {/* Botão para navegar até a tela de escolha de Pokemon inicial */}
        <Link to="/Escolha" style={{ textDecoration: "none" }}>
          <Button
            label="Escolha de Pokemon Inicial"
            className="Navigation-buttons p-button-outlined p-button-success"
          />
        </Link>
      </div>
    </div>
  );
};

export default Home;

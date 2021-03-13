import "./Escolha.css";
import { PrimeIcons } from "primereact/api";

const Escolha = () => {
  return (
    <div className="Escolha">
      <header className="Escolha-header">
        <div className="Container-cards">
          <div className="Card-esquerda">
            <div className="Card-inicial-1"></div>
            <div className="Cards-iniciais-inferiores">
              <div className="Card-inicial-2"></div>
              <div className="Card-inicial-3"></div>
            </div>
          </div>
          <div className="Card-direita">
            <div className="Caixa-selecao">
              <h6 className="Texto-selecao">
                Arraste seu inicial preferido aqui!
              </h6>
              <i
                className="Seta-selecao pi pi-arrow-circle-down p-mr-2"
                style={{ fontSize: "1em" }}
              ></i>
            </div>
            <div className="Caixa-escolhido"></div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Escolha;

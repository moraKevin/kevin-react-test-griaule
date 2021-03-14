import { useDrag, useDrop } from "react-dnd";
import React, { useState } from "react";
import { ItemTypes } from "../ItemTypes";
import "./Dropbox.css";
import { PrimeIcons } from "primereact/api";

const Dropbox = () => {
  // Estado contendo os dados do Pokemon escolhido
  const [dadoPokemon, setdadoPokemon] = useState();

  // Estado responsável pelo Drop
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: (item, monitor) => {
      console.log(item);
      setdadoPokemon(item.dadoPokemon);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div ref={drop} role={"Dropbox"} className="Dropbox-container">
      {dadoPokemon ? (
        <div className="Escolhido-container">
          <img src={dadoPokemon.sprites.front_default} height="150"></img>
          <h5 className="Text-after"> Você escolheu o {dadoPokemon.name}!</h5>
        </div>
      ) : (
        <div>
          <h6 className="Text-before">Arraste seu inicial preferido aqui!</h6>
          <i
            className="Seta-selecao pi pi-arrow-circle-down p-mr-2"
            style={{ fontSize: "1em" }}
          ></i>
        </div>
      )}
    </div>
  );
};

export default Dropbox;

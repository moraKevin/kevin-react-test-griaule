import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../ItemTypes";
import "./Dropbox.css";

const Dropbox = ({ vazio }) => {
  // Estado contendo os dados do Pokemon escolhido
  const [dadoPokemon, setdadoPokemon] = useState();

  // Estado responsável pelo Drop
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: (item, monitor) => {
      setdadoPokemon(item.dadoPokemon);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  // useEffect para detectar mudanças em vazio
  // quando vazio for true, significa que houve mudança de geração,
  // e então os dados do Pokemon escolhido são resetados
  useEffect(() => {
    if (vazio) {
      setdadoPokemon(null);
    }
  }, [vazio]);

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

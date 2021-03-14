import React, { useEffect, useState } from "react";
import "./Inicial.css";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../ItemTypes";

const Inicial = ({ dadoPokemon, setReset, apaga, card }) => {
  /**
   * !props
   * *dadoPokemon
   * Contém os dados detalhados do pokemon
   * *setReset
   * É a função de atualização de estados do componente 'Escolha', usada para apagar o card
   * que tiver selecionado
   * *apaga
   * Variável de estado da função setReset do componente 'Escolha', responsável por
   * apontar se o card deve ser apagado (está selecionado) ou não
   * *card
   * Aponta qual card é, usado para indicar para o useDrag() qual card foi selecionado
   */

  //Estado responsável pelo Drag
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { dadoPokemon, card },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        apagaCardEscolhido(card);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  /**
   * *apagaCardEscolhido()
   * Função que diz para o componente pai 'Escolha' qual card foi selecionado,
   * para ele apagar o card atual e voltar a mostrar os dados da escolha anterior a essa
   * @param card qual card foi escolhido
   */
  const apagaCardEscolhido = (card) => {
    if (card === 1) {
      setReset([true, false, false]);
    } else if (card === 2) {
      setReset([false, true, false]);
    } else if (card === 3) {
      setReset([false, false, true]);
    }
  };

  const opacity = isDragging || apaga ? 0 : 1;
  return (
    <div
      ref={drag}
      role="Box"
      data-testid={`box-${dadoPokemon.name}`}
      className={isDragging || apaga ? "Container-dragging" : "Container"}
    >
      <img style={{ opacity }} src={dadoPokemon.sprites.front_default}></img>
      <div className="Info"></div>
      <p style={{ color: "black", fontSize: "1.5rem", opacity }}>
        {dadoPokemon.name}
      </p>
    </div>
  );
};

export default Inicial;

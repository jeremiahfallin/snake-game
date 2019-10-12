import React, { useState, useEffect } from "react";

import useInterval from "./UseInterval";
import "../styles.css";

function Game() {
  const initialState = {
    board: Array.from(Array(20), () => new Array(20).fill(0)),
    head: [0, 0],
    body: [[]],
    direction: "ArrowRight",
    delay: 1000
  };

  const [board, setBoard] = useState(initialState["board"]);
  const [head, setHead] = useState(initialState["head"]); // [Row, Column]
  const [body, setBody] = useState(initialState["body"]);
  const [delay, setDelay] = useState(initialState["delay"]);
  const [direction, setDirection] = useState(initialState["direction"]);
  const [foodLocation, setFoodLocation] = useState([]);
  const [bodyCells, setBodyCells] = useState(["00"]);

  const getFoodLocation = () => {
    let x = Math.floor(Math.random() * 20);
    let y = Math.floor(Math.random() * 20);
    return [x, y];
  };

  const resetInitialState = () => {
    setBoard(initialState["board"]);
    setHead(initialState["head"]);
    setBody(initialState["body"]);
    setDelay(initialState["delay"]);
    setDirection(initialState["direction"]);
  };

  const gameOver = () => {
    if (head[0] >= board.length || head[1] >= board.length) {
      resetInitialState();
      setFoodLocation(getFoodLocation);
    } else if (head[0] < 0 || head[1] < 0) {
      resetInitialState();
      setFoodLocation(getFoodLocation);
    }
    for (let x in body) {
      if (body[x][0] === head[0] && body[x][1] === head[1]) {
        resetInitialState();
        setFoodLocation(getFoodLocation);
      }
    }
  };

  const directionHandler = e => {
    console.log(direction);
    if (e.key === "ArrowRight" && direction === "ArrowLeft") {
      return 0;
    } else if (e.key === "ArrowLeft" && direction === "ArrowRight") {
      return 0;
    } else if (e.key === "ArrowUp" && direction === "ArrowDown") {
      return 0;
    } else if (e.key === "ArrowDown" && direction === "ArrowUp") {
      return 0;
    } else {
      setDirection(e.key);
    }
  };

  const checkSnakeFood = () => {
    if (head[0] === foodLocation[0] && head[1] === foodLocation[1]) {
      setFoodLocation(getFoodLocation());
      moveBody(true);
    } else {
      moveBody(false);
    }
  };

  const moveBody = foundFood => {
    let newBody = [...body];
    newBody.shift();
    if (!foundFood) {
      setBody([...newBody, head]);
    } else {
      setBody([...body, head]);
    }
  };

  useInterval(() => {
    if (direction === "ArrowRight") {
      setHead([head[0], head[1] + 1]);
    } else if (direction === "ArrowLeft") {
      setHead([head[0], head[1] - 1]);
    } else if (direction === "ArrowUp") {
      setHead([head[0] - 1, head[1]]);
    } else if (direction === "ArrowDown") {
      setHead([head[0] + 1, head[1]]);
    }
    checkSnakeFood();
    gameOver();
  }, delay);

  useEffect(() => {
    let bodyCount = [];
    if (body[0].length !== 0) {
      for (let x in body) {
        let str =
          (body[x][0] * body[x][1]).toString() +
          body[x][0].toString() +
          body[x][1].toString();
        bodyCount.push(str);
      }
    }
    setBodyCells(bodyCount);
  }, [body]);

  useEffect(() => {
    setFoodLocation(getFoodLocation());
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", directionHandler);
    return () => {
      document.removeEventListener("keydown", directionHandler);
    };
  });

  return (
    <>
      <div>
        <table onKeyDown={e => directionHandler(e)}>
          <tbody>
            {board.map((x, y) => {
              return (
                <tr className="snakeGrid" key={y}>
                  {x.map((w, z) => {
                    let cell = (z * y).toString() + y.toString() + z.toString();
                    if (head[0] === y && head[1] === z) {
                      return <td className="head" key={z} />;
                    } else if (foodLocation[0] === y && foodLocation[1] === z) {
                      return <td className="food" key={z} />;
                    } else if (bodyCells.includes(cell)) {
                      return <td className="body" key={z} />;
                    } else {
                      return <td className="cell" key={z} />;
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Game;

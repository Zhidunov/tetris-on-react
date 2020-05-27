import { useState, useCallback } from "react";
import { randomTetromino, TETROMINOS } from "../tetrominos";
import { STAGE_WIDTH, checkCollision } from "../gameHelpers";

export const usePlayer = () => {
  let [player, setPlayer] = useState({
    position: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false
  });

  const rotate = (matrix, dir) => {
    let rotatedTetro = matrix.map((_, index) => matrix.map(col => col[index]));
    if(dir > 0) return rotatedTetro.map(row => row.reverse());
    return rotatedTetro.reverse();
  }

  const playerRotate = (stage, dir) => {
    let clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    const position = clonedPlayer.position.x;
    let offset = 1;
    while(checkCollision(clonedPlayer, stage, { x: 0, y: 0 })){
      clonedPlayer.position.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -dir);
        clonedPlayer.position.x = position;
        return;
      }
    }

    setPlayer(clonedPlayer);
  }

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prev => ({
        ...prev,
        position: { x: (prev.position.x += x), y: (prev.position.y += y) },
        collided
    }));
  };

  const resetPlayer = useCallback(() => {
      setPlayer({
        position: { x: STAGE_WIDTH / 2 - 2, y: 0 },
        tetromino: randomTetromino().shape,
        collided: false
      })
  }, [])

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};

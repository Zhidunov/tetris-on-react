import { useState, useCallback } from "react";
import { randomTetromino, TETROMINOS } from "../tetrominos";
import { STAGE_WIDTH } from "../gameHelpers";

export const usePlayer = () => {
  let [player, setPlayer] = useState({
    position: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false
  });

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

  return [player, updatePlayerPos, resetPlayer];
};

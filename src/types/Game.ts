import Players from "./Players";

interface Game {
  id: string;
  name: string;
  releaseYear?: number;
  players: Players;
  publisher?: string;
  expansions?: string[];
  type: "BaseGame" | "Expansion";
  baseGame?: string;
  standalone?: boolean;
}

export default Game;

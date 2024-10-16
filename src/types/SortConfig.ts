import Game from "./Game";

type SortConfig = {
  sort: boolean;
  key: keyof Game | "players.min";
  direction: "asc" | "desc";
};

export default SortConfig;
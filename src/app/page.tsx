"use client";

import { Box, Grid2, InputAdornment, Stack, Typography } from "@mui/material";
import styles from "./page.module.css";
import CustomSelect from "@/components/CustomSelect";
import gameTypes from "@/data/gameTypesMenu";
import { ChangeEvent, useEffect, useState } from "react";
import { Gamepad2 } from "lucide-react";
import CustomTextField from "@/components/CustomTextField";
import gamePlayerMenu from "@/data/gamePlayersMenu";
import GameCard from "@/components/GameCard/GameCard";
import axios from "axios";
import Game from "@/types/Game";
import SortConfig from "@/types/SortConfig";
import SortMenu from "@/components/SortMenu/SortMenu";
import { orderBy } from "natural-orderby";

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterPlayers, setFilterPlayers] = useState("all");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "name",
    direction: "asc",
    sort: false,
  });

  const handleFilterTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterType(e.target.value);
  };

  const handleFilterPlayersChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterPlayers(e.target.value);
  };

  useEffect(() => {
    axios.get("https://getboardgames-jxxjux7fua-ey.a.run.app").then((res) => {
      setGames(res.data as Game[]);
      setFilteredGames(res.data as Game[]);
    });
  }, []);

  useEffect(() => {
    const filtered = games.filter(
      (game) =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterType === "all" || game.type === filterType) &&
        (filterPlayers === "all" ||
          (game.players.min <= parseInt(filterPlayers) &&
            (game.players.max === undefined ||
              game.players.max >= parseInt(filterPlayers))))
    );

    setFilteredGames(filtered);
  }, [searchTerm, filterType, filterPlayers]);

  useEffect(() => {
    if (sortConfig.sort) {
      const sorted = orderBy(
        filteredGames,
        [
          (g) => {
            if (sortConfig.key === "players.min") return g.players.min;
            else return g[sortConfig.key];
          },
        ],
        [sortConfig.direction]
      );

      setFilteredGames(sorted);
    }
  }, [sortConfig]);
  return (
    <Box className={styles.page}>
      <header className={styles["title-container"]}>
        <Typography variant="h4" className={styles.title}>
          Board Games Catalog
        </Typography>
        <Typography variant="subtitle1" className={styles["muted-text"]}>
          Discover your next favorite game
        </Typography>
      </header>

      <Stack
        spacing={2}
        direction={"row"}
        useFlexGap
        className={styles["search-filter"]}
      >
        <CustomTextField
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search games..."
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Gamepad2 />
                </InputAdornment>
              ),
            },
          }}
        />
        <CustomSelect
          value={filterType}
          onChange={handleFilterTypeChange}
          menuItems={gameTypes}
          classNames={styles.selection}
        />
        <CustomSelect
          value={filterPlayers}
          onChange={handleFilterPlayersChange}
          menuItems={gamePlayerMenu}
          classNames={styles.selection}
        />

        <SortMenu sortConfig={sortConfig} setSortConfig={setSortConfig} />
      </Stack>

      <Grid2
        container
        spacing={{ md: 3, sm: 2, xs: 2 }}
        columns={{ lg:16, md: 12, sm: 8, xs: 4 }}
      >
        {games
          ? filteredGames.map((game, index) => (
              <Grid2 key={index} size={4} className={styles["games-grid-item"]}>
                <GameCard
                  key={game.id}
                  id={game.id}
                  name={game.name}
                  releaseYear={game.releaseYear}
                  players={game.players}
                  publisher={game.publisher}
                  type={game.type}
                />
              </Grid2>
            ))
          : null}
      </Grid2>
    </Box>
  );
}

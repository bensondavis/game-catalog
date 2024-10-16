import SortConfig from "@/types/SortConfig";
import {
  Button,
  FormControlLabel,
  Menu,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { ArrowUpDown } from "lucide-react";
import { ChangeEvent, useState } from "react";
import CustomSelect from "../CustomSelect";
import sortMenuItems from "@/data/sortMenu";
import Game from "@/types/Game";
import styles from "./SortMenu.module.css";

interface SortMenuProps {
  sortConfig: SortConfig;
  setSortConfig: (config: SortConfig) => void;
}

const SortMenu = ({ sortConfig, setSortConfig }: SortMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortToggle = (e: ChangeEvent<HTMLInputElement>) => {
    setSortConfig({ ...sortConfig, sort: e.target.checked });
  };

  const handleSortConfigKey = (e: ChangeEvent<HTMLInputElement>) => {
    setSortConfig({ ...sortConfig, key: e.target.value as keyof Game });
  };

  const handleSortConfigDirection = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSortConfig({
      ...sortConfig,
      direction: e.target.value as SortConfig["direction"],
    });
  };
  return (
    <>
      <Button
        onClick={handleClick}
        startIcon={<ArrowUpDown size={20} />}
        color="inherit"
      >
        Sort
      </Button>
      <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
        <Stack className={styles.menu}>
          <Stack direction={"row"} className={styles["sort-toggle"]}>
            <Typography>Sort:</Typography>
            <Switch checked={sortConfig.sort} onChange={handleSortToggle} />
          </Stack>
          <CustomSelect
            menuItems={sortMenuItems}
            value={sortConfig.key}
            onChange={handleSortConfigKey}
          />
          <RadioGroup
            value={sortConfig.direction}
            onChange={handleSortConfigDirection}
            row
          >
            <FormControlLabel label="Asc" value={"asc"} control={<Radio />} />
            <FormControlLabel label="Desc" value={"desc"} control={<Radio />} />
          </RadioGroup>
        </Stack>
      </Menu>
    </>
  );
};

export default SortMenu;

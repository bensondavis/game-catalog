import { Box, Stack, Typography } from "@mui/material";
import styles from "./GameCard.module.css"

export interface IconPropertyProps {
  icon?: React.ReactNode;
  property?: string;
  value: string | number | React.ReactNode;
}

const IconProperty = ({ icon, property, value }: IconPropertyProps) => {
  return (
    <Stack direction={"row"} alignItems={"center"}  gap={.3}>
      {icon}
      <Box className={styles.properties}>
        {property}{property ? ": " : null}{value}
      </Box>
    </Stack>
  );
};

export default IconProperty;
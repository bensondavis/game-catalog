import {
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import placeholder from "@/img/placeholder.png";
import Image from "next/image";
import Game from "@/types/Game";
import styles from "./GameCard.module.css";
import { BookOpen, Calendar, Users } from "lucide-react";
import IconProperty, { IconPropertyProps } from "./IconProperty";

interface GameCardProps extends Game {
  imgSrc?: string;
}

const GameCard = ({
  imgSrc,
  name,
  type,
  releaseYear,
  players,
  publisher,
}: GameCardProps) => {
  const IconPropertyMap: IconPropertyProps[] = [
    {
      icon: <Calendar size={17} />,
      property: "Released",
      value: releaseYear || "N/A",
    },
    {
      icon: <Users size={17} />,
      property: "Players",
      value: players?.max ? `${players.min}-${players.max}` : `${players.min}+`,
    },
    {
      icon: <BookOpen size={17} />,
      value: publisher || "N/A",
    },
    {
      value: (
        <Chip
          size="small"
          label={type}
          sx={{ background: "black", color: "white" }}
        />
      ),
    },
  ];

  return (
    <Card sx={{ maxWidth: 300 }}>
      <Image
        src={imgSrc || placeholder}
        alt="game thumbnail"
        style={{ height: "100%", width: "100%", objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h5" className={styles.title}>
          <Tooltip title={name} placement="top-start">
            <span>{name}</span>
          </Tooltip>
        </Typography>

        <Divider sx={{ mt: 2 }} />

        <Stack direction={"column"} spacing={0.7} sx={{ mt: 2 }}>
          {IconPropertyMap.map((item, index) => (
            <IconProperty
              key={index}
              icon={item.icon}
              property={item.property}
              value={item.value}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default GameCard;

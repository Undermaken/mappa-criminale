import {
  Avatar,
  CircularProgress,
  CircularProgressLabel,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text
} from "@chakra-ui/react";
import { Place } from "../types/place";
import { useMemo } from "react";

const getColorByEvaluation = (evaluation: number): string => {
  const strength = ((10 - evaluation) / 10) * 255;
  return `rgb(${strength},${strength},255)`;
};

const useMemoColorByEvaluation = (evaluation: number) =>
  useMemo(() => getColorByEvaluation(evaluation), [evaluation]);

export const MarkerCriminale = ({
  place
}: {
  place: Place;
  lat: number;
  lng: number;
}) => {
  const { name, evaluation } = place;
  const bgColor = useMemoColorByEvaluation(evaluation ?? 0);
  const evaluationRpr = place.evaluation?.toFixed(1) ?? "n/a";
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar
          onClick={() => console.log(place)}
          name={evaluationRpr}
          getInitials={s => s}
          showBorder={true}
          borderColor={"#24cad0"}
          size="sm"
          // since white bg if for low scores, invert the text color
          color={(place.evaluation ?? 0) < 3 ? "black" : "white"}
          bgColor={bgColor}
        />
      </PopoverTrigger>
      <PopoverContent fontSize={"md"}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{name}</PopoverHeader>
        <PopoverBody>
          <CircularProgress value={(evaluation ?? 0) * 100} color="green.400">
            <CircularProgressLabel>{evaluationRpr}</CircularProgressLabel>
          </CircularProgress>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

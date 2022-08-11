import { Avatar, AvatarBadge } from "@chakra-ui/react";
import { Place } from "../types/place";

const colorEvalutationRanges: Array<[[number, number], string]> = [
  [[0, 3], "#ff0000"],
  [[3, 5], "#ff8000"],
  [[5, 6], "#e6ff00"],
  [[6, 7], "#2fff00"],
  [[7, 8], "#00a6ff"],
  [[8, 9], "#0022ff"],
  [[9, 10], "#e600ff"]
];

const fallbackColor = "white";
const getColorByEvaluation = (evaluation: number): string =>
  colorEvalutationRanges.find(
    rangeColor =>
      evaluation > rangeColor[0][0] && evaluation <= rangeColor[0][1]
  )?.[1] ?? fallbackColor;

export const MarkerCriminale = ({
  place
}: {
  place: Place;
  lat: number;
  lng: number;
}) => {
  const { name, evaluation } = place;
  return (
    <Avatar
      onClick={() => console.log(place)}
      name={name}
      size="sm"
      color={"black"}
      bgColor={evaluation ? getColorByEvaluation(evaluation) : fallbackColor}
    />
  );
};

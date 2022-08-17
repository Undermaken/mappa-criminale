import { Avatar } from "@chakra-ui/react";
import { Place } from "../types/place";

import React, { useMemo } from "react";
import { useSetAtom } from "jotai";
import { selectedPlaceAtom } from "../state/map";
import { getEvaluationRpr } from "../utils/evaluation";

const getColorByEvaluation = (evaluation: number): string => {
  const strength = ((10 - evaluation) / 10) * 255;
  // basically blue, where intensity depends on score
  return `rgb(${strength},${strength},255)`;
};

const useMemoColorByEvaluation = (evaluation: number) =>
  useMemo(() => getColorByEvaluation(evaluation), [evaluation]);

const MarkerCriminale = ({
  place
}: {
  place: Place;
  lat: number;
  lng: number;
}) => {
  const { evaluation } = place;
  const setSelectedPlace = useSetAtom(selectedPlaceAtom);
  const bgColor = useMemoColorByEvaluation(evaluation ?? 0);
  const evaluationRpr = getEvaluationRpr(place.evaluation);
  // starting from 7, on each point, increase by a constant of 1.2
  // 7 -> 2
  // 8 -> 4
  // 9 -> 6
  // 10 -> 8
  const sizeIncr = Math.round(
    evaluation ? Math.max(evaluation - 6, 0) * 0.8 : 0
  );
  // avatar size must be even
  const sizeIncrEven = sizeIncr % 2 === 0 ? sizeIncr : sizeIncr + 1;

  return (
    <Avatar
      onClick={() => setSelectedPlace(place)}
      name={evaluationRpr}
      getInitials={s => s}
      showBorder={true}
      borderColor={"#24cad0"}
      w={8 + sizeIncrEven}
      h={8 + sizeIncrEven}
      size={"sm"}
      // since white bg if for low scores, invert the text color
      color={(place.evaluation ?? 0) < 3 ? "black" : "white"}
      bgColor={bgColor}
    />
  );
};

export const MarkerMemo = React.memo(MarkerCriminale);

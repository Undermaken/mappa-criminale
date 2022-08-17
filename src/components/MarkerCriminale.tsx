import {
  Avatar,
  CircularProgress,
  CircularProgressLabel,
  HStack,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  VStack
} from "@chakra-ui/react";
import { Place } from "../types/place";
import React, { useMemo } from "react";

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
  const { name, description, evaluation, position_link } = place;
  const bgColor = useMemoColorByEvaluation(evaluation ?? 0);
  const evaluationRpr = place.evaluation
    ? parseFloat(place.evaluation.toFixed(1)).toString()
    : "n/a";
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
    <Popover>
      <PopoverTrigger>
        <Avatar
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
      </PopoverTrigger>
      <PopoverContent fontSize={"md"}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <HStack>
            <CircularProgress
              value={(evaluation ?? 0) * 10}
              color="green.400"
              size={"42px"}
            >
              <CircularProgressLabel>{evaluationRpr}</CircularProgressLabel>
            </CircularProgress>
            <Text fontWeight={"bold"}>{name}</Text>
          </HStack>
        </PopoverHeader>
        <PopoverBody>
          <VStack fontSize={14} alignItems={"flex-start"}>
            <Text>{description}</Text>
            {position_link && (
              <Link color="teal.600" href={position_link} isExternal>
                link diretto
              </Link>
            )}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export const MarkerMemo = React.memo(MarkerCriminale);

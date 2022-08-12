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
        <PopoverHeader>
          <Text fontWeight={"bold"}>{name}</Text>
        </PopoverHeader>
        <PopoverBody>
          <HStack>
            <CircularProgress value={(evaluation ?? 0) * 10} color="green.400">
              <CircularProgressLabel>{evaluationRpr}</CircularProgressLabel>
            </CircularProgress>
            <VStack fontSize={14} alignItems={"flex-start"}>
              <Text>{description}</Text>
              {position_link && (
                <Link color="teal.600" href={position_link} isExternal>
                  link diretto
                </Link>
              )}
            </VStack>
          </HStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export const MarkerMemo = React.memo(MarkerCriminale);

import {
  Box,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { evalutationRangeAtom } from "../state/menu";
import { useState } from "react";

export const EvaluationRangeSlider = () => {
  const [range, setRange] = useAtom(evalutationRangeAtom);
  const [currentRange, setCurrentRange] = useState<[number, number]>([
    range.min,
    range.max
  ]);
  return (
    <RangeSlider
      defaultValue={[range.min, range.max]}
      min={0}
      max={10}
      step={1}
      onChange={r => setCurrentRange([r[0], r[1]])}
      onChangeEnd={([min, max]) => setRange({ min, max })}
    >
      <RangeSliderTrack bg="blue.100">
        <RangeSliderFilledTrack bg="blue.400" />
      </RangeSliderTrack>
      <RangeSliderThumb boxSize={4} index={0} bgColor={"red.200"}>
        <Box position={"absolute"} marginTop={10}>
          <Text fontSize={"sm"}>{currentRange[0]}</Text>
        </Box>
      </RangeSliderThumb>
      <RangeSliderThumb boxSize={4} index={1} bgColor={"teal.200"}>
        <Box position={"absolute"} marginTop={10}>
          <Text fontSize={"sm"}>{currentRange[1]}</Text>
        </Box>
      </RangeSliderThumb>
    </RangeSlider>
  );
};

import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { evalutationRangeAtom } from "../state/menu";

export const EvaluationRangeSlider = () => {
  const [range, setRange] = useAtom(evalutationRangeAtom);
  return (
    <RangeSlider
      defaultValue={[range.min, range.max]}
      min={0}
      max={10}
      step={1}
      onChangeEnd={([min, max]) => setRange({ min, max })}
    >
      <RangeSliderTrack bg="blue.100">
        <RangeSliderFilledTrack bg="blue.400" />
      </RangeSliderTrack>
      <RangeSliderThumb boxSize={4} index={0} bgColor={"red.200"} />
      <RangeSliderThumb boxSize={4} index={1} bgColor={"teal.200"} />
    </RangeSlider>
  );
};

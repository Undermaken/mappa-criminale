import {
  Avatar,
  Box,
  HStack,
  Text,
  useMediaQuery,
  VStack
} from "@chakra-ui/react";
import { useAtomValue, useSetAtom } from "jotai";
import { evalutationRangeAtom, menuOpenAtom } from "../state/menu";

type Props = {
  selectedTour: string;
  places: number;
};
export const FranchinoFab = ({ selectedTour, places }: Props) => {
  const setMenuOpen = useSetAtom(menuOpenAtom);
  const evalutationRange = useAtomValue(evalutationRangeAtom);

  return (
    <Box style={{ zIndex: 1, position: "absolute", left: 4 }} bottom={2}>
      <HStack
        style={{ cursor: "pointer" }}
        onClick={() => {
          setMenuOpen(pv => !pv);
        }}
      >
        <Avatar
          src={"/franchino.png"}
          size={"lg"}
          bgColor={"whiteAlpha.700"}
          borderWidth={2}
          p={1}
          borderColor={"blue.700"}
        />
        <Box p={2} bgColor={"whiteAlpha.900"} borderRadius={4}>
          <VStack alignItems={"flex-start"} spacing={1}>
            <Text fontWeight={"semibold"}>{selectedTour}</Text>
            <Text
              fontSize={"sm"}
            >{`intervallo voto da ${evalutationRange.min} a ${evalutationRange.max}`}</Text>
            <Text fontSize={"xs"}>{`${places} risultati`}</Text>
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
};

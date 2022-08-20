import { Avatar, Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { useAtomValue, useSetAtom } from "jotai";
import { evaluationRangeAtom, menuOpenAtom } from "../state/menu";
import { MdOutlineModeEditOutline } from "react-icons/md";

type Props = {
  selectedTour: string;
  places: number;
};
// floating action button
export const FranchinoFab = ({ selectedTour, places }: Props) => {
  const setMenuOpen = useSetAtom(menuOpenAtom);
  const { min, max } = useAtomValue(evaluationRangeAtom);

  return (
    <Box style={{ zIndex: 1, position: "absolute", left: 4 }} bottom={3}>
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
            <HStack>
              <Text fontWeight={"semibold"}>{selectedTour}</Text>
              <Icon as={MdOutlineModeEditOutline} />
            </HStack>
            <Text
              fontSize={"sm"}
            >{`tutti i risultati con voto da ${min} a ${max}`}</Text>
            <Text fontSize={"xs"}>{`${places} risultati`}</Text>
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
};

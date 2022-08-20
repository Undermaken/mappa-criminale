import { useAtomValue, useSetAtom } from "jotai";
import { placesSelector, selectedPlaceAtom } from "../state/map";
import {
  Divider,
  HStack,
  List,
  ListItem,
  Text,
  VStack
} from "@chakra-ui/react";
import { getEvaluationRpr } from "../utils/evaluation";
import { menuOpenAtom } from "../state/menu";

export const PlacesList = () => {
  const setMenuOpen = useSetAtom(menuOpenAtom);
  const places = useAtomValue(placesSelector);
  const setSelectedPlace = useSetAtom(selectedPlaceAtom);

  return (
    <List>
      {places.map(p => (
        <ListItem
          key={p.id}
          onClick={() => {
            setMenuOpen(false);
            setSelectedPlace(p);
          }}
          style={{ cursor: "pointer" }}
        >
          <VStack alignItems={"start"}>
            <HStack width={"100%"} alignItems={"start"}>
              <Text flex={1} fontSize={"xs"} fontWeight={"semibold"}>
                {getEvaluationRpr(p.evaluation)}
              </Text>
              <Text flex={11} fontSize={"md"}>
                {p.name}
              </Text>
            </HStack>
            <Divider />
          </VStack>
        </ListItem>
      ))}
    </List>
  );
};

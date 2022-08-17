import {
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader
} from "@chakra-ui/modal";
import {
  Button,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Drawer,
  HStack,
  Link,
  Text,
  VStack
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { selectedPlaceAtom } from "../state/map";
import { getEvaluationRpr } from "../utils/evaluation";

export const BottomDrawer = () => {
  const [selectedPlace, setSelectedPlace] = useAtom(selectedPlaceAtom);
  if (selectedPlace === undefined) {
    return null;
  }
  const { evaluation, name, description, position_link } = selectedPlace;
  const evaluationRpr = getEvaluationRpr(evaluation);
  return (
    <Drawer
      isOpen={!!selectedPlace}
      placement="bottom"
      size={"xs"}
      onClose={() => setSelectedPlace(undefined)}
    >
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Center>
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
          </Center>
        </DrawerHeader>

        <DrawerBody>
          <Center>
            <VStack fontSize={14} alignItems={"flex-start"}>
              <Text>{description}</Text>
              {position_link && (
                <Link color="teal.600" href={position_link} isExternal>
                  link diretto
                </Link>
              )}
            </VStack>
          </Center>
        </DrawerBody>

        <DrawerFooter>
          <Button
            colorScheme="blue"
            onClick={() => setSelectedPlace(undefined)}
          >
            Chiudi
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

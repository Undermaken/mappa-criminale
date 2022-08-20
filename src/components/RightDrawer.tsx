import {
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay
} from "@chakra-ui/modal";
import {
  Button,
  Drawer,
  Select,
  VStack,
  Text,
  HStack,
  Box
} from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { menuOpenAtom } from "../state/menu";
import {
  placesSelector,
  SelectedTour,
  selectedTourAtom,
  tourCriminaliAtom
} from "../state/map";
import { EvaluationRangeSlider } from "./EvaluationRangeSlider";
import { MadeWithLove } from "./MadeWithLove";
import { InfoAndSocial } from "./InfoAndSocial";
import { PlacesList } from "./PlacesList";
import { useEffect, useState } from "react";

type Props = Readonly<{
  onClose: () => void;
  onSelectedTour: (tour: SelectedTour) => void;
  tours: ReadonlyArray<{
    key: string;
    count: number;
  }>;
}>;

export const RightDrawer = ({ onClose, onSelectedTour, tours }: Props) => {
  const isOpen = useAtomValue(menuOpenAtom);
  const tourCriminali = useAtomValue(tourCriminaliAtom);
  const selectedTour = useAtomValue(selectedTourAtom);
  const places = useAtomValue(placesSelector);
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"xs"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          Tour criminale
          <InfoAndSocial />
        </DrawerHeader>

        <DrawerBody>
          <VStack
            spacing={4}
            style={{
              height: "100%"
            }}
          >
            <Text fontWeight={"semibold"}>scegli il tour</Text>
            <Select
              size={"sm"}
              onChange={({ target }) =>
                onSelectedTour({
                  name: target.value,
                  places: tourCriminali.places[target.value]
                })
              }
            >
              {tours.map(t => (
                <option
                  selected={selectedTour?.name === t.key}
                  key={t.key}
                  value={t.key}
                >{`${t.key} (${t.count})`}</option>
              ))}
            </Select>
            <Text fontWeight={"semibold"}>scegli un intervallo di voto</Text>
            <EvaluationRangeSlider />

            <Text
              fontWeight={"normal"}
              style={{ marginTop: 30 }}
              fontSize={"small"}
            >
              {places.length} risultati
            </Text>

            <Box
              display={"flex"}
              width={"100%"}
              sx={{
                "&::-webkit-scrollbar": {
                  width: "6px",
                  borderRadius: "2px",
                  backgroundColor: `rgba(0, 0, 0, 0.10)`
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: `rgba(0, 0, 0, 0.10)`
                }
              }}
              style={{
                maxHeight: "100%",
                overflowY: "auto",
                scrollbarColor: "#ff0000"
              }}
            >
              <PlacesList />
            </Box>
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <HStack flex={1}>
            {process.env.NEXT_PUBLIC_BYE_ME_A_COFFEE && (
              <MadeWithLove
                buyMeACoffeeUrl={
                  process.env.NEXT_PUBLIC_BYE_ME_A_COFFEE as string
                }
              />
            )}
            <Box display={"flex"} justifyContent={"flex-end"} flex={1}>
              <Button colorScheme="blue" onClick={onClose}>
                chiudi
              </Button>
            </Box>
          </HStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

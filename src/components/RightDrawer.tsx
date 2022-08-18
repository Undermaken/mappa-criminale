import {
  DrawerBody,
  DrawerCloseButton,
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
import { useAtomValue, useSetAtom } from "jotai";
import { menuOpenAtom } from "../state/menu";
import {
  selectedTourAtom,
  selectedTourNameAtom,
  tourCriminaliAtom
} from "../state/map";
import { EvaluationRangeSlider } from "./EvaluationRangeSlider";
import { MadeWithLove } from "./MadeWithLove";

type Props = Readonly<{
  onClose: () => void;
  onSelectedTour: (tour: string) => void;
  tours: ReadonlyArray<{
    key: string;
    count: number;
  }>;
}>;

export const RightDrawer = ({ onClose, onSelectedTour, tours }: Props) => {
  const isOpen = useAtomValue(menuOpenAtom);
  const tourCriminali = useAtomValue(tourCriminaliAtom);
  const selectedTour = useAtomValue(selectedTourAtom);
  const selectedTourName = useAtomValue(selectedTourNameAtom);
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"xs"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          Tour criminale
          <Text fontWeight={"normal"} fontSize={"small"}>
            dati aggiornati al:{" "}
            {new Date(tourCriminali.created_at * 1000).toLocaleDateString("it")}
          </Text>
        </DrawerHeader>

        <DrawerBody>
          <VStack spacing={4}>
            <Select
              placeholder="Tour Criminale"
              onChange={({ target }) => onSelectedTour(target.value)}
            >
              {tours.map(t => (
                <option
                  selected={selectedTourName === t.key}
                  key={t.key}
                  value={t.key}
                >{`${t.key} (${t.count})`}</option>
              ))}
            </Select>
            <Text fontWeight={"semibold"}>Scegli un intervallo di voto</Text>
            <EvaluationRangeSlider />
            <Text
              fontWeight={"normal"}
              style={{ marginTop: 30 }}
              fontSize={"small"}
            >
              {selectedTour.places.length} risultati
            </Text>
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

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
  Link,
  Text,
  HStack,
  Box
} from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { menuOpenAtom } from "../state/menu";
import {
  selectedTourAtom,
  selectedTourNameAtom,
  tourCriminaliAtom
} from "../state/map";
import { EvaluationRangeSlider } from "./EvaluationRangeSlider";
import { MadeWithLove } from "./MadeWithLove";
import { InfoAndSocial } from "./InfoAndSocial";

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
  const selectedTour = useAtomValue(selectedTourAtom);
  const selectedTourName = useAtomValue(selectedTourNameAtom);
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"xs"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          Tour criminale
          <InfoAndSocial />
        </DrawerHeader>

        <DrawerBody>
          <VStack spacing={4}>
            <Select onChange={({ target }) => onSelectedTour(target.value)}>
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

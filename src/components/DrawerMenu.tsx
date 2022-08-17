import {
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay
} from "@chakra-ui/modal";
import { Button, Drawer, Select, VStack, Text, HStack } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { evalutationRangeAtom, menuOpenAtom } from "../state/menu";
import { selectedTourAtom } from "../state/map";
import { EvaluationRangeSlider } from "./EvaluationRangeSlider";
import { MadeWithLove } from "./MadeWithLove";

type Props = Readonly<{
  onClose: () => void;
  onSelectedTour: (tour: string) => void;
  tours: Array<{
    key: string;
    count: number;
  }>;
}>;

export const DrawerMenu = ({ onClose, onSelectedTour, tours }: Props) => {
  const isOpen = useAtomValue(menuOpenAtom);
  const evalutationRange = useAtomValue(evalutationRangeAtom);
  const selectedTour = useAtomValue(selectedTourAtom);
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"xs"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Tour criminale</DrawerHeader>

        <DrawerBody>
          <VStack spacing={4}>
            <Select
              placeholder="Tour Criminale"
              onChange={({ target }) => onSelectedTour(target.value)}
            >
              {tours.map(t => (
                <option
                  selected={selectedTour === t.key}
                  key={t.key}
                  value={t.key}
                >{`${t.key} (${t.count})`}</option>
              ))}
            </Select>
            <Text fontWeight={"semibold"}>Scegli un intervallo di voto</Text>
            <EvaluationRangeSlider />
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <HStack>
            <MadeWithLove />
            <Button colorScheme="blue" onClick={onClose}>
              Chiudi
            </Button>
          </HStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

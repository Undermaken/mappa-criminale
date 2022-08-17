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

export const RightDrawer = ({ onClose, onSelectedTour, tours }: Props) => {
  const isOpen = useAtomValue(menuOpenAtom);
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
                Chiudi
              </Button>
            </Box>
          </HStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

import {
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay
} from "@chakra-ui/modal";
import { Button, Drawer, Select } from "@chakra-ui/react";
import { useAtom, useAtomValue } from "jotai";
import { menuOpenAtom } from "../state/menu";
import { selectedTourAtom } from "../state/map";

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
  const selectedTour = useAtomValue(selectedTourAtom);
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"xs"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Seleziona il tour criminale</DrawerHeader>

        <DrawerBody>
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
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue">Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

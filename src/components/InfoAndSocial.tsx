import { HStack, Icon, Link, Text, VStack } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { tourCriminaliAtom } from "../state/map";
import { GrInstagram } from "react-icons/gr";
import { BsYoutube } from "react-icons/bs";

export const InfoAndSocial = () => {
  const tourCriminali = useAtomValue(tourCriminaliAtom);
  return (
    <VStack alignItems={"start"} spacing={0} mt={1}>
      <HStack mb={1}>
        <Link
          isExternal={true}
          href={"https://www.instagram.com/franchinoercriminale/"}
        >
          <Icon as={GrInstagram} color={"#363535"} />
        </Link>
        <Link
          isExternal={true}
          href={"https://www.youtube.com/c/FranchinoErCriminale"}
        >
          <Icon as={BsYoutube} color={"#ff0000"} />
        </Link>
      </HStack>
      <Text fontSize={"xs"} fontWeight={"normal"}>
        dati aggiornati al:{" "}
        {new Date(tourCriminali.created_at * 1000).toLocaleDateString("it")}
      </Text>
      <Link
        color={"#1076dc"}
        fontWeight={"normal"}
        fontSize={"xs"}
        isExternal={true}
        href={"https://github.com/Undermaken/mappa-criminale"}
      >
        questo progetto è completamente open-source
      </Link>
    </VStack>
  );
};

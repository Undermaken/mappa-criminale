import { BsFillHeartFill } from "react-icons/bs";
import { GiCoffeeCup } from "react-icons/gi";
import { HStack, Icon, Link, Text, VStack } from "@chakra-ui/react";
export const MadeWithLove = (props: { buyMeACoffeeUrl: string }) => (
  <Link isExternal={true} href={props.buyMeACoffeeUrl}>
    <VStack
      spacing={0.2}
      sx={{ backgroundColor: "gray.100", padding: 2, borderRadius: 4 }}
    >
      <HStack>
        <Text fontSize={"xs"}>fatto con il </Text>
        <Icon as={BsFillHeartFill} color={"#ff0000"} fontSize={"xs"} />
        <Text fontSize={"xs"}> da Matteo</Text>
      </HStack>
      <HStack>
        <Text fontSize={"xs"}>buy me a </Text>
        <Icon as={GiCoffeeCup} color={"#694c2a"} fontSize={"md"} />
      </HStack>
    </VStack>
  </Link>
);

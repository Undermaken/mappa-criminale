import { BsFillHeartFill } from "react-icons/bs";
import { GiCoffeeCup } from "react-icons/gi";
import { HStack, Icon, Link, Text, VStack } from "@chakra-ui/react";
export const MadeWithLove = (props: { buyMeACoffeeUrl: string }) => (
  <Link isExternal={true} href={props.buyMeACoffeeUrl} width={140}>
    <VStack
      spacing={0.2}
      sx={{ backgroundColor: "gray.100", padding: 2, borderRadius: 4 }}
    >
      <Text fontSize={"xs"}>{"te dico 'a verità"}</Text>
      <HStack>
        <Text fontSize={"xs"}>{"l'ho fatto con il "}</Text>
        <Icon as={BsFillHeartFill} color={"#ff0000"} fontSize={"xs"} />
      </HStack>
      <HStack>
        <Text fontSize={"xs"}>buy me a </Text>
        <Icon as={GiCoffeeCup} color={"#694c2a"} fontSize={"md"} />
      </HStack>
    </VStack>
  </Link>
);

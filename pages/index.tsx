import type { NextPage } from "next";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { MappaCriminale } from "../src/components/MappaCriminale";

const Home: NextPage = () => {
  return (
    <ChakraProvider theme={theme}>
      <MappaCriminale />
    </ChakraProvider>
  );
};

export default Home;

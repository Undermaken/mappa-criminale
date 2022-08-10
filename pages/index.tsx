import type { NextPage } from "next";
import { ChakraProvider } from "@chakra-ui/react";
import { MappaCriminale } from "../src/components/MappaCriminale";

const Home: NextPage = () => {
  return (
    <ChakraProvider>
      <MappaCriminale />
    </ChakraProvider>
  );
};

export default Home;

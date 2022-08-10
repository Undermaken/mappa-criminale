import type { NextPage } from 'next'
import {ChakraProvider} from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
      <ChakraProvider>
        <div>hello world!</div>
      </ChakraProvider>

  )
}

export default Home

import { HomeHeader } from "@screens/Header";
import { Center, Text, VStack } from "native-base";

export function Home() {
  return (

    <VStack flex={1}>
      <HomeHeader />
    </VStack>

  );
}


import { useState } from "react";

import { HomeGroup } from "@components/Group";
import { HomeHeader } from "@components/Header";
import { FlatList, HStack, VStack } from "native-base";

export function Home() {
  
  const [groups, setGroups] = useState(["Costas", "Bíceps", "Trícips", "Ombros"]);
  const [groupSelected, setGroupSelected] = useState("costa");
  
  return (

    <VStack flex={1}>

      <HomeHeader />

      <FlatList 
        data={groups}
        keyExtractor={ item => item }
        renderItem={({ item }) => (
          <HomeGroup 
            name={item}
            isActive={groupSelected === item}
            onPress={() => { setGroupSelected(item) }}
          />
        )}
       horizontal={true}
       my={10}
       showsHorizontalScrollIndicator={false}
       _contentContainerStyle={{ px: 8 }}
       maxH={10}
      />

    </VStack>

  );
}

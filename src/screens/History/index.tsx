import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { Center, Heading, SectionList, Text, VStack } from "native-base";
import { useState } from 'react';

export function History() {

  const [exercices, setExcercices] = useState([
    {
      title: '05.03.2023',
      data: ['Puxada Frontal', 'Remada']
    },
    {
      title: '11.03.2023',
      data: ['Agachamento']
    }
  ]);

  return (

    <VStack flex={1}>
      <ScreenHeader title='Historico de Exercicos'/>

      <SectionList 
        sections={exercices}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <HistoryCard />
        )}
        renderSectionHeader={({ section }) => (
          <Heading color='gray.200' fontSize='md' mt={10} mb={3}>
            {section.title}
          </Heading>
        )}
        px={3}
      />
      
      
    </VStack>

  );
}

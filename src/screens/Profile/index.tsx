import { useState } from "react";
import { Center, ScrollView, VStack, Skeleton } from "native-base";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/Avatar";

const PHOTO_SIZE = 33;

export function Profile() {

  const [isLoadingPhoto, setIsLoadingPhoto] = useState(true);

  return (

    <VStack flex={1}>
      <ScreenHeader title="Perfil"/>

      <ScrollView>
        <Center mt={6} px={10}>

          {
            isLoadingPhoto ?

            <Skeleton 
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded='full'
              startColor='gray.500'
              endColor='gray.400'
            />
            :
            <UserPhoto 
              source={{ uri: 'https://github.com/Vitoriano.png'}} 
              alt="Imagem do usuario"
              size={PHOTO_SIZE}
              mr={4}
            />
          }
        </Center>
       
      </ScrollView>
    </VStack>

  );
}

import { useState } from "react";
import { Center, ScrollView, VStack, Skeleton, Text } from "native-base";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/Avatar";
import { TouchableOpacity } from "react-native";
import { Input } from "@components/Input";

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

          <TouchableOpacity>
            <Text color='green.500' fontWeight='bold' fontSize='md' mt={2} mb={8}>
              Altera Foto
            </Text>
          </TouchableOpacity>

          <Input 
            bg='gray.600'
            placeholder="nome"
          />
            
          <Input 
            bg='gray.600'
            placeholder="email.com.br"
            isDisabled
          />

        </Center>
       
      </ScrollView>
    </VStack>

  );
}

import { useState } from "react";
import { Center, ScrollView, VStack, Skeleton, Text, Heading } from "native-base";
import * as ImagePicker from 'expo-image-picker';

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/Avatar";
import { TouchableOpacity } from "react-native";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

const PHOTO_SIZE = 33;

export function Profile() {

  const [isLoadingPhoto, setIsLoadingPhoto] = useState(true);

  async function handleSelectPhoto() {
    await ImagePicker.launchImageLibraryAsync();
  
  }

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

          <TouchableOpacity 
            onPress={handleSelectPhoto}
          >
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
        <VStack px={10} mt={12} mb={9}>
          <Heading color="gray.200" fontSize="md" mb={2}>
            Altera senha
          </Heading>

          <Input 
            placeholder="senha atual"
            bg='gray.600'
            secureTextEntry
          />

          <Input 
            placeholder="nova senha"
            bg='gray.600'
            secureTextEntry
          />

          <Input 
            placeholder="confirma senha"
            bg='gray.600'
            secureTextEntry
          />

          <Button 
            title="Alterar senha"
            mt={6}
          />
        </VStack>
      </ScrollView>
    </VStack>

  );
}

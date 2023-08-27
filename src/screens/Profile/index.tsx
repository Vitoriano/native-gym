import { useState } from "react";
import { Center, ScrollView, VStack, Skeleton, Text, Heading, useToast } from "native-base";
import * as ImagePick from "expo-image-picker";
import * as FileSystem from 'expo-file-system'

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/Avatar";
import { Alert, TouchableOpacity } from "react-native";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

const PHOTO_SIZE = 33;

export function Profile() {

  const [isLoadingPhoto, setIsLoadingPhoto] = useState(true);
  const [photo, setPhoto] = useState('https://github.com/Vitoriano.png');

  const toast = useToast();

  async function handleSelectPhoto() {
    setIsLoadingPhoto(true);
    try {
      
      const { status } = await ImagePick.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        alert('Eita, precisamos de acesso as suas fotos...');
        return;
      }
  
      const result = await ImagePick.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
        mediaTypes: ImagePick.MediaTypeOptions.Images,
        aspect: [4, 4]
      });
  
      
      if (result.canceled) {
        return;
      }
      
      const photoInfo = await FileSystem.getInfoAsync(result.assets[0].uri);

      if(photoInfo.size && (photoInfo.size / 1024 / 1024) > 1){
      
        return toast.show({
          title: 'Imagem muito grande',
          description: 'A imagem deve ter no máximo 1MB',
          placement: 'top',
          duration: 3000,
          bgColor: 'red.500'
        });
        
      }
      
      setPhoto(result.assets[0].uri);

    } catch (error) {
      console.log(error);
    }finally{
      setIsLoadingPhoto(false);
    }

   
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
              source={{ uri: photo }} 
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

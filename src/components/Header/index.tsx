import { Heading, HStack, Icon, Text, VStack } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';

import { UserPhoto } from "@components/Avatar";
import { TouchableOpacity } from "react-native";
import { useAuth } from "@hooks/useAuth";

import defaultUserPhotoImg from '@assets/userPhotoDefault.png';


export function HomeHeader() {

  const { user, singOut } = useAuth();

  return (
      <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">

        <UserPhoto
          source={ user.avatar ? { uri: user.avatar } : defaultUserPhotoImg }
          alt="Imagem do usuario"
          size={16}
          mr={4}
        />

        <VStack flex={1}>
          <Text color='gray.100' fontSize="md">
            Olá,
          </Text>

          <Heading color='gray.100' fontSize="md">
            {user?.name}
          </Heading>
        </VStack>

        <TouchableOpacity
          onPress={singOut}
        >
          <Icon 
            as={MaterialIcons}
            name="logout" 
            color="gray.200"
            size={7}
          />
        </TouchableOpacity>
       
      </HStack>

  );
}
import { Box, Center, HStack, Heading, Icon, Image, Text, VStack, ScrollView } from "native-base";
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from '../../routes/app.routes';

import BodySvg from '@assets/body.svg';
import SeriesSvg from '@assets/series.svg';
import RepetitionsSvg from '@assets/repetitions.svg';
import { Button } from "@components/Button";

export function Exercise() {

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  return (

    <VStack flex={1}>
      <ScrollView>
        <VStack bg='gray.600' px={8} pt={12}>
          <TouchableOpacity onPress={handleGoBack} >
            <Icon as={Feather} name="arrow-left" color='green.500' size={6}/>
          </TouchableOpacity>

          <HStack justifyContent='space-between' mt={4} mb={8} alignItems='center'>
            <Heading color="gray.100" fontSize='lg' flexShrink={1}>
              Puxada Frontal
            </Heading>

            <HStack alignItems='center'>
              <BodySvg />
              <Text color='gray.200' ml={1} textTransform='capitalize'>
                Costas
              </Text>
            </HStack>
          </HStack>

        </VStack>

        <VStack p={8}>
            <Image 
              w='full'
              h={80}
              resizeMode='cover'
              mb={3}
              borderRadius='lg'
              alt="Puxada Frontal"
              source={{ uri: 'https://blog.lionfitness.com.br/wp-content/uploads/2018/11/Puxada-alta-como-conquistar-costas-definidas-300x225.jpg' }}

            />

            <Box bg="gray.600" rounded='md' pb={4} px={4}>
              <HStack justifyContent='space-around' mt={5} mb={6} alignItems='center'>
                <HStack>
                  <SeriesSvg />
                  <Text color="gray.200" ml={2}>
                    3 séries
                  </Text>
                </HStack>

                <HStack>
                  <RepetitionsSvg />
                  <Text color="gray.200" ml={2}>
                    12 repeticoes
                  </Text>
                </HStack>
              </HStack>

              <Button 
                title="Iniciar"
              />

            </Box>
        </VStack>
      </ScrollView>
    </VStack>

  );
}

import { useState } from "react";
import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";

import LogoSvg from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { type } from "os";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
}

export function SignUp(){

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    defaultValues: {
      name: 'Jhon Doe',
      email: '',
      password: '',
    }
  });

  const navigation = useNavigation();

  function handleGoBack(){
    navigation.goBack();
  }

  function handleSignUp(data: FormDataProps){
    console.log(data);
  }

  return (
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1}} 
      showsVerticalScrollIndicator={false}
    >

      <VStack flex={1} bg="gray.700" px={10} pb={16}>
          <Image 
            source={BackgroundImg}
            alt="Pessoas treinando"
            resizeMode="contain"
            position="absolute"
          />

          <Center my={24}>
            <LogoSvg />
            <Text color="gray.100" fontSize="sm">Treine sua mente e o seu corpo</Text>
          </Center>

          <Center>
            <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
              Crie sua conta
            </Heading>

            <Controller 
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input 
                  placeholder="Nome"
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="name"
              rules={{ required: 'Informe o nome' }}
            />
            <Text color="red.500" fontSize="xs">{errors.name?.message}</Text>

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input 
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="email"
              rules={{ required: 'Informe o email' }}
            />
           
           <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input  
                  placeholder="Senha"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(handleSignUp)}
                  returnKeyType="send"
                />
              )}
              name="password"
              rules={{ required: 'Informe a senha' }}
            />

            <Button title="Criar e acessar" 
              onPress={handleSubmit(handleSignUp)}
            />
          </Center>
           
          <Button 
            title="Voltar para o login" 
            variant="outline"
            mt={24}
            onPress={handleGoBack}
          />

      </VStack>

    </ScrollView>
    
  );
}
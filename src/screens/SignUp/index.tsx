import { useState } from "react";
import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller, set } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { api } from "@services/api";

import LogoSvg from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { type } from "os";
import { Alert } from "react-native";

import { AppError } from "@utils/AppError";
import { useAuth } from "@hooks/useAuth";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  email: yup.string().required('Informe o email').email('E-mail inválido'),
  password: yup.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 dígitos.'),
})

export function SignUp(){

  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const { singIn } = useAuth();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  const navigation = useNavigation();

  function handleGoBack(){
    navigation.goBack();
  }

  async function handleSignUp({name, email, password}: FormDataProps){
   
    try {
      setIsLoading(true);
      await api.post('/users', {
        name,
        email,
        password,
      });

      await singIn(email, password);
  
    } catch (error) {
      setIsLoading(false);
      const isAppError = error instanceof AppError;
      toast.show({
        title: isAppError ? error.message : 'Ocorreu um erro ao fazer cadastro',
        duration: 3000,
        placement: 'top',
        bgColor: 'red.500',
      });
    }
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
                  errorMessage={errors.name?.message}
                />
              )}
              name="name"
            />

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input 
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
              name="email"
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
                  errorMessage={errors.password?.message}
                />
              )}
              name="password"
            />

            <Button title="Criar e acessar" 
              onPress={handleSubmit(handleSignUp)}
              isLoading={isLoading}
            />
          </Center>
           
          <Button 
            title="Voltar para o login" 
            variant="outline"
            mt={12}
            onPress={handleGoBack}
          />

      </VStack>

    </ScrollView>
    
  );
}
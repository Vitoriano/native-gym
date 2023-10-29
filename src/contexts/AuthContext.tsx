import { UserDto } from "@dtos/UserDTO";
import { createContext, useEffect, useState } from "react";

import { api } from "@services/api";

import { storageUserGet, storageUserRemove, storageUserSave } from "@storage/storageUser";

export type AuthContextDataProps = {
  user: UserDto;
  singIn: (email: string, password: string) => Promise<void>;
  singOut: () => Promise<void>;
  isLoadigUserStorageData: boolean;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

type AuthContextProviderProps = {
  children: React.ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {

  const [user, setUser] = useState<UserDto>({} as UserDto);
  const [isLoadigUserStorageData, setIsLoadigUserStorageData] = useState(true);

  async function singIn(email: string, password: string): Promise<void> {
    try {

      const { data } =  await api.post('/sessions', {
        email,
        password,
      });
  
      if(data.user){
        setUser(data.user);
        storageUserSave(data.user);
      }

    } catch(error) {
      throw error;
    }
    
  }

  async function singOut(): Promise<void> {
    try {
      
      setIsLoadigUserStorageData(true)
      setUser({} as UserDto);
      await storageUserRemove()

    } catch (error) {
      throw error;
    } finally {
      setIsLoadigUserStorageData(false)
    }
  }

  async function loadingUserStorageData() {
   try {

    const userStorage = await storageUserGet();
    
    if(userStorage){
      setUser(userStorage);
    }

   } catch (error) {
     throw error;
   } finally {
    setIsLoadigUserStorageData(false);
   }
  }
  

  useEffect(() => {
    loadingUserStorageData();
  }
  ,[]);

  return (
    <AuthContext.Provider value={{
      user,
      singIn,
      singOut,
      isLoadigUserStorageData,
    }}>
    { children}
    </AuthContext.Provider>
  );
}
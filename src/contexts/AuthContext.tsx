import { UserDto } from "@dtos/UserDTO";
import { createContext, useState } from "react";

import { api } from "@services/api";

import { storageUserSave } from "@storage/storageUser";

export type AuthContextDataProps = {
  user: UserDto;
  singIn: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

type AuthContextProviderProps = {
  children: React.ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {

  const [user, setUser] = useState<UserDto>({} as UserDto);


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

  return (
    <AuthContext.Provider value={{
      user,
      singIn,

    }}>
    { children}
    </AuthContext.Provider>
  );
}
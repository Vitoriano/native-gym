import { UserDto } from "@dtos/UserDTO";
import { createContext } from "react";

export type AuthContextDataProps = {
  user: UserDto;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

type AuthContextProviderProps = {
  children: React.ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  return (
    <AuthContext.Provider value={{
      user: {
        id: '1',
        name: 'Vitoriano',
        email: 'teste@teste.com',
        avatar: 'aavatar.png',
      }
    }}>
    { children}
    </AuthContext.Provider>
  );
}
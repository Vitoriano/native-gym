import { UserDto } from "@dtos/UserDTO";
import { createContext, useState } from "react";

export type AuthContextDataProps = {
  user: UserDto;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

type AuthContextProviderProps = {
  children: React.ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {

  const [user, setUser] = useState<UserDto>({
    id: '1',
    name: 'Vitoriano Ernandes',
    email: 'teste@teste.com',
    avatar: 'aavatar.png',
  } as UserDto);

  return (
    <AuthContext.Provider value={{
      user
    }}>
    { children}
    </AuthContext.Provider>
  );
}
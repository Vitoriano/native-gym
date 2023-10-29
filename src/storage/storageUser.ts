import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserDto } from "@dtos/UserDTO";
import { USER_STORAGE } from "./storageConfig";

export async function storageUserSave(user: UserDto) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

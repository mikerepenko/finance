import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStorage = async <T>(name: string): Promise<T> => {
  const response = await AsyncStorage.getItem(name);
  return response ? JSON.parse(response) : undefined;
};

export const setStorage = async <T>(name: string, table: T) => {
  return await AsyncStorage.setItem(name, JSON.stringify(table));
};

export const updateStorage = async <T>(
  name: string,
  updatedElements: T,
) => {
  return await AsyncStorage.setItem(
    name,
    JSON.stringify(updatedElements),
  );
};

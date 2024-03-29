import { Pressable, Text, IPressableProps } from "native-base";

type Props = IPressableProps & {
  name: string;
  isActive: boolean;
}

export function HomeGroup({ name, isActive, ...rest }: Props) {
  return (
    <Pressable
      mr={3}
      w={24}
      h={10}
      bg="gray.600"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      rounded="md"
      isPressed={isActive}
      _pressed={{
        borderColor: "green.500",
        borderWidth: 1
      }}
      {...rest}
    >
      <Text
        color={ isActive ? "green.500": "gray.200"}
        textTransform="uppercase"
        fontSize="xs"
        fontWeight="bold"
      >
        {name}
      </Text>
    </Pressable>
    
  );
}
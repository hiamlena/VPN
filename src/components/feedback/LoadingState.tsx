import { Flex, Spinner, Text } from '@chakra-ui/react';

const LoadingState = () => (
  <Flex direction="column" align="center" gap={3} py={8}>
    <Spinner size="xl" color="cyan.300" thickness="4px" speed="0.7s" />
    <Text color="gray.200">Генерация плана... Подождите, пожалуйста.</Text>
  </Flex>
);

export default LoadingState;

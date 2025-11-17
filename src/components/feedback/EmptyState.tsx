import { Center, Stack, Text } from '@chakra-ui/react';
import { Compass } from 'lucide-react';

const EmptyState = () => (
  <Center py={10} borderWidth={1} borderColor="gray.700" borderRadius="lg" bg="gray.800">
    <Stack align="center" spacing={3}>
      <Compass size={32} color="cyan" />
      <Text fontSize="lg" color="gray.100">
        Заполните форму, чтобы получить план развертывания VPN.
      </Text>
    </Stack>
  </Center>
);

export default EmptyState;

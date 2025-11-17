import { Box, Container, Stack } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

const Workspace = ({ children }: PropsWithChildren) => (
  <Box as="main" flex="1" overflowY="auto" bg="gray.900">
    <Container maxW="6xl" py={8} px={{ base: 4, md: 8 }}>
      <Stack spacing={6}>{children}</Stack>
    </Container>
  </Box>
);

export default Workspace;

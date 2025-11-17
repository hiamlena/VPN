import { Flex, Heading, IconButton, Spacer } from '@chakra-ui/react';
import { History } from 'lucide-react';

interface AppHeaderProps {
  onOpenHistory: () => void;
}

const AppHeader = ({ onOpenHistory }: AppHeaderProps) => (
  <Flex
    as="header"
    align="center"
    px={6}
    py={4}
    borderBottomWidth={1}
    borderColor="gray.700"
    bg="gray.800"
    position="sticky"
    top={0}
    zIndex={10}
    gap={2}
  >
    <Heading size="md" color="cyan.300">
      VPN Deployment Assistant
    </Heading>
    <Spacer />
    <IconButton
      aria-label="История запросов"
      icon={<History size={18} />}
      variant="ghost"
      colorScheme="cyan"
      onClick={onOpenHistory}
    />
  </Flex>
);

export default AppHeader;

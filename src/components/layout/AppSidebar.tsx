import { Box, Heading, Icon, List, ListItem, Stack } from '@chakra-ui/react';
import type { GeminiResponseSection } from '@types/gemini';
import { ChevronRight } from 'lucide-react';
import { useMemo } from 'react';

interface AppSidebarProps {
  sections: GeminiResponseSection[];
}

const AppSidebar = ({ sections }: AppSidebarProps) => {
  const anchors = useMemo(
    () =>
      sections.map(section => ({
        id: section.id,
        title: section.title,
      })),
    [sections],
  );

  return (
    <Box
      as="aside"
      w={{ base: 'full', md: 64 }}
      borderRightWidth={{ base: 0, md: 1 }}
      borderColor="gray.700"
      bg="gray.850"
      display={{ base: 'none', md: 'block' }}
      p={4}
      overflowY="auto"
    >
      <Stack spacing={4}>
        <Heading size="sm" color="cyan.300">
          Секции
        </Heading>
        <List spacing={2}>
          {anchors.map(anchor => (
            <ListItem key={anchor.id} fontSize="sm" color="gray.100">
              <a href={`#${anchor.id}`}>
                <Icon as={ChevronRight} color="cyan.300" boxSize={4} mr={1} />
                {anchor.title}
              </a>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Box>
  );
};

export default AppSidebar;

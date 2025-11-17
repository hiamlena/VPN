import {
  Badge,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react';
import type { HistoryRecord } from '@modules/history/types';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryRecord[];
  onSelect: (recordId: string) => void;
  onClear: () => void;
}

const HistoryDrawer = ({ isOpen, onClose, history, onSelect, onClear }: HistoryDrawerProps) => (
  <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
    <DrawerOverlay />
    <DrawerContent bg="gray.900">
      <DrawerCloseButton />
      <DrawerHeader borderBottomWidth={1} borderColor="gray.700" color="cyan.300">
        История запросов
      </DrawerHeader>
      <DrawerBody>
        <Stack spacing={4}>
          {history.length === 0 && <Text color="gray.400">История пуста</Text>}
          {history.map(record => (
            <Button
              key={record.id}
              onClick={() => onSelect(record.id)}
              variant="outline"
              borderColor="gray.700"
              justifyContent="flex-start"
              height="auto"
              py={3}
            >
              <Stack align="start" spacing={1}>
                <Text fontWeight="bold" color="gray.100">
                  {record.request.slice(0, 60)}
                </Text>
                <HStack spacing={2}>
                  <Badge colorScheme="cyan">{record.response.length} символов</Badge>
                  <Badge colorScheme="purple">
                    {formatDistanceToNow(new Date(record.createdAt), { addSuffix: true, locale: ru })}
                  </Badge>
                </HStack>
              </Stack>
            </Button>
          ))}
        </Stack>
      </DrawerBody>
      <DrawerFooter borderTopWidth={1} borderColor="gray.700">
        <Button variant="ghost" colorScheme="red" onClick={onClear} isDisabled={history.length === 0}>
          Очистить историю
        </Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);

export default HistoryDrawer;

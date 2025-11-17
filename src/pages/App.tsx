import { Box, Flex, useDisclosure, useToast } from '@chakra-ui/react';
import HistoryDrawer from '@components/display/HistoryDrawer';
import ResponseViewer from '@components/display/ResponseViewer';
import EmptyState from '@components/feedback/EmptyState';
import ErrorAlert from '@components/feedback/ErrorAlert';
import LoadingState from '@components/feedback/LoadingState';
import RequestForm from '@components/inputs/RequestForm';
import AppHeader from '@components/layout/AppHeader';
import AppSidebar from '@components/layout/AppSidebar';
import Workspace from '@components/layout/Workspace';
import { useRequestHistory } from '@hooks/useRequestHistory';
import { GeminiService } from '@services/geminiService';
import type { GeminiResponseSection } from '@types/gemini';
import type { GenerationRequest } from '@types/requests';
import { handleError } from '@utils/errorHandler';
import { formatSections } from '@utils/markdown';
import { useCallback, useMemo, useState } from 'react';

const geminiService = new GeminiService();

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast({ position: 'bottom-right' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sections, setSections] = useState<GeminiResponseSection[]>([]);
  const [rawResponse, setRawResponse] = useState('');
  const { history, addEntry, clearHistory, restoreFromHistory } = useRequestHistory();

  const handleSubmit = useCallback(
    async (payload: GenerationRequest) => {
      setIsLoading(true);
      setError(null);
      setSections([]);
      setRawResponse('');
      try {
        const { responseText } = await geminiService.generateVpnPlan(payload);
        const parsedSections = formatSections(responseText);
        setSections(parsedSections);
        setRawResponse(responseText);
        addEntry({ request: payload.prompt, response: responseText });
        toast({ title: 'План готов', status: 'success', duration: 4000, isClosable: true });
      } catch (err) {
        const handledError = handleError(err);
        setError(handledError.message);
        toast({ title: 'Ошибка', description: handledError.userMessage, status: 'error', duration: 6000 });
      } finally {
        setIsLoading(false);
      }
    },
    [addEntry, toast],
  );

  const handleSelectHistory = useCallback(
    (recordId: string) => {
      const record = restoreFromHistory(recordId);
      if (record) {
        setRawResponse(record.response);
        setSections(formatSections(record.response));
        toast({ title: 'История загружена', status: 'info', duration: 3000 });
      }
    },
    [restoreFromHistory, toast],
  );

  const hasContent = useMemo(() => sections.length > 0, [sections]);

  return (
    <Flex direction="column" minH="100vh" bg="gray.900" color="gray.50">
      <AppHeader onOpenHistory={onOpen} />
      <Flex flex="1" overflow="hidden">
        <AppSidebar sections={sections} />
        <Workspace>
          <RequestForm onSubmit={handleSubmit} isSubmitting={isLoading} />
          {isLoading && <LoadingState />}
          {error && <ErrorAlert message={error} />}
          {!isLoading && !error && !hasContent && <EmptyState />}
          {hasContent && <ResponseViewer sections={sections} rawResponse={rawResponse} />}
        </Workspace>
      </Flex>
      <HistoryDrawer
        isOpen={isOpen}
        onClose={onClose}
        history={history}
        onSelect={handleSelectHistory}
        onClear={() => clearHistory()}
      />
      <Box as="footer" py={4} textAlign="center" borderTopWidth={1} borderColor="gray.700" bg="gray.800">
        Производственное приложение для планирования VPN. Результаты требуют проверки специалистом.
      </Box>
    </Flex>
  );
};

export default App;

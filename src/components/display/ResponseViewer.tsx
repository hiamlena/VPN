import { Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Stack, Text, Tooltip, useToast } from '@chakra-ui/react';
import type { GeminiResponseSection } from '@types/gemini';
import { ClipboardCopy } from 'lucide-react';
import { useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ResponseViewerProps {
  sections: GeminiResponseSection[];
  rawResponse: string;
}

const ResponseViewer = ({ sections, rawResponse }: ResponseViewerProps) => {
  const toast = useToast({ position: 'bottom-right' });

  const handleCopy = useCallback(
    async (text: string, label: string) => {
      try {
        await navigator.clipboard.writeText(text);
        toast({ title: label, status: 'success', duration: 2000, isClosable: true });
      } catch (error) {
        console.error('Copy failed', error);
        toast({ title: 'Не удалось скопировать', status: 'error', duration: 3000, isClosable: true });
      }
    },
    [toast],
  );

  return (
    <Stack spacing={6}>
      {sections.map(section => (
        <Card key={section.id} id={section.id} variant="outline" borderColor="gray.700" bg="gray.800">
          <CardHeader display="flex" alignItems="center" justifyContent="space-between" gap={4}>
            <Heading size="md" color="cyan.300">
              {section.title}
            </Heading>
            <Tooltip label="Скопировать раздел">
              <IconButton
                aria-label="Скопировать"
                icon={<ClipboardCopy size={18} />}
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(section.content, 'Раздел скопирован')}
              />
            </Tooltip>
          </CardHeader>
          <CardBody>
            <Box className="markdown-body" color="gray.100">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{section.content}</ReactMarkdown>
            </Box>
          </CardBody>
        </Card>
      ))}
      <Card variant="outline" borderColor="gray.700" bg="gray.800">
        <CardHeader display="flex" alignItems="center" justifyContent="space-between">
          <Heading size="sm" color="gray.200">
            Полный ответ
          </Heading>
          <Tooltip label="Скопировать текст">
            <IconButton
              aria-label="Скопировать"
              icon={<ClipboardCopy size={18} />}
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(rawResponse, 'Ответ скопирован')}
            />
          </Tooltip>
        </CardHeader>
        <CardBody>
          <Flex direction="column" gap={2}>
            <Text fontSize="sm" color="gray.300">
              Форматирование поддерживает Markdown и кодовые блоки.
            </Text>
            <Box className="markdown-body" color="gray.100">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{rawResponse}</ReactMarkdown>
            </Box>
          </Flex>
        </CardBody>
      </Card>
    </Stack>
  );
};

export default ResponseViewer;

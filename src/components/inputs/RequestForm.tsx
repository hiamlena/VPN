import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import type { GenerationRequest } from '@types/requests';
import { Wand2 } from 'lucide-react';
import { useMemo } from 'react';

interface RequestFormProps {
  onSubmit: (payload: GenerationRequest) => void;
  isSubmitting: boolean;
}

const RequestForm = ({ onSubmit, isSubmitting }: RequestFormProps) => {
  const defaultPrompt = useMemo(
    () =>
      'Сгенерируй детальный план развертывания корпоративного VPN на базе WireGuard для транспортной компании в Краснодарском крае. Русский язык.',
    [],
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const prompt = (formData.get('prompt') as string).trim();
    const company = (formData.get('company') as string).trim();

    onSubmit({ prompt, company });
  };

  return (
    <Card variant="filled" bg="gray.800" borderColor="gray.700" borderWidth={1}>
      <CardHeader>
        <Flex align="center" justify="space-between" gap={4}>
          <Stack spacing={1}>
            <Text fontWeight="bold" color="gray.50">
              Запрос к ИИ
            </Text>
            <Text fontSize="sm" color="gray.300">
              Опишите потребности компании и сформируйте стратегию развёртывания.
            </Text>
          </Stack>
          <Badge colorScheme="cyan">Gemini 2.5 Pro</Badge>
        </Flex>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel color="gray.200">Описание запроса</FormLabel>
              <Textarea
                name="prompt"
                defaultValue={defaultPrompt}
                minH={28}
                resize="vertical"
                bg="gray.900"
                borderColor="gray.700"
                _hover={{ borderColor: 'cyan.500' }}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="gray.200">Название компании</FormLabel>
              <Input
                name="company"
                placeholder="ООО "
                bg="gray.900"
                borderColor="gray.700"
                _hover={{ borderColor: 'cyan.500' }}
              />
            </FormControl>
            <HStack justify="flex-end">
              <Button
                type="submit"
                colorScheme="cyan"
                leftIcon={<Wand2 size={18} />}
                isLoading={isSubmitting}
                loadingText="Генерация"
              >
                Сгенерировать план
              </Button>
            </HStack>
          </Stack>
        </form>
      </CardBody>
    </Card>
  );
};

export default RequestForm;

import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react';

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert = ({ message }: ErrorAlertProps) => (
  <Alert status="error" borderRadius="md" borderWidth={1} borderColor="red.500" bg="red.900">
    <AlertIcon />
    <AlertTitle>Ошибка</AlertTitle>
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);

export default ErrorAlert;

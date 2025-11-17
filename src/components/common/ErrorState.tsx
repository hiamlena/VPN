import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { AppButton } from '../ui/AppButton';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => (
  <View style={styles.container}>
    <Text variant="bodyLarge" style={styles.message}>
      {message}
    </Text>
    {onRetry ? <AppButton label="Повторить" onPress={onRetry} /> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  message: {
    marginBottom: 8,
  },
});

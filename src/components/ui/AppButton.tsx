import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

interface AppButtonProps {
  onPress: () => void;
  label: string;
  mode?: 'text' | 'outlined' | 'contained';
  disabled?: boolean;
}

export const AppButton: React.FC<AppButtonProps> = ({ onPress, label, mode = 'contained', disabled }) => (
  <Button mode={mode} onPress={onPress} style={styles.button} contentStyle={styles.content} disabled={disabled}>
    {label}
  </Button>
);

const styles = StyleSheet.create({
  button: {
    marginVertical: 8,
  },
  content: {
    paddingVertical: 6,
  },
});

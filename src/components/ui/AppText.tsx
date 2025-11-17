import React from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import { Text } from 'react-native-paper';

interface AppTextProps {
  children: React.ReactNode;
  variant?: 'bodyMedium' | 'bodyLarge' | 'titleLarge' | 'titleMedium';
  style?: StyleProp<TextStyle>;
}

export const AppText: React.FC<AppTextProps> = ({ children, style, variant = 'bodyLarge' }) => (
  <Text variant={variant} style={[styles.text, style]}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    marginBottom: 8,
  },
});

import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';

interface ScreenLayoutProps {
  title?: string;
  children: React.ReactNode;
  scrollable?: boolean;
}

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({ title, children, scrollable = true }) => (
  <View style={styles.container}>
    {title ? (
      <Appbar.Header>
        <Appbar.Content title={title} />
      </Appbar.Header>
    ) : null}
    {scrollable ? <ScrollView style={styles.content}>{children}</ScrollView> : <View style={styles.content}>{children}</View>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});

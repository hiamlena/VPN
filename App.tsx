import 'react-native-gesture-handler';

import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { LoadingOverlay } from './src/components/common/LoadingOverlay';
import { AppStateProvider, useAppState } from './src/hooks/AppStateContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { getPaperTheme } from './src/utils/theme';

const AppContent: React.FC = () => {
  const { isReady, theme, globalLoading } = useAppState();
  const paperTheme = getPaperTheme(theme);

  if (!isReady) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <PaperProvider theme={paperTheme}>
      <SafeAreaProvider>
        <AppNavigator />
        <LoadingOverlay visible={globalLoading} />
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default function App() {
  return (
    <AppStateProvider>
      <AppContent />
    </AppStateProvider>
  );
}

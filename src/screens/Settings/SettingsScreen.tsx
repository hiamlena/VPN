import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { List, Switch, Text } from 'react-native-paper';

import { ScreenLayout } from '../../components/common/ScreenLayout';
import { useAppState } from '../../hooks/AppStateContext';

export const SettingsScreen: React.FC = () => {
  const { theme, setTheme, showInstructionsOnLaunch, setShowInstructionsOnLaunch } = useAppState();

  const handleSendLog = () => {
    Alert.alert('Отправка', 'Логи будут отправлены в поддержку (заглушка).');
  };

  return (
    <ScreenLayout title="Настройки" scrollable>
      <List.Section>
        <List.Item
          title="Тёмная тема"
          left={(props) => <List.Icon {...props} icon="moon-waning-crescent" />}
          right={() => <Switch value={theme === 'dark'} onValueChange={(value) => setTheme(value ? 'dark' : 'light')} />}
        />
        <List.Item
          title="Показывать инструкцию при запуске"
          left={(props) => <List.Icon {...props} icon="information-outline" />}
          right={() => (
            <Switch value={showInstructionsOnLaunch} onValueChange={(value) => setShowInstructionsOnLaunch(value)} />
          )}
        />
      </List.Section>

      <View style={styles.section}>
        <Text variant="titleMedium">Поддержка</Text>
        <List.Item title="Отправить лог / информацию" onPress={handleSendLog} left={(props) => <List.Icon {...props} icon="send" />} />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: 12,
  },
});

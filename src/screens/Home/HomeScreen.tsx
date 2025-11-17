import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Linking, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { ErrorState } from '../../components/common/ErrorState';
import { LoadingOverlay } from '../../components/common/LoadingOverlay';
import { ScreenLayout } from '../../components/common/ScreenLayout';
import { AppButton } from '../../components/ui/AppButton';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { useAppState } from '../../hooks/AppStateContext';

const CHECK_URL = 'https://httpbin.org/status/200';
const VPN_DEEPLINK = 'openvpn://';

export const HomeScreen: React.FC = () => {
  const { profile, setGlobalLoading, globalLoading, showInstructionsOnLaunch } = useAppState();
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      if (showInstructionsOnLaunch) {
        setConnectionStatus(false);
      }
    }, [showInstructionsOnLaunch]),
  );

  const handleOpenClient = async () => {
    try {
      const supported = await Linking.canOpenURL(VPN_DEEPLINK);
      if (supported) {
        await Linking.openURL(VPN_DEEPLINK);
      } else {
        Alert.alert('Подсказка', 'Откройте установленный VPN-клиент вручную или через ярлык.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Ошибка', 'Не удалось открыть VPN-клиент.');
    }
  };

  const handleCheckAccess = async () => {
    setError(null);
    setGlobalLoading(true);
    try {
      const response = await fetch(CHECK_URL);
      if (!response.ok) {
        throw new Error('Не удалось подтвердить доступ');
      }
      setConnectionStatus(true);
    } catch (err) {
      console.error(err);
      setConnectionStatus(false);
      setError('Доступ до сервисов не подтверждён. Попробуйте снова.');
    } finally {
      setGlobalLoading(false);
    }
  };

  return (
    <ScreenLayout title="Главная" scrollable>
      <Card style={styles.card}>
        <Card.Title title="Статус VPN" />
        <Card.Content>
          <StatusBadge connected={connectionStatus} />
          <Text variant="bodyMedium" style={{ marginTop: 8 }}>
            Статус основан на ваших действиях. Приложение не управляет VPN-соединением напрямую.
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Действия" />
        <Card.Content>
          <AppButton label="Открыть VPN-клиент" onPress={handleOpenClient} />
          <AppButton
            label="Инструкция по подключению"
            onPress={() => Linking.openURL('https://example.com/vpn-instructions')}
            mode="outlined"
          />
          <AppButton label="Проверить доступ" onPress={handleCheckAccess} />
        </Card.Content>
      </Card>

      {profile ? (
        <Card style={styles.card}>
          <Card.Title title="Быстрая информация" />
          <Card.Content>
            <Text variant="bodyLarge">{profile.name}</Text>
            <Text variant="bodyMedium">Отдел: {profile.department}</Text>
            <Text variant="bodyMedium">Профиль VPN: {profile.vpnProfileName}</Text>
          </Card.Content>
        </Card>
      ) : null}

      {error ? <ErrorState message={error} onRetry={handleCheckAccess} /> : null}

      <LoadingOverlay visible={globalLoading} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
});

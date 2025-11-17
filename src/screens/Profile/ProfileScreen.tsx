import * as Clipboard from 'expo-clipboard';
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { ScreenLayout } from '../../components/common/ScreenLayout';
import { AppButton } from '../../components/ui/AppButton';
import { useAppState } from '../../hooks/AppStateContext';

export const ProfileScreen: React.FC = () => {
  const { profile } = useAppState();

  const handleCopy = async () => {
    if (!profile) return;
    const payload = `VPN: ${profile.vpnServer}:${profile.vpnPort}\nПрофиль: ${profile.vpnProfileName}\nID: ${profile.id}\nТелефон: ${profile.phone}`;
    await Clipboard.setStringAsync(payload);
    Alert.alert('Скопировано', 'Данные сохранены в буфере обмена.');
  };

  if (!profile) {
    return (
      <ScreenLayout title="Профиль">
        <Text>Заполните данные в разделе «Вход», чтобы видеть профиль.</Text>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Профиль">
      <Card style={styles.card}>
        <Card.Title title={profile.name} subtitle={`ID: ${profile.id}`} />
        <Card.Content>
          <Text variant="bodyMedium">Отдел: {profile.department}</Text>
          <Text variant="bodyMedium">Телефон: {profile.phone}</Text>
          <Text variant="bodyMedium">Статус профиля: {profile.status === 'active' ? 'Активен' : 'В ожидании'}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="VPN-подключение" />
        <Card.Content>
          <Text variant="bodyMedium">Сервер: {profile.vpnServer}</Text>
          <Text variant="bodyMedium">Порт: {profile.vpnPort}</Text>
          <Text variant="bodyMedium">Имя профиля: {profile.vpnProfileName}</Text>
        </Card.Content>
      </Card>

      <View style={{ marginTop: 8 }}>
        <AppButton label="Скопировать данные" onPress={handleCopy} />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
});

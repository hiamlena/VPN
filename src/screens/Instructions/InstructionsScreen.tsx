import React from 'react';
import { View } from 'react-native';
import { List, Text } from 'react-native-paper';

import { ScreenLayout } from '../../components/common/ScreenLayout';

const steps = [
  'Шаг 1: установите VPN-клиент по ссылке, которую отправила компания.',
  'Шаг 2: импортируйте конфигурацию или отсканируйте QR-код, который вы получили от офиса.',
  'Шаг 3: нажмите «Подключить» и убедитесь, что статус в клиенте зелёный.',
];

export const InstructionsScreen: React.FC = () => (
  <ScreenLayout title="Инструкции">
    <View>
      <Text variant="titleMedium" style={{ marginBottom: 12 }}>
        Подключение к корпоративному VPN
      </Text>
      {steps.map((step) => (
        <List.Item key={step} title={step} left={(props) => <List.Icon {...props} icon="check-circle" />} />
      ))}
      <Text variant="bodyMedium" style={{ marginTop: 12 }}>
        Если что-то не получается — обратитесь в поддержку. Никаких обходов ограничений: используйте только корпоративный
        клиент.
      </Text>
    </View>
  </ScreenLayout>
);

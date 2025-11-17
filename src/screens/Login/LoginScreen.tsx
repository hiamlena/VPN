import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';

import { ScreenLayout } from '../../components/common/ScreenLayout';
import { AppButton } from '../../components/ui/AppButton';
import { useAppState } from '../../hooks/AppStateContext';
import { RootStackParamList } from '../../types/navigation';

export const LoginScreen: React.FC<NativeStackScreenProps<RootStackParamList, 'Login'>> = ({ navigation }) => {
  const { saveProfile } = useAppState();
  const [driverId, setDriverId] = useState('');
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!driverId || !phone || !pin) {
      setError('Заполните все поля.');
      return;
    }

    setError(null);

    try {
      await saveProfile({
        id: driverId,
        name: `Водитель ${driverId}`,
        department: 'Автопарк',
        phone,
        status: 'active',
        vpnServer: 'vpn.company.local',
        vpnPort: '443',
        vpnProfileName: `driver-${driverId}`,
      });
      navigation.replace('MainTabs');
    } catch (err) {
      console.error(err);
      Alert.alert('Ошибка', 'Не удалось сохранить профиль. Попробуйте ещё раз.');
    }
  };

  return (
    <ScreenLayout title="Вход" scrollable={false}>
      <View>
        <TextInput label="ID водителя" value={driverId} onChangeText={setDriverId} style={{ marginBottom: 12 }} />
        <TextInput
          label="Телефон"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={{ marginBottom: 12 }}
        />
        <TextInput label="Пин-код" value={pin} onChangeText={setPin} secureTextEntry style={{ marginBottom: 12 }} />
        {error ? <HelperText type="error">{error}</HelperText> : null}
        <AppButton label="Войти" onPress={handleSubmit} />
      </View>
    </ScreenLayout>
  );
};

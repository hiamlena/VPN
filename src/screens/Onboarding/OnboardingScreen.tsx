import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { Paragraph } from 'react-native-paper';

import { ScreenLayout } from '../../components/common/ScreenLayout';
import { AppButton } from '../../components/ui/AppButton';
import { AppText } from '../../components/ui/AppText';
import { useAppState } from '../../hooks/AppStateContext';
import { RootStackParamList } from '../../types/navigation';

const slides = [
  'Это приложение помогает вам подключаться к корпоративному VPN и пользоваться рабочими сервисами.',
  'Все настройки делает компания, ваша задача – нажать пару кнопок и следовать инструкции.',
];

export const OnboardingScreen: React.FC<NativeStackScreenProps<RootStackParamList, 'Onboarding'>> = ({
  navigation,
}) => {
  const [index, setIndex] = useState(0);
  const { completeOnboarding } = useAppState();

  const isLastSlide = useMemo(() => index >= slides.length - 1, [index]);

  const handleNext = async () => {
    if (isLastSlide) {
      await completeOnboarding();
      navigation.replace('Login');
      return;
    }

    setIndex((prev) => prev + 1);
  };

  return (
    <ScreenLayout title="Добро пожаловать" scrollable={false}>
      <View>
        <AppText variant="titleLarge">VPN-помощник для водителей</AppText>
        <Paragraph>{slides[index]}</Paragraph>
      </View>
      <View style={{ marginTop: 24 }}>
        <AppButton label={isLastSlide ? 'Продолжить' : 'Далее'} onPress={handleNext} />
      </View>
    </ScreenLayout>
  );
};

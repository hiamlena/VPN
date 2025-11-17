import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';

import { useAppState } from '../hooks/AppStateContext';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { InstructionsScreen } from '../screens/Instructions/InstructionsScreen';
import { LoginScreen } from '../screens/Login/LoginScreen';
import { OnboardingScreen } from '../screens/Onboarding/OnboardingScreen';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';
import { SettingsScreen } from '../screens/Settings/SettingsScreen';
import { MainTabParamList, RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

type MainTabsProps = {
  initialRouteName: keyof MainTabParamList;
};

const MainTabs: React.FC<MainTabsProps> = ({ initialRouteName }) => (
  <Tab.Navigator
    initialRouteName={initialRouteName}
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        const icons: Record<keyof MainTabParamList, keyof typeof MaterialIcons.glyphMap> = {
          Home: 'shield',
          Instructions: 'list-alt',
          Profile: 'person',
          Settings: 'settings',
        };

        return <MaterialIcons name={icons[route.name as keyof MainTabParamList]} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Главная' }} />
    <Tab.Screen name="Instructions" component={InstructionsScreen} options={{ title: 'Инструкции' }} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Профиль' }} />
    <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Настройки' }} />
  </Tab.Navigator>
);

export const AppNavigator: React.FC = () => {
  const { onboardingSeen, profile, theme, showInstructionsOnLaunch } = useAppState();
  const initialTab = useMemo<keyof MainTabParamList>(() => (showInstructionsOnLaunch ? 'Instructions' : 'Home'), [
    showInstructionsOnLaunch,
  ]);

  const initialRoute = useMemo<keyof RootStackParamList>(
    () => (onboardingSeen ? (profile ? 'MainTabs' : 'Login') : 'Onboarding'),
    [onboardingSeen, profile],
  );

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs">
          {() => <MainTabs initialRouteName={initialTab} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

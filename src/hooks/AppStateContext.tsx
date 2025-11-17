import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { storageService } from '../services/storageService';
import { DriverProfile, ThemePreference } from '../types/app';

interface AppStateValue {
  isReady: boolean;
  onboardingSeen: boolean;
  profile: DriverProfile | null;
  theme: ThemePreference;
  showInstructionsOnLaunch: boolean;
  globalLoading: boolean;
  setGlobalLoading: (value: boolean) => void;
  completeOnboarding: () => Promise<void>;
  saveProfile: (profile: DriverProfile) => Promise<void>;
  clearProfile: () => Promise<void>;
  setTheme: (theme: ThemePreference) => Promise<void>;
  setShowInstructionsOnLaunch: (value: boolean) => Promise<void>;
}

const AppStateContext = createContext<AppStateValue | undefined>(undefined);

export const AppStateProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [onboardingSeen, setOnboardingSeen] = useState(false);
  const [profile, setProfile] = useState<DriverProfile | null>(null);
  const [theme, setThemePreference] = useState<ThemePreference>('light');
  const [showInstructionsOnLaunch, setShowInstructionsOnLaunch] = useState<boolean>(true);
  const [globalLoading, setGlobalLoading] = useState(false);

  useEffect(() => {
    const loadState = async () => {
      const [storedOnboarding, storedProfile, storedTheme, storedInstructionFlag] = await Promise.all([
        storageService.getOnboardingSeen(),
        storageService.getProfile(),
        storageService.getThemePreference(),
        storageService.getInstructionFlag(),
      ]);

      setOnboardingSeen(storedOnboarding);
      setProfile(storedProfile);
      setThemePreference(storedTheme);
      setShowInstructionsOnLaunch(storedInstructionFlag);
      setIsReady(true);
    };

    void loadState();
  }, []);

  const completeOnboarding = useCallback(async () => {
    await storageService.setOnboardingSeen(true);
    setOnboardingSeen(true);
  }, []);

  const saveProfile = useCallback(async (data: DriverProfile) => {
    await storageService.setProfile(data);
    setProfile(data);
  }, []);

  const clearProfile = useCallback(async () => {
    await storageService.clearProfile();
    setProfile(null);
  }, []);

  const setTheme = useCallback(async (preference: ThemePreference) => {
    await storageService.setThemePreference(preference);
    setThemePreference(preference);
  }, []);

  const setInstructionFlag = useCallback(async (value: boolean) => {
    await storageService.setInstructionFlag(value);
    setShowInstructionsOnLaunch(value);
  }, []);

  const value = useMemo<AppStateValue>(
    () => ({
      isReady,
      onboardingSeen,
      profile,
      theme,
      showInstructionsOnLaunch,
      globalLoading,
      setGlobalLoading,
      completeOnboarding,
      saveProfile,
      clearProfile,
      setTheme,
      setShowInstructionsOnLaunch: setInstructionFlag,
    }),
    [
      clearProfile,
      completeOnboarding,
      globalLoading,
      isReady,
      onboardingSeen,
      profile,
      saveProfile,
      setInstructionFlag,
      setTheme,
      showInstructionsOnLaunch,
      theme,
    ],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};

export const useAppState = (): AppStateValue => {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider');
  }

  return context;
};

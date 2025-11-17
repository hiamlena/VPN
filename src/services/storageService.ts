import AsyncStorage from '@react-native-async-storage/async-storage';

import { DriverProfile, ThemePreference } from '../types/app';

const ONBOARDING_KEY = 'vpn_onboarding_seen';
const PROFILE_KEY = 'vpn_driver_profile';
const THEME_KEY = 'vpn_theme_preference';
const INSTRUCTION_KEY = 'vpn_instruction_flag';

const booleanFromString = (value: string | null): boolean => value === 'true';

export const storageService = {
  async getOnboardingSeen(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(ONBOARDING_KEY);
      return booleanFromString(value);
    } catch (error) {
      console.error('Failed to read onboarding flag', error);
      return false;
    }
  },

  async setOnboardingSeen(seen: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, String(seen));
    } catch (error) {
      console.error('Failed to write onboarding flag', error);
      throw error;
    }
  },

  async getProfile(): Promise<DriverProfile | null> {
    try {
      const raw = await AsyncStorage.getItem(PROFILE_KEY);
      return raw ? (JSON.parse(raw) as DriverProfile) : null;
    } catch (error) {
      console.error('Failed to read profile', error);
      return null;
    }
  },

  async setProfile(profile: DriverProfile): Promise<void> {
    try {
      await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch (error) {
      console.error('Failed to save profile', error);
      throw error;
    }
  },

  async clearProfile(): Promise<void> {
    try {
      await AsyncStorage.removeItem(PROFILE_KEY);
    } catch (error) {
      console.error('Failed to clear profile', error);
    }
  },

  async getThemePreference(): Promise<ThemePreference> {
    try {
      const stored = await AsyncStorage.getItem(THEME_KEY);
      return stored === 'dark' ? 'dark' : 'light';
    } catch (error) {
      console.error('Failed to read theme', error);
      return 'light';
    }
  },

  async setThemePreference(preference: ThemePreference): Promise<void> {
    try {
      await AsyncStorage.setItem(THEME_KEY, preference);
    } catch (error) {
      console.error('Failed to store theme', error);
      throw error;
    }
  },

  async getInstructionFlag(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(INSTRUCTION_KEY);
      if (value === null) {
        return true;
      }
      return booleanFromString(value);
    } catch (error) {
      console.error('Failed to read instruction flag', error);
      return true;
    }
  },

  async setInstructionFlag(enabled: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(INSTRUCTION_KEY, String(enabled));
    } catch (error) {
      console.error('Failed to write instruction flag', error);
      throw error;
    }
  },
};

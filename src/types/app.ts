export type ThemePreference = 'light' | 'dark';

export interface DriverProfile {
  id: string;
  name: string;
  department: string;
  phone: string;
  status: 'active' | 'pending';
  vpnServer: string;
  vpnPort: string;
  vpnProfileName: string;
}

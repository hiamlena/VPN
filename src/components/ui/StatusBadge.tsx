import React from 'react';
import { StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';

interface StatusBadgeProps {
  connected: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ connected }) => (
  <Chip style={[styles.badge, connected ? styles.connected : styles.disconnected]} icon={connected ? 'check' : 'close'}>
    {connected ? 'VPN подключен' : 'VPN не подключен'}
  </Chip>
);

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    marginVertical: 8,
  },
  connected: {
    backgroundColor: '#d1e7dd',
  },
  disconnected: {
    backgroundColor: '#fde2e2',
  },
});

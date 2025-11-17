import { HISTORY_STORAGE_KEY } from '@modules/history/constants';
import type { HistoryRecord } from '@modules/history/types';
import { nanoid } from 'nanoid';
import { useCallback, useEffect, useState } from 'react';

const readHistory = (): HistoryRecord[] => {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as HistoryRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to read history', error);
    return [];
  }
};

const writeHistory = (records: HistoryRecord[]) => {
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(records));
};

export const useRequestHistory = () => {
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  useEffect(() => {
    setHistory(readHistory());
  }, []);

  const addEntry = useCallback((payload: { request: string; response: string }) => {
    setHistory(prev => {
      const record: HistoryRecord = {
        id: nanoid(),
        request: payload.request,
        response: payload.response,
        createdAt: new Date().toISOString(),
      };
      const updated = [record, ...prev].slice(0, 50);
      writeHistory(updated);
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    writeHistory([]);
    setHistory([]);
  }, []);

  const restoreFromHistory = useCallback(
    (recordId: string): HistoryRecord | undefined => history.find(item => item.id === recordId),
    [history],
  );

  return { history, addEntry, clearHistory, restoreFromHistory };
};

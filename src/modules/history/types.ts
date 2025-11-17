export interface HistoryRecord {
  id: string;
  request: string;
  response: string;
  createdAt: string;
}

export interface HistoryStorage {
  records: HistoryRecord[];
}

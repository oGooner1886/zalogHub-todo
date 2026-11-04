export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  dateKey: string;
}

export type FilterStatus = 'all' | 'active' | 'completed';

export interface TodoCounts {
  total: number;
  active: number;
  completed: number;
}

declare namespace Pagination {
  interface Config {
    offset: number;
    limit: number;
  }

  interface SortConfig {
    key: string;
    direction: 'asc' | 'desc';
  }
}

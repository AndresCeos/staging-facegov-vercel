declare namespace Pagination {
  interface Config {
    page: number;
    limit: number;
  }

  interface SortConfig {
    key: string;
    direction: 'asc' | 'desc';
  }
}

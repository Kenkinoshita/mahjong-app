export const REACT_QUERY_KEY = {
  findOverallResults: ['overall-results'],
  findMembers: ['members'],
} as const;

export type ReactQueryKey = (typeof REACT_QUERY_KEY)[keyof typeof REACT_QUERY_KEY];

export interface Response<T> {
  data: T;
  message?: string;
  status?: string;
  error?: string;
}

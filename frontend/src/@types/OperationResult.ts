export type OperationResult<T> = {
  isError: boolean;
  message: string;
  data: T;
};

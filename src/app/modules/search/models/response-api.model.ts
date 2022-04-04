import { IErrorsApi } from './errors-api.model'

export interface IResponseAPI {
  total_count: number;
  incomplete_results: boolean;
  items: any[];
  message?: string;
  errors?: IErrorsApi;
  documentation_url?: string;
}

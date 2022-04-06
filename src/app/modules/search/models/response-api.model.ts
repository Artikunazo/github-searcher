import { IErrorsApi } from './errors-api.model'
import { IItem } from './item.model';

export interface IResponseAPI {
  total_count: number;
  incomplete_results: boolean;
  items: IItem[];
  message?: string;
  errors?: IErrorsApi;
  documentation_url?: string;
}

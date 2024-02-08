import { IErrorsApi } from './errors-api.model'
import { Item } from './item.model';

export interface ApiGithubResponse {
  total_count: number;
  incomplete_results: boolean;
  items: Item[];
  message?: string;
  errors?: IErrorsApi;
  documentation_url?: string;
}

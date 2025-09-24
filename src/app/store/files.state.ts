import { TableRowModel } from '@components/table-row/_model/table-row.model';

export interface UploadedFileModel extends TableRowModel {
  isDeleted: boolean;
}

export interface FileState {
  state: 'pending' | 'loading' | 'success' | 'error';
  filter: {
    page: number;
    pageSize: number;
  };
}

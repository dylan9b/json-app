import { TableRowModel } from '@components/table-row/_model/table-row.model';

export interface UploadedFileModel extends TableRowModel {
  isDeleted: boolean;
}

export interface FileState {
  pagination: {
    page: number;
    pageSize: number;
  };
  uploadedFiles: Record<UploadedFileModel['id'], UploadedFileModel>;
}

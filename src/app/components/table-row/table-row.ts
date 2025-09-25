import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '@services/modal.service';
import { DeleteModal } from '@components/modal/delete-modal/delete-modal';
import { UploadedFileModel } from 'app/store/files.state';
import { FileStore } from 'app/store/files.store';

@Component({
  selector: 'app-table-row',
  imports: [NgbPagination],
  templateUrl: './table-row.html',
  styleUrl: './table-row.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableRow {
  private readonly _modalService = inject(ModalService);
  private readonly _fileStore = inject(FileStore);
  readonly files = input.required<UploadedFileModel[]>();

  protected readonly paginationSignal = this._fileStore.pagination;

  protected paginatedFilesSignal = computed(() => {
    const { page, pageSize } = this.paginationSignal();

    return this.files()
      .map((file) => ({ ...file }))
      .slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
  });

  onDeleteFile(file: UploadedFileModel): void {
    const modalRef = this._modalService.open(DeleteModal, { size: 'md', centered: true });
    modalRef.componentInstance.file = signal(file);
  }

  onPaginationChange(page: number): void {
    this._fileStore.updatePagination({ page });
  }
}

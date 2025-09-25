import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { TableRowModel } from './_model/table-row.model';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '@services/modal.service';
import { DeleteModal } from '@components/modal/delete-modal/delete-modal';
import { UploadedFileModel } from 'app/store/files.state';

@Component({
  selector: 'app-table-row',
  // imports: [NgbPagination],
  templateUrl: './table-row.html',
  styleUrl: './table-row.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableRow {
  private readonly _modalService = inject(ModalService);

  readonly files = input.required<UploadedFileModel[]>();

  // protected readonly page = 1;
  // protected readonly pageSize = 2;
  // protected readonly collectionSize = this.files().length;

  protected paginatedFiles: TableRowModel[] = [];

  constructor() {
    this.refreshFiles();
  }

  onDeleteFile(file: UploadedFileModel): void {
    const modalRef = this._modalService.open(DeleteModal, { size: 'md', centered: true });
    modalRef.componentInstance.file = signal(file);
  }

  // TODO: this is the responsibility of the local ngrx store component so that we keep track of the pagination filter done
  refreshFiles(): void {
    // this.files()
    //   .map((country, i) => ({ ...country, id: `${i + 1}` }))
    //   .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}

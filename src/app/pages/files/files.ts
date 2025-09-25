import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Button } from '@components/button/button';
import { SelectModal } from '@components/modal/select-modal/select-modal';
import { TableRowModel } from '@components/table-row/_model/table-row.model';
import { TableRow } from '@components/table-row/table-row';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '@services/modal.service';
import { FileStore } from 'app/store/files.store';

@Component({
  selector: 'app-files',
  imports: [TableRow, Button, NgbAlert],
  templateUrl: './files.html',
  styleUrl: './files.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Files {
  private readonly _modalService = inject(ModalService);
  private readonly _fileStore = inject(FileStore);

  protected readonly filesSignal = this._fileStore.filesUploaded;

  onUploadFile(): void {
    this._modalService.open(SelectModal, { size: 'md', centered: true });
  }
}

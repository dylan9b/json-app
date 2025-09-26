import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { DeleteModal } from '@components/modal/delete-modal/delete-modal';
import { ModalService } from '@services/modal.service';
import { UploadedFileModel } from '@store/files.state';

@Component({
  selector: 'app-table-row-item',
  imports: [],
  templateUrl: './table-row-item.html',
  styleUrl: './table-row-item.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableRowItem {
  private readonly _modalService = inject(ModalService);

  readonly file = input.required<UploadedFileModel>();

  onDeleteFile(file: UploadedFileModel): void {
    const modalRef = this._modalService.open(DeleteModal, {
      size: 'md',
      centered: true,
    });
    modalRef.componentInstance.file = signal(file);
  }
}

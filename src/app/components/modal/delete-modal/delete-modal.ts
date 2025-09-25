import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { Button } from '@components/button/button';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadedFileModel } from '@store/files.state';
import { FileStore } from '@store/files.store';

@Component({
  selector: 'app-delete-modal',
  imports: [Button],
  templateUrl: './delete-modal.html',
  styleUrl: './delete-modal.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteModal {
  private readonly _fileStore = inject(FileStore);

  protected readonly activeModal = inject(NgbActiveModal);

  readonly file = input.required<UploadedFileModel>();

  onConfirm(): void {
    this._fileStore.deleteFile(this.file());
    this.activeModal.close();
  }

  onCancel(): void {
    this.activeModal.close();
  }
}

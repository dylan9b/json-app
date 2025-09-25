import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '@components/button/button';
import { SelectModal } from '@components/modal/select-modal/select-modal';
import { ModalService } from '@services/modal.service';
import { FileStore } from 'app/store/files.store';

@Component({
  selector: 'app-home',
  imports: [Button, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly _modalService = inject(ModalService);
  private readonly _fileStore = inject(FileStore);

  protected readonly files = this._fileStore.filesUploaded;

  onUploadFile(): void {
    this._modalService.open(SelectModal, { size: 'md', centered: true });
  }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Button } from '@components/button/button';
import { SelectModal } from '@components/modal/select-modal/select-modal';
import { ModalService } from '@services/modal.service';
import { FileStore } from '@store/files.store';

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
  private readonly _router = inject(Router);

  protected readonly filesSignal = this._fileStore.filesUploaded;

  onUploadFile(): void {
    this._modalService.open(SelectModal, { size: 'md', centered: true });
  }

  constructor() {
    this._router.navigate([], {
      queryParams: {
        page: null,
      },
    });
  }
}

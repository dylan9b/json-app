import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Button } from '@components/button/button';
import { SelectModal } from '@components/modal/select-modal/select-modal';
import { ModalService } from '@services/modal.service';

@Component({
  selector: 'app-home',
  imports: [Button],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly _modalService = inject(ModalService);

  onUploadFile(): void {
    this._modalService.open(SelectModal, { size: 'md', centered: true });
  }
}

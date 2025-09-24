import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Button } from '@components/button/button';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-modal',
  imports: [Button],
  templateUrl: './delete-modal.html',
  styleUrl: './delete-modal.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteModal {
  protected readonly activeModal = inject(NgbActiveModal);

  readonly fileName = input.required<string>();

  onConfirm(): void {
    console.log('Item deleted');
  }

  onCancel(): void {
    this.activeModal.close();
  }
}

import { inject, Injectable, Type } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private readonly _ngbModal = inject(NgbModal);

  open<T>(component: Type<T>, options?: NgbModalOptions): NgbModalRef {
    return this._ngbModal.open(component, options);
  }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectModalFormControl } from './_model/select-modal.form.model';
import { Button } from '@components/button/button';
import { ModalService } from '@services/modal.service';

@Component({
  selector: 'app-select-modal',
  imports: [ReactiveFormsModule, Button],
  templateUrl: './select-modal.html',
  styleUrl: './select-modal.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectModal {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _modalService = inject(ModalService);

  protected isFormSubmitted = false;
  protected form!: FormGroup;
  protected readonly activeModal = inject(NgbActiveModal);

  protected readonly objectKeys = Object.keys;

  private populateForm(): FormGroup {
    return this._formBuilder.group(new SelectModalFormControl());
  }

  constructor() {
    this.form = this.populateForm();
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      try {
        JSON.parse(reader.result as string);
        this.form.get('file')?.setErrors(null);
      } catch (err) {
        this.form
          .get('file')
          ?.setErrors({ invalidFileType: { message: 'Only JSON files are allowed' } });
      }
    };

    reader.readAsText(file);
  }

  onUpload(): void {
    this.isFormSubmitted = true;
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      console.log('Form is invalid', this.form);
    }
  }

  onCancel(): void {
    this._modalService.close();
  }
}

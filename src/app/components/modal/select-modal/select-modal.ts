import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectModalFormControl } from './_model/select-modal.form.model';
import { Button } from '@components/button/button';
import { FileStore } from 'app/store/files.store';
import { UploadedFileModel } from 'app/store/files.state';
import { FileUtilsService } from '@services/file-utils.service';

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
  private readonly _fileStore = inject(FileStore);
  private readonly _fileUtilsService = inject(FileUtilsService);

  protected isFormSubmitted = false;
  protected form!: FormGroup;
  protected readonly activeModal = inject(NgbActiveModal);

  protected readonly objectKeys = Object.keys;

  protected uploadedFileSignal = signal<File | null>(null);

  private populateForm(): FormGroup {
    return this._formBuilder.group(new SelectModalFormControl());
  }

  constructor() {
    this.form = this.populateForm();
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      this.uploadedFileSignal.set(file);
      this.form.get('file')?.setErrors(null);
    }
  }

  async onUpload(): Promise<void> {
    this.isFormSubmitted = true;

    const uploadedFile = this.uploadedFileSignal();
    const name = this.form.value.name;
    const description = this.form.value.description;

    if (!this.form.valid || !uploadedFile) {
      return; // Early exit if form invalid or no file selected
    }

    // Validate the file (extension + JSON content)
    const { isValid, content, error } =
      await this._fileUtilsService.validateJsonFile(uploadedFile);

    if (error) {
      // Set appropriate form errors
      this.form.get('file')?.setErrors(error);
      return;
    }

    // Create a unique ID
    const uniqueFileId = this._fileUtilsService.generateUniqueId(name);

    // Build file model
    const fileModel: UploadedFileModel = {
      id: uniqueFileId,
      name,
      description,
      file: uploadedFile,
      isValid,
      isDeleted: false,
    };

    // Upload
    this._fileStore.uploadFile(fileModel);

    this.activeModal.close();
  }

  async isValidJSON(file: File): Promise<boolean> {
    try {
      const fileContent = file.text();
      JSON.parse(await fileContent);
      return true;
    } catch (e) {
      return false;
    }
  }

  onCancel(): void {
    this.activeModal.close();
  }
}

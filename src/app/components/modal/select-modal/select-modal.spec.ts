import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectModal } from './select-modal';
import { Button } from '@components/button/button';
import { FileStore } from '@store/files.store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FileUtilsService,
  ValidateJsonResult,
} from '@services/file-utils.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

describe('SelectModal', () => {
  let fixture: ComponentFixture<SelectModal>;
  let component: SelectModal;
  let fileStoreMock: { uploadFile: jest.Mock };
  let activeModalMock: { close: jest.Mock };
  let fileUtilsMock: {
    validateJsonFile: jest.Mock;
    generateUniqueId: jest.Mock;
  };

  const mockFile = new File([JSON.stringify({ a: 1 })], 'test.json', {
    type: 'application/json',
  });

  beforeEach(async () => {
    fileStoreMock = { uploadFile: jest.fn() };
    activeModalMock = { close: jest.fn() };
    fileUtilsMock = {
      validateJsonFile: jest
        .fn()
        .mockResolvedValue({ isValid: true } as ValidateJsonResult),
      generateUniqueId: jest.fn().mockReturnValue('unique-id-123'),
    };

    await TestBed.configureTestingModule({
      imports: [SelectModal, ReactiveFormsModule, Button],
      providers: [
        { provide: FileStore, useValue: fileStoreMock },
        { provide: NgbActiveModal, useValue: activeModalMock },
        { provide: FileUtilsService, useValue: fileUtilsMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectModal);
    component = fixture.componentInstance;

    // Provide required form values before detectChanges
    component['form'].patchValue({
      name: 'Test File',
      description: 'Test Description',
    });

    // Ensure 'file' control exists
    component['form'].addControl(
      'file',
      component['form'].get('file') || new FormControl(),
    );

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update uploadedFileSignal on file change', () => {
    const event = { target: { files: [mockFile] } } as unknown as Event;

    component.onFileChange(event);

    expect(component['uploadedFileSignal']()).toBe(mockFile);
    expect(component['form'].get('file')?.errors).toBeNull();
  });

  // it('should upload file and close modal on successful upload', async () => {
  //   const mockFile = new File([JSON.stringify({ a: 1 })], 'test.json', {
  //     type: 'application/json',
  //   });

  //   // Set uploaded file signal
  //   component['uploadedFileSignal'].set(mockFile);

  //   // Add 'file' control to form and make form valid
  //   component['form'].addControl('file', new FormControl(mockFile));
  //   component['form'].patchValue({
  //     name: 'Test File',
  //     description: 'Test Description',
  //     file: mockFile,
  //   });

  //   await component.onUpload();

  //   expect(fileUtilsMock.validateJsonFile).toHaveBeenCalledWith(mockFile);
  //   expect(fileUtilsMock.generateUniqueId).toHaveBeenCalledWith('Test File');
  //   expect(fileStoreMock.uploadFile).toHaveBeenCalledWith(
  //     expect.objectContaining({
  //       id: 'unique-id-123',
  //       name: 'Test File',
  //       description: 'Test Description',
  //       file: mockFile,
  //       isValid: true,
  //       isDeleted: false,
  //     })
  //   );
  //   expect(activeModalMock.close).toHaveBeenCalled();
  // });

  it('should not upload if form is invalid', async () => {
    component['form'].get('file')?.setErrors({ required: true });
    component['uploadedFileSignal'].set(mockFile);

    await component.onUpload();

    expect(fileUtilsMock.validateJsonFile).not.toHaveBeenCalled();
    expect(fileStoreMock.uploadFile).not.toHaveBeenCalled();
    expect(activeModalMock.close).not.toHaveBeenCalled();
  });

  it('should not upload if no file is selected', async () => {
    component['uploadedFileSignal'].set(null);

    await component.onUpload();

    expect(fileUtilsMock.validateJsonFile).not.toHaveBeenCalled();
    expect(fileStoreMock.uploadFile).not.toHaveBeenCalled();
    expect(activeModalMock.close).not.toHaveBeenCalled();
  });

  // it('should set form error if JSON validation fails', async () => {
  //   const invalidJsonResult: ValidateJsonResult = {
  //     isValid: false,
  //     error: { invalidJson: { message: 'Invalid JSON' } },
  //   };
  //   fileUtilsMock.validateJsonFile.mockResolvedValueOnce(invalidJsonResult);

  //   // Set uploaded file signal
  //   component['uploadedFileSignal'].set(mockFile);

  //   // Ensure file control exists
  //   component['form'].addControl('file', component['form'].get('file') || new FormControl());

  //   await component.onUpload();

  //   expect(component['form'].get('file')?.errors).toEqual(invalidJsonResult.error);
  //   expect(fileStoreMock.uploadFile).not.toHaveBeenCalled();
  //   expect(activeModalMock.close).not.toHaveBeenCalled();
  // });

  it('should close modal on cancel', () => {
    component.onCancel();
    expect(activeModalMock.close).toHaveBeenCalled();
  });
});

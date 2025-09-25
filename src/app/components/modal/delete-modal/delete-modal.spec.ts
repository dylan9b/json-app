import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteModal } from './delete-modal';
import { Button } from '@components/button/button';
import { FileStore } from '@store/files.store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { provideZonelessChangeDetection } from '@angular/core';

describe('DeleteModal', () => {
  let fixture: ComponentFixture<DeleteModal>;
  let component: DeleteModal;
  let fileStoreMock: { deleteFile: jest.Mock };
  let activeModalMock: { close: jest.Mock };

  const mockFile = { file: { id: '1', name: 'file1.json' } } as unknown;

  beforeEach(async () => {
    fileStoreMock = { deleteFile: jest.fn() };
    activeModalMock = { close: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [DeleteModal, Button],
      providers: [
        { provide: FileStore, useValue: fileStoreMock },
        { provide: NgbActiveModal, useValue: activeModalMock },
        provideZonelessChangeDetection(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteModal);

    fixture.componentRef.setInput('file', mockFile);

    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create the DeleteModal component', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteFile and close modal on confirm', () => {
    component.onConfirm();

    expect(fileStoreMock.deleteFile).toHaveBeenCalledWith(mockFile);
    expect(activeModalMock.close).toHaveBeenCalled();
  });

  it('should only close modal on cancel', () => {
    component.onCancel();

    expect(activeModalMock.close).toHaveBeenCalled();
    expect(fileStoreMock.deleteFile).not.toHaveBeenCalled();
  });
});

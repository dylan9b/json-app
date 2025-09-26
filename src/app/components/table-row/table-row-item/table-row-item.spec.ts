import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableRowItem } from './table-row-item';
import { ModalService } from '@services/modal.service';
import { DeleteModal } from '@components/modal/delete-modal/delete-modal';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { FileStore } from '@store/files.store';
import { UploadedFileModel } from '@store/files.state';

describe('TableRowItem', () => {
  let fixture: ComponentFixture<TableRowItem>;
  let component: TableRowItem;

  let modalServiceMock: { open: jest.Mock };
  let fileStoreMock: { filesUploaded: unknown };

  const mockFile: UploadedFileModel = {
    id: '123',
    name: 'test.pdf',
    description: 'A test file',
    isValid: true,
    file: new File(['dummy content'], 'test.pdf'),
    isDeleted: false,
  };

  beforeEach(() => {
    modalServiceMock = { open: jest.fn() };
    fileStoreMock = {
      filesUploaded: signal([{ id: '1', name: 'file1.json' }]),
    };

    TestBed.configureTestingModule({
      imports: [TableRowItem],
      providers: [
        { provide: ModalService, useValue: modalServiceMock },
        { provide: FileStore, useValue: fileStoreMock },
        provideZonelessChangeDetection(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TableRowItem);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('file', mockFile);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign file signal to modalRef.componentInstance.file', () => {
    const modalRef = {
      componentInstance: {} as { file?: () => UploadedFileModel },
    };
    modalServiceMock.open.mockReturnValue(modalRef);

    component.onDeleteFile(mockFile);

    expect(typeof modalRef.componentInstance.file).toBe('function');
    expect(typeof modalRef.componentInstance['file']).toBe('function');
    if (typeof modalRef.componentInstance['file'] === 'function') {
      expect(modalRef.componentInstance['file']()).toEqual(mockFile);
    }
  });

  it('should call ModalService.open with DeleteModal on onDeleteFile', () => {
    const modalRef = {
      componentInstance: {} as { file?: () => UploadedFileModel },
    };
    modalServiceMock.open.mockReturnValue(modalRef);
    component.onDeleteFile(mockFile);

    expect(modalServiceMock.open).toHaveBeenCalledWith(DeleteModal, {
      size: 'md',
      centered: true,
    });
  });
});

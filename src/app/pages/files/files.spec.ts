import '@angular/localize/init';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Files } from './files';
import { ModalService } from '@services/modal.service';
import { FileStore } from '@store/files.store';
import { Button } from '@components/button/button';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TableRow } from '@components/table-row/table-row';
import { SelectModal } from '@components/modal/select-modal/select-modal';

class TestFiles extends Files {
  public getFilesSignal() {
    return this.filesSignal;
  }
}

describe('Files', () => {
  let fixture: ComponentFixture<TestFiles>;
  let component: TestFiles;
  let modalServiceMock: { open: jest.Mock };
  let fileStoreMock: unknown;

  beforeEach(() => {
    modalServiceMock = { open: jest.fn() };
    fileStoreMock = {
      filesUploaded: signal([{ file: { id: '1', name: 'file1.json' } }]),
      pagination: signal({ page: 1, pageSize: 10 }),
      updatePagination: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [TestFiles, TableRow, Button, NgbAlert],
      providers: [
        { provide: ModalService, useValue: modalServiceMock },
        { provide: FileStore, useValue: fileStoreMock },
        provideRouter([]),
        provideZonelessChangeDetection(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestFiles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the Files component', () => {
    expect(component).toBeTruthy();
  });

  it('should expose filesSignal from FileStore', () => {
    const files = component.getFilesSignal()(); // call the signal
    expect(files).toEqual([{ file: { id: '1', name: 'file1.json' } }]);
  });

  it('should open SelectModal when onUploadFile is called', () => {
    component.onUploadFile();
    expect(modalServiceMock.open).toHaveBeenCalledWith(SelectModal, {
      size: 'md',
      centered: true,
    });
  });
});

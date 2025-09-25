import '@angular/localize/init';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableRow } from './table-row';
import { ModalService } from '@services/modal.service';
import { FileStore } from '@store/files.store';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { provideZonelessChangeDetection, signal } from '@angular/core';

describe('TableRow', () => {
  let fixture: ComponentFixture<TableRow>;
  let component: TableRow;
  let modalServiceMock: { open: jest.Mock };
  let fileStoreMock: { pagination: unknown; updatePagination: jest.Mock };
  let mockFiles: { file: { id: string; name: string } }[];

  beforeEach(async () => {
    modalServiceMock = { open: jest.fn() };
    mockFiles = [{ file: { id: '1', name: 'file1.json' } }];
    fileStoreMock = {
      pagination: signal({ page: 1, pageSize: 10 }),
      updatePagination: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [TableRow, NgbPagination],
      providers: [
        { provide: ModalService, useValue: modalServiceMock },
        { provide: FileStore, useValue: fileStoreMock },
        provideZonelessChangeDetection(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TableRow);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('files', mockFiles);
    fixture.detectChanges();
  });

  it('should create TableRow component', () => {
    expect(component).toBeInstanceOf(TableRow);
  });

  it('should call updatePagination on page change', () => {
    component.onPaginationChange(2);
    expect(fileStoreMock.updatePagination).toHaveBeenCalledWith({
      page: 2,
    });
  });

  it('should display correct number of rows based on pagination', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tbody tr');
    expect(rows.length).toBe(1); // Only one file in mockFiles
  });
});

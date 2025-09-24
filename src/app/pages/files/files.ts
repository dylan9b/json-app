import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Button } from '@components/button/button';
import { SelectModal } from '@components/modal/select-modal/select-modal';
import { TableRowModel } from '@components/table-row/_model/table-row.model';
import { TableRow } from '@components/table-row/table-row';
import { ModalService } from '@services/modal.service';

@Component({
  selector: 'app-files',
  imports: [TableRow, Button],
  templateUrl: './files.html',
  styleUrl: './files.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Files {
  private readonly _modalService = inject(ModalService);

  // TODO: files need to be retrieved from store ... this is dummy data
  protected readonly files: TableRowModel[] = [
    {
      id: '1',
      file: 'test1.json',
      description: 'Description of the file',
      isValid: true,
      name: 'Name of the file',
    },
    {
      id: '2',
      file: 'test2.json',
      description: 'Description of the file',
      isValid: true,
      name: 'Name of the file',
    },
    {
      id: '3',
      file: 'test3.json',
      description: 'Description of the file',
      isValid: false,
      name: 'Name of the file',
    },
    {
      id: '4',
      file: 'test4.json',
      description: 'Description of the file',
      isValid: true,
      name: 'Name of the file',
    },
    {
      id: '5',
      file: 'test5.json',
      description: 'Description of the file',
      isValid: false,
      name: 'Name of the file',
    },
  ];

  onUploadFile(): void {
    this._modalService.open(SelectModal, { size: 'md', centered: true });
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core";
import { NgbPagination } from "@ng-bootstrap/ng-bootstrap";
import { UploadedFileModel } from "@store/files.state";
import { FileStore } from "@store/files.store";
import { TableRowItem } from "./table-row-item/table-row-item";

@Component({
  selector: "app-table-row",
  imports: [NgbPagination, TableRowItem],
  templateUrl: "./table-row.html",
  styleUrl: "./table-row.scss",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableRow {
  private readonly _fileStore = inject(FileStore);
  readonly files = input.required<UploadedFileModel[]>();

  protected readonly paginationSignal = this._fileStore.pagination;

  protected readonly headers = ["File", "Name", "Description", "Status", ""];

  protected paginatedFilesSignal = computed(() => {
    const { page, pageSize } = this.paginationSignal();

    return this.files()
      .map((file) => ({ ...file }))
      .slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
  });

  onPaginationChange(page: number): void {
    this._fileStore.updatePagination({ page });
  }
}

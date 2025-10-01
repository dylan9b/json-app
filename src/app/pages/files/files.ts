import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Button } from "@components/button/button";
import { SelectModal } from "@components/modal/select-modal/select-modal";
import { TableRow } from "@components/table-row/table-row";
import { NgbAlert } from "@ng-bootstrap/ng-bootstrap";
import { ModalService } from "@services/modal.service";
import { FileStore } from "@store/files.store";

@Component({
  selector: "app-files",
  imports: [TableRow, Button, NgbAlert],
  templateUrl: "./files.html",
  styleUrl: "./files.scss",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Files {
  private readonly _modalService = inject(ModalService);
  private readonly _fileStore = inject(FileStore);
  private readonly _router = inject(Router);

  protected readonly filesSignal = this._fileStore.filesUploaded;

  onUploadFile(): void {
    this._modalService.open(SelectModal, { size: "md", centered: true });
  }

  constructor() {
    this._router.navigate([], {
      queryParams: {
        page: 1,
      },
    });
  }
}

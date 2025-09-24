import { computed } from '@angular/core';
import { FileState, UploadedFileModel } from './files.state';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { addEntity, updateEntity, withEntities } from '@ngrx/signals/entities';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

const initialState: FileState = {
  state: 'pending',
  filter: {
    page: 1,
    pageSize: 10,
  },
};

export const FileStore = signalStore(
  { providedIn: 'root' },
  withDevtools('files'),
  withState(initialState),
  withEntities<UploadedFileModel>(),
  withComputed((state) => ({
    filesUploaded: computed(() => state.entities().filter((file) => !file.isDeleted)),
  })),
  withMethods((store) => ({
    uploadFile(file: UploadedFileModel): void {
      let fileToUpload: UploadedFileModel = {
        ...file,
        file: {
          ...file.file,
          name: file.file.name // just to keep record of the file name as well
        },
      };

      debugger;
      patchState(store, addEntity(fileToUpload));
    },

    deleteFile(fileId: string): void {
      patchState(store, updateEntity({ id: fileId, changes: { isDeleted: true } }));
    },
  }))
);

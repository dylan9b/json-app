import { computed, inject } from '@angular/core';
import { FileState, UploadedFileModel } from './files.state';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { PlatformService } from '@services/platform.service';

const initialState: FileState = {
  pagination: {
    page: 1,
    pageSize: 5,
  },
  uploadedFiles: {},
};

const JSON_FILES_LOCAL_STORAGE = 'jsonFiles';

export const FileStore = signalStore(
  { providedIn: 'root' },
  withDevtools('files'),
  withState(initialState),
  withComputed((state) => ({
    filesUploaded: computed(() =>
      Object.keys(state.uploadedFiles())
        .map((key) => state.uploadedFiles()[key])
        .filter((item) => !item.isDeleted)
    ),
  })),
  withMethods((store, platformService = inject(PlatformService)) => ({
    uploadFile(file: UploadedFileModel): void {
      patchState(store, (state) => ({
        ...state,
        uploadedFiles: {
          ...state.uploadedFiles,
          [file.id]: {
            ...file,
            file: {
              ...file.file,
              name: file.file.name,
            },
          },
        },
      }));

      platformService.localStorage?.setItem(
        JSON_FILES_LOCAL_STORAGE,
        JSON.stringify(store.uploadedFiles())
      );
    },

    deleteFile(file: UploadedFileModel): void {
      debugger;
      patchState(store, (state) => ({
        ...state,
        uploadedFiles: {
          ...state.uploadedFiles,
          [file.id]: {
            ...state.uploadedFiles[file.id],
            isDeleted: true,
          },
        },
      }));

      platformService.localStorage?.setItem(
        JSON_FILES_LOCAL_STORAGE,
        JSON.stringify(store.uploadedFiles())
      );
    },

    updatePagination(pagination: Partial<FileState['pagination']>): void {
      patchState(store, (state) => ({
        ...state,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      }));
    },
  })),
  withHooks((store, platformService = inject(PlatformService)) => ({
    onInit(): void {
      const uploadedFilesInLocalStorage = JSON.parse(
        platformService.localStorage?.getItem(JSON_FILES_LOCAL_STORAGE) ?? '{}'
      );

      patchState(store, (state) => ({
        uploadedFiles: {
          ...state.uploadedFiles,
          ...uploadedFilesInLocalStorage,
        },
      }));
    },
  }))
);

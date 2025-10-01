import { TestBed } from "@angular/core/testing";
import { FileStore } from "./files.store";
import { provideRouter } from "@angular/router";
import { FileState, UploadedFileModel } from "./files.state";

describe("FileStore", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([{ path: "files", component: class DummyComponent {} }]),
      ],
    });
  });

  it("should initialize state", () => {
    const fileStore = TestBed.inject(FileStore);

    const initialState: FileState = {
      pagination: {
        page: 1,
        pageSize: 5,
      },
      uploadedFiles: {},
    };
    expect(fileStore.pagination()).toEqual(initialState.pagination);
    expect(fileStore.uploadedFiles()).toEqual(initialState.uploadedFiles);
  });

  it("should set page correctly", () => {
    const fileStore = TestBed.inject(FileStore);
    expect(fileStore.pagination().page).toBe(1);

    fileStore.updatePagination({ page: 2 });
    expect(fileStore.pagination().page).toBe(2);
  });

  it("should compute filesUploaded correctly", () => {
    const fileStore = TestBed.inject(FileStore);
    expect(fileStore.filesUploaded()).toEqual([]);

    const mockFile: UploadedFileModel = {
      id: "1",
      file: { name: "test.json" } as File,
      isDeleted: false,
      description: "Test Description",
      isValid: true,
      name: "test.json",
    };

    fileStore.uploadFile(mockFile);

    expect(fileStore.filesUploaded().length).toBe(1);
    expect(fileStore.filesUploaded()[0].id).toBe("1");
  });

  it("should upload and delete file correctly", () => {
    const fileStore = TestBed.inject(FileStore);
    const mockFile: UploadedFileModel = {
      id: "1",
      file: { name: "test.json" } as File,
      isDeleted: false,
      description: "Test Description",
      isValid: true,
      name: "test.json",
    };
    fileStore.uploadFile(mockFile);
    expect(fileStore.filesUploaded().length).toBe(1);

    fileStore.deleteFile(mockFile);
    expect(fileStore.filesUploaded().length).toBe(0);
  });

  it("should update pagination correctly", () => {
    const fileStore = TestBed.inject(FileStore);
    expect(fileStore.pagination()).toEqual({ page: 1, pageSize: 5 });

    fileStore.updatePagination({ page: 3, pageSize: 10 });
    expect(fileStore.pagination()).toEqual({ page: 3, pageSize: 10 });
  });
});

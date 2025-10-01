import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SelectModal } from "./select-modal";
import { Button } from "@components/button/button";
import { FileStore } from "@store/files.store";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {
  FileUtilsService,
  ValidateJsonResult,
} from "@services/file-utils.service";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

describe("SelectModal", () => {
  let fixture: ComponentFixture<SelectModal>;
  let component: SelectModal;
  let fileStoreMock: { uploadFile: jest.Mock };
  let activeModalMock: { close: jest.Mock };
  let fileUtilsMock: {
    validateJsonFile: jest.Mock;
    generateUniqueId: jest.Mock;
  };

  const mockFile = new File([JSON.stringify({ a: 1 })], "test.json", {
    type: "application/json",
  });

  beforeEach(async () => {
    fileStoreMock = { uploadFile: jest.fn() };
    activeModalMock = { close: jest.fn() };
    fileUtilsMock = {
      validateJsonFile: jest
        .fn()
        .mockResolvedValue({ isValid: true } as ValidateJsonResult),
      generateUniqueId: jest.fn().mockReturnValue("unique-id-123"),
    };

    await TestBed.configureTestingModule({
      imports: [SelectModal, ReactiveFormsModule, Button],
      providers: [
        { provide: FileStore, useValue: fileStoreMock },
        { provide: NgbActiveModal, useValue: activeModalMock },
        { provide: FileUtilsService, useValue: fileUtilsMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectModal);
    component = fixture.componentInstance;

    // Provide required form values before detectChanges
    component["form"].patchValue({
      name: "Test File",
      description: "Test Description",
    });

    // Ensure 'file' control exists
    component["form"].addControl(
      "file",
      component["form"].get("file") || new FormControl(),
    );

    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should update uploadedFileSignal on file change", () => {
    const event = { target: { files: [mockFile] } } as unknown as Event;

    component.onFileChange(event);

    expect(component["uploadedFileSignal"]()).toBe(mockFile);
    expect(component["form"].get("file")?.errors).toBeNull();
  });

  it("should not upload if file is missing", async () => {
    component["form"]
      .get("file")
      ?.setErrors({ invalidFileType: { message: "File is required" } });
    component["uploadedFileSignal"].set(null);

    await component.onUpload();

    expect(fileUtilsMock.validateJsonFile).not.toHaveBeenCalled();
    expect(fileStoreMock.uploadFile).not.toHaveBeenCalled();
    expect(activeModalMock.close).not.toHaveBeenCalled();
  });

  it("should not upload if no file is selected", async () => {
    component["uploadedFileSignal"].set(null);

    await component.onUpload();

    expect(fileUtilsMock.validateJsonFile).not.toHaveBeenCalled();
    expect(fileStoreMock.uploadFile).not.toHaveBeenCalled();
    expect(activeModalMock.close).not.toHaveBeenCalled();
  });

  it("should close modal on cancel", () => {
    component.onCancel();
    expect(activeModalMock.close).toHaveBeenCalled();
  });

  it("should upload valid file successfully", async () => {
    component["uploadedFileSignal"].set(mockFile);

    await component.onUpload();

    expect(fileUtilsMock.validateJsonFile).toHaveBeenCalledWith(mockFile);
    expect(fileUtilsMock.generateUniqueId).toHaveBeenCalledWith("Test File");
    expect(fileStoreMock.uploadFile).toHaveBeenCalledWith({
      id: "unique-id-123",
      name: "Test File",
      description: "Test Description",
      file: mockFile,
      isValid: true,
      isDeleted: false,
    });
    expect(activeModalMock.close).toHaveBeenCalled();
  });

  it("should handle invalid file during upload", async () => {
    const error = { invalidFileType: { message: "Invalid file type" } };
    fileUtilsMock.validateJsonFile.mockResolvedValueOnce({
      isValid: false,
      error,
    } as ValidateJsonResult);

    component["uploadedFileSignal"].set(mockFile);

    await component.onUpload();

    expect(fileUtilsMock.validateJsonFile).toHaveBeenCalledWith(mockFile);
    expect(fileStoreMock.uploadFile).not.toHaveBeenCalled();
    expect(activeModalMock.close).not.toHaveBeenCalled();
    expect(component["form"].get("file")?.errors).toEqual(error);
  });
});

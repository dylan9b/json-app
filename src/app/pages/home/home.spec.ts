import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Home } from "./home";
import { ModalService } from "@services/modal.service";
import { FileStore } from "@store/files.store";
import { provideZonelessChangeDetection, signal } from "@angular/core";
import { Button } from "@components/button/button";
import { provideRouter } from "@angular/router";
import { SelectModal } from "@components/modal/select-modal/select-modal";

class TestHome extends Home {
  public getFilesSignal() {
    return this.filesSignal;
  }
}

describe("Home", () => {
  let fixture: ComponentFixture<TestHome>;
  let component: TestHome;
  let modalServiceMock: { open: jest.Mock };
  let fileStoreMock: { filesUploaded: unknown };

  beforeEach(() => {
    modalServiceMock = { open: jest.fn() };
    fileStoreMock = {
      filesUploaded: signal([{ id: "1", name: "file1.json" }]),
    };

    TestBed.configureTestingModule({
      imports: [TestHome, Button],
      providers: [
        { provide: ModalService, useValue: modalServiceMock },
        { provide: FileStore, useValue: fileStoreMock },
        provideRouter([]),
        provideZonelessChangeDetection(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the Home component", () => {
    expect(component).toBeTruthy();
  });

  it("should call ModalService.open with SelectModal on onUploadFile", () => {
    component.onUploadFile();

    expect(modalServiceMock.open).toHaveBeenCalledWith(SelectModal, {
      size: "md",
      centered: true,
    });
  });

  it("should expose filesSignal from FileStore", () => {
    const files = component.getFilesSignal()(); // call the signal
    expect(files).toEqual([{ id: "1", name: "file1.json" }]);
  });
});

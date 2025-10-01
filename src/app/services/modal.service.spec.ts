import { TestBed } from "@angular/core/testing";
import {
  NgbModal,
  NgbModalRef,
  NgbModalOptions,
} from "@ng-bootstrap/ng-bootstrap";
import { ModalService } from "./modal.service";
import { Component, provideZonelessChangeDetection } from "@angular/core";

// Dummy component for testing modal
@Component({ template: "" })
class DummyComponent {}

describe("ModalService", () => {
  let service: ModalService;
  let ngbModalMock: jest.Mocked<NgbModal>;

  beforeEach(() => {
    const modalRefMock: Partial<NgbModalRef> = {
      close: jest.fn(),
      dismiss: jest.fn(),
    };

    ngbModalMock = {
      open: jest.fn().mockReturnValue(modalRefMock as NgbModalRef),
    } as unknown as jest.Mocked<NgbModal>;

    TestBed.configureTestingModule({
      providers: [
        ModalService,
        { provide: NgbModal, useValue: ngbModalMock },
        provideZonelessChangeDetection(),
      ],
    });

    service = TestBed.inject(ModalService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should call NgbModal.open with the correct component and options", () => {
    const options: NgbModalOptions = { size: "lg" };
    const modalRef = service.open(DummyComponent, options);

    expect(ngbModalMock.open).toHaveBeenCalledWith(DummyComponent, options);
    expect(modalRef).toBeDefined();
    expect(typeof modalRef.close).toBe("function");
    expect(typeof modalRef.dismiss).toBe("function");
  });

  it("should call NgbModal.open without options if none are provided", () => {
    const modalRef = service.open(DummyComponent);

    expect(ngbModalMock.open).toHaveBeenCalledWith(DummyComponent, undefined);
    expect(modalRef).toBeDefined();
  });
});

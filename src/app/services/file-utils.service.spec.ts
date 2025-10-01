import { TestBed } from "@angular/core/testing";
import { FileUtilsService, ValidateJsonResult } from "./file-utils.service";
import { provideZonelessChangeDetection } from "@angular/core";

describe("FileUtilsService", () => {
  let service: FileUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileUtilsService, provideZonelessChangeDetection()],
    });
    service = TestBed.inject(FileUtilsService);
  });

  describe("validateJsonFile", () => {
    it("should return valid for a correct JSON file", async () => {
      const file = {
        name: "test.json",
        text: async () => JSON.stringify({ a: 1 }),
      } as unknown as File;

      const result = await service.validateJsonFile(file);

      expect(result.isValid).toBe(true);
      expect(result.content).toBe(JSON.stringify({ a: 1 }));
      expect(result.error).toBeUndefined();
    });

    it("should return invalid for malformed JSON", async () => {
      const file = new File(["{ invalid json }"], "test.json", {
        type: "application/json",
      });

      const result: ValidateJsonResult = await service.validateJsonFile(file);

      expect(result.isValid).toBe(false);
      expect(result.content).toBeUndefined();
    });

    it("should return invalid for non-JSON file extension", async () => {
      const file = new File([JSON.stringify({ a: 1 })], "test.txt", {
        type: "text/plain",
      });

      const result: ValidateJsonResult = await service.validateJsonFile(file);

      expect(result.isValid).toBe(false);
      expect(result.error).toEqual({
        invalidFileType: { message: "Only JSON files are allowed" },
      });
    });
  });

  describe("generateUniqueId", () => {
    it("should generate a string containing name and timestamp", () => {
      const name = "myfile";
      const id = service.generateUniqueId(name);

      expect(id.startsWith(name + "-")).toBe(true);
      expect(Number(id.split("-").pop())).not.toBeNaN();
    });
  });
});

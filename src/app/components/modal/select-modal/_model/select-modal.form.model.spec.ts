import { SelectModalFormControl } from "./select-modal.form.model";

describe("SelectModalFormControl", () => {
  let form: SelectModalFormControl;

  beforeEach(() => {
    form = new SelectModalFormControl();
  });

  describe("name control", () => {
    it("should require a value", () => {
      form.name.setValue(null);
      expect(form.name.errors).toEqual({
        required: { message: "Name is required" },
      });
    });

    it("should fail if value is not a string", () => {
      form.name.setValue(123);
      expect(form.name.errors).toEqual({
        invalidType: { message: "Value must be a string" },
      });
    });

    it("should fail if value is too long", () => {
      form.name.setValue("a".repeat(33) + "42c-test123");
      expect(form.name.errors).toEqual({
        maxlength: { message: "Maximum length is 32" },
      });
    });

    it("should fail if value contains invalid characters", () => {
      form.name.setValue("invalid!42c-test123");
      expect(form.name.errors).toEqual({
        invalidCharacters: {
          message:
            "Only alphanumeric characters, underscores, and hyphens are allowed",
        },
      });
    });

    it("should fail if value does not contain required substring", () => {
      form.name.setValue("valid_name");
      expect(form.name.errors).toEqual({
        missingSubstring: {
          message: "Value must include the substring '42c-test123'",
        },
      });
    });

    it("should pass for valid value", () => {
      form.name.setValue("valid_name-42c-test123");
      expect(form.name.errors).toBeNull();
    });
  });

  describe("description control", () => {
    it("should require a value", () => {
      form.description.setValue("");
      expect(form.description.errors).toEqual({
        required: { message: "Description is required" },
      });
    });

    it("should fail if value is too long", () => {
      form.description.setValue("a".repeat(129));
      expect(form.description.errors).toEqual({
        maxlength: { message: "Maximum length is 128" },
      });
    });

    it("should fail if value contains forbidden substring", () => {
      form.description.setValue("This contains 42c-test123");
      expect(form.description.errors).toEqual({ forbiddenSubstring: true });
    });

    it("should pass for valid value", () => {
      form.description.setValue("This is a valid description");
      expect(form.description.errors).toBeNull();
    });
  });

  describe("file control", () => {
    it("should initialize with null value", () => {
      expect(form.file.value).toBeNull();
    });

    it("should accept any value", () => {
      form.file.setValue("some-file");
      expect(form.file.value).toBe("some-file");
      expect(form.file.errors).toBeNull();
    });
  });
});

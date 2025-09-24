import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

const githubUsername = 'test123';

const validateName: ValidatorFn = (control): ValidationErrors | null => {
  const value = control.value;

  // Built-in errors first
  if (!value) return { required: { message: 'Name is required' } };
  if (value.length < 1) return { minlength: { message: 'Minimum length is 1' } };
  if (value.length > 32) return { maxlength: { message: 'Maximum length is 32' } };

  // Custom validations
  if (typeof value !== 'string') return { invalidType: { message: 'Value must be a string' } };
  if (!/^[A-Za-z0-9_-]+$/.test(value))
    return {
      invalidCharacters: {
        message: 'Only alphanumeric characters, underscores, and hyphens are allowed',
      },
    };
  if (!value.includes(`42c-${githubUsername}`))
    return {
      missingSubstring: { message: `Value must include the substring '42c-${githubUsername}'` },
    };

  return null;
};

const validateDescription: ValidatorFn = (control): ValidationErrors | null => {
  const value = control.value;

  // Built-in errors first
  if (!value) return { required: { message: 'Name is required' } };
  if (value.length > 128) return { maxlength: { message: 'Maximum length is 128' } };

  if (value.includes(`42c-${githubUsername}`)) return { forbiddenSubstring: true };
  return null;
};

export const validateJsonContent: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const fileList: FileList = control.value;
  if (!fileList || fileList.length === 0) {
    return { required: { message: 'File is required' } };
  }

  const file = fileList[0];

  // Optional: quick type check
  if (!file.name.toLowerCase().endsWith('.json')) {
    return { invalidFileType: { message: 'Only JSON files are allowed' } };
  }

  // Return null for now; async content check is needed below
  return null;
};

export class SelectModalFormControl {
  constructor(
    public file: FormControl = new FormControl(null, [validateJsonContent]),
    public name: FormControl = new FormControl(null, [validateName]),
    public description: FormControl = new FormControl(null, [validateDescription])
  ) {}
}

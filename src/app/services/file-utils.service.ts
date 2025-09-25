import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

export interface ValidateJsonResult {
  isValid: boolean;
  content?: string;
  error?: ValidationErrors;
}

@Injectable({
  providedIn: 'root',
})
export class FileUtilsService {
  /**
   * Validate a file is JSON and return its content.
   */
  async validateJsonFile(file: File): Promise<ValidateJsonResult> {
    // Check file extension
    if (!file.name.toLowerCase().endsWith('.json')) {
      return {
        isValid: false,
        error: { invalidFileType: { message: 'Only JSON files are allowed' } },
      };
    }

    try {
      const content = await file.text();
      JSON.parse(content); // Validate JSON
      return { isValid: true, content };
    } catch {
      return { isValid: false };
    }
  }

  /**
   * Generate a unique ID for a file using name + timestamp.
   */
  generateUniqueId(name: string): string {
    return `${name}-${Date.now()}`;
  }
}

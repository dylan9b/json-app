import { Meta, StoryObj } from '@storybook/angular';

interface FileRow {
  file: { name: string };
  name: string;
  description: string;
  isValid: boolean;
}

const meta: Meta = {
  title: 'Components/FileRow',
};

export default meta;

type Story = StoryObj<{ file: FileRow; onDeleteFile: (f: FileRow) => void }>;

const exampleFile: FileRow = {
  file: { name: 'document.pdf' },
  name: 'document.pdf',
  description: 'Example PDF document',
  isValid: true,
};

export const Default: Story = {
  args: {
    file: exampleFile,
    // onDeleteFile: action('Delete clicked'),
  },
  render: (args) => ({
    props: args,
    template: `
      <table>
        <tbody>
          <tr [class.inValid]="!file.isValid">
            <td class="file">
              <img
                src="assets/images/icon_file_upload.svg"
                alt="File icon"
                width="16"
                height="16"
              />
              <span>{{ file.file.name }}</span>
            </td>
            <td class="file-name">{{ file.name }}</td>
            <td class="file-description">{{ file.description }}</td>
            <td [class.valid]="file.isValid" [class.inValid]="!file.isValid">
              <span>{{ file.isValid ? 'Valid' : 'Invalid' }}</span>
            </td>
            <td class="file-remove">
              <button
                type="button"
                (click)="onDeleteFile(file)"
                (keydown.enter)="onDeleteFile(file)"
                class="btn"
                aria-label="Remove file"
              >
                <img
                  src="assets/images/icon_remove.svg"
                  alt="Remove file icon"
                  width="16"
                  height="16"
                />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    `,
  }),
};

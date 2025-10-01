import { TableRowItem } from "@components/table-row/table-row-item/table-row-item";
import type { Meta, StoryObj } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { signal } from "@angular/core";
import { UploadedFileModel } from "@store/files.state";
import { ModalService } from "@services/modal.service";

const exampleFile: UploadedFileModel = {
  id: "123",
  name: "test.json",
  description: "Example JSON file",
  isValid: true,
  file: new File(["dummy content"], "test.json"),
  isDeleted: false,
};

const meta: Meta<TableRowItem> = {
  title: "Components/TableRowItem",
  component: TableRowItem,
  tags: ["autodocs"],
  decorators: [
    (story) => ({
      ...story(),
      moduleMetadata: {
        imports: [CommonModule, TableRowItem],
        providers: [
          {
            provide: ModalService,
            useValue: {
              open: () => ({ componentInstance: {} }), // dummy modal
            },
          },
        ],
      },
    }),
  ],
};

export default meta;
type Story = StoryObj<TableRowItem>;

export const Valid: Story = {
  args: {
    file: signal(exampleFile)(),
  },
};

export const Invalid: Story = {
  args: {
    file: signal({ ...exampleFile, isValid: false })(),
  },
};

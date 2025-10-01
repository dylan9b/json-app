import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
  output,
} from "@angular/core";

@Component({
  selector: "app-button",
  imports: [],
  templateUrl: "./button.html",
  styleUrl: "./button.scss",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  protected readonly clickButton = output<void>();

  readonly label = input.required<string>();
  readonly primary = input<boolean>(false);
  readonly secondary = input<boolean>(false);

  readonly variant = input<"primary" | "secondary">("primary");

  @HostBinding("class.primary") get isPrimary() {
    return this.variant() === "primary";
  }

  @HostBinding("class.secondary") get isSecondary() {
    return this.variant() === "secondary";
  }
}

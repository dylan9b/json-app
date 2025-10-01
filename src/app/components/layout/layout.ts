import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavBar } from "@components/nav-bar/nav-bar";

@Component({
  selector: "app-layout",
  imports: [NavBar, RouterOutlet],
  templateUrl: "./layout.html",
  styleUrl: "./layout.scss",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout {}

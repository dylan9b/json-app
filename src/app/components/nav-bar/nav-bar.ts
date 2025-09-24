import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RoutesConstants } from '@shared/routes.constants';
import { NavBarModel } from './_model/navbar.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBar {
  protected readonly navItems: NavBarModel[] = [
    {
      route: `/${RoutesConstants.HOME}`,
      label: 'Home',
    },
    {
      route: `/${RoutesConstants.FILES}`,
      label: 'Files',
    },
  ];
}

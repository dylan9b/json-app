import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-files',
  imports: [],
  templateUrl: './files.html',
  styleUrl: './files.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Files {}

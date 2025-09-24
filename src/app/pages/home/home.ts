import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from '@components/button/button';

@Component({
  selector: 'app-home',
  imports: [Button],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  onUploadFile(): void {
    console.log('upload file');
  }
}

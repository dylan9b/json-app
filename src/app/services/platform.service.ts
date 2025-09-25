import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  private readonly _platformId = inject(PLATFORM_ID);

  get isBrowser(): boolean {
    return isPlatformBrowser(this._platformId);
  }

  get isServer(): boolean {
    return isPlatformServer(this._platformId);
  }

  get localStorage(): Storage | null {
    return this.isBrowser ? localStorage : null;
  }

  get window(): Window | null {
    return this.isBrowser ? window : null;
  }
}

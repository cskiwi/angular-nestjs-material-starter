import { HttpClient } from '@angular/common/http';
import { Component, InjectionToken, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { derivedAsync } from 'ngxtension/derived-async';
import { map } from 'rxjs';

import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrl: './root.component.scss',
})
export class RootComponent {
  isHandset = inject(DEVICE);

  private readonly httpClient = inject(HttpClient);
  movie = derivedAsync(() =>
    this.httpClient.get(`http://localhost:3000/api/backend-test`),
  );
}

export const DEVICE = new InjectionToken('DEVICE', {
  providedIn: 'root',
  factory: () => {
    const breakpointObserver = inject(BreakpointObserver);
    return toSignal(
      breakpointObserver
        .observe(['(max-width: 959.98px)'])
        .pipe(map((result) => result.matches)),
    );
  },
});

import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@app/frontend-pages-home').then((m) => m.pageHomeRoutes),
  },
];

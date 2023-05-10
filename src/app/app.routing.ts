import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'pages/login',
        pathMatch: 'full',
    }, {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('./dashboard/dashboard.module').then(x => x.DashboardModule)
            },
            {
                path: '',
                loadChildren: () => import('./membros/membros.module').then(x => x.MembrosModule)
            },
            {
                path: '',
                loadChildren: () => import('./celulas/celulas.module').then(x => x.CelulasModule)
            },
            {
                path: 'configuracoes',
                loadChildren: () => import('./configuracoes/configuracoes.module').then(x => x.ConfiguracoesModule)
            },
            {
                path: 'components',
                loadChildren: () => import('./components/components.module').then(x => x.ComponentsModule)
            }, {
                path: 'forms',
                loadChildren: () => import('./form/form.module').then(x => x.FormModule)
            }, {
                path: 'tables',
                loadChildren: () => import('./tables/tables.module').then(x => x.TablesModule)
            }, {
                path: 'maps',
                loadChildren: () => import('./maps/maps.module').then(x => x.MapsModule)
            }, {
                path: 'charts',
                loadChildren: () => import('./charts/charts.module').then(x => x.ChartsModule)
            }, {
                path: 'calendar',
                loadChildren: () => import('./calendar/calendar.module').then(x => x.CalendarModule)
            }, {
                path: '',
                loadChildren: () => import('./userpage/user.module').then(x => x.UserModule)
            }, {
                path: '',
                loadChildren: () => import('./timeline/timeline.module').then(x => x.TimelineModule)
            }, {
                path: '',
                loadChildren: () => import('./widgets/widgets.module').then(x => x.WidgetsModule)
            }]
    }, {
        path: '',
        component: AuthLayoutComponent,
        children: [{
            path: 'pages',
            loadChildren: () => import('./pages/pages.module').then(x => x.PagesModule)
        }]
    }
];

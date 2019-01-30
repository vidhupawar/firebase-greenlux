import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
    NbAuthComponent,
    NbLoginComponent,
    NbLogoutComponent,
    NbRegisterComponent,
    NbRequestPasswordComponent,
    NbResetPasswordComponent,
} from '@nebular/auth';
import { LoginComponent, LogoutComponent, RegisterComponent } from './auth/components/index';
import { AuthGuard } from './auth/backend/guards/index';
import { UserResolver } from './auth/backend/resolvers/index';

const routes: Routes = [
    { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule', resolve: { data: UserResolver } },
    {
        path: 'auth',
        component: NbAuthComponent,
        children: [
            {
                path: '',
                component: LoginComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'login',
                component: LoginComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'register',
                component: RegisterComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'logout',
                component: LogoutComponent,
            },
            {
                path: 'request-password',
                component: NbRequestPasswordComponent,
            },
            {
                path: 'reset-password',
                component: NbResetPasswordComponent,
            },
        ],
    },
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: '**', redirectTo: 'auth/login' },
];

const config: ExtraOptions = {
    useHash: true,
};

@NgModule( {
    imports: [RouterModule.forRoot( routes, config )],
    exports: [RouterModule],
} )
export class AppRoutingModule {
}

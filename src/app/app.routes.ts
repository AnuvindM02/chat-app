import { Routes } from '@angular/router';
export const routes: Routes = [
    {
        path: 'auth',
        loadComponent: () => import('./features/auth/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
        children: [
            {
                path: '',
                pathMatch: 'full',
                loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
            },
            {
                path:'signup',
                loadComponent: () => import('./features/auth/signup/signup.component').then(m => m.SignupComponent)
            }
        ]
    },
    {path: '', redirectTo: '/auth', pathMatch: 'full'},
];

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
                path: 'signup',
                loadComponent: () => import('./features/auth/signup/signup.component').then(m => m.SignupComponent)
            }
        ]
    },
    {
        path: 'home',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
        children: [
            {
                path: 'messages',
                pathMatch: 'full',
                loadComponent: () => import('./features/home/contacts-section/contacts-section.component').then(m => m.ContactsSectionComponent)
            },
            {
                path: 'settings',
                pathMatch: 'full',
                loadComponent: () => import('./features/home/settings/settings.component').then(m => m.SettingsComponent)
            },
            {
                path: 'profile',
                pathMatch: 'full',
                loadComponent: () => import('./features/home/profile/profile.component').then(m => m.ProfileComponent)
            },
            {
                path: 'notifications',
                pathMatch: 'full',
                loadComponent: () => import('./features/home/notification/notification.component').then(m => m.NotificationComponent)
            },
            {
                path: 'search',
                pathMatch: 'full',
                loadComponent: () => import('./features/home/search-user/search-user.component').then(m => m.SearchUserComponent)
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'messages'
            }]
    },
    { path: '', redirectTo: '/auth', pathMatch: 'full' }
];

import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Route[] = [
  {
    path: 'register',
    loadChildren: () => import('./components/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./components/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  {
    path: 'users',
    loadChildren: () =>
      import('./features/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'active-posts',
    loadChildren: () =>
      import('./features/active-posts/active-posts.module').then(
        (m) => m.ActivePostsModule
      ),
  },
  {
    path: 'inactive-posts',
    canActivate:[AuthGuard],
    loadChildren: () =>
      import('./features/inactive-posts/inactive-posts.module').then(
        (m) => m.InactivePostsModule
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }

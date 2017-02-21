import { NgModule }       from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AboutUsComponent} from './AboutUs/aboutus.component';
import {LoginComponent} from './Login/login.component';
import {PageNotFoundComponent} from './PageNotFound/pagenotfound.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'about',
        component: AboutUsComponent,
        data: { title: 'About Us' }
    },
    {
        path: 'todo',
        loadChildren: 'app/Todo/todo.module#TodoModule' // Lazy load module
    },
    {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login' }
    },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }

export const routableComponents = [
    AboutUsComponent,
    PageNotFoundComponent
];
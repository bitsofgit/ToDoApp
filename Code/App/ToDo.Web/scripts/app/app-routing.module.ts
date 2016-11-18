import { NgModule }       from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AboutUsComponent} from './AboutUs/aboutus.component';
import {PageNotFoundComponent} from './PageNotFound/pagenotfound.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/about',
        pathMatch: 'full'
    },
    {
        path: 'about',
        component: AboutUsComponent,
        data: {
            title: 'About Us'
        }
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
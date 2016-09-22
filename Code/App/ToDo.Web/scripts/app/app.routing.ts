import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AboutUsComponent} from "./AboutUs/aboutus.component";
import {PageNotFoundComponent} from "./PageNotFound/pagenotfound.component";


const appRoutes: Routes = [
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

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
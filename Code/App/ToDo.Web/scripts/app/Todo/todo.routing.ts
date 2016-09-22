import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TodoComponent, AddItemComponent, EditItemComponent} from "./index";

const todoRoutes: Routes = [
    {
        path: 'todo', component: TodoComponent, data: {
            title: 'ToDo List'
        }
    },
    {
        path: 'add', component: AddItemComponent, data: {
            title: 'Add Item'
        }
    },
    {
        path: 'edit/:id', component: EditItemComponent
    }
];

export const todoRouting: ModuleWithProviders = RouterModule.forChild(todoRoutes);
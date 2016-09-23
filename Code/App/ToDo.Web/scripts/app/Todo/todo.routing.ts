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
        path: 'todo/add', component: AddItemComponent, data: {
            title: 'Add Item'
        }
    },
    {
        path: 'todo/edit/:id', component: EditItemComponent
    }
];

export const todoRouting: ModuleWithProviders = RouterModule.forChild(todoRoutes);
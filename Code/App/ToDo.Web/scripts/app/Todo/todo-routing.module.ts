import { NgModule }       from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TodoComponent, AddItemComponent, EditItemComponent, CanActivateAuthGuard} from "./index";

const todoRoutes: Routes = [
    {
        path: 'todo',
        component: TodoComponent,
        data: { title: 'ToDo List' },
        canActivate:[CanActivateAuthGuard]
    },
    { path: 'todo/add', component: AddItemComponent, data: { title: 'Add Item' }, canActivate: [CanActivateAuthGuard] },
    { path: 'todo/edit/:id', component: EditItemComponent, data: { title: 'Edit Item' }, canActivate: [CanActivateAuthGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(todoRoutes)],
    exports: [RouterModule]
})

export class ToDoRoutingModule { }

export const todoRoutableComponents = [
    TodoComponent,
    AddItemComponent,
    EditItemComponent
];
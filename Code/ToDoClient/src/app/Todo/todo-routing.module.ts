import { NgModule }       from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TodoComponent, AddItemComponent, EditItemComponent, CanActivateAuthGuard} from "./index";

const todoRoutes: Routes = [
    { path: '', component: TodoComponent, data: { title: 'ToDo List' }, canActivate: [CanActivateAuthGuard]},
    { path: 'add', component: AddItemComponent, data: { title: 'Add Item' }, canActivate: [CanActivateAuthGuard] },
    { path: 'edit/:id', component: EditItemComponent, data: { title: 'Edit Item' }, canActivate: [CanActivateAuthGuard] }
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
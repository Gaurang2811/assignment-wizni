import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchemaComponent } from './manage-schema.component';
import { SchemaListComponent } from './list/list.component';
import { SchemaCreateComponent } from './create/create.component';

const routes: Routes = [{
  path: '',
  component: SchemaComponent,
  children: [{
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  }, {
  	path: 'list',
  	component: SchemaListComponent,
  }, {
  	path: 'create',
  	component: SchemaCreateComponent,
  }, {
  	path: 'edit/:id',
  	component: SchemaCreateComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchemaRoutingModule { }

export const routedComponents = [
  SchemaComponent,
  SchemaListComponent,
  SchemaCreateComponent,
];

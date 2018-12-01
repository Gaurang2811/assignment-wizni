import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination'; // Pagination Module

import { SchemaRoutingModule, routedComponents } from './manage-schema-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ManageSchemaService } from './manage-schema.service';

@NgModule({
  imports: [
    SchemaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    NgxPaginationModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ManageSchemaService,
  ],
})
export class SchemaModule { }


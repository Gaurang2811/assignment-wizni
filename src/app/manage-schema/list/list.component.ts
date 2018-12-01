import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManageSchemaService } from '../manage-schema.service';
import { ToastNotificationService } from '../../shared/services';

@Component({
  selector: 'app-list-schema',
  templateUrl: './list.component.html',
})
export class SchemaListComponent implements OnInit {

	schemaList: any[] = [];
	// it will define items per page for pagination
	itemPerPage = 8;
	// current page for pagination
	currentPage = 1;
	// total items to show page number
	totalItems = 0;
	// for search
	filter = '';
  // for Sort
	sort: Sort = {
		column: 'name',
		order: 'asc',
	};

	constructor(
		private schemaService: ManageSchemaService,
		private router: Router,
		private notificationSerice: ToastNotificationService,
		) {
	}

	ngOnInit() {
		this.initializeCurrentPage();
	  this.pageChanged(this.currentPage);
	}

// this method will be called several times as need to initialize current page to 1 will be needed multiple times
	initializeCurrentPage() {
		this.currentPage = 1;
	}

	pageChanged(page) {
		this.currentPage = page;
		this.getSchemaList(this.currentPage, this.itemPerPage);
	}

	getSchemaList(page, perPage) {
	    this.schemaService.getAllSchemas(page, perPage, this.filter, this.sort.column, this.sort.order)
	    .subscribe(schemas => {
	      this.totalItems = schemas.headers.get('x-total-count');
	    	if (schemas.body.length) {
		    	this.schemaList = schemas.body;
	    	}
	    });
	}

// method to upate schema
	editSchema(schema) {
		this.router.navigate(['app/edit', schema.id]);
	}

// method to delete schema
	deleteSchema(schema) {
		if (confirm('Are You sure?')) {
			this.schemaService.deleteSchema(schema.id).subscribe(res => {
				this.notificationSerice.showToast('Success', 'Successfully deleted schema', 'success');
				this.pageChanged(this.currentPage);
			}, err => {
			});
    }
	}

	navigateCreatePage() {
		this.router.navigate(['app/create']);
	}

	filterList() {
		this.initializeCurrentPage();
		console.log('saclkksdscd');
		this.pageChanged(this.currentPage);
	}

	sortAction($event) {
		this.initializeCurrentPage();
		this.sort = {
			column: $event.columnName,
			order: $event.direction,
		};
		this.pageChanged(this.currentPage);
	}

}


interface Sort {
	column: string;
	order: string;
}

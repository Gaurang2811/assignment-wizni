import { Injectable } from '@angular/core';
import { HttpService } from '../shared/services';
import { Observable } from 'rxjs';

@Injectable()
export class ManageSchemaService {

	constructor(private http: HttpService) {
	}

	getAllSchemas(page: number = 1, pagesize: number = 10, filter, sortBy = 'name', order = 'asc'): Observable<any> {
		const url = `column?_page=${page}&_limit=${pagesize}&_sort=${sortBy}&_order=${order}&q=${filter}`;
		return this.http.getFullResponse(url);
	}

	getSchemaById(id: string): Observable<any> {
		const url: string = 'column/' + id;
		return this.http.getAll(url);
	}

	addSchema(body): Observable<any> {
		const url = 'column';
		return this.http.post(url, body);
	}

	editSchema(body, id): Observable<any> {
		const url: string = 'column/' + id;
		return this.http.put(url, body);
	}

	deleteSchema(id): Observable<any> {
		const url: string = 'column/' + id;
		return this.http.delete(url);
	}

}

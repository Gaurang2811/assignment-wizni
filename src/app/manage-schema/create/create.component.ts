import { Component } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ManageSchemaService } from '../manage-schema.service';
import { ToastNotificationService, onlyNum, regex } from '../../shared/services';

@Component({
  selector: 'app-create-schema',
  templateUrl: './create.component.html',
})
export class SchemaCreateComponent {

	routerConnection: any;
	viewType: string;
	id: string;

	schemaForm: FormGroup;
	schemaToEdit: any;

	defaultValuePlaceholder = 'String (eg: Sample)';

	constructor(
		private schemaService: ManageSchemaService,
		private router: Router,
		private _fb: FormBuilder,
		private notificationSerice: ToastNotificationService,
		) {
		this.initializeForm();
		//  checking from route for edit/ create and the ID
		this.routerConnection = router.events.subscribe((event) => {
		  if (event instanceof NavigationEnd ) {
		    const [action, id] = event.url.split('/').slice(2);
		    this.viewType = action;
		    this.id = id;
		    if (this.viewType !== 'create' && this.id) {
		      this.getData(id); // method to get details for perticular exam.
		    }
		  }
		});
	}

	initializeForm() {
		this.schemaForm = this._fb.group({
			name: ['', Validators.required],
			type: ['String', Validators.required],
			required: ['true', Validators.required],
			defaultValue: ['', Validators.required],
			maxLength: ['', Validators.pattern(regex.onlyNum)],
			minLength: ['', Validators.pattern(regex.onlyNum)],
			maxValue: ['', Validators.pattern(regex.onlyNum)],
			minValue: ['', Validators.pattern(regex.onlyNum)],
		});

		this.type.valueChanges.subscribe(val => {
			// reseting detault value if type changes
			this.defaultValue.reset();
			this.updateDefaultValueValidator();
		});

		this.minLength.valueChanges.subscribe(val => {
			this.maxLength.setValidators([Validators.min(val), Validators.pattern(regex.onlyNum)]);
			this.maxLength.updateValueAndValidity();
			this.updateDefaultValueValidator();
		});

		this.maxLength.valueChanges.subscribe(val => {
			this.updateDefaultValueValidator();
		});

		this.minValue.valueChanges.subscribe(val => {
			this.maxValue.setValidators([Validators.min(val), Validators.pattern(regex.onlyNum)]);
			this.maxValue.updateValueAndValidity();
			this.updateDefaultValueValidator();
		});

		this.maxValue.valueChanges.subscribe(val => {
			this.updateDefaultValueValidator();
		});

	}

	get name() { return this.schemaForm.get('name'); }
	get type() { return this.schemaForm.get('type'); }
	get required() { return this.schemaForm.get('required'); }
	get defaultValue() { return this.schemaForm.get('defaultValue'); }
	get maxLength() { return this.schemaForm.get('maxLength'); }
	get minLength() { return this.schemaForm.get('minLength'); }
	get maxValue() { return this.schemaForm.get('maxValue'); }
	get minValue() { return this.schemaForm.get('minValue'); }

	submit() {
		if (this.schemaForm.valid) {
			const body = {
				...this.schemaForm.value,
			};
			if (this.viewType !== 'edit') {
				this.schemaService.addSchema(body).subscribe((res) => {
					if (res.id) {
						this.notificationSerice.showToast('Success', 'Successfully added schema', 'success');
						this.schemaForm.reset();
	         	this.router.navigateByUrl('app/list');
					}
				});
			} else {
				this.schemaService.editSchema(body, this.schemaToEdit.id).subscribe((res) => {
					if (res.id) {
						this.notificationSerice.showToast('Success', 'Successfully edited schema', 'success');
						this.schemaForm.reset();
	          this.router.navigateByUrl('app/list');
					}
				});
			}
		}
	}

	getData(id: string) {
		this.schemaService.getSchemaById(id).subscribe((res) => {
			this.schemaToEdit = res;
			this.schemaForm.patchValue(res);
		});
	}

	updateDefaultValueValidator(val: string = this.type.value) {
		if (!val) {
			return;
		}
		if (val.toLowerCase() === 'string') {
			// adding validation for characters only, min and max length
			this.defaultValue.setValidators([
				Validators.required,
				Validators.pattern(regex.onlyAlpha),
				Validators.minLength(this.minLength.value || 1),
				Validators.maxLength(this.maxLength.value || 999999999999),
			]);
			this.defaultValuePlaceholder = 'String (eg: Sample)';
		} else if (val.toLowerCase() === 'number') {
			// adding validation for numbers only, min and max value
			this.defaultValue.setValidators([
				Validators.required,
				Validators.pattern(regex.onlyNum),
				Validators.min(this.minValue.value),
				Validators.max(this.maxValue.value),
			]);
			this.defaultValuePlaceholder = 'Number (eg: 34)';
		} else {
			// adding validation for true/ false only
			this.defaultValue.setValidators([
				Validators.required,
				Validators.pattern(regex.onlyTF),
			]);
			this.defaultValuePlaceholder = 'Boolean (eg: true/ false)';
		}
		this.defaultValue.updateValueAndValidity();
	}

	navigateList() {
		if (confirm('Changes will be lost')) {
        this.router.navigate(['app/list']);
    }
	}

	validate(event) {
		onlyNum(event);
	}

}

import { RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './components/loader/loader.component';
import { SortableColumnComponent } from './components/sortable-column/sortable-column.component';

import { LoaderService } from './components/loader/loader.service';

const SHARED_COMPONENTS = [
	LoaderComponent,
	SortableColumnComponent,
	];

const SINGLETON_SERVICES = [
	LoaderService,
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
	],
    declarations: [
    	...SHARED_COMPONENTS,
    ],
    exports: [
    	CommonModule,
    	...SHARED_COMPONENTS,
    ],
    providers: [
		],
		entryComponents: [
		],
})

export class SharedModule {
	// constructor(@Optional() @SkipSelf() parentModule: SharedModule) {
	//   throwIfAlreadyLoaded(parentModule, 'SharedModule');
	// }

	// for singleton (For ROOT)
	static forRoot(): ModuleWithProviders {
	  return <ModuleWithProviders>{
	    ngModule: SharedModule,
	    // imports: [],
		  declarations: [
	    	...SHARED_COMPONENTS,
	    ],
	    providers: [
	      ...SINGLETON_SERVICES,
	    ],
	  };
	}
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
	{
	  path: 'app',
	  loadChildren: './manage-schema/manage-schema.module#SchemaModule',
	},
	{
	  path: 'welcome',
	  component: WelcomeComponent,
	},
	{ path: '', redirectTo: 'welcome', pathMatch: 'full' },
	{ path: '**', redirectTo: 'welcome', pathMatch: 'full' },
];


const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

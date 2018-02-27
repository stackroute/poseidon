import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterTableComponent } from './masterTable/mastertable.component';
import { ProjectStatusComponent } from './projectStatusReport/projectstatus.component';

const routes: Routes = [
    {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full'
    },
    {
      path: 'home',
      component: MasterTableComponent,
    },
    {
      path: 'projectstatus',
      component: ProjectStatusComponent,
    },
  
  ];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
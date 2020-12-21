import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import {EmployeeComponent} from './pages/employee/employee.component';
import {TreeviewComponent} from './pages/treeview/treeview.component';

const routes: Routes = [
  {path: '', component: LayoutComponent, children: [
   {path: 'employee', component: EmployeeComponent},
    {path: 'treeview', component: TreeviewComponent}
   
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class LayoutRoutingModule { }

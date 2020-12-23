import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { TreeviewComponent } from './pages/treeview/treeview.component';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { EmplistComponent } from './pages/emplist/emplist.component';
import { ViewempComponent } from './pages/viewemp/viewemp.component';

@NgModule({
  declarations: [LayoutComponent, EmployeeComponent, TreeviewComponent, EmplistComponent, ViewempComponent],
  imports: [
    CommonModule,
    FormsModule,
    LayoutRoutingModule,
    HttpClientModule,
    HttpModule,
    NgbModule,
    DataTablesModule,
    ToastrModule.forRoot()
  ],
  providers: [

  ]
})
export class LayoutModule { }

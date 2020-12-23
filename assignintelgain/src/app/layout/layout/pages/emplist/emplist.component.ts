import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../../../modules/employee';
import { ToastrService } from 'ngx-toastr';
import { LayoutComponent } from '../../layout.component';
import { ServiceService, Options } from 'src/app/service.service';

@Component({
  selector: 'app-emplist',
  templateUrl: './emplist.component.html',
  styleUrls: ['./emplist.component.css']
})
export class EmplistComponent implements OnInit {
  public currentLoginId;
  public firstName;
  public role;
  public addbtn: any;
  public employee: Employee = new Employee();
  public employeeList: Employee[];
  dtOptions: DataTables.Settings = {};
  constructor(private layout: LayoutComponent, private http: ServiceService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getCurrentIds();
    this.getEmployees();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }

  getCurrentIds() {
    this.currentLoginId = sessionStorage.getItem('firstName');
    this.role = sessionStorage.getItem('role');
  }

  getEmployees() {
    const options = new Options();
    this.http.get('employee', options).subscribe(res => {
      this.employeeList = res.data;

    });
  }

  employeeId: any;
  deleteEmployee(id) {
    let employeeId = id;
    const options = new Options();
    this.http.delete('employee/' + employeeId, options).subscribe(res => {
      this.toastr.success('Employee Deleted Successfully...', 'Employee');
      this.getEmployees();
    });
  }
  employee_Id: any;

  getEmpDetail(id) {
    let employee_Id = id;
    sessionStorage.setItem('EmpData', employee_Id);
    sessionStorage.setItem('empedit', 'emp');

  }

}

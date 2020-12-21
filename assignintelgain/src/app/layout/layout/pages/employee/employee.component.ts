import { Component, ViewChild, OnInit } from '@angular/core';
import { Employee } from '../../../../../modules/employee';
import { ToastrService } from 'ngx-toastr';
import { LayoutComponent } from '../../layout.component';
import { ServiceService, Options } from 'src/app/service.service';

declare var $;
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  public currentLoginId;
  public firstName;
  public role;
  public addbtn = false;
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
  addEmployee(emp) {
    this.employee.added_by = this.currentLoginId;
    const options = new Options();
    if (this.addbtn) {
      this.updateEmployee(emp);
    }
    else {
      this.http.post('employee', this.employee, options).subscribe(res => {
        if (res.success == true) {
          emp.reset();
          emp.submitted = false;
          this.toastr.success('Employee Added Successfully...', 'Employee');
          this.getEmployees();
        } else if (res.message == 'duplicate employeeId') {
          this.toastr.error('Employee Id Already Exist', 'Employee');
        } else {
          this.toastr.error('Error While Creation', 'Employee');
        }
      });
    }
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

  updateEmployee(emp) {
    const options = new Options();
    this.http.put('employee', this.employee, options).subscribe(res => {
      const empupdataData: any = res;
      console.log(empupdataData);

      if (empupdataData.message == 'employee update successfully') {
        this.toastr.success('Employee Updated Successfully...', 'Employee');
        this.addbtn = false;
        this.employee.id = null;
        emp.reset();
        emp.submitted = false;
        this.getEmployees();
      }

    });

  }
  employee_Id: any;
  getEmployeeById(id) {
    let employee_Id = id;
    const options = new Options();
    this.http.get('employee/data/' + employee_Id, options).subscribe(res => {
      this.addbtn = true;
      this.employee = res.data;
    });
  }

}

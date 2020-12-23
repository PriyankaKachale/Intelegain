import { Component, ViewChild, OnInit } from '@angular/core';
import { Employee } from '../../../../../modules/employee';
import { ToastrService } from 'ngx-toastr';
import { LayoutComponent } from '../../layout.component';
import { ServiceService, Options } from 'src/app/service.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  public currentLoginId;
  public firstName;
  public role;
  public employee_Id;
  public empupdateflag;
  public addbtn = false;
  public editemp:any
  public employee: Employee = new Employee();
  public employeeList: Employee[];
  dtOptions: DataTables.Settings = {};

  constructor(private layout: LayoutComponent, private http: ServiceService, private toastr: ToastrService) { }

  ngOnInit() {
    
    this.resetform();
    this.getCurrentIds();
    this.getEmployees();
    if(this.editemp == 'emp'){
      this.getEmployeeById();
    }
    
   
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }



resetform(){
  this.employee.first_name=" ";
}

  getCurrentIds() {
    this.currentLoginId = sessionStorage.getItem('firstName');
    this.role = sessionStorage.getItem('role');
    this.employee_Id = sessionStorage.getItem('EmpData');
    this.editemp = sessionStorage.getItem('empedit');
    
    
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
    this.employee.id=this.employee_Id;
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
 
 
  getEmployeeById() {
    let employee_Id = this.employee_Id;
    const options = new Options();
    this.http.get('employee/data/' + employee_Id, options).subscribe(res => {
      this.addbtn = true;
      this.employee = res.data;
      
    });
  }

}

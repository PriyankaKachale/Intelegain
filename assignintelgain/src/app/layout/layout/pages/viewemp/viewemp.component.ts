import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../../../modules/employee';
import { ToastrService } from 'ngx-toastr';
import { LayoutComponent } from '../../layout.component';
import { ServiceService, Options } from 'src/app/service.service';

@Component({
  selector: 'app-viewemp',
  templateUrl: './viewemp.component.html',
  styleUrls: ['./viewemp.component.css']
})
export class ViewempComponent implements OnInit {
  public currentLoginId;
  public firstName;
  public role;
  public employee_Id;
  public empupdateflag;
  public addbtn = false;
  public employee: Employee = new Employee();
  public employeeList: Employee[];
  constructor(private layout: LayoutComponent, private http: ServiceService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getCurrentIds();
    this.getEmployeeById();
  }
  getCurrentIds() {
    this.currentLoginId = sessionStorage.getItem('firstName');
    this.role = sessionStorage.getItem('role');
    this.employee_Id = sessionStorage.getItem('EmpData');
    this.empupdateflag = sessionStorage.getItem('updateflag');
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

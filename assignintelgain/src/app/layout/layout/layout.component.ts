import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { URLS } from '../../../config/config';
import { HttpService, Options} from '../../../service/http.service';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  public currentLoginId;
  public firstName;
  public role;
  

  constructor(public router: Router, private http: HttpService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getCurrentIds();
  }

  getCurrentIds() {
    this.currentLoginId = sessionStorage.getItem('currentLoginId');
    this.firstName = sessionStorage.getItem('firstName');
    this.role = sessionStorage.getItem('role');
  }
  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('/');
  }

  changeActive1(emp){
    sessionStorage.removeItem('empedit')
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Login} from '../../modules/login';
import { ToastrService } from 'ngx-toastr';
import { ServiceService, Options} from '../service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: Login = new Login();
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;


  constructor(
    private route: ActivatedRoute, private http:ServiceService, private router: Router, private toastr: ToastrService
  ) { }

  ngOnInit() {
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  


loginUser() {
  const options = new  Options();
  this.http.post('user/login/user', this.login, options).subscribe(res => {
    console.log(res.data);
    console.log(res.message);
     if (res.message == 'wrong password') {
       this.toastr.error('Wrong Password', 'Credentials');
     }
    if (res.message == 'user not exist') {
      this.toastr.error('Invalid Username', 'Credentials');
    }
    sessionStorage.setItem('firstName', res.data.first_name);
    sessionStorage.setItem('role', res.data.role);
    sessionStorage.setItem('access-token', res.data.token);
    this.router.navigateByUrl('/layout');
   });
}

}

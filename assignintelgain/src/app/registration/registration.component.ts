import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Signup } from '../../modules/signup';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceService, Options} from '../service.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public signup: Signup = new Signup();
  loginForm: FormGroup;
    loading = false;
    submitted = false;


  constructor(private router: Router,private http: ServiceService, private toastr: ToastrService) {
   }

  ngOnInit() {  
  }

  signUpUser(signUpForm) {
    const options = new Options();
    console.log(this.signup);
    this.http.post('user/signup', this.signup, options).subscribe(res => {
      if (res.message == 'User aleredy Exists') {
        this.toastr.error('Email Address Alredy Exist', 'SignUp');
      }else{
        this.toastr.success('SignUp Successfully', 'SignUp');
      }
      
      signUpForm.reset();
      signUpForm.submitted = false;
      setTimeout( () => {
        this.router.navigateByUrl('/login');
      }, 2000 );
    }, error => {
       this.toastr.error('Email Address Alredy Exist', 'SignUp');
     });
 
   }

}

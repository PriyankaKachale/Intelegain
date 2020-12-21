import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LayoutComponent } from '../../layout.component';
import { ServiceService,Options } from 'src/app/service.service';

@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.css']
})
export class TreeviewComponent implements OnInit {
  public userList:any;
  public AdminList:any;

  constructor(private layout : LayoutComponent, private http: ServiceService, private toastr: ToastrService) { }

  ngOnInit() {
  
  }

  getAdminData(){
    const options = new Options();
    this.http.get('user', options).subscribe(res => {
      this.userList = res.data;   
    });
  }
  getUserData(){
    const options = new Options();
    this.http.get('user/user', options).subscribe(res => {
      this.userList = res.data;  
    });
  }
}

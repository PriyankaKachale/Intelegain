import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders , HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URLS } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  public HOST = URLS.localUrl;
  constructor(private http: HttpClient) {  }

  get(resourceURI, options: Options): Observable<any> {
    options = this.setHeaders(options);
    return this.http.get(this.HOST + resourceURI, options);
  }

  post(resourceURI, body, options: Options): Observable<any> {
    options = this.setHeaders(options);
    return this.http.post(this.HOST + resourceURI, body, options);
  }

  put(resourceURI, body, options: Options) {
    options = this.setHeaders(options);
    return this.http.put(this.HOST + resourceURI, body, options);
  }

  delete(resourceURI, options: Options) {
    options = this.setHeaders(options);
    return this.http.delete(this.HOST + resourceURI, options);
  }

  private setHeaders(options) {
    if (!options) {
      options = new Options();
    }
    if (sessionStorage.getItem('access-token')) {
      options.headers['access-token'] = sessionStorage.getItem('access-token');
    }
    return options;
  }

}


export class Options {
  params: any;
  headers: any;
  observe: any;
  constructor() {
    this.params = {};
    this.headers = {};
    this.observe = 'body';
  }
}

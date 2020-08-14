import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'

export interface UserDetails {
  _id: string
  first_name: string
  last_name: string
  email: string
  password: string
  exp: number
  iat: number
}

interface TokenResponse {
  token: string
}

export interface TokenPayload {
  _id: string
  first_name: string
  last_name: string
  email: string
  password: string
}

@Injectable()
export class AuthenticationService {
  private token: string
  url1 = 'http://localhost:3500/login';
  url2 = 'http://localhost:3500/register';
  url3 = 'http://localhost:3500/add-customer-details';
  url4 = 'http://localhost:3500/get-all-customer-details';
  url5 = 'http://localhost:3500/get-all-business-details';
  url6 = 'http://localhost:3500/add-business-details';
  url7 = 'http://localhost:3500/get-individual-customer-details';
  url8 = 'http://localhost:3500/get-individual-business-details';
  url9 = 'http://localhost:3500/update-customer-details';
  url10 = 'http://localhost:3500/update-business-details';
  url11 = 'http://localhost:3500/business-delete';
  url12 = 'http://localhost:3500/customer-delete';
  

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken')
    }
    return this.token
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if (user) {
      return user.exp > Date.now() / 1000
    } else {
      return false
    }
  }

  public register(user: TokenPayload): Observable<any> {
    const base = this.http.post(this.url2, user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data
      })
    )

    return request
  }

  public login(user: TokenPayload): Observable<any> {
    const base = this.http.post(this.url1, user)
    console.log(base);
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )

    return request
  }

  public profile(): Observable<any> {
    return this.http.get(`/profile`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/')
  }
  addCustomerDetails(customer){
      return this.http.post(this.url3, customer)
  }

  addBusinessDetails(business){
      return this.http.post(this.url6, business)
  }

  getAllCustomerDetailsData(){
    return this.http.get(this.url4)
  }
  getAllBusinessDetailsData(){
    return this.http.get(this.url5)
  }

  getIndividualCust(customer){
    return this.http.post(this.url7, customer)
  }
  getIndividualBusiness(business){
    return this.http.post(this.url8, business)
  }
  
  updateCustomerDetails(customer){
    return this.http.post(this.url9, customer)
  }

  updateBusinessDetails(business){
    return this.http.post(this.url10, business)
  }

  deleteBusinessDetails(business){
    return this.http.post(this.url11, business)
  }

  deleteCustomerDetails(customer){
    return this.http.post(this.url12, customer)
  }

}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: AuthService
  ){}

  myForm: FormGroup

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.email ]]
    })
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.service.forgetPassword(this.myForm.value).subscribe(
        {
          next: (data) => {console.log(data)}
        }
      )
    }
  }

  navigateLogin() {
    this.router.navigate([''])
  }
}

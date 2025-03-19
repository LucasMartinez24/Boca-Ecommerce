import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  @ViewChild('signinBtn') signinBtn!: ElementRef;
  @ViewChild('signupBtn') signupBtn!: ElementRef;
  @ViewChild('formBx') formBx!: ElementRef;
  @ViewChild('body') body!: ElementRef;
  emailLogin:string=""
  passwordLogin:string=""
  email:string="";
  password:string="";
  constructor(private renderer: Renderer2, private userService:AuthService,private router:Router) {
  }
  ngOnInit(): void {

  }

  onSubmitRegister(){
    this.userService.register(this.email,this.password)
  }
  onSubmitLogin(){
    this.userService.loginEmailUser(this.emailLogin,this.passwordLogin).then(resp=>{
      this.router.navigateByUrl('/inicio')
    }).catch(error=>console.log(error))
  }
  Google(){
    this.userService.loginGoogleUser().then(resp=>{
      this.router.navigateByUrl('/inicio')
    }).catch(error=>console.log(error))
  }
  ngAfterViewInit() {
    this.renderer.listen(this.signupBtn.nativeElement, 'click', () => {
      this.formBx.nativeElement.classList.add('active');
      this.body.nativeElement.classList.add('active');
    });

    this.renderer.listen(this.signinBtn.nativeElement, 'click', () => {
      this.formBx.nativeElement.classList.remove('active');
      this.body.nativeElement.classList.remove('active');
    });
  }
}

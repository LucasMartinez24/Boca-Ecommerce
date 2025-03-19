import {Component,ElementRef,HostListener,OnInit, ViewChild,} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  stickyHeader = false;
  public isLogged: boolean = false;
  activo: boolean = false;

  ngOnInit(): void {
    this.getCurrentUser();
  }
  getCurrentUser() {
    this.auth.isAuth().subscribe((auth) => {
      if (auth) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
  }
  logOut() {
    this.auth.logoutUser();
    this.router.navigateByUrl('/inicio')
  }
  //NAVBAR
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.stickyHeader = window.scrollY > 0;
  }
  @ViewChild('menuIcon') menuIcon!: ElementRef;
  @ViewChild('navmenu') navmenu!: ElementRef;
  private routerSubscription: Subscription;
  constructor(
    private afsAuth: AngularFireAuth,
    private router: Router,
    private auth: AuthService
  ) {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.resetClasses();
      }
    });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  toggleMenu() {
    const iconElement = document.querySelector('i');
    const buttonElement = document.querySelector('.navMenu');
    if (iconElement && buttonElement) {
      if (this.activo == false) {
        iconElement.classList.replace('bx-menu', 'bx-x-circle');
        buttonElement.classList.add('open');
        this.activo = true;
      } else {
          iconElement.classList.replace('bx-x-circle', 'bx-menu');
          buttonElement.classList.remove('open');
          this.activo = false;
      }
    }
  }

  resetClasses() {
    const iconElement = document.querySelector('i');
    const buttonElement = document.querySelector('.navMenu');
    if (iconElement && buttonElement) {
      iconElement.classList.replace('bx-x-circle', 'bx-menu');
      buttonElement.classList.remove('open');
    }
  }
}

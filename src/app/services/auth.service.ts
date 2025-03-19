import { Injectable } from '@angular/core';
import {Auth,GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPopup,signOut,} from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth,private auths:AngularFireAuth,private cart:CartService) {}

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
  loginEmailUser(email: string, password: string) {
    this.cart.clearCart()
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  loginGoogleUser() {
    this.cart.clearCart()
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
  logoutUser() {
    return signOut(this.auth);
  }
  isAuth(){
    return this.auths.authState.pipe(map(auth=>auth));
  }
}

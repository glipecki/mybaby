import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../common/auth/auth.service';

// TODO: czyszczenie kodu
// TODO: redirect na dashboard jeśli już zalogowany

@Component({
  selector: 'bb-login',
  template: `
    <div>
      Użytkownik:
      <input #username />
    </div>
    <div>
      Hasło:
      <input #password />
    </div>
    <div>
      <button (click)="login(username.value, password.value)">zaloguj</button>
    </div>
    <div *ngIf="message">
      {{message}}
    </div>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  message: string;

  constructor(private router: Router, private authService: AuthService) {
  }

  login(username: string, password: string) {
    this.authService.login(username, password)
      .subscribe(
        authenticated => {
          if (authenticated) {
            this.router.navigate(['/dashboard'])
          } else {
            this.message = 'Niepoprawne logowanie';
          }
        }
      )
  }

}

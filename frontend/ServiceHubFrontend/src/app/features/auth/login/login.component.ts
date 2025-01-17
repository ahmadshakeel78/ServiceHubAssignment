import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  login(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Username and password are required.';
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        const token = response.token;
        this.authService.saveToken(token);

        // Redirect to the return URL or default to '/reports'
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/reports';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Invalid username or password.';
      },
    });
  }
}
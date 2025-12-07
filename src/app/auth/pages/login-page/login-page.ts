import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHeaderComponent } from '../../components/auth-header/auth-header';
import { LinkAuth } from '../../components/link-auth/link-auth';
import { AuthService } from '../../services/auth.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Asegurar CommonModule para directivas si fuera necesario

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [AuthHeaderComponent, LinkAuth, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.html',
})
export class LoginPageComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  public loginForm = this.fb.group({
    usuario: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { usuario, password } = this.loginForm.value;

    // Mapeo correcto para el servicio
    this.authService.login({ usuario: usuario!, password: password! }).subscribe({
      next: () => {
        console.log('Login successful, navigating to /main');
        this.router.navigateByUrl('home');
      },
      error: (err) => {
        const errorMessage =
          err?.error?.message || err?.message || 'Error de conexión. Verifica tus credenciales.';
        alert(errorMessage);
      },
    });
  }
}

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LinkAuth } from '../../components/link-auth/link-auth';
import { AuthHeaderComponent } from '../../components/auth-header/auth-header';
import { AuthService } from '../../services/auth.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [LinkAuth, AuthHeaderComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './register-page.html',
})
export class RegisterPage {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  public registerForm = this.fb.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    usuario: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const { nombre, apellido, usuario, password } = this.registerForm.value;

    this.authService
      .register({
        nombre: nombre!,
        apellido: apellido!,
        usuario: usuario!,
        password: password!,
      })
      .subscribe({
        next: () => this.router.navigateByUrl('/auth/login'),
        error: (message) => {
          alert(message); // Basic error handling
        },
      });
  }
}

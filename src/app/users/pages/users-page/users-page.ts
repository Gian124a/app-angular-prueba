import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { UsersService } from '../../services/users.service'; // Import UsersService
import { User } from '../../interfaces/interfaces'; // Import User interface

@Component({
  selector: 'app-users-page',
  standalone: true, // Ensure it's standalone
  imports: [CommonModule], // Add CommonModule for directives like ngFor
  templateUrl: './users-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPage {
  private usersService = inject(UsersService);

  public users = signal<User[]>([]);
  public isLoading = signal<boolean>(true);
  public error = signal<string | null>(null);

  loadUsersEffect = effect(() => {
    this.loadUsers();
  });

  loadUsers() {
    this.isLoading.set(true);
    this.error.set(null);
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users.set(users);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(err.message || 'Failed to load users.');
        this.isLoading.set(false);
        console.error('Error loading users:', err);
      },
    });
  }
}

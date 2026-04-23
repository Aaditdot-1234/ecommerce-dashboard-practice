import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  profileForm: FormGroup;
  passwordForm: FormGroup;
  saveSuccess = false;
  // BUG-009: Layout broken — this flag is initialized to true making success message always visible
  showSuccessMessage = true;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstName: ['Aadit', Validators.required],
      lastName: ['Chaurasia', Validators.required],
      email: ['aadit@example.com', [Validators.required, Validators.email]],
      phone: ['', Validators.pattern(/^[0-9]{10}$/)],
      storeName: ['My ECommerce Store', Validators.required],
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      // BUG-010: Confirm password has no matching validator — accepts any value
      confirmPassword: ['', Validators.required],
    });
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 3000);
    } else {
      this.profileForm.markAllAsTouched();
    }
  }

  changePassword(): void {
    if (this.passwordForm.valid) {
      // BUG-010: No check that newPassword === confirmPassword
      console.log('Password changed');
      this.passwordForm.reset();
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }

  isFieldInvalid(form: FormGroup, field: string): boolean {
    const control = form.get(field);
    return !!(control && control.invalid && control.touched);
  }
}

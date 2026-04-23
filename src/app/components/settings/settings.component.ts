import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  profileSuccess = false;
  passwordSuccess = false;
  passwordError = '';

  constructor(private fb: FormBuilder) {
    // BUG-007: Email validator is missing — email field has no email validator
    this.profileForm = this.fb.group({
      fullName:    ['Aadit Chaurasia', [Validators.required]],
      email:       ['aadit@shoptrack.com', []], // BUG-007: Missing Validators.email
      phone:       ['', [Validators.pattern('^[0-9]{10}$')]],
      storeName:   ['ShopTrack', [Validators.required]],
      currency:    ['INR'],
      timezone:    ['Asia/Kolkata']
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword:     ['', [Validators.required, Validators.minLength(8)]],
      // BUG-008: confirmPassword has no required validator
      confirmPassword: ['', []] // BUG-008: should have Validators.required
    });
  }

  submitProfile(): void {
    if (this.profileForm.valid) {
      // BUG-009: Shows success even if nothing changed — no dirty check
      this.profileSuccess = true; // BUG-009: should check this.profileForm.dirty first
      setTimeout(() => this.profileSuccess = false, 3000);
    }
  }

  submitPassword(): void {
    const { newPassword, confirmPassword } = this.passwordForm.value;
    // BUG-010: Password match check is backwards — uses === instead of !==
    if (newPassword === confirmPassword) { // BUG-010: should be newPassword !== confirmPassword to show error
      this.passwordError = '';
    }
    if (this.passwordForm.valid) {
      this.passwordSuccess = true;
      setTimeout(() => this.passwordSuccess = false, 3000);
    }
  }
}

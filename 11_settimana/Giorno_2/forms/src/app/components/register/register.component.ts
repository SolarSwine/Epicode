import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      genere: ['', Validators.required],
      immagineProfilo: [null],
      biografia: ['']
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Form data: ', this.registerForm.value);
    } else {
      console.log('Form non valido. Compila tutti i campi obbligatori.');
      Object.keys(this.registerForm.controls).forEach(field => {
        const control = this.registerForm.get(field);
        if (control) {
          control.markAsTouched({ onlySelf: true });
        }
      });
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!control && control.touched && control.invalid;
}

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.registerForm.patchValue({ immagineProfilo: file });
  }
}

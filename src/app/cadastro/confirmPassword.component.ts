import { FormGroup } from '@angular/forms';

export function ConfirmPassword(controlName: string, secondControlName: string) {
    return (formGroup: FormGroup) => {
        const password = formGroup.controls[controlName];
        const confirmPassword = formGroup.controls[secondControlName];

        if (password.value !== confirmPassword.value) {
            formGroup.controls[secondControlName].setErrors({confirmPassword: true})
        }

    }
}
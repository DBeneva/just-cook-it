import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { takeUntil } from "rxjs/operators";


export function passwordValidator(control: AbstractControl): ValidationErrors {
    if (!control.value) { return; }

    if (/^[A-Za-z0-9]+$/.test(control.value)) {
        if (control.value.length >= 5) {
            return null;
        } else {
            return { lessThanFiveChars: true };
        }
    } else {
        return { notAllowedChars: true };
    }
}

export function sameValueAsFactory(getTargetControl: () => AbstractControl | null, killSubscriptions: Observable<any>) {
    let subscription: Subscription | null = null;

    return function (control: AbstractControl) {
        if (subscription) {
            subscription.unsubscribe();
            subscription = null;
        }

        const targetControl = getTargetControl();
        if (!targetControl) { return null; }

        subscription = targetControl.valueChanges.pipe(
            takeUntil(killSubscriptions)
        ).subscribe({
            next: () => { control.updateValueAndValidity(); },
            complete: () => { subscription = null; }
        });

        return targetControl.value == control.value ? null : {
            noMatch: true
        };
    }
}
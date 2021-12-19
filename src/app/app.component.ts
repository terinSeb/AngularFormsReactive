import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'AngularFromsReactive';
  genders = ['male', 'female'];
  signupFor: FormGroup;
  forbiddenUserName = ['Anna', 'Chris'];

  ngOnInit() {
    this.signupFor = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddednNames.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmails
        ),
      }),
      gender: new FormControl(null),
      hobbies: new FormArray([]),
    });
    // this.signupFor.valueChanges.subscribe(
    //   (value) => console.log(value)
    // )
    this.signupFor.statusChanges.subscribe((status) => console.log(status));

    this.signupFor.setValue({
      userData: {
        username: 'max',
        email: 'max@max.com',
      },
      gender: 'male',
      hobbies: [],
    });

    this.signupFor.patchValue({
      userData: {
        username: 'sam',
      },
    });
  }

  onSubmit() {
    console.log(this.signupFor);
    console.log(this.signupFor.value);
    this.signupFor.reset({ gender: 'male' });
  }
  addHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupFor.get('hobbies')).push(control);
  }
  getControls() {
    return (<FormArray>this.signupFor.get('hobbies')).controls;
  }
  forbiddednNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUserName.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}

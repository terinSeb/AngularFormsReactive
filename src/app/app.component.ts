import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'AngularFromsReactive';
  genders = ['male', 'female'];
  signupFor: FormGroup;

  ngOnInit() {
    this.signupFor = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
      }),
      gender: new FormControl(null),
    });
  }
  onSubmit() {
    console.log(this.signupFor);
    console.log(this.signupFor.value);
  }
}

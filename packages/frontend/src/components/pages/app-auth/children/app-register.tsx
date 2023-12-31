import { Component, h, Host, Prop, State, Event, EventEmitter } from '@stencil/core';
import { AuthService } from '../../../../services/auth-service';
import { gvmHttpErrorResponse } from '../../../../utils/httpUtils';
import authStore from '../authStore';
import { User } from '../../../../models/user.model';
import { UserValidator } from '../../../../utils/userValidation';

@Component({
  tag: 'app-register',
  styleUrl: '../app-auth.css',
})
export class AppRegister {
  @State() email: string;
  @State() password: string;
  @State() confPassword: string;

  @Prop() embedded = false;

  @Event() register: EventEmitter;

  registerHandler(e) {
    e.preventDefault();
    authStore.isError = false;
    authStore.errorText = '';
    if (this.password == this.confPassword) {
      const user: User = { user_email: this.email, user_pass: this.password, errors: new Map() };
      UserValidator.validateUser(user);
      if (user.errors.size == 0)
        AuthService.register(this.email, this.password)
          .then(e => {
            this.register.emit(e);
          })
          .catch((e: gvmHttpErrorResponse) => {
            authStore.isError = true;
            authStore.errorText = e.message;
            this.register.emit(e);
          });
      else {
        console.log(user.errors);
        user.errors.forEach(val => (authStore.errorText += val.concat('\n')));
        authStore.isError = true;
      }
      this.email = '';
      this.password = '';
      this.confPassword = '';
      if (this.embedded == false) window.location.href = 'login';
    }
  }

  render = () => (
    <Host>
      <form class={{ 'Auth-Form': true, 'Auth-Horizontal': this.embedded }} onSubmit={e => this.registerHandler(e)}>
        <input
          type="email"
          class="Auth-Input InputText"
          value={this.email}
          onInput={e => (this.email = (e.target as HTMLInputElement).value)}
          placeholder="Email address"
          required
        ></input>
        <input
          type="password"
          class="Auth-Input InputText"
          value={this.password}
          onInput={e => (this.password = (e.target as HTMLInputElement).value)}
          placeholder="Password"
          required
        ></input>
        <input
          type="password"
          class="Auth-Input InputText"
          value={this.confPassword}
          onInput={e => (this.confPassword = (e.target as HTMLInputElement).value)}
          placeholder="Confirm Password"
          required
        ></input>
        <input type="submit" class="Auth-Input Button" value="Register"></input>
        <a
          class={{
            'Auth-Input': true,
            'Button': true,
            'Auth-Inverted': true,
            'Hidden':
              document.referrer == document.URL ||
              document.referrer == '' ||
              document.URL == 'http://localhost:3333/admin/panel',
          }}
          href={document.referrer}
        >
          Go back
        </a>
      </form>
    </Host>
  );
}

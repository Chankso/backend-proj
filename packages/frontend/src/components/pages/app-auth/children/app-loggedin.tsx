import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'app-loggedin',
  styleUrl: '../app-auth.css',
})
export class AppRegister {
  render = () => (
    <Host class="Auth-Host">
      <h2>Already logged in</h2>
    </Host>
  );
}

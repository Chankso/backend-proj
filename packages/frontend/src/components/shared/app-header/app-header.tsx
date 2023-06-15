import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.css',
})
export class AppHeader {
  render() {
    return (
      <Host class="Header">
        <a class="Header-Button Button-A" href="/">
          Home Page
        </a>
        <a class="Header-Button Text-1" href="/auth/login">
          Authentication
        </a>
        <a class="Header-Button Text-1" href="/admin/upload">
          Cloud Drive
        </a>
        <a class="Header-Button Button-B Text-1" href="/admin/panel">
          Admin Panel
        </a>
      </Host>
    );
  }
}

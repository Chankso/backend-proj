import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'app-home',
})
export class AppHome {
  render = () => (
    <Host>
      <app-section background>
        <app-hero />
      </app-section>
    </Host>
  );
}

import { Component, h, Host, State } from '@stencil/core';

@Component({
  tag: 'app-hero',
  styleUrl: 'app-hero.css',
})
export class AppFooter {
  @State() email: string;
  @State() submitResponse: string;
  @State() isErrorResponse: boolean;
  submit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <Host class="Hero">
        <h1 class="Hero-Header Heading-1">
          Welcome to our <i>Cloud Drive</i> Service
        </h1>
        <p class="Hero-Subheader Text-1">
          Within the code is a heavily detailed backend structure that is comprised of an authentication system and a
          drive adminstration system
        </p>
        <p class="Hero-Subheader Text-1">
          We created some basic frontend tools to help us navigate our system, such as an admin panel an a login page
          however we can only access both the admin panel and the drive after we log in.
        </p>
        <p class="Hero-Subheader Text-1">The server is built on NestJS, we use Knex to access the MySQL database</p>
        <p class="Hero-Subheader Text-1">
          We created an Authentication system that follows certain requirements such as domain names as well as minimal
          password requirements, we use @nestjs/passport to authenticate users and save sessions. We have not encrypted
          user data for debug purposes
        </p>
        <p class="Hero-Subheader Text-1">
          As well as the above stated Authentication system we also created a full-fledged file system, using the
          closure table data structure for nested filesystems, the &quot;cloud drive&quot; works as a genuine cloud
          drive, only file metadata is saved in the database to save space, the files themselves are saved in a folder
          in the project for demo purposes
        </p>
      </Host>
    );
  }
}

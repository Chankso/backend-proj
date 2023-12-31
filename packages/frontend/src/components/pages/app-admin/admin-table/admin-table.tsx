import { Component, h, Host, State } from '@stencil/core';
import { User } from '../../../../models/user.model';
import { AdminService } from '../../../../services/admin-service';
import { AuthService } from '../../../../services/auth-service';
import { UserValidator } from '../../../../utils/userValidation';

@Component({
  tag: 'admin-table',
  styleUrl: 'admin-table.css',
})
export class AdminTable {
  @State() editMode = false;

  @State() data: User[] = [];

  @State() addTemplate = false;

  private masterSelector: HTMLInputElement;
  private selection: HTMLInputElement[] = [];

  constructor() {
    AuthService.checkStatus()
      .then(() => {
        AdminService.fetchList(e => (this.data = e));
      })
      .catch(() => {
        window.location.href = '/auth/login';
      });
  }

  selectorStatus() {
    if (this.isAllSelected()) this.masterSelector.checked = true;
    else this.masterSelector.checked = false;
  }

  clearSelection() {
    this.selection.forEach(check => {
      check.checked = false;
    });
  }

  isAllSelected() {
    return this.selection.every(val => {
      return val.checked;
    });
  }
  masterToggle() {
    this.isAllSelected() ? this.clearSelection() : this.selection.forEach(val => (val.checked = true));
  }

  delete() {
    this.data = [
      ...this.data.filter((_, index) => {
        if (this.selection[index].checked) {
          this.selection[index].checked = false;
          return false;
        }
        return true;
      }),
    ];
    this.masterSelector.checked = false;
  }

  edit(user: User, property: string, ev) {
    const newField: string = ev.target.textContent.trim().split(' ')[0];

    if (user[property] !== newField) {
      const index = this.data.indexOf(user);
      this.data[index] = {
        ...user,
        [property]: newField,
        updated_at: new Date(),
      };
      UserValidator.validateUser(this.data[index]);
      this.data = [...this.data];
    }
    console.log(newField);
  }

  revert() {
    AdminService.fetchList(e => (this.data = e));
  }
  apply() {
    AdminService.commitList(this.data);
    AdminService.getList();
  }

  formatDate(date: Date) {
    return (
      date.getUTCHours() +
      ':' +
      date.getUTCMinutes() +
      ' - ' +
      date.getUTCDate() +
      '/' +
      (date.getUTCMonth() + 1) +
      '/' +
      date.getFullYear() +
      ' UTC'
    );
  }

  render = () => (
    <Host class="Table-Wrapper">
      <div class="Table-Actions">
        <button class="Table-Action Button" onClick={() => this.apply()}>
          Apply
        </button>
        <button class="Table-Action Button" onClick={() => this.revert()}>
          Revert
        </button>
        <button class="Table-Action Button" onClick={() => (this.addTemplate = !this.addTemplate)}>
          Add
        </button>

        <button class="Table-Action Button" onClick={() => this.delete()}>
          Remove
        </button>
        <button class="Table-Action Button" onClick={() => (this.editMode = !this.editMode)}>
          {this.editMode ? 'Finish' : 'Edit'}
        </button>
      </div>
      <div class={{ 'Table-Register': true, 'Folded': !this.addTemplate }}>
        <app-register
          embedded
          onRegister={() => {
            AdminService.fetchList(e => (this.data = e));
          }}
        ></app-register>
      </div>
      <table class="Table">
        <tr class="Table-Row">
          <th class="Table-Header">
            <input type="checkbox" ref={e => (this.masterSelector = e)} onChange={() => this.masterToggle()}></input>
          </th>
          <th class="Table-Header">
            <div class="Table-CellWrapper">Email</div>
          </th>
          <th class="Table-Header">
            <div class="Table-CellWrapper">Password</div>
          </th>
          <th class="Table-Header">
            <div class="Table-CellWrapper">Updated At</div>
          </th>
        </tr>
        {this.data.map((user, index) => (
          <tr class="Table-Row">
            <td class="Table-Cell">
              <input
                type="checkbox"
                ref={e => (this.selection[index] = e)}
                onChange={() => this.selectorStatus()}
              ></input>
            </td>
            <td class="Table-Cell" contentEditable={this.editMode} onBlur={e => this.edit(user, 'user_email', e)}>
              <div class="Table-CellWrapper">
                {user.user_email}{' '}
                {user.errors.has('user_email') ? (
                  <span class="Table-TooltipIcon" contentEditable={false}>
                    {' '}
                    !<span class="Table-Tooltip">{user.errors.get('user_email')}</span>
                  </span>
                ) : (
                  ''
                )}
              </div>
            </td>
            <td class="Table-Cell" contentEditable={this.editMode} onBlur={e => this.edit(user, 'user_pass', e)}>
              <div class="Table-CellWrapper">
                {user.user_pass}{' '}
                {user.errors.has('user_pass') ? (
                  <span class="Table-TooltipIcon" contentEditable={false}>
                    !<span class="Table-Tooltip">{user.errors.get('user_pass')}</span>
                  </span>
                ) : (
                  ' '
                )}
              </div>
            </td>
            <td class="Table-Cell">
              <div class="Table-CellWrapper">{this.formatDate(user.updated_at)}</div>
            </td>
          </tr>
        ))}
      </table>
    </Host>
  );
}

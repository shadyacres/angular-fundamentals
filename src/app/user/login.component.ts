import { Component } from '@angular/core';

@Component({
  template: `
<h1>Login</h1>
<hr>
<div class="col-md-4">
  <form autocomplete="off">
    <div class="form-group" >
      <label for="userName">User Name:</label>
      <input id="userName" type="text" class="form-control" placeholder="User Name..." />
    </div>
    <div class="form-group" >
      <label for="password">Password:</label>
      <input id="password" type="password" class="form-control"placeholder="Password..." />
    </div>

    <button type="submit" class="btn btn-primary">Login</button>
    <button type="button" class="btn btn-default">Cancel</button>
  </form>
</div>`
})
export class LoginComponent { }

// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'

import UsersLayout from 'src/layouts/UsersLayout'

import MainLayout from './layouts/MainLayout/MainLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={UsersLayout} private unauthenticated={'login'} roles={['admin']}>
        <Route path="/admin/profile" page={ProfilePage} name="profile" />
        <Route path="/admin/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
        <Route path="/admin/users/{id:Int}" page={UserUserPage} name="user" />
        <Route path="/admin/users" page={UserUsersPage} name="users" />
      </Set>
      <Set wrap={MainLayout} private unauthenticated={'login'}>
        <Route path="/profile" page={ProfilePage} name="profile" />
        <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
        <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
        <Route path="/users" page={UserUsersPage} name="users" />
      </Set>
      <Route path="/" page={LoginPage} name="login" />
      <Route path="/register" page={SignupPage} name="signup" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes

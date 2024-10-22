
# User Management Angular Application

## Overview

This project is a **User Management Application** built with **Angular**, utilizing **NgRx** for state management and **Material Design** for UI components. It allows you to **create**, **filter**, **edit**, and **delete** user records stored in a local database.

### Key Features:
- **Create User Records**: Add new users to the database with fields such as First Name, Last Name, Email, Birth Date, Role, and Status.
- **Filter User Records**: Filter the list of users by Name, Email, or Role.
- **Edit User Records**: Modify existing user information.
- **Delete User Records**: Remove user records from the database.
- **Pagination**: Handle pagination for a large number of user records.

## Technologies Used
- **Angular** (Frontend framework)
- **NgRx** (State management)
- **Material Design** (UI components)
- **JSON Server** (Simulated backend)
- **Jasmine** & **Karma** (Testing framework)
- **Sass** (Styling)

---

## Functionality Breakdown

### Creating User Records

1. To create a new user, click the **"Add new record"** button in the header.
2. A dialog form will appear where you can input user details like:
   - First Name
   - Last Name
   - Email
   - Birth Date
   - Role (Admin, Moderator, or User)
   - Status (Active, Inactive, Suspended)
3. On submitting the form, the new user is added to the database and reflected in the table below.

### Filtering User Records

1. The **search field** in the header allows filtering users by:
   - Name
   - Email
   - Role
2. As you type, the displayed user records will automatically be filtered based on the input.

### Editing User Records

1. Click on the **edit icon** next to the user you want to update.
2. A dialog will open, pre-filled with the user's current data.
3. Modify any of the fields and click **Save** to update the record.
4. The record will be updated in the database and reflected in the UI.

### Deleting User Records

1. To delete a user, click on the **trash icon** next to the user record.
2. The user will be removed from the database and no longer displayed in the UI.

---

## State Management with NgRx

NgRx is used in the project to manage the application state efficiently. Here's how it's utilized:

- **Users Module**:
   - **Actions**: Define the actions such as `loadUsers`, `addUser`, `updateUser`, and `deleteUser`.
   - **Selectors**: Used to retrieve slices of the state, such as all users, cached status, or loading state.
   - **Reducer**: Manages how the state changes in response to actions (e.g., adding or removing users).
   - **Effects**: Handle asynchronous operations such as API requests to the backend when loading or updating users.

### Why NgRx?
NgRx helps maintain a predictable application state and allows for easy tracking of actions and state changes. By keeping the state in a single store, the app becomes more scalable and easier to manage, especially with complex data flows.

---

## Project Setup & Running

### Prerequisites:
- **Node.js** (v12+)
- **Angular CLI**
- **JSON Server** for local database simulation

### Steps to Run the Project:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/belka09/userlane-candidate-task-angular
   cd user-management-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the backend server** (JSON server) and frontend simultaneously:
   ```bash
   npm start
   ```

   This command will:
   - Start the **JSON server** at `http://localhost:3000`.
   - Serve the Angular app at `http://localhost:4200`.

4. **Access the application** by navigating to `http://localhost:4200` in your browser.

---

## Running Tests

### Test Coverage:
- **Test Coverage**: ~70%
- **Testing Frameworks**: Jasmine & Karma
- **Exclusions**: Tests are focused on the application's main functionality (CRUD operations, filtering, state management). The integration with **Material Design components** (such as dialogs) is excluded from testing due to complexity and third-party interactions.

### Run Tests:
To run the unit tests:
```bash
npm test
```

The test suite will cover:
- User creation
- User editing
- User deletion
- NgRx state management
- Filtering functionality

The Material Design components' functionality (such as opening dialogs or interacting with the UI library) is **not** covered in the tests.

---

## Conclusion

This project provides a solid example of how to build a user management system using **Angular** and **NgRx**. The state management ensures predictable behavior, and the application is set up for easy maintenance and scalability. Testing focuses on core features with reasonable coverage, excluding third-party libraries like Angular Material.

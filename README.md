# Employee CRUD Application

A complete Angular application for managing employees with full CRUD (Create, Read, Update, Delete) functionality. Built with Angular, Bootstrap, Font Awesome, and a mock JSON backend.

## Features

- ✅ **Employee List** - View all employees with search and sorting capabilities
- ✅ **Add Employee** - Create new employee records
- ✅ **Edit Employee** - Update existing employee information
- ✅ **View Details** - View complete employee details
- ✅ **Delete Employee** - Remove employee records
- ✅ **Search & Filter** - Search employees by name, email, or department
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile devices
- ✅ **Form Validation** - Client-side validation for all forms
- ✅ **Mock Backend** - JSON Server for local development

## Project Structure

```
angular-employee-crud/
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   └── employee.model.ts          # Employee interface
│   │   ├── services/
│   │   │   └── employee.service.ts        # Employee API service
│   │   ├── components/
│   │   │   ├── employee-list/             # List component
│   │   │   ├── employee-form/             # Add/Edit form component
│   │   │   └── employee-detail/           # Detail view component
│   │   ├── app.component.ts               # Main app component
│   │   ├── app.component.html             # Main template
│   │   ├── app.component.scss             # Main styles
│   │   ├── app.routes.ts                  # Routing configuration
│   │   └── app.module.ts                  # App module
│   ├── main.ts                            # Application entry point
│   ├── styles.scss                        # Global styles
│   └── index.html                         # HTML template
├── db.json                                # Mock database
├── angular.json                           # Angular configuration
├── tsconfig.json                          # TypeScript configuration
├── package.json                           # Dependencies
└── README.md                              # This file
```

## Technology Stack

- **Frontend Framework**: Angular 17
- **Styling**: SCSS, Bootstrap 5
- **Icons**: Font Awesome 6
- **HTTP Client**: Angular HttpClient
- **Forms**: Angular Reactive Forms
- **Routing**: Angular Router
- **State Management**: RxJS
- **Backend**: JSON Server (mock)
- **Build Tool**: Angular CLI

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Setup Steps

1. **Navigate to the project directory**:
   ```bash
   cd angular-employee-crud
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install additional dev dependencies** (if needed):
   ```bash
   npm install --save-dev concurrently
   ```

## Running the Application

### Option 1: Run Both Frontend and Backend Concurrently

```bash
npm run dev
```

This command will:
- Start the Angular development server on `http://localhost:4200`
- Start the JSON Server on `http://localhost:3000`

### Option 2: Run Separately

**Terminal 1 - Start Angular Dev Server**:
```bash
npm start
```

**Terminal 2 - Start JSON Server**:
```bash
npm run server
```

## Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start Angular dev server |
| `npm run build` | Build for production |
| `npm run watch` | Build with watch mode |
| `npm run test` | Run unit tests |
| `npm run server` | Start JSON Server |
| `npm run dev` | Start both frontend and backend |

## API Endpoints

The application uses JSON Server which provides the following endpoints:

- `GET /employees` - Get all employees
- `GET /employees/:id` - Get employee by ID
- `POST /employees` - Create new employee
- `PUT /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee
- `GET /employees?q=search` - Search employees

## Application Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | - | Redirects to `/employees` |
| `/employees` | EmployeeListComponent | Employee list page |
| `/add` | EmployeeFormComponent | Add new employee |
| `/edit/:id` | EmployeeFormComponent | Edit employee |
| `/detail/:id` | EmployeeDetailComponent | View employee details |

## Features in Detail

### Employee List
- Display all employees in a responsive table
- Search employees by name, email, or department
- Sort employees by various fields
- View, edit, or delete employees
- Add status badge (Active/Inactive)

### Add/Edit Employee Form
- Form validation with error messages
- Required fields: First Name, Last Name, Email, Phone, Department, Position, Salary, Hire Date
- Department dropdown with predefined options
- Active status toggle
- Submit and cancel buttons

### Employee Detail View
- Display complete employee information
- Contact information section
- Employment information section
- Edit and delete buttons
- Back to list button

## Styling

The application uses:
- **Bootstrap 5** for responsive layout and components
- **Font Awesome 6** for icons
- **SCSS** for custom styling
- **Global styles** in `src/styles.scss`
- **Component-specific styles** in component SCSS files

## Form Validation

The application includes comprehensive form validation:
- Required field validation
- Email format validation
- Phone number format validation
- Minimum length validation
- Number range validation
- Real-time error messages

## Mock Database

The `db.json` file contains sample employee data with 8 employees. You can:
- Add more employees to the array
- Modify existing data
- Delete employees (they will be removed from the JSON file)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Responsive Design

The application is fully responsive and works on:
- Desktop (1920px and above)
- Tablet (768px to 1919px)
- Mobile (below 768px)

## Future Enhancements

- Add authentication and authorization
- Implement pagination
- Add employee photo upload
- Add advanced filtering options
- Add employee export to CSV/PDF
- Add employee performance tracking
- Add department management
- Add salary history tracking

## Troubleshooting

### Port Already in Use

If port 4200 or 3000 is already in use:

**For Angular (port 4200)**:
```bash
ng serve --port 4300
```

**For JSON Server (port 3000)**:
```bash
json-server --watch db.json --port 3001
```

### CORS Issues

If you encounter CORS issues, ensure:
1. JSON Server is running on `http://localhost:3000`
2. The API URL in `employee.service.ts` matches the server URL

### Module Not Found Errors

Run `npm install` again to ensure all dependencies are properly installed.

## License

This project is open source and available under the MIT License.

## Author

Created as a demonstration of Angular CRUD application development.

## Support

For issues or questions, please refer to:
- [Angular Documentation](https://angular.io/docs)
- [Bootstrap Documentation](https://getbootstrap.com/docs)
- [Font Awesome Documentation](https://fontawesome.com/docs)
- [JSON Server Documentation](https://github.com/typicode/json-server)

---

**Happy Coding!** 🚀
# testAngular005

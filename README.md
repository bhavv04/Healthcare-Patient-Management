# Healthcare Patient Management System

A full-stack web application for managing patient records, built with React and Supabase for database management.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/downloads)
- **Supabase Account** - [Sign up here](https://supabase.com/)

## Environment Setup

Create a `.env` file in the client directory with your Supabase credentials:
```
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```


## Project Structure

```
Healthcare-Patient-Management/
└── client/                 # React frontend
    ├── src/
    │   ├── components/
    │   ├── styles/
    │   ├── App.js
    │   ├── Dashboard.js
    │   ├── PatientDashboard.js
    │   ├── Login.js
    │   ├── databaseHelpers.js
    │   └── supabaseClient.js
    ├── public/
    └── package.json
```

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/bhavv04/Healthcare-Patient-Management
cd Healthcare-Patient-Management
```

### 2. Frontend Setup (React)

Navigate to the client directory:

```bash
cd client
```

Install Node.js dependencies:

```bash
npm install
```

## Running the Application

Start the React development server:

```bash
cd client
npm start
```

The React app will automatically open in your browser at `http://localhost:3000`

## Usage

### Administrator Portal
1. Open your browser to `http://localhost:3000`
2. Select "Administrator" portal
3. Login with your Supabase admin credentials
4. Manage patients, monitor vital signs, and configure alarm thresholds

### Patient Portal
1. Select "Patient" portal on the login page
2. Enter your username (provided by administrator)
3. View your health information, vital signs, and alerts

## Troubleshooting

### React won't start
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again
- Ensure Node.js version is 14 or higher

### Supabase connection errors
- Verify your `.env` file contains correct Supabase credentials
- Check that your Supabase project is active
- Ensure Row Level Security (RLS) policies are configured correctly

### Login issues
- For administrators: Use your Supabase authentication credentials
- For patients: Use the username provided by your healthcare administrator
- Check browser console for specific error messages

## Database

The application uses Supabase (PostgreSQL) for data storage. All patient records, vital signs, and alarm history are stored securely in the cloud.

### Database Tables

- **patients** - Patient information and demographics
- **vital_signs** - Historical vital sign readings
- **alarm_history** - Patient health alerts and notifications
- **thresholds** - Customizable vital sign thresholds per patient

## Features

- **Dual Portal System**: Separate interfaces for administrators and patients
- **Real-time Patient Monitoring**: Track heart rate, temperature, blood oxygen, and blood pressure
- **Alarm System**: Configurable thresholds with automatic alerts
- **Patient Management**: Full CRUD operations for patient records
- **Vital Signs History**: View historical health data
- **Auto-generated Usernames**: Unique usernames created for each patient
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- **Frontend:** React 19, React Router DOM v7
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Styling:** Custom CSS with dark theme
- **Icons:** Lucide React

## License

This project is licensed under the MIT License.



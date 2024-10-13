# Calendar Adviser

## Description

Calendar Adviser is an application that allows you to manage events and send reminders by email. It is divided into two parts: a frontend developed with React and TypeScript, and a backend that uses FastAPI.

## Project Structure

- **/frontend**: Contains the frontend application built with React and TypeScript.
- **main.py**: Contains the backend code developed with FastAPI.

## Instructions for Use

### Part 1: Frontend

1. Navigate to the `/frontend` folder:

cd frontend
npm start

### Part 2: Backend

1. Navigate to the root folder of the project from another terminal and run the server at the same time:

uvicorn main:app --reload

### Additional Notes

1. A virtual environment has been created to deploy the entire backend.
2. An .env file has been included, which can be found in .gitignore. This file must contain your Google email and password for sending emails. For security reasons, this file cannot be uploaded. Create your own .env file and add the following credentials: SENDER_EMAIL="youraccount@gmail.com" and SENDER_PASSWORD="your_password"
3. Since Google has two-step authentication enabled, it is recommended to generate an app password to avoid verification issues. You can find more information at the following link: Generate app passwords. The generated password must be your SENDER_PASSWORD.

### Contributions

Contributions are welcome. If you would like to contribute, please open an issue or send a pull request. Thank you very much!
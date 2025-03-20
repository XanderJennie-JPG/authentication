# Authentication Hell

This project is inspired by [Juxtopposed's YouTube video "I designed the goofiest UI Ideas"](https://www.youtube.com/watch?v=0N87f5wfxr0), where various intentionally frustrating UI/UX designs are showcased. This implementation focuses on creating an "authentication hell" - a multi-step authentication process designed to be both amusing and slightly annoying.

## Privacy Notice

**Important**: No data input into this web application is stored anywhere in the cloud. All user information is temporarily stored in your browser's session storage and is automatically cleared when you close your tab.

## Features

- Multi-step signup process:
  - Username and password
  - 6-digit PIN
  - Email verification (just the email address, I can't afford to send authentication codes to your email)
  - Security question selection and answer

- Multi-step login process that requires verification of all previously entered information:
  - Username and password
  - PIN verification
  - Email verification (again, just the email address)
  - Security question verification

## Tech Stack

- React Native / Expo
- Expo Router for navigation
- React Native's built-in components
- Browser's sessionStorage for temporary data storage

## Running the Project

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Open the web version by pressing `w` in the terminal or navigating to the URL shown in the console

## Project Structure

- `app/(tabs)/index.tsx` - Home screen with signup and login options
- `app/signup.tsx` - Initial signup page for username/password
- `app/signup-pin.tsx` - PIN creation page
- `app/signup-email.tsx` - Email input page
- `app/signup-security.tsx` - Security question selection page
- `app/signup-success.tsx` - Signup completion page
- `app/login.tsx` - Initial login page for username/password
- `app/login-pin.tsx` - PIN verification page
- `app/login-email.tsx` - Email verification page
- `app/login-security.tsx` - Security question verification page
- `app/login-success.tsx` - Login success page

## Inspiration

This project is meant to be a fun exploration of intentionally cumbersome authentication processes. It demonstrates how multiple layers of security can quickly become an exercise in user patience. While real authentication systems aim to balance security with usability, this project leans heavily into the security side for comedic effect.

## License

MIT

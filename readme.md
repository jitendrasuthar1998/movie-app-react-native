# Movie App - React Native Assessment

## App is built by Jitendra Suthar.

## Email - jitendrasuthar995@gmail.com

### Information

**Note**: If you're in India and using a Jio Network connection, please use a VPN while using this application on mobile or in a simulator. Jio has restricted access to TMDB APIs, so without a VPN, the app may not function correctly on Jio's network.

Welcome to the **Movie App**! This mobile application allows users to explore movies, manage favorites, and personalize their experience. Built using React Native and Expo, this app is designed for both Android and iOS devices.

## Video Demo

You can watch a demo of the Movie App below:

<iframe src="https://drive.google.com/file/d/1-0LyReLNoeo5QOvB7wROK9sVBAKL9lZf/preview" width="640" height="480"></iframe>

## Features

- **User Authentication**:
  - Users can log in or sign up to access the app.
- **Home Screen**:

  - After logging in, users will see a list of popular, upcoming, top-rated, and now-playing movies.
  - Each movie card provides quick access to movie details.

- **Movie Details**:

  - Clicking on a movie card takes you to a detailed view of the movie, including:
    - Movie poster
    - Title
    - Release date
    - Rating
    - Overview
    - Genre details

- **Favorites**:

  - Users can add movies to their favorites by clicking the heart icon on each movie card.
  - A dedicated favorites screen displays all the user's favorite movies.

- **Search**:

  - The search tab allows users to find movies based on their titles.

- **Settings**:

  - Users can view their email and username.
  - A logout button allows users to exit the app.
  - An appearance switch enables users to toggle between light and dark themes.

- **Skeleton UI**:
  - The app shows a loading animation (skeleton UI) while fetching data for movies, providing a smooth user experience.

## Technologies Used

This app is built with several technologies that work together to create a seamless experience:

- **React Native**: A framework for building mobile applications using JavaScript.
- **Expo**: A platform that simplifies the development of React Native apps, allowing for easy deployment and testing.
- **React Navigation**: A library for managing navigation between different screens in the app.
- **Redux Toolkit**: A library for managing the app's state, making it easier to handle user data and movie information.
- **Axios**: A library for making HTTP requests to fetch movie data from APIs.
- **React Native Paper**: A library for implementing Material Design components in the app.
- **Async Storage**: A simple key-value storage system for persisting user data, like authentication tokens.

## Getting Started

To run the Movie App on your local machine, follow these steps:

1. **Clone the Repository**:
   Open your terminal and run the following command to clone the repository:

   ```bash
   git clone https://github.com/yourusername/movie-app-react-native-assignment.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd movie-app-react-native-assignment
   ```

3. **Install Dependencies**:
   Run the following command to install all necessary libraries:

   ```bash
   npm install
   ```

4. **Start the App**:
   Use the command below to launch the app in your default web browser:

   ```bash
   npm start
   ```

5. **Open on Your Device**:

   - For Android, use the Expo Go app to scan the QR code displayed in the terminal or browser.
   - For iOS, use the Camera app to scan the QR code or open the Expo Go app.

6. **Command to build the apk from expo in local**:
   Use the command below to create the apk file for Android device from your device only:

   ```bash
   eas build --platform android --local
   ```

## Conclusion

The Movie App is a user-friendly platform for movie lovers to explore and manage their favorite films. Whether you're looking for the latest releases or classic favorites, this app provides an engaging experience.

If you have any questions or feedback, feel free to reach out!

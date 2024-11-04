# Movie App - React Native Assessment

Welcome to the **Movie App**! This mobile application allows users to explore movies, manage favorites, and personalize their experience. Built using React Native and Expo, this app is designed for both Android and iOS devices.

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

## Conclusion

The Movie App is a user-friendly platform for movie lovers to explore and manage their favorite films. Whether you're looking for the latest releases or classic favorites, this app provides an engaging experience.

If you have any questions or feedback, feel free to reach out!

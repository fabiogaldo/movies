# Movie Browser Application

This project is a web application that allows users to browse a list of movies, filter them by genre and see featured movies. It uses React, TypeScript, Material UI, and `tanstack-query` for data fetching and state management.

## Prerequisites

Before running this project, you need to have the following installed:

- **Node.js (v16 or higher):** [https://nodejs.org/](https://nodejs.org/)
- **npm (comes with Node.js):** [https://www.npmjs.com/](https://www.npmjs.com/) or **Yarn:** [https://yarnpkg.com/](https://yarnpkg.com/)
- A running API.

## Project Setup

1.  **Clone the Repository:**

    ```bash
    git clone <repository_url>
    cd <project_directory>
    ```

2.  **Install Dependencies:**

    Using npm:

    ```bash
    npm install
    ```

    Or using Yarn:

    ```bash
    yarn install
    ```

3.  **Environment Variables:**

    Create a `.env` file in the root of your project directory. Add the following environment variables to the file:

    ```
    REACT_APP_API_ACCESS_TOKEN=<your_api_access_token>
    REACT_APP_API_URL=http://localhost:8000
    REACT_APP_API_POSTER_URL=http://localhost:8000/posters/
    REACT_APP_API_BACKDROP_URL=http://localhost:8000/backdrops/
    ```

    - **`REACT_APP_API_ACCESS_TOKEN`:** Your API access token.
    - **`REACT_APP_API_URL`:** The base URL of your API server (e.g., `http://localhost:8000`).
    - **`REACT_APP_API_POSTER_URL`:** The URL where the api will be serving the posters.
    - **`REACT_APP_API_BACKDROP_URL`**: The url where the api will be serving the backdrop.
    - Replace `<your_api_access_token>` and `http://localhost:8000` with your actual API token and URL.

4.  **Running the API (Backend):**

    This project requires a backend API to be running. The provided code assumes an API with the following endpoints:

    - **`GET /movies`:** Returns a list of movies.
    - **`GET /genres`:** Returns a list of genres.
    - **`GET /posters/:posterName`**: Serves the poster image.
    - **`GET /backdrops/:backdropName`**: Serves the backdrop image.

    Ensure that your API is running and accessible at the URL specified in your `.env` file (`REACT_APP_API_URL`).

    **Note**: The `REACT_APP_API_URL`, `REACT_APP_API_POSTER_URL` and `REACT_APP_API_BACKDROP_URL` has to be changed according to your api.

5.  **Running the App (Frontend):**

    To start the development server, use:

    Using npm:

    ```bash
    npm start
    ```

    Or using Yarn:

    ```bash
    yarn start
    ```

    This will start the development server, and the app should be accessible at `http://localhost:3000` in your browser.

## Key Features

- **Browse Movies:** Displays a list of movies fetched from the API.
- **Filter by Genre:** Allows users to filter movies by selecting a genre from a dropdown.
- **Search by Title:** Users can search for movies by title using a search bar.
- **Featured Movies:** Highlights featured movies.
- **Responsive Design:** The application is designed to work well on various screen sizes.
- **Modal**: When a movie is clicked, a modal will open with the details of the movie.

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **TypeScript:** A superset of JavaScript that adds static typing.
- **Material UI:** A popular React UI framework that provides pre-built components.
- **`tanstack-query`:** A library for fetching, caching, synchronizing, and updating server state in React applications.
- **axios:** A promise-based HTTP client for the browser and Node.js.
- **npm/yarn:** package managers.

## API Endpoints

The frontend makes requests to the following endpoints:

- **`GET /movies`:** Retrieves the list of movies. Expected fields:
  - `id` (number): Movie ID.
  - `title` (string): Movie title.
  - `featured` (boolean): Indicates if the movie is featured.
  - `genre_ids` (number[]): Array of genre IDs.
  - `poster_path` (string): The path of the movie poster in the API.
  - `backdrop_path` (string): The path of the movie backdrop in the API.
  - `backdrop_color` (string): the dominant color of the movie.
  - `overview` (string): The overview of the movie.
  - `release_date` (string): the release date of the movie.
- **`GET /genres`:** Retrieves the list of genres. Expected fields:
  - `genre_id` (number): Genre ID.
  - `genre_name` (string): Genre name.
- **`GET /posters/:posterName`**: Retrieves a poster image.
- **`GET /backdrops/:backdropName`**: Retrieves a backdrop image.

## Additional Notes

- Make sure that you are running the api.
- The code has comments explaining the implemented logic.

## Contributing

If you want to contribute to this project, feel free to open a pull request with your changes.

## License

[License](LICENSE)

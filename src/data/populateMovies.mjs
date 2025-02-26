/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import fs from "fs";
import path from "path";

// Caminho para o arquivo popular.json
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const filePath = path.join(__dirname, "movies.json");

// Ler o arquivo popular.json
const popularMovies = JSON.parse(fs.readFileSync(filePath, "utf-8"));

// Token Bearer
const token = process.env.REACT_APP_API_ACCESS_TOKEN;
// Função para fazer o POST para o endpoint
const postMovies = async () => {
  for (const movie of popularMovies) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/movies`,
        { data: movie },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(`Movie ${movie.title} posted successfully:`, response.data);
    } catch (error) {
      console.error(
        `Error posting movie ${movie.title}:`,
        error.response?.data || error.message
      );
    }
  }
};

// Chamar a função para fazer o POST
postMovies();

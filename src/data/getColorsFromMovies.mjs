/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import fs from "fs";
import path from "path";

// Caminho para o arquivo popular.json
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const filePath = path.join(__dirname, "popular.json");

// Ler o arquivo popular.json
const popularMovies = JSON.parse(fs.readFileSync(filePath, "utf-8"));

// Token Bearer
const token =
  "bc65fdf334d58fe301c1e13203d1016901067ae9d9a6f9b754e4a5421779489fa04d882a4cf851f2ccb89f8bfe32a52244be3dfbddf0cee6ad1bb2ce68ab4bc76257b21f1c02a1ff3229522538181f12c91bc71e241c9b24638f392a33f8686fa65cc7f50192d56e73cb751fd9c078bef4683bae6a3428b78d2a2e3c18731094";

// Função para fazer o POST para o endpoint
const postMovies = async () => {
  for (const movie of popularMovies) {
    try {
      const response = await axios.post(
        "https://splendid-excellence-23a4c4c895.strapiapp.com/api/movies",
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

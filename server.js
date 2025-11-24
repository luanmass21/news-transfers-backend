 

// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import pkg from 'pg';
// const { Client } = pkg;  

//  dotenv.config(); 
//  /* eslint-disable */
//  const client = new Client({
//    user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
//  });





// client.connect();

// const app = express();
// // const PORT = 5000;
// const PORT = process.env.PORT || 5000;


// app.use(cors()); // Permite requisições do frontend
// app.use(express.json()); // Permite o backend entender JSON no corpo da requisição

// // Endpoint para receber e-mails e salvar no banco de dados
// app.post('/enviar-email', async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ message: "Nenhum email fornecido." });
//   }

//   try {
//     // Verifica se o email já existe
//     const existing = await client.query(
//       'SELECT * FROM emails WHERE email = $1',
//       [email]
//     );

//     if (existing.rows.length > 0) {
//       return res.status(409).json({
//         message: "Este email já está cadastrado."
//       });
//     }

//     // Se não existir, salva
//     await client.query(
//       'INSERT INTO emails (email) VALUES ($1)',
//       [email]
//     );

//     return res.status(201).json({
//       message: "Email cadastrado com sucesso!"
//     });

//   } catch (error) {
//     console.error("Erro ao salvar email no banco", error);
//     return res.status(500).json({
//       message: "Erro no servidor."
//     });
//   }
// });

// // Endpoint para listar todos os e-mails armazenados
// app.get('/listar-emails', async (req, res) => {
//     try {
//         const result = await client.query('SELECT * FROM emails');
//         res.json(result.rows);
//     } catch (error) {
//         console.error("Erro ao buscar emails do banco", error);
//         res.status(500).json({ error: "Erro ao buscar emails do banco" });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
// });


import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  // eslint-disable-next-line no-undef
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

client.connect();

const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));

app.use(cors());
app.use(express.json());

app.post('/enviar-email', async (req, res) => {
  const { email } = req.body;

  try {
    const existing = await client.query('SELECT * FROM emails WHERE email = $1', [email]);

    if (existing.rows.length > 0) {
      return res.status(409).json({ message: "Este email já está cadastrado." });
    }

    await client.query('INSERT INTO emails (email) VALUES ($1)', [email]);

    res.status(201).json({ message: "Email cadastrado com sucesso!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

// app.listen(PORT, () => console.log("Rodando na porta " + PORT));

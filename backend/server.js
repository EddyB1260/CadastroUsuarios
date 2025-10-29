import express from 'express';
import { PrismaClient } from './generated/prisma/client.ts'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();

const prisma = new PrismaClient()
//  oyuMbLVr4kI0ixTR

const app = express();
app.use(express.json())
app.use(cors())
app.post('/usuarios', async (req, res) => {
    await prisma.user.create({
      data : {email: req.body.email,
              name: req.body.name,
              age: req.body.age
      }
    })

    res.status(201).json(req.body);
  })

app.get('/usuarios', async (req, res) => {
let users = []
if (req.query){
  users = await prisma.user.findMany({
    where: {
      name: req.query.name,
      email: req.query.email,
      age: req.query.age
    }
  })
}
else
  {const users = await prisma.user.findMany()
  }

  res.status(200).json(users);
});

app.put('/usuarios/:id', async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id
    },
    data: {
      email: req.body.email,
      age: req.body.age,
      name: req.body.name
    },
  })
  console.log(req.params.id);
  console.log(res.statusCode);
  res.status(200).json(req.body)
})

app.delete('/usuarios/:id', async (req,res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id
    }
  })

  res.status(200).json({message: 'Usuário deletado com sucesso!'})
})

app.listen(3000);

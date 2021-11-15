import express, { Application, Request, Response } from 'express';

import { Prisma, PrismaClient } from '@prisma/client';

const app: Application = express();
const port = 3000;

// Prisma uses a 'lazy connection' which means that it doesn't establish a connection
// to the database server until the first request to the db needs to be served
const prisma = new PrismaClient();

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', async (req: Request, res: Response): Promise<Response> => {
  try {
    const allUsers = await prisma.user.findMany();
    return res.status(200).send(`<pre>${JSON.stringify(allUsers, null, 4)}</pre>`);
  } catch (e) {
    return res.status(500).send(`Failed. Reason: <pre>${e.message}</pre>`);
  }
});

app.get('/users', async (req: Request, res: Response): Promise<Response> => {
  try {
    await prisma.user.create({
      data: {
        name: 'Tim',
        email: 'timzhang3@gmail.com',
        posts: {
          create: {
            title: 'My First Post',
          },
        },
        profile: {
          create: {
            bio: 'I like turtles',
          },
        },
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        console.log('There is a unique constraint violation, a new user cannot be created with this email');
      }
    }
  }

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
  return res.status(200).send(`<pre>${JSON.stringify(allUsers, null, 4)}</pre>`);
});

// Starting the server
app.listen(port, (): void => {
  console.log(`Connected successfully on port ${port}`);
});

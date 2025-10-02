import express from "express";
import { prisma } from "./src/config/db.js";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome!" });
});

app.post("/api/user", async (req, res) => {
  const { name, email, bio } = req.body;

  const user = await prisma.user.create({
    data: {
      name,
      email,
      profile: {
        create: {
          bio,
        },
      },
    },
  });

  return res.json(user);
});

app.post("/api/post", async (req, res) => {
  const { title, content } = req.body;

  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId: 5,
    },
  });

  return res.json(post);
});

app.get("/api/post", async (req, res) => {
  const { skip, take } = req.query;


  const posts = await prisma.post.findMany({ skip: Number(skip), take: Number(take) });

  return res.json(posts);
});

app.listen(4600, () => {
  console.log(`Listening on port 4600`);
});

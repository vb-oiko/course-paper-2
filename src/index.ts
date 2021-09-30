import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(
  cors({
    allowedHeaders: ["X-Total-Count"],
    exposedHeaders: ["X-Total-Count"],
  })
);

app.get("/api/users", (req, res) => {
  res.setHeader("X-Total-Count", 1);
  res.json([
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
      address: {
        street: "Victor Plains",
        suite: "Suite 879",
        city: "Wisokyburgh",
        zipcode: "90566-7771",
        geo: {
          lat: "-43.9509",
          lng: "-34.4618",
        },
      },
      phone: "010-692-6593 x09125",
      website: "anastasia.net",
      company: {
        name: "Deckow-Crist",
        catchPhrase: "Proactive didactic contingency",
        bs: "synergize scalable supply-chains",
      },
    },
  ]);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

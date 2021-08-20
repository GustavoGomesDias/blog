import app from './app';

const port = 3001 || process.env.PORT;

app.listen(port, () => {
  console.log(`[server]: Server is running at ${port}`);
  console.log(`[server]: CTRL + click in http://localhost:${port}`);
});

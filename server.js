const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`\n✅ Server running on: ${url}\n`);
  console.log(`🔗 Click here to open: \x1b]8;;${url}\x1b\\${url}\x1b]8;;\x1b\\\n`);
});

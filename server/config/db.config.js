module.exports = {
  url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gdnes.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
};

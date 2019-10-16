module.exports = {
  dialect: 'postgres',
  url: process.env.DATABASE_URL,
  dialectOptions: {
    ssl: false,
  },
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

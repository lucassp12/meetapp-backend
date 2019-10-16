module.exports = {
  dialect: 'postgres',
  url: process.env.DATABASE_URL,
  dialectOptions: {
    ssl: 'verify-full',
  },
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

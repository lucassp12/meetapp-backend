export default schema =>
  async function middlewareValidation(req, res, next) {
    try {
      await schema.validate(req.body, { abortEarly: false });
      return next();
    } catch (err) {
      return res.status(422).json({ errors: err.errors });
    }
  };

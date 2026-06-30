export const loginValidator = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Email and password are required fields.",
    });
  }

  next();
};

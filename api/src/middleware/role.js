export const requireRole = (role) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (req.user.role !== role) {
        return res
          .status(403)
          .json({ message: "Forbidden - insufficient permissions" });
      }
      next();
    } catch {
      return res.status(500).json({ message: "Server error" });
    }
  };
};

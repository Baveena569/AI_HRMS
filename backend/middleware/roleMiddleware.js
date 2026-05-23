const roleMiddleware = (roles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied: insufficient permissions" });
      }

      next();

    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
};

module.exports = roleMiddleware;
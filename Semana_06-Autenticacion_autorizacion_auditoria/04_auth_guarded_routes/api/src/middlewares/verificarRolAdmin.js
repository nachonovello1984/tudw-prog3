const verificarRolAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.rol === "admin") {
    return next();
  }
  return res.status(403).json({ mensaje: "Acceso denegado. Se requiere rol de administrador." });
};

export default verificarRolAdmin;

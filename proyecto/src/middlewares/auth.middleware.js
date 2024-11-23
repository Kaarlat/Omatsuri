export const isAdmin = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'No autorizado' });
    }
    if (req.session.user.role !== 'admin') {
        return res.status(403).json({ message: 'No tienes permisos de administrador' });
    }
    next();
};

export const isUser = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'No autorizado' });
    }
    next();
};

export const checkSession = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/sessions/login');
    }
    next();
};

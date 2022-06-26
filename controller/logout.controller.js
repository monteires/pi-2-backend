const blacklist = [];

exports.logout = (req, res) => {
    blacklist.push(req.headers['x-access-token']);
    res.json({ auth: false, token: null });
};
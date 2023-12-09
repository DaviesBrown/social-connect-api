const getStatus = (req, res) => {
    res.status(200).json({ status: 'Server is running' });
};

module.exports = { getStatus };

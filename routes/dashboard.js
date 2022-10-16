const User = require('../models/User');

const router = require('express').Router()

router.get('/', (req,res) => {

    

    res.status(200).json(req.session.userData);
});

module.exports = router;
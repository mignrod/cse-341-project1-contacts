const router = require('express').Router();

// router.get('/', (req, res) => { res.send('Hello World'); });

router.use('/Contacts', require('./contacts'));

module.exports = router;
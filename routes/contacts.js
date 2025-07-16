const express = require('express');

const router = express.Router();

const contactsController = require('../controllers/contacts');
const validator = require('../middleware/validate');

router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getSingle);

router.post('/', validator.saveContact, contactsController.createContact);

router.put('/:id', validator.saveContact, contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;

const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  // #swagger.tags=['Contacts']
  const result = await mongodb
    .getDatabase()
    .db()
    .collection('Contacts')
    .find()
    .toArray((err, contacts) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(contacts);
    });
};

const getSingle = async (req, res) => {
  // #swagger.tags=['Contacts']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Must be a valid contact ID' });
  }
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection('Contacts')
    .find({ _id: contactId })
    .toArray((err, contacts) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(contacts[0]);
    });
};

const createContact = async (req, res) => {
  // #swagger.tags=['Contacts']
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    Birthday: req.body.Birthday
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('Contacts')
    .insertOne(contact);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || 'Some error ocurred while updating the contact.');
  }
};

const updateContact = async (req, res) => {
  // #swagger.tags=['Contacts']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Must be a valid contact ID' });
  }
  const contactId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    Birthday: req.body.Birthday
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('Contacts')
    .replaceOne({ _id: contactId }, contact);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || 'Some error ocurred while updating the contact.');
  }
};
const deleteContact = async (req, res) => {
  // #swagger.tags=['Contacts']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Must be a valid contact ID' });
  }
  const contactId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('Contacts')
    .deleteOne({ _id: contactId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || 'Some error ocurred while deleting the contact.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};

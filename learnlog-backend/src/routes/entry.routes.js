const express = require('express');
const {createEntry, getAllEntries, updateEntry, deleteEntry} = require('../controller/entry.controller')
const isLoggedIn = require('../middlewares/auth.middleware');
const validateEntry = require('../middlewares/entryValidation');

const router = express.Router();

router.post('/add', isLoggedIn , validateEntry ,createEntry)
router.get('/showall', isLoggedIn, getAllEntries)
router.put('/edit/:id', isLoggedIn, updateEntry)
router.delete('/delete/:id', isLoggedIn, deleteEntry)

module.exports = router
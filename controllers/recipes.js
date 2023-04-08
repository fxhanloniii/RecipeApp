const express = require('express')
const router = express.Router()
const { Recipe } = require('../models')

router.get('/recipe', (req, res) => {
  res.render('/index.ejs', { Recipe })
})

router.get('/recipe/new', (req, res) => {
  res.render('/new.ejs')
})

module.exports = router

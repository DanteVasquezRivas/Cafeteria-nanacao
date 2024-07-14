const router = require('express').Router()
const CafesRouter = require('./cafes/cafesRouter')

router.use('/cafes', CafesRouter)

module.exports = router

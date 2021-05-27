const AppController = require('../controllers/applikasiController')

const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('Hello World from router!')
})

router.get('/aplikasi', AppController.getAll)
router.get('/aplikasi/:id', AppController.getOne)
router.post('/aplikasi', AppController.newApp)
router.put('/aplikasi/:id', AppController.editApp)
router.delete('/aplikasi/:id', AppController.deleteApp)

module.exports = router
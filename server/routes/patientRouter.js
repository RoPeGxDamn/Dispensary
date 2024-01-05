const Router = require('express')
const router  = new Router()
const patientManager = require('../routeManagers/patientManager')

router.get('/', patientManager.getAllPatients)
router.put('/:id', patientManager.editPatient)
router.delete('/:id', patientManager.deletePatient)
router.get('/:id', patientManager.getOnePatient)
router.get('/store/:id', patientManager.getPatientId)
router.post('/filter', patientManager.filterPatients)

module.exports = router
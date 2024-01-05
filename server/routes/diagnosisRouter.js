const Router = require('express')
const router  = new Router()
const diagnosisManager = require('../routeManagers/diagnosisManager')

router.post('/', diagnosisManager.createDiagnosis)
router.get('/', diagnosisManager.getAllDiagnoses)
router.delete('/:id', diagnosisManager.deleteDiagnosis)
router.put('/:id', diagnosisManager.editDiagnosis)
router.post('/filter', diagnosisManager.filterDiagnoses)
router.post('/filter/diagnoses', diagnosisManager.filterDiagnosesForAdmin)

module.exports = router
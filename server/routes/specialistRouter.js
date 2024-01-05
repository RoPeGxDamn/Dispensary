const Router = require('express')
const router  = new Router()
const specialistManager = require('../routeManagers/specialistManager')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', specialistManager.getAllSpecialists)
// router.put('/:id', specialistManager.editSpecialist)
router.delete('/:id', specialistManager.deleteSpecialist)
router.post('/filter', specialistManager.filterSpecialists)
router.get('/:id', specialistManager.getOneSpecialist)
router.get('/store/:id', specialistManager.getSpecialistId)
router.post('/filter/specialists', specialistManager.filterSpecialistsForAdmin)
router.put('/schedule', specialistManager.setSchedule)

module.exports = router
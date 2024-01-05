const Router = require('express')
const router  = new Router()
const visitManager = require('../routeManagers/visitManager')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', visitManager.getAllVisits)
router.delete('/:id', visitManager.deleteVisit)
router.get('/card/:id', visitManager.getVisitsForCard)
router.post('/', visitManager.createVisit)
router.put('/:id', visitManager.editVisit)
router.post('/date', visitManager.getVisitsByDate)

module.exports = router
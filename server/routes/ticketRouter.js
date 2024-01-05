const Router = require('express')
const router  = new Router()
const ticketManager = require('../routeManagers/ticketManager')

router.get('/', ticketManager.getAllTickets)
router.post('/', ticketManager.createTicket)
router.put('/:id', ticketManager.editTicket)
router.put('/history/:id', ticketManager.deleteTicket)
router.delete('/:id', ticketManager.cancelTicket)
router.get('/:id', ticketManager.getOneTicket)
router.get('/specialist/:id', ticketManager.getTicketsForSpecialist)
router.get('/patient/:id', ticketManager.getTicketsForPatient)
router.post('/filter', ticketManager.filterTickets)
router.post('/occupied', ticketManager.getOccupiedTickets)
router.post('/filter/:id', ticketManager.getActiveOrInactiveTickets)
router.post('/filter/schedule', ticketManager.filterSchedule)

module.exports = router
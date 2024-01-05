const Router = require('express')
const router  = new Router()
const announcementManager = require('../routeManagers/announcementManager')

router.post('/', announcementManager.createAnnouncement)
router.get('/', announcementManager.getAllAnnouncements)
router.post('/ads', announcementManager.getAnnouncementsForReader)
router.delete('/:id', announcementManager.deleteAnnouncement)
router.put('/:id', announcementManager.editAnnouncement)
router.post('/filter', announcementManager.filterAnnouncements)

module.exports = router
const Router = require('express')
const router  = new Router()
const feedbackManager = require('../routeManagers/feedbackManager')

router.post('/', feedbackManager.createFeedback)
router.get('/', feedbackManager.getAllFeedback)
router.delete('/:id', feedbackManager.deleteFeedback)
router.put('/:id', feedbackManager.editFeedback)
router.get('/specialist/:id', feedbackManager.getFeedbackOfSpecialist)

module.exports = router
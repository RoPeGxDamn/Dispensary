const Router = require('express')
const router  = new Router()
const userManager = require('../routeManagers/userManager')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/registration', userManager.registration)
router.post('/login', userManager.login)
router.get('/auth', authMiddleware, userManager.check)
router.get('/', userManager.getAllUsers)
router.delete('/:id', userManager.deleteUser)
router.put('/:id', userManager.editUser)
router.get('/:id', userManager.getOneUser)
router.put('/patient/edit', userManager.editPatientProfile)
router.put('/specialist/edit', userManager.editSpecialistProfile)

module.exports = router
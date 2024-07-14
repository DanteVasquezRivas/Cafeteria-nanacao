const {add_cafe_controller, getCafes, update_cafe_controller, delete_cafe_controller} = require('../../controllers/cafes/cafesControllers')
const {CafesValidatorCollection} = require('../../validators/cafes/cafesValidator')
const handleLogs = require('../../middlewares/logsMiddleware');
const handlelogin = require('../../middlewares/handleLogin')
const {authMiddleware} = require('../../middlewares/authMiddleware')
const router = require('express').Router();


router.post('/register', handleLogs, CafesValidatorCollection.addValidator, add_cafe_controller);
router.get('/', getCafes);
router.put('/actualizar/:id', update_cafe_controller);
router.delete('/borrar/:id', delete_cafe_controller);


module.exports = router;
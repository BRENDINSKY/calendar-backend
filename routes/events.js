/*
    Event Routes
    /api/events
*/
const {Router} = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const {getEventos, crearEvento, actualizaEvento, eliminarEvento } = require('../controllers/events');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {isDate} = require('../helpers/isDate');

const router = Router();
//Todos tienen que pasar por la validacion del JWT
router.use(validarJWT);

//Obtener eventos
router.get('/', getEventos);


//Crear nuevoe evento
router.post(
    '/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento);

//ActualizarEvento
router.put('/:id', actualizaEvento);

//BorrarEvento
router.delete('/:id', eliminarEvento);


module.exports = router
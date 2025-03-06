import express from 'express';
import {
    getCaketwa,
    getCaketwaById,
    createCaketwa,
    updateCaketwa,
    deleteCaketwa
} from '../controllers/CaketwaControllers.js';

const router = express.Router();

router.get('/caketwa', getCaketwa);
router.get('/caketwa/:id', getCaketwaById);
router.post('/caketwa', createCaketwa);
router.put('/caketwa/:id', updateCaketwa);
router.delete('/caketwa/:id', deleteCaketwa);

export default router;
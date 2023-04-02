import express from 'express'
import { createFish, getFishes, deleteFish, updateFish, filterFish, getFish } from '../controllers/index.js'

const router = express.Router()

router.get('/', getFishes)

router.post('/', createFish)

router.delete('/:id', deleteFish)

router.patch('/:id', updateFish)

router.get('/filter', filterFish)

router.get('/:id', getFish)

export default router
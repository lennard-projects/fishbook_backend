import Fishes from '../models/fishes.js'
import mongoose from 'mongoose'

export const createFish = async (req, res) => {
    const fish = req.body
    const newFish = new Fishes({...fish})  
    try {
       await newFish.save()
       res.status(201).json(newFish)
    } catch (error) {
       res.status(409).json({message: error.message})  
    }
}

export const getFishes = async (req, res) => {
    const { page } = req.query
    try {
        const LIMIT = 6
        const startIndex = (Number(page) - 1) * LIMIT
        const total = await Fishes.countDocuments()
        const fishes = await Fishes.find().sort({ _id: -1}).limit(LIMIT).skip(startIndex)
        res.status(201).json({ data: fishes, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT) })
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}


export const deleteFish = async (req, res) => {
        const { id } = req.params
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No fish with that id.')
        await Fishes.findByIdAndDelete(id)
        res.json({ message: 'Deleted successfully.'})
}

export const updateFish = async (req, res) => {
    const { id: _id } = req.params
    const fish = req.body
    if(!mongoose.Types.ObjectId.isValid(_id)) res.status(404).send('No fish with that id.')
    const updateFish = await Fishes.findByIdAndUpdate(_id, {...fish, _id}, { new: true})
    res.json(updateFish)
}

export const filterFish = async (req, res) => {
    const { filterQuery, page } = req.query
    try {
        const LIMIT = 6
        const startIndex = (Number(page) - 1) * LIMIT
        const total = await Fishes.countDocuments({ type: filterQuery})
        const fishes = await Fishes.find({ type: filterQuery }).sort({ _id: -1}).limit(LIMIT).skip(startIndex)
        res.status(201).json({ data: fishes, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT) })
       } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const getFish = async (req, res) => {
    const { id } = req.params
    try {
        const fish = await Fishes.findById(id)
        res.status(201).json(fish)
    } catch (error) {
        res.status(409).json({ message: error.message})
    }
}

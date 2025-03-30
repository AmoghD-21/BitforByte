const express = require('express');
const router = express.Router();
const Meal = require('../models/Meal');
const auth = require('../middleware/auth');

// Get all meals
router.get('/', async (req, res) => {
    try {
        const meals = await Meal.find({});
        res.json(meals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get meal by ID
router.get('/:id', async (req, res) => {
    try {
        const meal = await Meal.findById(req.params.id);
        if (!meal) {
            return res.status(404).json({ message: 'Meal not found' });
        }
        res.json(meal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new meal (admin only)
router.post('/', auth, async (req, res) => {
    try {
        const meal = new Meal(req.body);
        await meal.save();
        res.status(201).json(meal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update meal (admin only)
router.patch('/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description', 'calories', 'protein', 'carbs', 'fats', 
                           'ingredients', 'instructions', 'prepTime', 'cookTime', 'servings', 
                           'imageUrl', 'category', 'dietaryTags'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ message: 'Invalid updates!' });
    }

    try {
        const meal = await Meal.findById(req.params.id);
        if (!meal) {
            return res.status(404).json({ message: 'Meal not found' });
        }
        updates.forEach(update => meal[update] = req.body[update]);
        await meal.save();
        res.json(meal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete meal (admin only)
router.delete('/:id', auth, async (req, res) => {
    try {
        const meal = await Meal.findByIdAndDelete(req.params.id);
        if (!meal) {
            return res.status(404).json({ message: 'Meal not found' });
        }
        res.json({ message: 'Meal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get meals by category
router.get('/category/:category', async (req, res) => {
    try {
        const meals = await Meal.find({ category: req.params.category });
        res.json(meals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get meals by dietary tag
router.get('/dietary/:tag', async (req, res) => {
    try {
        const meals = await Meal.find({ dietaryTags: req.params.tag });
        res.json(meals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 
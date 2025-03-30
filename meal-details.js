// Get meal ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const mealId = parseInt(urlParams.get('id'));

// Extended meal data with additional details
const mealsData = {
    1: {
        title: 'Overnight Chia Pudding',
        description: 'Chia seeds soaked overnight in almond milk, creating a pudding-like consistency. Topped with fresh berries.',
        image: 'https://images.unsplash.com/photo-1542691457-cbe4df041eb2',
        calories: 220,
        protein: 12,
        carbs: 35,
        fat: 15,
        difficulty: 'Easy',
        time: 'Prep: 5 min',
        servings: 1,
        tags: ['Breakfast', 'Vegetarian', 'Pudding'],
        ingredients: [
            '1/4 cup chia seeds',
            '1 cup almond milk',
            '1 tbsp honey or maple syrup',
            '1/2 tsp vanilla extract',
            'Fresh berries for topping',
            'Sliced almonds for garnish',
            'Fresh mint leaves (optional)'
        ],
        instructions: [
            'In a bowl or jar, combine chia seeds, almond milk, sweetener, and vanilla extract.',
            'Stir well to ensure there are no clumps of chia seeds.',
            'Cover and refrigerate overnight or for at least 4 hours.',
            'Before serving, stir the pudding to break up any clumps.',
            'Top with fresh berries and sliced almonds.',
            'Garnish with mint leaves if desired.'
        ],
        nutritionDetails: {
            calories: 220,
            protein: 12,
            carbs: 35,
            fat: 15,
            fiber: 8,
            sugar: 12,
            sodium: 120,
            cholesterol: 0,
            vitamins: ['Vitamin B3', 'Vitamin E', 'Vitamin K', 'Vitamin D'],
            minerals: ['Calcium', 'Iron', 'Magnesium', 'Zinc']
        }
    },
    2: {
        title: 'Chicken Caesar Wrap',
        description: 'A portable version of the Caesar salad, with grilled chicken, romaine lettuce, and Caesar dressing.',
        image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980',
        calories: 450,
        protein: 28,
        carbs: 42,
        fat: 18,
        difficulty: 'Medium',
        time: 'Prep: 20 min',
        servings: 1,
        tags: ['Lunch', 'Wrap', 'High Protein'],
        ingredients: [
            '2 grilled chicken breasts, sliced',
            '2 large flour tortillas',
            '2 cups romaine lettuce, chopped',
            '1/4 cup Caesar dressing',
            '1/4 cup parmesan cheese, grated',
            '1 cup cherry tomatoes, halved',
            'Black pepper to taste'
        ],
        instructions: [
            'Grill the chicken breasts until fully cooked and slice them.',
            'Warm the tortillas slightly to make them more pliable.',
            'Layer each tortilla with romaine lettuce, sliced chicken, and tomatoes.',
            'Drizzle with Caesar dressing and sprinkle with parmesan cheese.',
            'Season with black pepper to taste.',
            'Roll up tightly, tucking in the sides as you go.',
            'Cut diagonally and serve immediately.'
        ],
        nutritionDetails: {
            calories: 450,
            protein: 28,
            carbs: 42,
            fat: 18,
            fiber: 4,
            sugar: 3,
            sodium: 680,
            cholesterol: 75,
            vitamins: ['Vitamin A', 'Vitamin C', 'Vitamin K', 'Vitamin B6'],
            minerals: ['Calcium', 'Iron', 'Potassium', 'Phosphorus']
        }
    },
    3: {
        title: 'Stuffed Bell Peppers with Quinoa',
        description: 'Bell peppers stuffed with a flavorful mixture of quinoa, black beans, and spices.',
        image: 'https://images.unsplash.com/photo-1601574465779-76d6dbb88557',
        calories: 350,
        protein: 15,
        carbs: 45,
        fat: 12,
        difficulty: 'Hard',
        time: 'Prep: 45 min',
        servings: 1,
        tags: ['Main dish', 'Vegetarian', 'High Protein'],
        ingredients: [
            '4 large bell peppers',
            '1 cup quinoa, cooked',
            '1 can black beans, drained and rinsed',
            '1 cup corn kernels',
            '1 onion, diced',
            '2 cloves garlic, minced',
            '1 cup salsa',
            '1 cup shredded cheese',
            'Olive oil, salt, and pepper to taste'
        ],
        instructions: [
            'Preheat oven to 375°F (190°C).',
            'Cut bell peppers in half lengthwise and remove seeds.',
            'Cook quinoa according to package instructions.',
            'Sauté onion and garlic until softened.',
            'Mix quinoa, beans, corn, onion, garlic, and salsa.',
            'Fill pepper halves with quinoa mixture.',
            'Top with shredded cheese.',
            'Bake for 30-35 minutes until peppers are tender.'
        ],
        nutritionDetails: {
            calories: 350,
            protein: 15,
            carbs: 45,
            fat: 12,
            fiber: 10,
            sugar: 8,
            sodium: 450,
            cholesterol: 10,
            vitamins: ['Vitamin A', 'Vitamin C', 'Vitamin B6', 'Folate'],
            minerals: ['Iron', 'Magnesium', 'Phosphorus', 'Zinc']
        }
    },
    4: {
        title: 'Spinach and Feta Omelette',
        description: 'A fluffy omelette filled with sautéed spinach and crumbled feta cheese.',
        image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71',
        calories: 320,
        protein: 22,
        carbs: 8,
        fat: 24,
        difficulty: 'Medium',
        time: 'Prep: 15 min',
        servings: 1,
        tags: ['Breakfast', 'Vegetarian', 'High Protein'],
        ingredients: [
            '3 large eggs',
            '2 cups fresh spinach',
            '1/4 cup feta cheese, crumbled',
            '1 tablespoon olive oil',
            '1 small onion, diced',
            'Salt and pepper to taste',
            'Fresh herbs (optional)'
        ],
        instructions: [
            'Whisk eggs with salt and pepper until well combined.',
            'Sauté onion until translucent.',
            'Add spinach and cook until wilted.',
            'Pour beaten eggs into a non-stick pan.',
            'When eggs begin to set, add spinach mixture and feta.',
            'Fold omelette in half.',
            'Cook until eggs are fully set.',
            'Garnish with fresh herbs if desired.'
        ],
        nutritionDetails: {
            calories: 320,
            protein: 22,
            carbs: 8,
            fat: 24,
            fiber: 3,
            sugar: 2,
            sodium: 380,
            cholesterol: 560,
            vitamins: ['Vitamin A', 'Vitamin K', 'Vitamin D', 'Vitamin B12'],
            minerals: ['Calcium', 'Iron', 'Potassium', 'Selenium']
        }
    },
    5: {
        title: 'Shrimp Stir-Fry with Broccoli',
        description: 'A quick and healthy stir-fry with succulent shrimp, colorful vegetables, and Asian-inspired sauce.',
        image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b',
        calories: 380,
        protein: 32,
        carbs: 28,
        fat: 16,
        difficulty: 'Medium',
        time: 'Prep: 25 min',
        servings: 1,
        tags: ['Main dish', 'Seafood', 'Low Carb'],
        ingredients: [
            '1 lb large shrimp, peeled and deveined',
            '2 cups broccoli florets',
            '1 red bell pepper, sliced',
            '2 cloves garlic, minced',
            '1 tbsp ginger, minced',
            '3 tbsp soy sauce',
            '1 tbsp sesame oil',
            '1 tbsp cornstarch',
            'Rice for serving'
        ],
        instructions: [
            'Mix soy sauce, sesame oil, and cornstarch for the sauce.',
            'Heat oil in a wok or large skillet over high heat.',
            'Cook shrimp until pink, about 2-3 minutes per side.',
            'Remove shrimp and set aside.',
            'Stir-fry garlic and ginger until fragrant.',
            'Add broccoli and bell pepper, cook until tender-crisp.',
            'Return shrimp to pan and add sauce.',
            'Cook until sauce thickens.',
            'Serve over rice.'
        ],
        nutritionDetails: {
            calories: 380,
            protein: 32,
            carbs: 28,
            fat: 16,
            fiber: 6,
            sugar: 4,
            sodium: 890,
            cholesterol: 240,
            vitamins: ['Vitamin A', 'Vitamin C', 'Vitamin B12', 'Vitamin E'],
            minerals: ['Iron', 'Zinc', 'Selenium', 'Copper']
        }
    },
    6: {
        title: 'Tomato Basil Soup',
        description: 'A rich, velvety soup made with fresh tomatoes and fresh basil, served with a side of crusty bread.',
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd',
        calories: 220,
        protein: 6,
        carbs: 32,
        fat: 10,
        difficulty: 'Easy',
        time: 'Prep: 30 min',
        servings: 2,
        tags: ['Soup', 'Vegetarian', 'Lunch'],
        ingredients: [
            '6 ripe tomatoes, chopped',
            '1 onion, diced',
            '4 cloves garlic, minced',
            '1 cup fresh basil leaves',
            '4 cups vegetable broth',
            '1/2 cup heavy cream',
            '2 tbsp olive oil',
            'Salt and pepper to taste',
            'Crusty bread for serving'
        ],
        instructions: [
            'Sauté onion and garlic in olive oil until softened.',
            'Add chopped tomatoes and cook for 5 minutes.',
            'Pour in vegetable broth and bring to a boil.',
            'Reduce heat and simmer for 20 minutes.',
            'Add basil leaves.',
            'Blend soup until smooth.',
            'Stir in heavy cream.',
            'Season with salt and pepper.',
            'Serve hot with crusty bread.'
        ],
        nutritionDetails: {
            calories: 220,
            protein: 6,
            carbs: 32,
            fat: 10,
            fiber: 4,
            sugar: 8,
            sodium: 680,
            cholesterol: 15,
            vitamins: ['Vitamin A', 'Vitamin C', 'Vitamin K', 'Vitamin B6'],
            minerals: ['Potassium', 'Manganese', 'Copper', 'Iron']
        }
    },
    7: {
        title: 'Falafel Wrap with Tzatziki',
        description: 'Mediterranean-inspired wrap filled with crispy falafel, fresh vegetables, and tzatziki sauce.',
        image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707',
        calories: 420,
        protein: 14,
        carbs: 48,
        fat: 16,
        difficulty: 'Medium',
        time: 'Prep: 35 min',
        servings: 1,
        tags: ['Wrap', 'Vegetarian', 'Lunch'],
        ingredients: [
            '4 falafel balls',
            '2 large pita breads',
            '1 cup tzatziki sauce',
            '1 cucumber, sliced',
            '1 tomato, sliced',
            '1/2 red onion, sliced',
            'Lettuce leaves',
            'Fresh mint leaves',
            'Salt and pepper to taste'
        ],
        instructions: [
            'Warm the pita breads slightly.',
            'Spread tzatziki sauce on each pita.',
            'Place lettuce leaves on the sauce.',
            'Add sliced cucumber, tomato, and red onion.',
            'Place warm falafel balls.',
            'Top with fresh mint leaves.',
            'Season with salt and pepper.',
            'Roll up tightly and serve.'
        ],
        nutritionDetails: {
            calories: 420,
            protein: 14,
            carbs: 48,
            fat: 16,
            fiber: 8,
            sugar: 6,
            sodium: 780,
            cholesterol: 5,
            vitamins: ['Vitamin A', 'Vitamin C', 'Vitamin K', 'Folate'],
            minerals: ['Iron', 'Calcium', 'Magnesium', 'Zinc']
        }
    },
    8: {
        title: 'Cinnamon Rolls',
        description: 'Soft, gooey cinnamon rolls topped with a sweet glaze. Perfect for breakfast or dessert.',
        image: 'https://images.unsplash.com/photo-1583916087630-e4c305d1b347',
        calories: 450,
        protein: 8,
        carbs: 68,
        fat: 22,
        difficulty: 'Hard',
        time: 'Prep: 1h',
        servings: 12,
        tags: ['Dessert', 'Breakfast', 'Sweet'],
        ingredients: [
            '4 cups all-purpose flour',
            '1 cup warm milk',
            '1/2 cup butter, softened',
            '1/4 cup sugar',
            '2 1/4 tsp active dry yeast',
            '2 eggs',
            'For filling: butter, brown sugar, cinnamon',
            'For glaze: powdered sugar, vanilla, milk'
        ],
        instructions: [
            'Activate yeast in warm milk with a pinch of sugar.',
            'Mix flour, sugar, and salt in a large bowl.',
            'Add eggs and butter to the flour mixture.',
            'Knead dough until smooth and elastic.',
            'Let rise for 1 hour.',
            'Roll out dough and spread with filling.',
            'Roll up and cut into 12 pieces.',
            'Let rise again for 30 minutes.',
            'Bake at 375°F for 20-25 minutes.',
            'Top with glaze while warm.'
        ],
        nutritionDetails: {
            calories: 450,
            protein: 8,
            carbs: 68,
            fat: 22,
            fiber: 2,
            sugar: 32,
            sodium: 220,
            cholesterol: 55,
            vitamins: ['Vitamin A', 'Vitamin D', 'Vitamin B12', 'Riboflavin'],
            minerals: ['Iron', 'Calcium', 'Selenium', 'Phosphorus']
        }
    },
    9: {
        title: 'Acai Bowl',
        description: 'A smoothie bowl made with acai berries, topped with granola, fresh fruits, and honey.',
        image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733',
        calories: 380,
        protein: 8,
        carbs: 62,
        fat: 14,
        difficulty: 'Easy',
        time: 'Prep: 10 min',
        servings: 1,
        tags: ['Breakfast', 'Smoothie', 'Healthy'],
        ingredients: [
            '2 acai berry packets, frozen',
            '1 banana, frozen',
            '1/2 cup mixed berries, frozen',
            '1/2 cup almond milk',
            'For toppings:',
            'Granola',
            'Fresh fruits (banana, strawberries, blueberries)',
            'Honey',
            'Chia seeds'
        ],
        instructions: [
            'Blend frozen acai, banana, berries, and almond milk until smooth.',
            'Pour into a bowl.',
            'Top with sliced fresh banana.',
            'Add fresh berries.',
            'Sprinkle with granola.',
            'Add a drizzle of honey.',
            'Sprinkle chia seeds.',
            'Serve immediately.'
        ],
        nutritionDetails: {
            calories: 380,
            protein: 8,
            carbs: 62,
            fat: 14,
            fiber: 12,
            sugar: 28,
            sodium: 45,
            cholesterol: 0,
            vitamins: ['Vitamin C', 'Vitamin A', 'Vitamin E', 'Vitamin K'],
            minerals: ['Potassium', 'Manganese', 'Magnesium', 'Zinc']
        }
    }
};

// Function to populate the page with meal details
function displayMealDetails(mealId) {
    const meal = mealsData[mealId];
    if (!meal) {
        window.location.href = 'index.html';
        return;
    }

    // Update page title
    document.title = `${meal.title} - EatFit`;

    // Update header section
    document.querySelector('.meal-details-title').textContent = meal.title;
    document.querySelector('.meal-details-description').textContent = meal.description;
    
    // Update tags
    const tagsHtml = meal.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    document.querySelector('.meal-details-tags').innerHTML = tagsHtml;

    // Update image and quick info
    document.querySelector('.meal-details-image').src = meal.image;
    document.querySelector('.calories-value').textContent = meal.nutritionDetails.calories;
    document.querySelector('.protein-value').textContent = `${meal.nutritionDetails.protein}g`;
    document.querySelector('.carbs-value').textContent = `${meal.nutritionDetails.carbs}g`;
    document.querySelector('.fat-value').textContent = `${meal.nutritionDetails.fat}g`;

    // Update ingredients
    const ingredientsList = document.querySelector('.ingredients-list');
    ingredientsList.innerHTML = meal.ingredients
        .map(ingredient => `<li>${ingredient}</li>`)
        .join('');

    // Update instructions
    const instructionsList = document.querySelector('.instructions-list');
    instructionsList.innerHTML = meal.instructions
        .map(instruction => `<li>${instruction}</li>`)
        .join('');

    // Update nutrition facts
    const nutritionDetails = document.querySelector('.nutrition-details');
    nutritionDetails.innerHTML = `
        <div class="nutrition-grid">
            <div class="nutrition-item">
                <span class="label">Fiber</span>
                <span class="value">${meal.nutritionDetails.fiber}g</span>
            </div>
            <div class="nutrition-item">
                <span class="label">Sugar</span>
                <span class="value">${meal.nutritionDetails.sugar}g</span>
            </div>
            <div class="nutrition-item">
                <span class="label">Sodium</span>
                <span class="value">${meal.nutritionDetails.sodium}mg</span>
            </div>
            <div class="nutrition-item">
                <span class="label">Cholesterol</span>
                <span class="value">${meal.nutritionDetails.cholesterol}mg</span>
            </div>
        </div>
        <div class="vitamins-minerals">
            <div class="vitamins">
                <h4>Vitamins</h4>
                <ul>
                    ${meal.nutritionDetails.vitamins.map(vitamin => `<li>${vitamin}</li>`).join('')}
                </ul>
            </div>
            <div class="minerals">
                <h4>Minerals</h4>
                <ul>
                    ${meal.nutritionDetails.minerals.map(mineral => `<li>${mineral}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    if (mealId) {
        displayMealDetails(mealId);
    } else {
        window.location.href = 'index.html';
    }
}); 

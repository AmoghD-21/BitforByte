document.addEventListener('DOMContentLoaded', () => {
    // Common foods database with Indian options
    const commonFoods = [
        { name: 'Dal (100g)', calories: 120, protein: 9, fiber: 4.5 },
        { name: 'Chapati', calories: 120, protein: 3.5, fiber: 1.8 },
        { name: 'Paneer (100g)', calories: 265, protein: 18.3, fiber: 0 },
        { name: 'Brown Rice (100g)', calories: 111, protein: 2.6, fiber: 1.8 },
        { name: 'Palak Paneer (150g)', calories: 180, protein: 11, fiber: 3.5 },
        { name: 'Chole (150g)', calories: 210, protein: 10.5, fiber: 6 },
        { name: 'Idli (2 pieces)', calories: 98, protein: 3.4, fiber: 1.2 },
        { name: 'Dosa Plain', calories: 133, protein: 3.8, fiber: 1.4 },
        { name: 'Sambar (100g)', calories: 65, protein: 3.5, fiber: 3.8 },
        { name: 'Tandoori Roti', calories: 108, protein: 3.2, fiber: 1.9 },
        { name: 'Mixed Veg Curry (150g)', calories: 112, protein: 4.2, fiber: 4.5 },
        { name: 'Rajma (150g)', calories: 165, protein: 8.7, fiber: 7.2 },
        { name: 'Upma (100g)', calories: 85, protein: 2.4, fiber: 1.6 },
        { name: 'Poha (100g)', calories: 130, protein: 2.7, fiber: 1.8 },
        { name: 'Butter Chicken (150g)', calories: 285, protein: 24, fiber: 1.2 }
    ];

    // Track daily totals
    let dailyTotals = {
        calories: 0,
        protein: 0,
        fiber: 0,
        water: 0
    };

    const calorieGoal = 1550;
    let meals = {
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: []
    };

    // Recipe Management
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [
        {
            name: 'Masoor Dal',
            image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2070',
            prepTime: 30,
            calories: 120,
            ingredients: [
                '1 cup masoor dal',
                '1 onion, chopped',
                '2 tomatoes, chopped',
                'Spices (turmeric, cumin, coriander)',
                'Salt to taste'
            ],
            instructions: [
                'Wash and soak dal for 30 minutes',
                'Sauté onions until golden',
                'Add tomatoes and spices',
                'Add dal and cook until soft',
                'Garnish with fresh coriander'
            ]
        },
        {
            name: 'Palak Paneer',
            image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=2070',
            prepTime: 45,
            calories: 180,
            ingredients: [
                '250g spinach',
                '200g paneer',
                'Onions and tomatoes',
                'Indian spices',
                'Cream'
            ],
            instructions: [
                'Blanch and puree spinach',
                'Prepare tomato-onion base',
                'Add spices and spinach puree',
                'Add paneer cubes',
                'Finish with cream'
            ]
        },
        {
            name: 'Chole',
            image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=2070',
            prepTime: 50,
            calories: 210,
            ingredients: [
                '2 cups chickpeas',
                'Onions and tomatoes',
                'Ginger-garlic paste',
                'Indian spices',
                'Fresh coriander'
            ],
            instructions: [
                'Soak chickpeas overnight',
                'Pressure cook until soft',
                'Prepare onion-tomato masala',
                'Add chickpeas and spices',
                'Simmer until thick'
            ]
        }
    ];

    // Initialize UI elements
    const addFoodBtns = document.querySelectorAll('.add-food-btn');
    const modal = document.getElementById('addFoodModal');
    const closeModal = document.querySelector('.close-modal');
    const searchInput = document.querySelector('.search-bar input');
    const foodGrid = document.querySelector('.food-grid');

    // Event Listeners
    addFoodBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const mealType = e.target.closest('.meal-card').dataset.meal;
            openFoodModal(mealType);
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    searchInput.addEventListener('input', debounce((e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterFoods(searchTerm);
    }, 300));

    // Functions
    function openFoodModal(mealType) {
        modal.classList.add('active');
        modal.dataset.currentMeal = mealType;
        modal.querySelector('.meal-type').textContent = mealType.charAt(0).toUpperCase() + mealType.slice(1);
        
        // Add custom meal form to modal
        const modalBody = modal.querySelector('.modal-body');
        if (!modalBody.querySelector('.custom-meal-form')) {
            const customMealForm = `
                <div class="custom-meal-form">
                    <h4>Add Custom Food</h4>
                    <div class="form-group">
                        <input type="text" id="customFoodName" placeholder="Food name" required>
                    </div>
                    <div class="form-group">
                        <input type="number" id="customCalories" placeholder="Calories" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <input type="number" id="customProtein" placeholder="Protein (g)" required>
                        </div>
                        <div class="form-group">
                            <input type="number" id="customFiber" placeholder="Fiber (g)" required>
                        </div>
                    </div>
                    <button class="add-custom-food-btn">Add Custom Food</button>
                </div>
            `;
            modalBody.insertAdjacentHTML('beforeend', customMealForm);
            
            // Add event listener for custom food form
            const addCustomFoodBtn = modalBody.querySelector('.add-custom-food-btn');
            addCustomFoodBtn.addEventListener('click', addCustomFood);
        }
        
        populateCommonFoods();
        updateModalCalories();
    }

    function populateCommonFoods() {
        foodGrid.innerHTML = commonFoods.map(food => `
            <div class="food-item" data-calories="${food.calories}" data-protein="${food.protein}" data-fiber="${food.fiber}">
                <h4>${food.name}</h4>
                <p>${food.calories} cal</p>
                <div class="nutrition-info">
                    <span>Protein: ${food.protein}g</span>
                    <span>Fiber: ${food.fiber}g</span>
                </div>
                <button class="add-item-btn">Add</button>
            </div>
        `).join('');

        // Add event listeners to the Add buttons
        document.querySelectorAll('.add-item-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const foodItem = e.target.closest('.food-item');
                const mealType = modal.dataset.currentMeal;
                addFoodToMeal(mealType, {
                    name: foodItem.querySelector('h4').textContent,
                    calories: parseInt(foodItem.dataset.calories),
                    protein: parseFloat(foodItem.dataset.protein),
                    fiber: parseFloat(foodItem.dataset.fiber)
                });
            });
        });
    }

    function filterFoods(searchTerm) {
        const filteredFoods = commonFoods.filter(food => 
            food.name.toLowerCase().includes(searchTerm)
        );
        
        foodGrid.innerHTML = filteredFoods.map(food => `
            <div class="food-item" data-calories="${food.calories}" data-protein="${food.protein}" data-fiber="${food.fiber}">
                <h4>${food.name}</h4>
                <p>${food.calories} cal</p>
                <div class="nutrition-info">
                    <span>Protein: ${food.protein}g</span>
                    <span>Fiber: ${food.fiber}g</span>
                </div>
                <button class="add-item-btn">Add</button>
            </div>
        `).join('');

        // Reattach event listeners
        document.querySelectorAll('.add-item-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const foodItem = e.target.closest('.food-item');
                const mealType = modal.dataset.currentMeal;
                addFoodToMeal(mealType, {
                    name: foodItem.querySelector('h4').textContent,
                    calories: parseInt(foodItem.dataset.calories),
                    protein: parseFloat(foodItem.dataset.protein),
                    fiber: parseFloat(foodItem.dataset.fiber)
                });
            });
        });
    }

    function updateModalCalories() {
        const mealType = modal.dataset.currentMeal;
        const mealCalories = meals[mealType].reduce((total, food) => total + food.calories, 0);
        const totalCalories = Object.values(meals).flat().reduce((total, food) => total + food.calories, 0);
        
        modal.querySelector('.selected-calories').textContent = mealCalories;
        modal.querySelector('.calories-left').textContent = calorieGoal - totalCalories;
    }

    function addFoodToMeal(mealType, food) {
        meals[mealType].push(food);
        updateMealCard(mealType);
        updateDailyTotals();
        updateModalCalories();
        // Don't close modal immediately to allow adding multiple items
        // modal.classList.remove('active');
    }

    function updateMealCard(mealType) {
        const mealCard = document.querySelector(`.meal-card[data-meal="${mealType}"]`);
        const mealContent = mealCard.querySelector('.meal-content');
        const mealTotal = mealCard.querySelector('.total');

        const mealCalories = meals[mealType].reduce((total, food) => total + food.calories, 0);

        const foodList = meals[mealType].map(food => `
            <div class="food-entry">
                <span>${food.name}</span>
                <span>${food.calories} cal</span>
                <button class="remove-food" onclick="removeFood('${mealType}', '${food.name}')">×</button>
            </div>
        `).join('');

        mealContent.innerHTML = `
            <div class="food-list">
                ${foodList}
            </div>
            <div class="add-food-btn">
                <i class="fas fa-plus"></i>
                <span>Add Food</span>
            </div>
        `;

        mealTotal.textContent = `TOTAL: ${mealCalories} cal`;

        // Reattach event listener to new add food button
        mealContent.querySelector('.add-food-btn').addEventListener('click', () => {
            openFoodModal(mealType);
        });
    }

    function updateDailyTotals() {
        dailyTotals = {
            calories: 0,
            protein: 0,
            fiber: 0,
            water: 0
        };

        Object.values(meals).forEach(mealFoods => {
            mealFoods.forEach(food => {
                dailyTotals.calories += food.calories;
                dailyTotals.protein += food.protein;
                dailyTotals.fiber += food.fiber;
            });
        });

        // Update UI
        document.querySelector('.calories').textContent = calorieGoal - dailyTotals.calories;
        document.querySelector('.stat:nth-child(1) span:last-child').textContent = `${dailyTotals.calories} cal`;
        document.querySelector('.stat:nth-child(2) span:last-child').textContent = `${dailyTotals.protein.toFixed(1)}g`;
        document.querySelector('.stat:nth-child(3) span:last-child').textContent = `${dailyTotals.fiber.toFixed(1)}g`;
    }

    // Utility function to remove food items
    window.removeFood = function(mealType, foodName) {
        meals[mealType] = meals[mealType].filter(food => food.name !== foodName);
        updateMealCard(mealType);
        updateDailyTotals();
    };

    // Utility function for debouncing
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Add water tracking
    const waterBtn = document.querySelector('.stat:nth-child(4)');
    waterBtn.style.cursor = 'pointer';
    waterBtn.addEventListener('click', () => {
        dailyTotals.water++;
        waterBtn.querySelector('span:last-child').textContent = `${dailyTotals.water} glasses`;
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    function addCustomFood() {
        const name = document.getElementById('customFoodName').value;
        const calories = parseInt(document.getElementById('customCalories').value);
        const protein = parseFloat(document.getElementById('customProtein').value);
        const fiber = parseFloat(document.getElementById('customFiber').value);

        if (name && calories && protein && fiber) {
            const mealType = modal.dataset.currentMeal;
            addFoodToMeal(mealType, { name, calories, protein, fiber });
            
            // Clear form
            document.getElementById('customFoodName').value = '';
            document.getElementById('customCalories').value = '';
            document.getElementById('customProtein').value = '';
            document.getElementById('customFiber').value = '';
        }
    }

    // Initialize the UI
    updateDailyTotals();

    // Initialize recipes
    initializeRecipes();
    
    // Add recipe button event listener
    const addRecipeBtn = document.querySelector('.add-recipe-btn');
    if (addRecipeBtn) {
        addRecipeBtn.addEventListener('click', openRecipeModal);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        const recipeModal = document.getElementById('addRecipeModal');
        if (e.target === recipeModal) {
            closeRecipeModal();
        }
    });
});

// Initialize recipes
function initializeRecipes() {
    const recipesGrid = document.querySelector('.recipes-grid');
    if (!recipesGrid) return;
    
    recipesGrid.innerHTML = recipes.map((recipe, index) => `
        <div class="recipe-card">
            <div class="recipe-image">
                <img src="${recipe.image}" alt="${recipe.name}">
            </div>
            <div class="recipe-content">
                <h4 class="recipe-title">${recipe.name}</h4>
                <div class="recipe-info">
                    <span><i class="fas fa-clock"></i> ${recipe.prepTime} mins</span>
                    <span><i class="fas fa-fire"></i> ${recipe.calories} cal</span>
                </div>
                <div class="recipe-actions">
                    <button class="view-recipe-btn" onclick="viewRecipe(${index})">View Recipe</button>
                    <button class="delete-recipe-btn" onclick="deleteRecipe(${index})">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Add Recipe
function addRecipe(event) {
    event.preventDefault();
    const form = document.getElementById('recipeForm');
    if (!form) return;

    const newRecipe = {
        name: form.recipeName.value,
        image: form.recipeImage.value,
        prepTime: parseInt(form.prepTime.value),
        calories: parseInt(form.calories.value),
        ingredients: form.ingredients.value.split('\n').filter(i => i.trim()),
        instructions: form.instructions.value.split('\n').filter(i => i.trim())
    };
    
    recipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    initializeRecipes();
    closeRecipeModal();
    form.reset();
}

// View Recipe
function viewRecipe(index) {
    const recipe = recipes[index];
    const modal = document.getElementById('addRecipeModal');
    if (!modal) return;

    modal.querySelector('.modal-content').innerHTML = `
        <div class="modal-header">
            <h3>${recipe.name}</h3>
            <button class="close-modal" onclick="closeRecipeModal()">&times;</button>
        </div>
        <div class="recipe-details">
            <img src="${recipe.image}" alt="${recipe.name}" class="recipe-detail-image">
            <div class="recipe-stats">
                <span><i class="fas fa-clock"></i> ${recipe.prepTime} mins</span>
                <span><i class="fas fa-fire"></i> ${recipe.calories} calories</span>
            </div>
            <div class="recipe-ingredients">
                <h4>Ingredients</h4>
                <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
            </div>
            <div class="recipe-instructions">
                <h4>Instructions</h4>
                <ol>${recipe.instructions.map(i => `<li>${i}</li>`).join('')}</ol>
            </div>
        </div>
    `;
    modal.classList.add('active');
}

// Delete Recipe
function deleteRecipe(index) {
    if (confirm('Are you sure you want to delete this recipe?')) {
        recipes.splice(index, 1);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        initializeRecipes();
    }
}

// Open Recipe Modal
function openRecipeModal() {
    const modal = document.getElementById('addRecipeModal');
    if (!modal) return;

    modal.classList.add('active');
    modal.querySelector('.modal-content').innerHTML = `
        <div class="modal-header">
            <h3>Add New Recipe</h3>
            <button class="close-modal" onclick="closeRecipeModal()">&times;</button>
        </div>
        <div class="modal-body">
            <form id="recipeForm" class="recipe-form" onsubmit="addRecipe(event)">
                <div class="form-group">
                    <label for="recipeName">Recipe Name</label>
                    <input type="text" id="recipeName" required>
                </div>
                <div class="form-group">
                    <label for="recipeImage">Image URL</label>
                    <input type="url" id="recipeImage" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="prepTime">Preparation Time (mins)</label>
                        <input type="number" id="prepTime" required>
                    </div>
                    <div class="form-group">
                        <label for="calories">Calories</label>
                        <input type="number" id="calories" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="ingredients">Ingredients (one per line)</label>
                    <textarea id="ingredients" rows="4" required></textarea>
                </div>
                <div class="form-group">
                    <label for="instructions">Instructions</label>
                    <textarea id="instructions" rows="4" required></textarea>
                </div>
                <button type="submit" class="add-recipe-btn">
                    <i class="fas fa-plus"></i>
                    <span>Add Recipe</span>
                </button>
            </form>
        </div>
    `;
}

// Close Recipe Modal
function closeRecipeModal() {
    const modal = document.getElementById('addRecipeModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Smooth scroll to features
function scrollToFeatures() {
    const dailyTracker = document.querySelector('.daily-tracker');
    if (dailyTracker) {
        dailyTracker.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
} 

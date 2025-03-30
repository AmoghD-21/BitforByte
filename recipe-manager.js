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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeRecipes();
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        const recipeModal = document.getElementById('addRecipeModal');
        if (e.target === recipeModal) {
            closeRecipeModal();
        }
    });
}); 

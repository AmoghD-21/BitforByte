// Sample meal data
const meals = [
    {
        id: 1,
        title: 'Overnight Chia Pudding',
        description: 'Chia seeds soaked overnight in almond milk, creating a pudding-like consistency. Topped with fresh berries.',
        image: 'https://images.unsplash.com/photo-1542691457-cbe4df041eb2',
        calories: 220,
        time: '5min',
        difficulty: 'Easy',
        price: 280,
        tags: ['Breakfast', 'Vegetarian', 'Pudding']
    },
    {
        id: 2,
        title: 'Chicken Caesar Wrap',
        description: 'A portable version of the Caesar salad, with grilled chicken, romaine lettuce, and Caesar dressing.',
        image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980',
        calories: 450,
        time: '20min',
        difficulty: 'Medium',
        price: 350,
        tags: ['Lunch', 'Wrap', 'High Protein']
    },
    {
        id: 3,
        title: 'Stuffed Bell Peppers with Quinoa',
        description: 'Bell peppers stuffed with a flavorful mixture of quinoa, black beans, and spices.',
        image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733',
        calories: 350,
        time: '45min',
        difficulty: 'Hard',
        price: 400,
        tags: ['Main dish', 'Vegetarian', 'High Protein']
    },
    {
        id: 4,
        title: 'Spinach and Feta Omelette',
        description: 'A fluffy omelette filled with sautéed spinach and crumbled feta cheese.',
        image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71',
        calories: 320,
        time: '15min',
        difficulty: 'Medium',
        price: 300,
        tags: ['Breakfast', 'Vegetarian', 'High Protein']
    },
    {
        id: 5,
        title: 'Shrimp Stir-Fry with Broccoli',
        description: 'A quick and healthy stir-fry with succulent shrimp, colorful vegetables, and Asian-inspired sauce.',
        image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b',
        calories: 380,
        time: '25min',
        difficulty: 'Medium',
        price: 420,
        tags: ['Main dish', 'Seafood', 'Low Carb']
    },
    {
        id: 6,
        title: 'Tomato Basil Soup',
        description: 'A rich, velvety soup made with fresh tomatoes and fresh basil, served with a side of crusty bread.',
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd',
        calories: 220,
        time: '30min',
        difficulty: 'Easy',
        price: 250,
        tags: ['Soup', 'Vegetarian', 'Lunch']
    },
    {
        id: 7,
        title: 'Falafel Wrap with Tzatziki',
        description: 'Mediterranean-inspired wrap filled with crispy falafel, fresh vegetables, and tzatziki sauce.',
        image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707',
        calories: 420,
        time: '35min',
        difficulty: 'Medium',
        price: 500,
        tags: ['Wrap', 'Vegetarian', 'Lunch']
    },
    {
        id: 8,
        title: 'Cinnamon Rolls',
        description: 'Soft, gooey cinnamon rolls topped with a sweet glaze. Perfect for breakfast or dessert.',
        image: 'https://images.unsplash.com/photo-1583916087630-e4c305d1b347',
        calories: 450,
        time: '1h',
        difficulty: 'Hard',
        price: 550,
        tags: ['Dessert', 'Breakfast', 'Sweet']
    },
    {
        id: 9,
        title: 'Acai Bowl',
        description: 'A smoothie bowl made with acai berries, topped with granola, fresh fruits, and honey.',
        image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733',
        calories: 380,
        time: '10min',
        difficulty: 'Easy',
        price: 350,
        tags: ['Breakfast', 'Smoothie', 'Healthy']
    }
];

// Cart state
let cart = [];

// DOM Elements
const mealsGrid = document.getElementById('mealsGrid');
const searchInput = document.getElementById('searchInput');
const caloriesRange = document.getElementById('caloriesRange');
const caloriesValue = document.getElementById('caloriesValue');
const applyFiltersBtn = document.getElementById('applyFilters');
const cartItems = document.getElementById('cartItems');
const cartCount = document.querySelector('.cart-count');
const totalAmount = document.querySelector('.total-amount');

// Create order summary popup container
const orderSummaryPopup = document.createElement('div');
orderSummaryPopup.className = 'order-summary-popup';
orderSummaryPopup.style.display = 'none';
document.body.appendChild(orderSummaryPopup);

// Event Listeners
searchInput.addEventListener('input', debounce(filterMeals, 300));
caloriesRange.addEventListener('input', updateCaloriesValue);
applyFiltersBtn.addEventListener('click', filterMeals);

// Debounce function to limit how often filterMeals runs
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

// Update calories value display
function updateCaloriesValue() {
    caloriesValue.textContent = `${caloriesRange.value} calories`;
}

// Filter meals based on search and filters
function filterMeals() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const maxCalories = parseInt(caloriesRange.value);
    
    // Get selected filters
    const selectedMealTypes = Array.from(document.querySelectorAll('.filter-group input[type="checkbox"]:checked'))
        .map(cb => cb.value.toLowerCase());

    const filteredMeals = meals.filter(meal => {
        // Search term filter
        const matchesSearch = searchTerm === '' || 
            meal.title.toLowerCase().includes(searchTerm) ||
            meal.description.toLowerCase().includes(searchTerm) ||
            meal.tags.some(tag => tag.toLowerCase().includes(searchTerm));

        // Calories filter
        const matchesCalories = meal.calories <= maxCalories;

        // Meal type and dietary preferences filter
        const matchesFilters = selectedMealTypes.length === 0 || 
            meal.tags.some(tag => 
                selectedMealTypes.some(filter => tag.toLowerCase().includes(filter))
            );

        return matchesSearch && matchesCalories && matchesFilters;
    });

    renderMeals(filteredMeals);
}

// Cart functions
function addToCart(mealId) {
    const meal = meals.find(m => m.id === mealId);
    const cartItem = cart.find(item => item.id === mealId);
    
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({
            id: meal.id,
            title: meal.title,
            price: meal.price,
            image: meal.image,
            quantity: 1
        });
    }
    
    updateMealCard(mealId);
    showOrderSummary(mealId);
}

function removeFromCart(mealId) {
    const cartItem = cart.find(item => item.id === mealId);
    
    if (cartItem) {
        cartItem.quantity--;
        if (cartItem.quantity === 0) {
            cart = cart.filter(item => item.id !== mealId);
        }
        updateMealCard(mealId);
        if (cartItem.quantity > 0) {
            showOrderSummary(mealId);
        } else {
            hideOrderSummary();
        }
    }
}

function updateMealCard(mealId) {
    const mealCard = document.querySelector(`[data-meal-id="${mealId}"]`);
    if (mealCard) {
        const cartItem = cart.find(item => item.id === mealId);
        const quantityDisplay = mealCard.querySelector('.quantity-display');
        const removeBtn = mealCard.querySelector('.remove-btn');
        
        if (quantityDisplay) {
            quantityDisplay.textContent = cartItem ? cartItem.quantity : 0;
        }
        if (removeBtn) {
            removeBtn.disabled = !cartItem || cartItem.quantity === 0;
        }
    }
}

function showOrderSummary(mealId) {
    const cartItem = cart.find(item => item.id === mealId);
    const meal = meals.find(m => m.id === mealId);
    
    if (!cartItem) return;

    const total = cartItem.quantity * cartItem.price;
    const discount = Math.floor(total * 0.15); // 15% discount

    orderSummaryPopup.innerHTML = `
        <div class="order-summary-content">
            <button class="close-popup" onclick="hideOrderSummary()">×</button>
            <div class="order-header">
                <h3>YOUR ORDER</h3>
            </div>
            <div class="order-item">
                <img src="${meal.image}" alt="${meal.title}">
                <div class="order-details">
                    <h4>${meal.title}</h4>
                    <div class="quantity-price">
                        <span>₹${meal.price}</span>
                        <div class="quantity-control">
                            <button onclick="removeFromCart(${meal.id})" class="remove-btn">-</button>
                            <span class="quantity-display">${cartItem.quantity}</span>
                            <button onclick="addToCart(${meal.id})">+</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="order-summary">
                <h4>Your order summary</h4>
                <div class="summary-details">
                    <p>${meal.title} - Quantity: ${cartItem.quantity}</p>
                    <p>Item Price: ₹${meal.price} × ${cartItem.quantity}</p>
                    <p>Coupon code: EATFIT15 applied: -₹${discount}</p>
                    <p class="total">Total Bill to be paid: ₹${total - discount}</p>
                </div>
            </div>
            <div class="payment-options">
                <button class="proceed-payment">PROCEED WITH PAYMENT</button>
                <div class="payment-methods">
                    <img src="https://example.com/phonepe.png" alt="PhonePe">
                    <img src="https://example.com/paytm.png" alt="Paytm">
                    <img src="https://example.com/googlepay.png" alt="Google Pay">
                </div>
            </div>
        </div>
    `;
    
    orderSummaryPopup.style.display = 'flex';
}

function hideOrderSummary() {
    orderSummaryPopup.style.display = 'none';
}

// Render meals to the grid
function renderMeals(mealsToRender) {
    mealsGrid.innerHTML = '';
    
    if (mealsToRender.length === 0) {
        mealsGrid.innerHTML = '<div class="no-results">No meals found matching your criteria</div>';
        return;
    }
    
    mealsToRender.forEach(meal => {
        const cartItem = cart.find(item => item.id === meal.id);
        const quantity = cartItem ? cartItem.quantity : 0;
        
        const mealCard = document.createElement('div');
        mealCard.className = 'meal-card';
        mealCard.setAttribute('data-meal-id', meal.id);
        
        mealCard.innerHTML = `
            <img src="${meal.image}" alt="${meal.title}" class="meal-image">
            <div class="meal-content">
                <div class="meal-header">
                    <h3 class="meal-title">${meal.title}</h3>
                    <div class="meal-price">₹${meal.price}</div>
                </div>
                <p class="meal-description">${meal.description}</p>
                <div class="meal-footer">
                    <div class="meal-info">
                        <span class="calories"><i class="fas fa-fire"></i> ${meal.calories} cal</span>
                        <span class="difficulty ${meal.difficulty.toLowerCase()}">
                            <i class="fas fa-signal"></i> ${meal.difficulty}
                        </span>
                    </div>
                    <div class="meal-actions">
                        <div class="cart-controls">
                            <span class="add-to-cart-text">Add to Cart</span>
                            <div class="quantity-control">
                                <button onclick="removeFromCart(${meal.id})" class="remove-btn" ${quantity === 0 ? 'disabled' : ''}>-</button>
                                <span class="quantity-display">${quantity}</span>
                                <button onclick="addToCart(${meal.id})">+</button>
                            </div>
                        </div>
                        <a href="meal-details.html?id=${meal.id}" class="view-details-btn">
                            <i class="fas fa-info-circle"></i>
                            View Details
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        mealsGrid.appendChild(mealCard);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderMeals(meals);
    updateCaloriesValue();
}); 

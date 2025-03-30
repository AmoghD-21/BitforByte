document.addEventListener('DOMContentLoaded', () => {
    // Initialize all charts
    initializeActivityChart();
    initializeMacroChart();
    initializeNutrientChart();

    // Initialize Event Listeners
    initializeEventListeners();

    // Load initial data
    loadUserData();
});

// Activity Chart
function initializeActivityChart() {
    const ctx = document.getElementById('activityChart').getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(255, 107, 107, 0.2)');
    gradient.addColorStop(1, 'rgba(255, 107, 107, 0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Calories Consumed',
                data: [1800, 2100, 1950, 2200, 1850, 1700, 1250],
                borderColor: '#FF6B6B',
                backgroundColor: gradient,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#FFFFFF',
                pointBorderColor: '#FF6B6B',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            },
            {
                label: 'Daily Goal',
                data: [2000, 2000, 2000, 2000, 2000, 2000, 2000],
                borderColor: '#4ECDC4',
                borderDash: [5, 5],
                tension: 0.1,
                fill: false,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            family: 'Poppins',
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'white',
                    titleColor: '#2C3E50',
                    bodyColor: '#2C3E50',
                    bodyFont: {
                        family: 'Poppins'
                    },
                    titleFont: {
                        family: 'Poppins',
                        weight: 600
                    },
                    padding: 12,
                    borderColor: '#E2E8F0',
                    borderWidth: 1,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y} kcal`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 2500,
                    grid: {
                        display: true,
                        drawBorder: false,
                        color: '#E2E8F0'
                    },
                    ticks: {
                        stepSize: 500,
                        font: {
                            family: 'Poppins'
                        },
                        padding: 10
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: 'Poppins'
                        },
                        padding: 5
                    }
                }
            }
        }
    });
}

// Macro Chart
function initializeMacroChart() {
    const ctx = document.getElementById('macroChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Carbs', 'Protein', 'Fats'],
            datasets: [{
                data: [55, 25, 20],
                backgroundColor: [
                    '#FF6B6B',
                    '#4ECDC4',
                    '#FFD93D'
                ],
                borderWidth: 0,
                cutout: '75%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            family: 'Poppins',
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'white',
                    titleColor: '#2C3E50',
                    bodyColor: '#2C3E50',
                    bodyFont: {
                        family: 'Poppins'
                    },
                    titleFont: {
                        family: 'Poppins',
                        weight: 600
                    },
                    padding: 12,
                    borderColor: '#E2E8F0',
                    borderWidth: 1,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    });
}

// Nutrient Chart
function initializeNutrientChart() {
    const ctx = document.getElementById('nutrientChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Fiber', 'Iron', 'Calcium', 'Vitamin D', 'Vitamin B12', 'Omega-3'],
            datasets: [{
                label: 'Current',
                data: [80, 65, 75, 55, 85, 60],
                backgroundColor: 'rgba(255, 107, 107, 0.2)',
                borderColor: '#FF6B6B',
                pointBackgroundColor: '#FFFFFF',
                pointBorderColor: '#FF6B6B',
                pointHoverBackgroundColor: '#FF6B6B',
                pointHoverBorderColor: '#FFFFFF'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        display: false
                    },
                    grid: {
                        color: '#E2E8F0'
                    },
                    angleLines: {
                        color: '#E2E8F0'
                    },
                    pointLabels: {
                        font: {
                            family: 'Poppins',
                            size: 11
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'white',
                    titleColor: '#2C3E50',
                    bodyColor: '#2C3E50',
                    bodyFont: {
                        family: 'Poppins'
                    },
                    titleFont: {
                        family: 'Poppins',
                        weight: 600
                    },
                    padding: 12,
                    borderColor: '#E2E8F0',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return `${context.raw}% of daily goal`;
                        }
                    }
                }
            }
        }
    });
}

// Event Listeners
function initializeEventListeners() {
    // Date navigation
    const dateItems = document.querySelectorAll('.date-item');
    dateItems.forEach(item => {
        item.addEventListener('click', () => {
            dateItems.forEach(d => d.classList.remove('active'));
            item.classList.add('active');
            updateSchedule(item.querySelector('.day').textContent);
        });
    });

    // Shopping list checkboxes
    const checkboxes = document.querySelectorAll('.shopping-item input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const item = checkbox.closest('.shopping-item');
            if (checkbox.checked) {
                item.style.opacity = '0.5';
            } else {
                item.style.opacity = '1';
            }
            saveShoppingList();
        });
    });

    // Shop now button
    const shopNowBtn = document.querySelector('.shop-now-btn');
    shopNowBtn.addEventListener('click', () => {
        const uncheckedItems = Array.from(document.querySelectorAll('.shopping-item input[type="checkbox"]:not(:checked)'))
            .map(checkbox => {
                const item = checkbox.closest('.shopping-item');
                const name = item.querySelector('label span').textContent;
                const quantity = item.querySelector('.quantity:last-child').textContent;
                return `${name} (${quantity})`;
            });
        
        if (uncheckedItems.length > 0) {
            alert(`Ready to order:\n${uncheckedItems.join('\n')}`);
        } else {
            alert('All items have been checked off!');
        }
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterScheduleItems(searchTerm);
    });

    // Orders filter
    const orderTimeFilter = document.getElementById('orderTimeFilter');
    if (orderTimeFilter) {
        orderTimeFilter.addEventListener('change', (e) => {
            filterOrders(e.target.value);
        });
    }

    // Reorder buttons
    const reorderBtns = document.querySelectorAll('.reorder-btn');
    reorderBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const orderItem = e.target.closest('.order-item');
            const orderName = orderItem.querySelector('h4').textContent;
            const orderDetails = Array.from(orderItem.querySelectorAll('.order-items span'))
                .map(span => span.textContent)
                .filter(text => !text.includes('+'))
                .join(', ');
            
            alert(`Reordering ${orderName}\nItems: ${orderDetails}`);
        });
    });
}

// Update schedule based on selected date
function updateSchedule(day) {
    const scheduleItems = document.querySelectorAll('.schedule-item');
    const meals = [
        { type: 'Morning Tea', name: 'Masala Chai', calories: 60, time: '7:00-7:30 AM' },
        { type: 'Breakfast', name: 'Masala Dosa with Sambar', calories: 320, time: '8:30-9:00 AM' },
        { type: 'Hydration', name: 'Nimbu Pani', calories: 45, time: '11:00 AM' },
        { type: 'Lunch', name: 'Dal Tadka, Brown Rice, Mixed Veg Sabzi', calories: 450, time: '1:00-1:45 PM' },
        { type: 'Evening Snack', name: 'Sprouts Bhel', calories: 150, time: '4:30 PM' },
        { type: 'Dinner', name: 'Paneer Tikka with Roti', calories: 380, time: '7:30-8:00 PM' }
    ];

    scheduleItems.forEach((item, index) => {
        if (meals[index]) {
            const meal = meals[index];
            item.querySelector('.time').textContent = meal.time;
            item.querySelector('.meal-name').textContent = meal.name;
            item.querySelector('.meal-info').textContent = `${meal.calories}kcal • ${getRandomTime()}min`;
        }
    });
}

function getRandomTime() {
    return Math.floor(Math.random() * 20) + 15; // Random time between 15-35 minutes
}

// Filter schedule items based on search
function filterScheduleItems(searchTerm) {
    const scheduleItems = document.querySelectorAll('.schedule-item');
    scheduleItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Save shopping list state
function saveShoppingList() {
    const items = Array.from(document.querySelectorAll('.shopping-item')).map(item => ({
        name: item.querySelector('label span').textContent,
        checked: item.querySelector('input[type="checkbox"]').checked,
        quantity: item.querySelector('.quantity:last-child').textContent,
        image: item.querySelector('img').src
    }));
    
    localStorage.setItem('shoppingList', JSON.stringify(items));
}

// Load user data
function loadUserData() {
    // Load shopping list
    const savedList = JSON.parse(localStorage.getItem('shoppingList'));
    if (savedList) {
        const checkboxes = document.querySelectorAll('.shopping-item input[type="checkbox"]');
        checkboxes.forEach((checkbox, index) => {
            if (savedList[index]) {
                checkbox.checked = savedList[index].checked;
                const item = checkbox.closest('.shopping-item');
                item.style.opacity = checkbox.checked ? '0.5' : '1';
            }
        });
    }

    // Load stats
    const stats = JSON.parse(localStorage.getItem('userStats')) || {
        water: 83,
        weight: 75,
        calories: 65,
        protein: 70
    };

    // Update progress bars
    document.querySelectorAll('.stat-progress .progress').forEach(progress => {
        const stat = progress.closest('.stat-item').classList[1];
        if (stats[stat]) {
            progress.style.width = `${stats[stat]}%`;
        }
    });
}

// Save user data before the page unloads
window.addEventListener('beforeunload', () => {
    saveShoppingList();
    
    // Save stats
    const stats = {
        water: 83,
        weight: 75,
        calories: 65,
        protein: 70
    };
    localStorage.setItem('userStats', JSON.stringify(stats));
});

// Filter orders based on time period
function filterOrders(timePeriod) {
    const orders = document.querySelectorAll('.order-item');
    orders.forEach(order => {
        const timeText = order.querySelector('.order-stats span:last-child').textContent;
        
        switch(timePeriod) {
            case 'week':
                order.style.display = timeText.includes('day') ? 'flex' : 'none';
                break;
            case 'month':
                order.style.display = !timeText.includes('month') || timeText.includes('This month') ? 'flex' : 'none';
                break;
            default:
                order.style.display = 'flex';
        }
    });
} 

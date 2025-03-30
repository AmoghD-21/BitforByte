document.addEventListener('DOMContentLoaded', () => {
    // Plan toggle functionality
    const planToggleButtons = document.querySelectorAll('.plan-toggle button');
    const choosePlanSection = document.getElementById('choosePlan');
    const customPlanSection = document.getElementById('customPlan');

    planToggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            planToggleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            if (button.dataset.view === 'choose') {
                choosePlanSection.style.display = 'block';
                customPlanSection.style.display = 'none';
            } else {
                choosePlanSection.style.display = 'none';
                customPlanSection.style.display = 'block';
            }
        });
    });

    // Custom plan form functionality
    const form = document.getElementById('customPlanForm');
    const steps = document.querySelectorAll('.step');
    let currentStep = 1;

    function handleNextStep() {
        if (validateStep(currentStep)) {
            if (currentStep < 3) {
                currentStep++;
                updateForm();
            } else {
                submitForm();
            }
        }
    }

    function handleBackStep() {
        if (currentStep > 1) {
            currentStep--;
            updateForm();
        }
    }

    function updateForm() {
        // Update progress bar
        steps.forEach((step, index) => {
            if (index + 1 === currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Update form content
        let formContent = '';
        
        if (currentStep === 1) {
            formContent = `
                <div class="form-step" id="step1">
                    <h3>Goals and Activity Level</h3>
                    <div class="form-group">
                        <label>What's your primary goal?</label>
                        <div class="radio-group">
                            <label class="radio-option">
                                <input type="radio" name="goal" value="weight-loss">
                                <span>Weight Loss</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="goal" value="muscle-gain">
                                <span>Muscle Gain</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="goal" value="maintenance">
                                <span>Maintenance</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="goal" value="health">
                                <span>General Health</span>
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Activity Level</label>
                        <select name="activity" required>
                            <option value="">Select your activity level</option>
                            <option value="sedentary">Sedentary (Little to no exercise)</option>
                            <option value="light">Lightly Active (1-3 days/week)</option>
                            <option value="moderate">Moderately Active (3-5 days/week)</option>
                            <option value="very">Very Active (6-7 days/week)</option>
                            <option value="extra">Extra Active (Athletes, physical jobs)</option>
                        </select>
                    </div>
                    <div class="form-buttons">
                        <button type="button" class="next-btn">Continue <i class="fas fa-arrow-right"></i></button>
                    </div>
                </div>
            `;
        } else if (currentStep === 2) {
            formContent = `
                <div class="form-step" id="step2">
                    <h3>Dietary Preferences</h3>
                    <div class="form-group">
                        <label>Diet Type</label>
                        <div class="radio-group">
                            <label class="radio-option">
                                <input type="radio" name="diet" value="no-preference" checked>
                                <span>No Preference</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="diet" value="vegetarian">
                                <span>Vegetarian</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="diet" value="vegan">
                                <span>Vegan</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="diet" value="pescatarian">
                                <span>Pescatarian</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="diet" value="keto">
                                <span>Keto</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="diet" value="paleo">
                                <span>Paleo</span>
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Allergies or Intolerances</label>
                        <textarea name="allergies" placeholder="List any food allergies or intolerances (e.g., nuts, dairy, gluten)"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Disliked Foods</label>
                        <textarea name="dislikedFoods" placeholder="List any foods you don't like or want to avoid"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Meal Timing Preferences</label>
                        <select name="mealTiming" required>
                            <option value="">Select preferred meal times</option>
                            <option value="early">Early Bird (6AM - 7PM)</option>
                            <option value="regular">Regular (8AM - 8PM)</option>
                            <option value="late">Night Owl (10AM - 10PM)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Meal Prep Frequency</label>
                        <select name="prepFrequency" required>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="biweekly">Bi-weekly</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Cuisine Preferences</label>
                        <div class="checkbox-group">
                            <label class="checkbox-option">
                                <input type="checkbox" name="cuisine" value="mediterranean">
                                Mediterranean
                            </label>
                            <label class="checkbox-option">
                                <input type="checkbox" name="cuisine" value="asian">
                                Asian
                            </label>
                            <label class="checkbox-option">
                                <input type="checkbox" name="cuisine" value="mexican">
                                Mexican
                            </label>
                            <label class="checkbox-option">
                                <input type="checkbox" name="cuisine" value="indian">
                                Indian
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Monthly Budget for Groceries</label>
                        <input type="number" name="budget" placeholder="Enter amount in $" min="0" step="50">
                    </div>
                    <div class="form-buttons">
                        <button type="button" class="back-btn">Back</button>
                        <button type="button" class="next-btn">Continue <i class="fas fa-arrow-right"></i></button>
                    </div>
                </div>
            `;
        } else if (currentStep === 3) {
            formContent = `
                <div class="form-step" id="step3">
                    <h3>Personal Details</h3>
                    <div class="form-group">
                        <label>Age</label>
                        <input type="number" name="age" placeholder="Enter your age" required>
                    </div>
                    <div class="form-group">
                        <label>Gender</label>
                        <select name="gender" required>
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Height (cm)</label>
                        <input type="number" name="height" placeholder="Enter your height" required>
                    </div>
                    <div class="form-group">
                        <label>Weight (kg)</label>
                        <input type="number" name="weight" placeholder="Enter your weight" required>
                    </div>
                    <div class="form-group">
                        <label>How many meals do you prefer per day?</label>
                        <select name="mealsPerDay" required>
                            <option value="3">3 meals</option>
                            <option value="4">4 meals</option>
                            <option value="5">5 meals</option>
                            <option value="6">6 meals</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Maximum cooking time per meal</label>
                        <select name="cookingTime" required>
                            <option value="15">15 minutes or less</option>
                            <option value="30">30 minutes or less</option>
                            <option value="45">45 minutes or less</option>
                            <option value="60">1 hour or less</option>
                        </select>
                    </div>
                    <div class="form-buttons">
                        <button type="button" class="back-btn">Back</button>
                        <button type="button" class="create-plan-btn">Create My Plan <i class="fas fa-check"></i></button>
                    </div>
                </div>
            `;
        }

        form.innerHTML = formContent;

        // Reattach event listeners after updating form content
        if (currentStep > 1) {
            form.querySelector('.back-btn').addEventListener('click', handleBackStep);
        }
        if (currentStep < 3) {
            form.querySelector('.next-btn').addEventListener('click', handleNextStep);
        } else {
            form.querySelector('.create-plan-btn').addEventListener('click', submitForm);
        }
    }

    // Initial form setup
    updateForm();

    function validateStep(step) {
        switch (step) {
            case 1:
                const goal = form.querySelector('input[name="goal"]:checked');
                const activity = form.querySelector('select[name="activity"]').value;
                return goal && activity;
            case 2:
                const diet = form.querySelector('input[name="diet"]:checked');
                return diet !== null;
            case 3:
                const requiredFields = ['age', 'gender', 'height', 'weight', 'mealsPerDay', 'cookingTime'];
                return requiredFields.every(field => {
                    const input = form.querySelector(`[name="${field}"]`);
                    return input && input.value;
                });
            default:
                return false;
        }
    }

    // Sample meal plan data
    const mealPlans = {
        weightLoss: {
            sample: [
                {
                    day: 'Monday',
                    meals: [
                        { name: 'Overnight Oats with Berries', calories: 350, time: '15 min', type: 'Breakfast' },
                        { name: 'Grilled Chicken Salad', calories: 400, time: '20 min', type: 'Lunch' },
                        { name: 'Baked Salmon with Vegetables', calories: 450, time: '25 min', type: 'Dinner' }
                    ],
                    totalCalories: 1200
                },
                // Add more days...
            ],
            macros: { protein: '30%', carbs: '40%', fats: '30%' }
        },
        balanced: {
            sample: [
                {
                    day: 'Monday',
                    meals: [
                        { name: 'Greek Yogurt Parfait', calories: 400, time: '10 min', type: 'Breakfast' },
                        { name: 'Quinoa Buddha Bowl', calories: 550, time: '25 min', type: 'Lunch' },
                        { name: 'Turkey Meatballs with Pasta', calories: 600, time: '30 min', type: 'Dinner' }
                    ],
                    totalCalories: 1550
                },
                // Add more days...
            ],
            macros: { protein: '25%', carbs: '50%', fats: '25%' }
        },
        muscleBuild: {
            sample: [
                {
                    day: 'Monday',
                    meals: [
                        { name: 'Protein Pancakes', calories: 500, time: '20 min', type: 'Breakfast' },
                        { name: 'Chicken Rice Bowl', calories: 700, time: '25 min', type: 'Lunch' },
                        { name: 'Steak with Sweet Potato', calories: 800, time: '30 min', type: 'Dinner' }
                    ],
                    totalCalories: 2000
                },
                // Add more days...
            ],
            macros: { protein: '40%', carbs: '40%', fats: '20%' }
        }
    };

    // Preview meal plan
    function showMealPlanPreview(planType) {
        const plan = mealPlans[planType];
        const previewModal = document.createElement('div');
        previewModal.className = 'meal-preview-modal';
        
        const content = `
            <div class="modal-content">
                <h3>Sample Meal Plan</h3>
                <div class="macros-breakdown">
                    <h4>Macro Breakdown</h4>
                    <div class="macro-charts">
                        <div class="macro-item">
                            <div class="chart-circle" style="--percentage: ${parseInt(plan.macros.protein)}">
                                <span>${plan.macros.protein}</span>
                            </div>
                            <p>Protein</p>
                        </div>
                        <div class="macro-item">
                            <div class="chart-circle" style="--percentage: ${parseInt(plan.macros.carbs)}">
                                <span>${plan.macros.carbs}</span>
                            </div>
                            <p>Carbs</p>
                        </div>
                        <div class="macro-item">
                            <div class="chart-circle" style="--percentage: ${parseInt(plan.macros.fats)}">
                                <span>${plan.macros.fats}</span>
                            </div>
                            <p>Fats</p>
                        </div>
                    </div>
                </div>
                <div class="sample-day">
                    <h4>Sample Day</h4>
                    ${plan.sample[0].meals.map(meal => `
                        <div class="meal-item">
                            <div class="meal-info">
                                <h5>${meal.name}</h5>
                                <p>${meal.type}</p>
                            </div>
                            <div class="meal-meta">
                                <span><i class="fas fa-fire"></i> ${meal.calories} cal</span>
                                <span><i class="fas fa-clock"></i> ${meal.time}</span>
                            </div>
                        </div>
                    `).join('')}
                    <div class="daily-total">
                        <p>Daily Total: ${plan.sample[0].totalCalories} calories</p>
                    </div>
                </div>
                <button class="close-preview">Close Preview</button>
            </div>
        `;
        
        previewModal.innerHTML = content;
        document.body.appendChild(previewModal);
        
        previewModal.querySelector('.close-preview').addEventListener('click', () => {
            previewModal.remove();
        });
    }

    // Add preview buttons to plan cards
    document.querySelectorAll('.plan-card').forEach(card => {
        const previewBtn = document.createElement('button');
        previewBtn.className = 'preview-plan-btn';
        previewBtn.innerHTML = '<i class="fas fa-eye"></i> Preview Plan';
        previewBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const planType = card.classList.contains('weight-loss') ? 'weightLoss' :
                           card.classList.contains('balanced') ? 'balanced' : 'muscleBuild';
            showMealPlanPreview(planType);
        });
        card.querySelector('.plan-features').appendChild(previewBtn);
    });

    // Add advanced customization to the wizard
    function updateCustomPlanForm() {
        if (currentStep === 2) {
            const advancedOptions = `
                <div class="form-group">
                    <label>Meal Timing Preferences</label>
                    <select name="mealTiming" required>
                        <option value="">Select preferred meal times</option>
                        <option value="early">Early Bird (6AM - 7PM)</option>
                        <option value="regular">Regular (8AM - 8PM)</option>
                        <option value="late">Night Owl (10AM - 10PM)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Meal Prep Frequency</label>
                    <select name="prepFrequency" required>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Bi-weekly</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Cuisine Preferences</label>
                    <div class="checkbox-group">
                        <label class="checkbox-option">
                            <input type="checkbox" name="cuisine" value="mediterranean">
                            Mediterranean
                        </label>
                        <label class="checkbox-option">
                            <input type="checkbox" name="cuisine" value="asian">
                            Asian
                        </label>
                        <label class="checkbox-option">
                            <input type="checkbox" name="cuisine" value="mexican">
                            Mexican
                        </label>
                        <label class="checkbox-option">
                            <input type="checkbox" name="cuisine" value="indian">
                            Indian
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label>Monthly Budget for Groceries</label>
                    <input type="number" name="budget" placeholder="Enter amount in $" min="0" step="50">
                </div>
            `;
            
            const dietaryPreferences = document.querySelector('#step2');
            dietaryPreferences.insertAdjacentHTML('beforeend', advancedOptions);
        }
    }

    // Update the existing updateForm function to include the new advanced options
    const originalUpdateForm = updateForm;
    updateForm = function() {
        originalUpdateForm();
        updateCustomPlanForm();
    };

    function submitForm() {
        // Collect all form data and submit
        const formData = new FormData(form);
        console.log('Form submitted:', Object.fromEntries(formData));
        // Add API call here
        alert('Your custom meal plan will be created shortly!');
    }

    // Expert consultation functionality
    const consultationBtn = document.querySelector('.consultation-btn');
    const bookSessionBtns = document.querySelectorAll('.book-session-btn');

    consultationBtn.addEventListener('click', () => {
        // Add consultation scheduling logic
        console.log('Schedule consultation clicked');
    });

    bookSessionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Add booking logic
            console.log('Book session clicked');
        });
    });
}); 

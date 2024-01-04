// MenuComponent.js
import React, { useState } from 'react';
import LabelsFilter from './LabelsFilter';
import PassengerSelector from './PassengerSelector';
import './MenuComponent.css';
import jsonData from './allo-fullstack-assignment-dataset.json';
import TotalComponent from './TotalComponent'; // Import the new component


const MenuComponent = () => {
    const { meals, labels } = jsonData;
    const [cart, setCart] = useState([]);
    const [selectedDrinks, setSelectedDrinks] = useState({});
    const [selectedLabels, setSelectedLabels] = useState([]);
    const [passengers, setPassengers] = useState([{ id: 1 }, { id: 2 }]);
    const [selectedPassenger, setSelectedPassenger] = useState(1);

    const selectPassenger = (id) => {
        setSelectedPassenger(id);
    };

    const addPassenger = () => {
        setPassengers([...passengers, { id: passengers.length + 1 }]);
    };

    const toggleDrinkSelection = (mealId, drink) => {
        setSelectedDrinks(prevSelectedDrinks => {
            if (prevSelectedDrinks[mealId] && prevSelectedDrinks[mealId].id === drink.id) {
                const { [mealId]: removedDrink, ...restOfSelectedDrinks } = prevSelectedDrinks;
                return restOfSelectedDrinks;
            }
            return { ...prevSelectedDrinks, [mealId]: drink };
        });
    };

    const addToCart = (meal) => {
        setCart(currentCart => {
            const newItem = {
                passengerId: selectedPassenger,
                meal: meal,
                drink: selectedDrinks[meal.id] ? meals.find(m => m.id === meal.id).drinks.find(d => d.id === selectedDrinks[meal.id].id) : null
            };
            return [...currentCart, newItem];
        });
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => {
            const drinkPrice = item.drink ? item.drink.price : 0;
            return total + item.meal.price + drinkPrice;
        }, 0);
    };

    const toggleLabelSelection = (labelId) => {
        setSelectedLabels(currentSelectedLabels =>
            currentSelectedLabels.includes(labelId)
                ? currentSelectedLabels.filter(id => id !== labelId)
                : [...currentSelectedLabels, labelId]
        );
    };

    const filteredMeals = meals.filter(meal =>
        selectedLabels.length === 0 || meal.labels.some(label => selectedLabels.includes(label))
    );

    return (
        <div className="menu-container">
            <LabelsFilter
                labels={labels}
                selectedLabels={selectedLabels}
                onLabelToggle={toggleLabelSelection}
            />
            <PassengerSelector
                passengers={passengers}
                selectedPassenger={selectedPassenger}
                onSelectPassenger={selectPassenger}
                onAddPassenger={addPassenger}
            />
            <h2>Meals</h2>
            {filteredMeals.map((meal) => (
                <div key={meal.id} className="meal">
                    <img src={meal.img} alt={meal.title} className="meal-image" />
                    <div className="meal-details">
                        <h3>{meal.title}</h3>
                        <p>Starter: {meal.starter}</p>
                        <p>Desert: {meal.desert}</p>
                        <p>Price: ${meal.price.toFixed(2)}</p>
                        <div>Labels: {meal.labels.join(', ')}</div>
                        <div className="drinks-container">
                            {meal.drinks.map(drink => (
                                <button
                                    key={drink.id}
                                    className={`drink-button ${selectedDrinks[meal.id]?.id === drink.id ? 'selected' : ''}`}
                                    onClick={() => toggleDrinkSelection(meal.id, drink)}
                                >
                                    {drink.title} - ${drink.price.toFixed(2)}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button className="select-button" onClick={() => addToCart(meal)}>
                        Add to Cart
                    </button>
                </div>
            ))}
            <div className="total-price-container">
                <h3>Total Price: ${getTotalPrice().toFixed(2)}</h3>
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>
                            Passenger {item.passengerId}: {item.meal.title} 
                            {item.drink ? ` with ${item.drink.title}` : ''} - ${item.meal.price.toFixed(2)}
                            {item.drink ? ` + ${item.drink.price.toFixed(2)}` : ''}
                        </li>
                    ))}
                </ul>
            </div>
            <TotalComponent cart={cart} getTotalPrice={getTotalPrice} />

        </div>
    );
};

export default MenuComponent;

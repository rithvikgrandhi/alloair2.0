// TotalComponent.js
import React from 'react';

const TotalComponent = ({ cart, getTotalPrice }) => {
    return (
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
    );
};

export default TotalComponent;

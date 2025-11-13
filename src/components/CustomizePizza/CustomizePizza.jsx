import React from 'react';
import './CustomizePizza.css';
import {
    getSpecialtyPizzasData,
    getSpecialtyPizzaTitle,
    getSpecialtyPizzaSubtitle
} from '../../utils/menuRouting';

const CustomizePizza = ({ type = 'regular' }) => {
    const pizzaData = getSpecialtyPizzasData(type);
    const title = getSpecialtyPizzaTitle(type);
    const subtitle = getSpecialtyPizzaSubtitle(type);

    return (
        <div className="specialty-pizzas-container">
            <div className="specialty-pizzas-header">
                <h2 className="specialty-pizzas-title">{title}</h2>
                <p className="specialty-pizzas-subtitle">{subtitle}</p>
            </div>
            <div className="specialty-pizzas-image">
                <img src={pizzaData[0]['pizza-image']} alt={title} />
            </div>
            <div className="specialty-pizzas-table-container">
                <table className="specialty-pizzas-table">
                    <thead>
                        <tr>
                            <th className="pizza-type-header"></th>
                            <th className="size-header">10"</th>
                            <th className="size-header">14"</th>
                            <th className="size-header">16"</th>
                        </tr>
                    </thead>
                    <tbody className="specialty-pizzas-table-body">
                        {pizzaData.map((pizza, index) => (
                            <tr key={index} className={`pizza-row ${pizza.premium ? 'premium' : ''}`}>
                                <td className="pizza-info">
                                    <div className="pizza-name">{pizza['pizza-name']}</div>
                                    <div className="pizza-description">{pizza['pizza-description']}</div>
                                </td>
                                <td className="pizza-price">{pizza.prices.small}</td>
                                <td className="pizza-price">{pizza.prices.medium}</td>
                                <td className="pizza-price">{pizza.prices.large}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomizePizza;

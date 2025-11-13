import React from 'react';
import './FreshSalads.css';
import saladsData from '../../utils/freshSaladsData.json';

const FreshSalads = () => {
    const salads = saladsData.freshSalads || [];

    const headerImage = salads.length > 0 && salads[0].image ? salads[0].image : null;

    return (
        <div className="fresh-salads-container">
            {headerImage && (
                <div className="fresh-salads-image">
                    <img src={headerImage} alt="Fresh Salads" />
                </div>
            )}

            <div className="fresh-salads-header">
                <div className="fresh-salads-title">Fresh Salads</div>
                <div className="fresh-salads-description">Crisp, flavorful salads made fresh to order</div>
            </div>

            <div className="salads-table-container">
                <table className="salads-table">
                    <thead>
                        <tr>
                            <th className="item-column"></th>
                            <th className="half-column">Half</th>
                            <th className="full-column">Full</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salads.map((item, index) => (
                            <React.Fragment key={index}>
                                <tr className="salad-row">
                                    <td className="item-cell">
                                        <strong>{item.name}</strong>
                                        <br />
                                        {item.description && (
                                            <small>{item.description}</small>
                                        )}
                                    </td>
                                    <td className="half-price">{item.halfPrice}</td>
                                    <td className="full-price">{item.fullPrice}</td>
                                </tr>

                                {(item['menu-item-extra-label'] || item['menu-item-extra-price-half'] || item['menu-item-extra-price-full']) && (
                                    <tr className="salad-extra-row">
                                        <td className="menu-item-extra-left">
                                            {item['menu-item-extra-label'] && (
                                                <span className="menu-item-extra-label">{item['menu-item-extra-label']}</span>
                                            )}
                                        </td>
                                        <td className="menu-item-extra-right">
                                            {item['menu-item-extra-price-half'] && (
                                                <span className="menu-item-extra-price">{item['menu-item-extra-price-half']}</span>
                                            )}
                                        </td>
                                        <td className="menu-item-extra-right">
                                            {item['menu-item-extra-price-full'] && (
                                                <span className="menu-item-extra-price">{item['menu-item-extra-price-full']}</span>
                                            )}
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FreshSalads;

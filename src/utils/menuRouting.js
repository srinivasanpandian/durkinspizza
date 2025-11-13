// Menu routing utilities and category mappings
import menuData from './menuData.json';
import pizzaSectionsData from './pizzaSectionsData.json';

// Categories to exclude from main filter (these will be subcategories of "Make Your Pizza")
export const excludedCategories = ['Sauce', 'Cheese', 'Veggie Toppings', 'Meat Toppings'];

// Get all menu categories for filter buttons (excluding the subcategories)
export const getMenuCategories = () => {
    const rawCategories = menuData.menu
        .filter(item => !excludedCategories.includes(item['menu-category']))
        .map(item => item['menu-category']);

    // Group Beer and Wine into a single Beverages category in the filter list
    const hasBeer = rawCategories.includes('Beer');
    const hasWine = rawCategories.includes('Wine');

    // Group Baked Chicken Wings and Beer Batterd Fries into a single Appetizers category
    const hasBakedChickenWings = rawCategories.includes('Baked Chicken Wings');
    const hasBeerBatteredFries = rawCategories.includes('Beer Batterd Fries');

    // Group Breads and Cake into a single Sweet Desserts category
    const hasBreads = rawCategories.includes('Breads');
    const hasCake = rawCategories.includes('Cake');

    const grouped = rawCategories.filter(cat => 
        cat !== 'Beer' && 
        cat !== 'Wine' && 
        cat !== 'Baked Chicken Wings' && 
        cat !== 'Beer Batterd Fries' &&
        cat !== 'Breads' &&
        cat !== 'Cake'
    );
    
    if (hasBeer || hasWine) {
        grouped.push('Beverages');
    }
    
    if (hasBakedChickenWings || hasBeerBatteredFries) {
        grouped.push('Appetizers');
    }
    
    if (hasBreads || hasCake) {
        grouped.push('Sweet Desserts');
    }

    return grouped;
};

// Create custom order for categories
export const getCategories = () => {
    // Desired filter order
    const desiredOrder = [
        'All',
        'Lunch Specials',
        'Appetizers',
        'Fresh Salads',
        'Make Your Pizza',
        'Specialty Pizzas',
        'Indian Specialty Pizzas',
        'Sandwiches & Calzones',
        'Pasta & Bread',
        'Sweet Desserts',
        'Frozen desserts',
        'Beverages'
    ];

    // Only include categories that are relevant/exist
    const available = new Set(menuData.menu.map(item => item['menu-category']));
    const includeIf = (name) => {
        // Grouped categories should appear if any of their children exist
        if (name === 'Appetizers') return available.has('Baked Chicken Wings') || available.has('Beer Batterd Fries');
        if (name === 'Sweet Desserts') return available.has('Breads') || available.has('Cake');
        if (name === 'Beverages') return available.has('Beer') || available.has('Wine');
        if (name === 'Fresh Salads') return true; // rendered from separate JSON
        if (name === 'Specialty Pizzas') return true; // rendered from pizzaSectionsData
        if (name === 'Indian Specialty Pizzas') return true; // rendered from pizzaSectionsData
        if (name === 'Frozen desserts') return available.has('Frozen desserts');
        return name === 'All' || available.has(name);
    };

    return desiredOrder.filter(includeIf);
};

// Category mapping from home page to menu page
export const categoryMapping = {
    'All': 'all',
    'Make Your Pizza': 'make-your-pizza',
    'Specialty Pizzas': 'specialty-pizzas',
    'Indian Specialty Pizzas': 'indian-specialty-pizzas',
    'Appetizers': 'appetizers',
    'Sandwiches & Calzones': 'sandwiches-calzones',
    'Pasta & Bread': 'pasta-bread',
    'Fresh Salads': 'fresh-salads',
    'Sweet Desserts': 'sweet-desserts',
    'Frozen desserts': 'frozen-desserts',
    'Beverages': 'beverages'
};

// Reverse mapping from URL slugs to display names
export const reverseCategoryMapping = {
    'all': 'All',
    'make-your-pizza': 'Make Your Pizza',
    'specialty-pizzas': 'Specialty Pizzas',
    'indian-specialty-pizzas': 'Indian Specialty Pizzas',
    'appetizers': 'Appetizers',
    'sandwiches-calzones': 'Sandwiches & Calzones',
    'pasta-bread': 'Pasta & Bread',
    'fresh-salads': 'Fresh Salads',
    'sweet-desserts': 'Sweet Desserts',
    'frozen-desserts': 'Frozen desserts',
    'beverages': 'Beverages'
};

// Get category by slug
export const getCategoryBySlug = (slug) => {
    return reverseCategoryMapping[slug] || slug;
};

// Get slug by category
export const getSlugByCategory = (category) => {
    return categoryMapping[category] || category.toLowerCase().replace(/\s+/g, '-');
};

// Filter menu data based on active filter
export const getFilteredMenuData = (activeFilter) => {
    if (activeFilter === 'All') {
        // Return sections in required order for the All view
        const order = [
            'Lunch Specials',
            'Baked Chicken Wings',
            'Beer Batterd Fries',
            'Make Your Pizza',
            'Veggie Toppings',
            'Meat Toppings',
            'Sandwiches & Calzones',
            'Pasta & Bread',
            'Breads',
            'Cake',
            'Frozen desserts',
            'Beer',
            'Wine'
        ];
        const byName = new Map(menuData.menu.map(item => [item['menu-category'], item]));
        return order.map(name => byName.get(name)).filter(Boolean);
    } else if (activeFilter === 'Make Your Pizza') {
        return menuData.menu.filter(item => 
            item['menu-category'] === 'Make Your Pizza' || 
            excludedCategories.includes(item['menu-category'])
        );
    } else if (activeFilter === 'Specialty Pizzas' || activeFilter === 'Indian Specialty Pizzas') {
        return [];
    } else if (activeFilter === 'Fresh Salads') {
        return []; // Fresh Salads will be handled by a separate component
    } else if (activeFilter === 'Appetizers') {
        // Return both Baked Chicken Wings and Beer Batterd Fries sections together
        return menuData.menu.filter(item => 
            item['menu-category'] === 'Baked Chicken Wings' || 
            item['menu-category'] === 'Beer Batterd Fries'
        );
    } else if (activeFilter === 'Sweet Desserts') {
        // Return both Breads and Cake sections together
        return menuData.menu.filter(item => 
            item['menu-category'] === 'Breads' || 
            item['menu-category'] === 'Cake'
        );
    } else if (activeFilter === 'Frozen desserts') {
        return menuData.menu.filter(item => item['menu-category'] === 'Frozen desserts');
    } else if (activeFilter === 'Beverages') {
        // Return both Beer and Wine sections together
        return menuData.menu.filter(item => item['menu-category'] === 'Beer' || item['menu-category'] === 'Wine');
    } else {
        return menuData.menu.filter(item => item['menu-category'] === activeFilter);
    }
};

// Get specialty pizzas data
export const getSpecialtyPizzasData = (type = 'regular') => {
    if (type === 'indian') {
        return pizzaSectionsData.indianSpecialtyPizzas;
    } else if (type === 'sauce') {
        return pizzaSectionsData.sauces;
    } else if (type === 'cheese') {
        return pizzaSectionsData.cheeses;
    }
    return pizzaSectionsData.specialtyPizzas;
};

// Get specialty pizza title
export const getSpecialtyPizzaTitle = (type = 'regular') => {
    if (type === 'indian') {
        return 'Indian Specialty Pizzas';
    } else if (type === 'sauce') {
        return 'Sauce';
    } else if (type === 'cheese') {
        return 'Cheeses';
    }
    return 'Specialty Pizzas';
};

// Get specialty pizza subtitle
export const getSpecialtyPizzaSubtitle = (type = 'regular') => {
    if (type === 'indian') {
        return 'Authentic Indian flavors on pizza';
    } else if (type === 'sauce') {
        return 'Choose your favorite sauce';
    } else if (type === 'cheese') {
        return 'Choose your favorite cheese';
    }
    return 'Gourmet combinations crafted by our chefs';
}; 
const MENU_DATA = [
  {
    category: "Breakfast",
    timing: "8:30 AM – 11:30 AM",
    description: "Start the day with European breakfast sets, fluffy pancakes, and fresh farm eggs.",
    items: [
      { id: "bf-1", name: "American Breakfast", diet: "non-veg", description: "Pancakes, sausages, eggs, juice, tea / coffee.", price: 398, calories: 677, featured: true },
      { id: "bf-2", name: "English Breakfast", diet: "non-veg", description: "Sausages, fried eggs, potato wedges, toast.", price: 418, calories: 737, featured: true },
      { id: "bf-3", name: "Spanish Breakfast", diet: "non-veg", description: "Cheese tomato toast, eggs, salad, juice.", price: 418, calories: 759 },
      { id: "bf-4", name: "French Breakfast", diet: "non-veg", description: "Crepes, eggs, fruit salad, juice, tea / coffee.", price: 438, calories: 637 },
      { id: "bf-5", name: "Plain Omelette", diet: "non-veg", description: "Classic folded farm eggs served with toasted bread.", price: 148 },
      { id: "bf-6", name: "Cheese Omelette", diet: "non-veg", description: "Farm eggs folded with melted cheese.", price: 168 },
      { id: "bf-7", name: "Mushroom Omelette", diet: "non-veg", description: "Farm eggs cooked with sauteed mushrooms.", price: 168 },
      { id: "bf-8", name: "Egg White Omelette", diet: "non-veg", description: "Wholesome whipped egg whites lightly seasoned.", price: 198 },
      { id: "bf-9", name: "French Toast", diet: "veg", description: "Golden griddled brioche slices with cinnamon sweetness.", price: 228 },
      { id: "bf-10", name: "Toast with Butter & Jam", diet: "veg", description: "Crispy toast served with butter and fruit preserves.", price: 138 }
    ]
  },
  {
    category: "Pancakes",
    timing: "All Day",
    description: "Stack of 3 thin, circular griddled cakes prepared with egg, milk & flour.",
    items: [
      { id: "pan-1", name: "Pancake With Honey", diet: "non-veg", description: "Thin flat circular cake (3 pcs) served with sweet honey.", price: 208 },
      { id: "pan-2", name: "Pancake With Maple Syrup", diet: "non-veg", description: "Thin flat circular cake (3 pcs) served with maple syrup.", price: 218 },
      { id: "pan-3", name: "Pancake With Chocolate Sauce & Nuts", diet: "non-veg", description: "Three warm pancakes topped with chocolate sauce and toasted nuts.", price: 238 },
      { id: "pan-4", name: "Nutella Pancake", diet: "non-veg", description: "Three warm pancakes layered with generous creamy Nutella.", price: 268, featured: true }
    ]
  },
  {
    category: "Appetizers",
    timing: "All Day",
    description: "Artisan crostini, toasted baguettes, wings, and house-made starters.",
    items: [
      { id: "app-1", name: "Garlic Bread", diet: "veg", description: "Sliced & toasted baguette bread topped with butter, seasoning & garlic.", price: 128, calories: 474 },
      { id: "app-2", name: "Cheese Garlic Bread", diet: "veg", description: "Sliced toasted baguette topped with butter, seasoning & mozzarella.", price: 198, calories: 491 },
      { id: "app-3", name: "French Fries", diet: "veg", description: "Potato slices deep fried & served with tomato ketchup.", price: 158, calories: 702 },
      { id: "app-4", name: "Peri Peri French Fries", diet: "veg", description: "Crispy potato fries dusted with peri peri seasoning.", price: 178, calories: 650 },
      { id: "app-5", name: "Egg Bruschetta", diet: "non-veg", description: "Toasted baguette rubbed with garlic, boiled egg, English mustard & mayo.", price: 198, calories: 671 },
      { id: "app-6", name: "Mushroom Crostini", diet: "veg", description: "Thin baguette slices topped with caramelized onions, mushrooms & cheese.", price: 218, calories: 434 },
      { id: "app-7", name: "Chicken Sausage Crostini", diet: "non-veg", description: "Toasted baguette topped with chicken sausage, seasoning & cheese.", price: 258, calories: 977 },
      { id: "app-8", name: "Hummus with Flat Bread", diet: "veg", description: "Seasoned chickpeas paste served with toasted flat bread.", price: 198, calories: 605 },
      { id: "app-9", name: "Sticky BBQ Chicken Wings", diet: "non-veg", description: "Juicy wings glazed and tossed in tangy barbecue sauce.", price: 358, calories: 565, featured: true },
      { id: "app-10", name: "Chicken Coctoletta", diet: "non-veg", description: "Crunchy fried chicken cutlets served with fries & tartar sauce.", price: 348, calories: 685 },
      { id: "app-11", name: "Cheese Corn Ball", diet: "veg", description: "Golden fried bites filled with sweet corn and cheese.", price: 198, calories: 405 },
      { id: "app-12", name: "Sticky BBQ Cottage Cheese", diet: "veg", description: "Paneer cubes dusted in peri BBQ spices, grilled in barbecue sauce.", price: 398, calories: 631 },
      { id: "app-13", name: "Fish Cotoletta", diet: "non-veg", description: "Crumb-fried Basa fish served with fries & tartar sauce.", price: 358, calories: 401 },
      { id: "app-14", name: "Fish Finger", diet: "non-veg", description: "Finger-sized crumb-fried Basa fish served with fries & tartar sauce.", price: 358, calories: 401 },
      { id: "app-15", name: "Fried Prawns", diet: "non-veg", description: "Golden crumb-fried prawns served with fries and tartar sauce.", price: 398, calories: 991 },
      { id: "app-16", name: "Grilled Prawn in Orange Lemon Glaze", diet: "non-veg", description: "Grilled prawns tossed in lemon-citrus butter glaze.", price: 398, calories: 250 }
    ]
  },
  {
    category: "Classic Pasta",
    timing: "All Day",
    description: "Prepared in traditional olive oil, garlic & herbs, or rich baked cheese sauces. Served with garlic bread.",
    items: [
      { id: "pas-1", name: "Spaghetti Aglio E Olio Veg", diet: "veg", description: "Spaghetti tossed with garlic, chilly flakes & parsley in olive oil.", price: 338, calories: 662 },
      { id: "pas-2", name: "Mac n Cheese Veg", diet: "veg", description: "Macaroni pasta baked with 4 artisan cheese blends.", price: 368, calories: 989, featured: true },
      { id: "pas-3", name: "Herbed Pasta Veg", diet: "veg", description: "Penne tossed with garlic, chilly flakes, olives, jalapeño & parsley.", price: 338, calories: 712 },
      { id: "pas-4", name: "Spaghetti Cottage Cheese Bolognese", diet: "veg", description: "Spaghetti in creamy tomato sauce with minced cottage cheese.", price: 458, calories: 1062 },
      { id: "pas-5", name: "Herbed Pasta Chicken", diet: "non-veg", description: "Penne tossed with chicken, garlic, chilly flakes, olives & jalapeño.", price: 378, calories: 880 },
      { id: "pas-6", name: "Spaghetti Chicken Bolognese", diet: "non-veg", description: "Spaghetti in creamy tomato sauce with minced chicken.", price: 408, calories: 978 },
      { id: "pas-7", name: "Spaghetti Aglio E Olio Chicken", diet: "non-veg", description: "Spaghetti tossed with tender chicken, garlic, chili & olive.", price: 378, calories: 880 },
      { id: "pas-8", name: "Mac n Cheese Chicken", diet: "non-veg", description: "Macaroni pasta with chicken & four artisan cheeses.", price: 408, calories: 1036 },
      { id: "pas-9", name: "Parmesan Chicken Spaghetti", diet: "non-veg", description: "Spaghetti Aglio E Olio with tangy arrabbiata cheese topped with parmesan chicken.", price: 468, calories: 907 },
      { id: "pas-10", name: "Spaghetti with Creamy Chicken & Mushroom Sauce", diet: "non-veg", description: "Spaghetti tossed in velvety cream sauce with chicken & mushrooms.", price: 448, calories: 1063 },
      { id: "pas-11", name: "Penne Pasta Veg (Choose Sauce)", diet: "veg", description: "Sauce choice: Alfredo, Arrabbiata, or Tomato Cream. Served with garlic bread.", price: 358, calories: 868 },
      { id: "pas-12", name: "Penne Pasta Chicken (Choose Sauce)", diet: "non-veg", description: "Chicken pasta in Alfredo, Arrabbiata, or Tomato Cream sauce.", price: 388, calories: 929 },
      { id: "pas-13", name: "Prawn Pasta (Choose Sauce)", diet: "non-veg", description: "Prawn pasta in Alfredo, Arrabbiata, or Tomato Cream sauce.", price: 518, calories: 910 }
    ]
  },
  {
    category: "Sandwiches & Wraps",
    timing: "All Day",
    description: "Prepared fresh between toasted baguette slices or warm tortillas. All served with crispy fries.",
    items: [
      { id: "sw-1", name: "Egg Chicken Salad Sandwich", diet: "non-veg", description: "Minced chicken, boiled egg & mayo salad in baguette bread, grilled.", price: 238, calories: 609 },
      { id: "sw-2", name: "Grilled/Crispy Chicken Sandwich", diet: "non-veg", description: "Chicken slices, lettuce, tomato & cheese in baguette bread, grilled.", price: 288, calories: 324, featured: true },
      { id: "sw-3", name: "Chicken Salami Sandwich", diet: "non-veg", description: "Sliced cheese & chicken salami in flat bread, grilled.", price: 208, calories: 406 },
      { id: "sw-4", name: "Grilled Cheese Sandwich", diet: "veg", description: "Sliced and melted mozzarella cheese, golden grilled.", price: 198, calories: 459 },
      { id: "sw-5", name: "Veg Caprese Sandwich", diet: "veg", description: "Sliced fresh tomatoes, basil & cheese in flat bread.", price: 178, calories: 385 },
      { id: "sw-6", name: "Grilled Vegetable Sandwich", diet: "veg", description: "Zucchini, bell pepper, mushrooms, lettuce, tomato & cheese.", price: 228, calories: 524 },
      { id: "sw-7", name: "Grilled/Crispy Cottage Cheese Sandwich", diet: "veg", description: "Cottage cheese slices in baguette bread, grilled.", price: 308, calories: 852 },
      { id: "sw-8", name: "Mushroom Onion Sandwich", diet: "veg", description: "Caramelized mushroom, onions & cheese on bread.", price: 238, calories: 432 },
      { id: "sw-9", name: "Grilled Veggies & Hummus Wrap", diet: "veg", description: "Tortilla rolled over grilled veggies & hummus.", price: 228, calories: 473 },
      { id: "sw-10", name: "Grilled/Crispy Cottage Cheese Wrap", diet: "veg", description: "Tortilla rolled over cottage cheese with lettuce & seasoning.", price: 308, calories: 695 },
      { id: "sw-11", name: "Mushroom Onion & Bell Pepper Wrap", diet: "veg", description: "Tortilla wrapped over grilled mushroom, onions & bell pepper.", price: 258, calories: 439 },
      { id: "sw-12", name: "Grilled/Crispy Chicken Wrap", diet: "non-veg", description: "Tortilla rolled over chicken with lettuce & seasoning.", price: 318, calories: 787 },
      { id: "sw-13", name: "Veg Quesadilla", diet: "veg", description: "Tortilla folded over cottage cheese, black beans, corn & bell pepper.", price: 308, calories: 391 },
      { id: "sw-14", name: "Chicken Quesadilla", diet: "non-veg", description: "Tortilla folded over chicken, black beans, corn & bell pepper.", price: 328, calories: 346 }
    ]
  },
  {
    category: "Salads & Soups",
    timing: "All Day",
    description: "Nourishing garden bowls and hot slow-simmered soups served with garlic bread.",
    items: [
      { id: "sl-1", name: "Greek Salad", diet: "veg", description: "Lettuce, tomato, cucumber, bell pepper, onion, olives & feta cheese.", price: 368, calories: 371 },
      { id: "sl-2", name: "Grilled Cottage Cheese with Saute Veggies", diet: "veg", description: "Strips of grilled paneer served with fresh sauteed veggies.", price: 418, calories: 723 },
      { id: "sl-3", name: "Vegan Salad", diet: "veg", description: "Lettuce, chickpeas, cherry tomatoes, cucumber & olive oil dressing.", price: 368, calories: 218 },
      { id: "sl-4", name: "Chicken Caesar Salad", diet: "non-veg", description: "Grilled chicken slices, crisp lettuce & croutons with Caesar dressing.", price: 398, calories: 529 },
      { id: "sl-5", name: "Grilled Chicken with Saute Veggies", diet: "non-veg", description: "Strips of grilled chicken with sauteed veggies, naturally prepared.", price: 508, calories: 751 },
      { id: "sp-1", name: "Veg Minestrone Soup", diet: "veg", description: "Tomato broth with vegetables, pasta & seasoning, with garlic bread.", price: 198, calories: 240 },
      { id: "sp-2", name: "Cream of Mushroom Soup", diet: "veg", description: "Velvety cream soup of button mushrooms, celery & seasoning.", price: 218 },
      { id: "sp-3", name: "Veg Clear Soup", diet: "veg", description: "Vegetables in clear broth with spinach & bell pepper.", price: 198 },
      { id: "sp-4", name: "Cream of Chicken Soup", diet: "non-veg", description: "Rich slow-simmered chicken soup served with garlic bread.", price: 238 }
    ]
  },
  {
    category: "Pizzas",
    timing: "All Day",
    description: "Hand-stretched stone-baked crusts topped with house sauce and mozzarella.",
    items: [
      { id: "pz-1", name: "Margherita Pizza", diet: "veg", description: "Tomatoes, fresh basil & mozzarella cheese.", price: 298, sizeVariants: "9 inch: ₹298 | 12 inch: ₹398" },
      { id: "pz-2", name: "Veg Mexican Pizza", diet: "veg", description: "Onion, corn, tomato, jalapenos, olives, salsa & mozzarella.", price: 398, sizeVariants: "9 inch: ₹398 | 12 inch: ₹538" },
      { id: "pz-3", name: "Veg Italiano Pizza", diet: "veg", description: "Zucchini, onion, mushroom, olives & mozzarella.", price: 378, sizeVariants: "9 inch: ₹378 | 12 inch: ₹518" },
      { id: "pz-4", name: "Mushroom Onion Pizza", diet: "veg", description: "Generous caramelized mushroom, onion & mozzarella.", price: 388, sizeVariants: "9 inch: ₹388 | 12 inch: ₹528" },
      { id: "pz-5", name: "BBQ Cottage Cheese Pizza", diet: "veg", description: "Paneer tossed in BBQ sauce with bell peppers & cheese.", price: 428, sizeVariants: "9 inch: ₹428 | 12 inch: ₹568" },
      { id: "pz-6", name: "Corn Cheese Pizza", diet: "veg", description: "Sweet corn, onion & mozzarella cheese.", price: 308, sizeVariants: "9 inch: ₹308 | 12 inch: ₹408" },
      { id: "pz-7", name: "Spiced Chicken Pizza", diet: "non-veg", description: "Spiced chicken in red sauce, onion & mozzarella.", price: 418, sizeVariants: "9 inch: ₹418 | 12 inch: ₹558", featured: true },
      { id: "pz-8", name: "BBQ Chicken Pizza", diet: "non-veg", description: "Chicken tossed in BBQ sauce with bell pepper & cheese.", price: 428, sizeVariants: "9 inch: ₹428 | 12 inch: ₹568" },
      { id: "pz-9", name: "Chicken Italiano Pizza", diet: "non-veg", description: "Double chicken, zucchini, bell pepper, onion, mushrooms & cheese.", price: 438, sizeVariants: "9 inch: ₹438 | 12 inch: ₹568" }
    ]
  },
  {
    category: "Sizzlers & Combos",
    timing: "Lunch & Dinner",
    description: "Sizzling iron plates and composed European meal platters.",
    items: [
      { id: "sz-1", name: "Vegetable Steak Sizzler", diet: "veg", description: "Veggie patty with veggies, wedges, spaghetti in sauce of choice.", price: 508 },
      { id: "sz-2", name: "Cottage Cheese Sizzler", diet: "veg", description: "Grilled paneer steaks with veggies, wedges and spaghetti.", price: 558 },
      { id: "sz-3", name: "Grilled Chicken Sizzler", diet: "non-veg", description: "Chicken patty with veggies, wedges, spaghetti in sauce of choice.", price: 558, featured: true },
      { id: "sz-4", name: "Grilled Fish Sizzler", diet: "non-veg", description: "Basa fillet with veggies, potato wedges & spaghetti.", price: 648 },
      { id: "sz-5", name: "Sea Food (Fish & Prawns) Sizzler", diet: "non-veg", description: "Grilled prawns & fish fillet with veggies, wedges & pasta.", price: 698 },
      { id: "sz-6", name: "Special Veg Combo Platter", diet: "veg", description: "Grilled paneer, white rice, saute veggies, spaghetti & garlic bread.", price: 578 },
      { id: "sz-7", name: "Special Chicken Combo Platter", diet: "non-veg", description: "Grilled chicken with mushroom sauce, Spaghetti Aglio E Olio, veggies & bread.", price: 558 },
      { id: "sz-8", name: "Special Fish Combo Platter", diet: "non-veg", description: "Basa fillet in white wine sauce, Spaghetti Aglio E Olio, veggies & bread.", price: 678 },
      { id: "sz-9", name: "Chicken Stroganoff", diet: "non-veg", description: "Chicken in tomato cream sauce served with herbed rice & garlic bread.", price: 458 },
      { id: "sz-10", name: "Mushroom Stroganoff", diet: "veg", description: "Mushrooms in creamy tomato sauce with herbed rice & garlic bread.", price: 428 }
    ]
  },
  {
    category: "Beverages",
    timing: "All Day",
    description: "Iced coffees, frappes, shakes, and cold teas.",
    items: [
      { id: "bev-1", name: "Iced Espresso", diet: "veg", description: "Freshly pulled intense shot over clear ice.", price: 69 },
      { id: "bev-2", name: "Iced Americano", diet: "veg", description: "Espresso lengthened with chilled water and ice.", price: 99 },
      { id: "bev-3", name: "Iced Latte", diet: "veg", description: "Smooth espresso over cold milk and ice.", price: 149, featured: true },
      { id: "bev-4", name: "Affogato", diet: "veg", description: "Hot espresso poured over vanilla gelato.", price: 175 },
      { id: "bev-5", name: "Cold Chocolate", diet: "veg", description: "Rich chocolate chilled with full-cream milk.", price: 169 },
      { id: "bev-6", name: "Iced Caramel Macchiato", diet: "veg", description: "Chilled milk, espresso float and sweet caramel drizzle.", price: 179 },
      { id: "bev-7", name: "Kin Special Frappe", diet: "veg", description: "House blend iced coffee blended with chocolate shavings.", price: 189, featured: true },
      { id: "bev-8", name: "Caramel Frappe", diet: "veg", description: "Blended coffee with rich butter caramel.", price: 209 },
      { id: "bev-9", name: "Choco Hazelnut Frappe", diet: "veg", description: "Espresso blended with hazelnut syrup and cocoa.", price: 209 },
      { id: "bev-10", name: "Nutella Frappe", diet: "veg", description: "Whipped frappe with real roasted hazelnut Nutella.", price: 249 },
      { id: "bev-11", name: "Chocolate Brownie Shake", diet: "veg", description: "Shake blended with fresh fudge brownie crumbs.", price: 209 },
      { id: "bev-12", name: "Blueberry Shake", diet: "veg", description: "Vanilla shake swirled with wild blueberry compote.", price: 229 },
      { id: "bev-13", name: "Lemon Iced Tea", diet: "veg", description: "Black tea infused with citrus lemon and mint.", price: 160 },
      { id: "bev-14", name: "Peach Iced Tea", diet: "veg", description: "Chilled tea perfumed with orchard peach nectar.", price: 190 }
    ]
  }
];

import React, { useState } from "react";
import { useEffect } from "react";
import Meal from "./components/Meal.jsx";
const Restourant = () => {
  const [searchText, setSearchText] = useState("");
  const [meals, setMeals] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setMeals(data.meals));
  }, [searchText]);

  const searchFood = (e) => {
    setSearchText(e.target.value);
  };
  const handleAddToOrder = (order) => {
    setCart(order);
  };
  console.log(cart);

  return (
    <div className="text-center m-2">
      <p>Cart: {cart.length} item added</p>
      <h1>Find the food you want</h1>
      <input onChange={searchFood} type="text" name="" id="" /> <br />
      <h3>Result Found {meals.length}</h3>
      <div>
        {meals.map((meal) => (
          <Meal
            key={meal.idMeal}
            meal={meal}
            handleAddToOrder={handleAddToOrder}
          />
        ))}
      </div>
    </div>
  );
};

export default Restourant;

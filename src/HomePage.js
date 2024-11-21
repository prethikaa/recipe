import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HomePage.css"

const HomePage = () => {
  // State to hold the list of recipes
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the list of foods from the API on component mount
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          "https://the-vegan-recipes-db.p.rapidapi.com/",
          {
            headers: {
              "X-RapidAPI-Host": "the-vegan-recipes-db.p.rapidapi.com",
              "X-RapidAPI-Key":
                "a175ae7893mshc5392d020d9d199p1e6b41jsn96a5002c251f", // Replace with your RapidAPI key
            },
          }
        );
        setRecipes(response.data); // Assuming the response contains the list of recipes
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []); // Empty dependency array to run only once on mount

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div>
        {recipes.length > 0 ? (
          <div  className="recipe-div">
            {recipes.map((recipe) => (
              <div className="recipe-card" key={recipe.id}>
                   <img className="image" src={recipe.image} alt={recipe.title} width="100" />
                <h3>{recipe.title}</h3>
                <p>{recipe.difficulty}</p>
             
              </div>
            ))}
          </div>
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;

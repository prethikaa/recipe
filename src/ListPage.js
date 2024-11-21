import axios from "axios";
import React, { useEffect, useState } from "react";
import "./List.css";

const ListPage = () => {
  // State to hold the list of recipes, loading state, error, and pagination details
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [itemsPerPage] = useState(20); // Items to display per page

  // Fetch the list of foods from the API on component mount
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          //   "https://the-vegan-recipes-db.p.rapidapi.com/",
          // Adjust API endpoint if necessary
          {
            headers: {
              "X-RapidAPI-Host": "the-vegan-recipes-db.p.rapidapi.com",
              "X-RapidAPI-Key":
                "a175ae7893mshc5392d020d9d199p1e6b41jsn96a5002c251fs", // Replace with your RapidAPI key
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

  // Calculate the current items to display
  const indexOfLastRecipe = currentPage * itemsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {loading && <p>Loading...</p>}
      <div>
        {currentRecipes.length > 0 && (
          <div className="pagination">
            <button
              className="pagination-button"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="pagination-page">{currentPage}</span>
            <button
              className="pagination-button"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage * itemsPerPage >= recipes.length}
            >
              Next
            </button>
          </div>
        )}
        {currentRecipes.length > 0 ? (
          <div className="recipe-div">
            {currentRecipes.map((recipe) => (
              <div className="recipe-card" key={recipe.id}>
                <img
                  className="image"
                  src={recipe.image}
                  alt={recipe.title}
                  width="100"
                />
                <h3>{recipe.title}</h3>
              </div>
            ))}
          </div>
        ) : (
          <p>No recipes found.</p>
        )}
      </div>

      {/* Pagination Controls */}
    </div>
  );
};

export default ListPage;

import axios from "axios";
import React, { useEffect, useState } from "react";
import "./List.css";
import Recipe from "./Recipe";

const ListPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipeDetails, setRecipeDetails] = useState(null);

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
                "a175ae7893mshc5392d020d9d199p1e6b41jsn96a5002c251f",
            },
          }
        );
        setRecipes(response.data);
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const indexOfLastRecipe = currentPage * itemsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
  const currentRecipes = filteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1);
  };

  const handleCardClick = async (id) => {
    try {
      const response = await axios.get(
        `https://the-vegan-recipes-db.p.rapidapi.com/${id}`,
        {
          headers: {
            "X-RapidAPI-Host": "the-vegan-recipes-db.p.rapidapi.com",
            "X-RapidAPI-Key":
              "a175ae7893mshc5392d020d9d199p1e6b41jsn96a5002c251f",
          },
        }
      );
      setRecipeDetails(response.data);
      setIsModalOpen(true);
    } catch (err) {
      setError("Failed to fetch recipe details.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRecipeDetails(null);
  };

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search for recipes here..."
          className="search-input"
        />
      </div>

      {loading && <p>Loading...</p>}

      <div>
        {filteredRecipes.length > 0 && (
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
              disabled={currentPage * itemsPerPage >= filteredRecipes.length}
            >
              Next
            </button>
          </div>
        )}

        {currentRecipes.length > 0 ? (
          <div className="recipe-div">
            {currentRecipes.map((recipe) => (
              <div
                className="recipe-card"
                key={recipe.id}
                onClick={() => handleCardClick(recipe.id)}
              >
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

      <Recipe
        isOpen={isModalOpen}
        closeModal={closeModal}
        recipeDetails={recipeDetails}
      />
    </div>
  );
};

export default ListPage;

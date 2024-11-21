import React from "react";
import "./Recipe.css";

const Recipe = ({ isOpen, closeModal, recipeDetails }) => {
  if (!isOpen) return null;

  const steps = recipeDetails?.method || [];

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{}}
      >
        <button className="close-button" onClick={closeModal}>
          X
        </button>
        <h2>{recipeDetails?.title}</h2>
        <img
          src={recipeDetails?.image}
          alt={recipeDetails?.title}
          width="200"
        />

        <p>
          <strong>Ingredients:</strong>
        </p>
        <ul>
          {recipeDetails?.ingredients?.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>

        <p>
          <strong>Instructions:</strong>
        </p>
        <ol>
          {steps.map((step, index) => {
            const stepText = Object.values(step)[0];
            return <li key={index}>{stepText}</li>;
          })}
        </ol>
      </div>
    </div>
  );
};

export default Recipe;

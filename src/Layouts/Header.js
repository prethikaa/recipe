import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="left">Recipeapp</div>
      <div className="right">
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/all-recipes" className="link">
          All Recipes
        </Link>
      </div>
    </div>
  );
}

export default Header;

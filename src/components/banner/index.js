import React from "react";
import { useNavigate } from "react-router-dom";
import "./Banner.scss";
function Banner({ category, idx }) {
  const navigate = useNavigate()
  const displayImg = (category) => {
    return (
      <img
        src={category.imageUrl}
        alt={category.name}
        className="banner__img"
      />
    );
  };
  const displayContent = (category) => {
    return (
      <div className="banner__details">
        <h1>{category.name}</h1>
        <p>{category.description}</p>
        <button className="banner__btn" onClick={()=>navigate(`/products?category=${category.id}`)}>Explore {category.key}</button>
      </div>
    );
  };
  return (
    <section className="banner__container">
      {idx % 2 ? (
        <div className="banner__body">
          {displayContent(category)}
          {displayImg(category)}
        </div>
      ) :
        <div className="banner__body">
          {displayImg(category)}
          {displayContent(category)}
        </div> 
      }
    </section>
  );
}

export default Banner;

import React, { useEffect, useState } from "react";
import css from "./Card.module.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
// import Reciept from "../Reciept/Reciept";

const Card = () => {
  const [beerData, setBeerData] = useState([]);
  const [visibleCards, setVisibleCards] = useState(15);
  const [deletedCardIds, setDeletedCardIds] = useState([]);

  useEffect(() => {
    const fetchBeerData = async () => {
      try {
        const response = await axios.get(
          "https://api.punkapi.com/v2/beers?page=1"
        );
        setBeerData(response.data);
      } catch (error) {
        console.error("Error fetching beer data:", error);
      }
    };

    fetchBeerData();
  }, []);

  const handleAddMoreCards = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 5); // Додати ще 5 карток до видимих карток
  };

  const handleDeleteCard = (cardId) => {
    setDeletedCardIds((prevDeletedCardIds) => [...prevDeletedCardIds, cardId]);
  };

  return (
    <div className={css.content}>
      <ul className={css.container}>
        {beerData
          .filter((beer) => !deletedCardIds.includes(beer.id))
          .slice(0, visibleCards)
          .map((beer) => (
          <li className={css.card} key={beer.id}>
            <img
              src={beer.image_url}
              alt={beer.image_url}
              className={css.image}
            />
            <h2>{beer.name}</h2>
            <NavLink to={`/reciept/${beer.id}`} >
              <button className={css.reciept}>Reciept</button>
            </NavLink>
            <button onClick={() => handleDeleteCard(beer.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddMoreCards}>Add</button>
    </div>
  );
};

export default Card;

// <div className={css.container}>
//   {beerData.slice(0, visibleCards).map((beer) => (
//     <div key={beer.id} className={css.card}>
//         <img src={beer.image_url} alt={beer.name} />
//       <h2>{beer.name}</h2>
//       <p>{beer.tagline}</p>
//       <p>ABV: {beer.abv}%</p>
//       <p>IBU: {beer.ibu}</p>
//       <h3>Description:</h3>
//       <p>{beer.description}</p>
//       <h3>Method:</h3>
//       <p>Mash Temp: {beer.method.mash_temp[0].temp.value} °C</p>
//       <p>Mash Duration: {beer.method.mash_temp[0].duration} minutes</p>
//       <p>Fermentation Temp: {beer.method.fermentation.temp.value} °C</p>
//       <h3>Ingredients:</h3>
//       <p>Malt:</p>
//       <ul>
//         {beer.ingredients.malt.map((malt) => (
//           <li key={malt.name}>
//             {malt.name}: {malt.amount.value} {malt.amount.unit}
//           </li>
//         ))}
//       </ul>
//       <p>Hops:</p>
//       <ul>
//         {beer.ingredients.hops.map((hop) => (
//           <li key={hop.name}>
//             {hop.name}: {hop.amount.value} {hop.amount.unit}, {hop.add},{" "}
//             {hop.attribute}
//           </li>
//         ))}
//       </ul>
//       <p>Yeast: {beer.ingredients.yeast}</p>
//     </div>
//   ))}
//   <button onClick={handleAddMoreCards}>Додати</button>
// </div>

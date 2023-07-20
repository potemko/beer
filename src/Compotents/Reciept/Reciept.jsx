import React, { useEffect, useState } from "react";
import css from "./Reciept.module.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const Reciept = () => {
  const [beerData, setBeerData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(-1); // повернення на попередню сторінку
  };

  useEffect(() => {
    const fetchBeerData = async () => {
      try {
        const response = await axios.get(
          `https://api.punkapi.com/v2/beers/${id}`
        );
        setBeerData(response.data[0]); // Отримання першого (і єдиного) об'єкту з масиву даних
      } catch (error) {
        console.error("Error fetching beer data:", error);
      }
    };

    fetchBeerData();
  }, [id]); // Включення ID у залежності для перезавантаження даних при зміні ID

  if (!beerData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <NavLink>
            <button className={css.back} onClick={handleClick}>Go Back</button>
        </NavLink>
        <div className={css.card}>
      <img src={beerData.image_url} alt={beerData.name} className={css.image}/>
      <div className={css.info}>
      <h2>{beerData.name}</h2>
      <p>{beerData.tagline}</p>
      <p>ABV: {beerData.abv}%</p>
      <p>IBU: {beerData.ibu}</p>
      <h3>Description:</h3>
      <p>{beerData.description}</p>
      <h3>Method:</h3>
      <p>Mash Temp: {beerData.method.mash_temp[0].temp.value} °C</p>
      <p>Mash Duration: {beerData.method.mash_temp[0].duration} minutes</p>
      <p>Fermentation Temp: {beerData.method.fermentation.temp.value} °C</p>
      <h3>Ingredients:</h3>
      <p>Malt:</p>
      <ul>
        {beerData.ingredients.malt.map((malt) => (
          <li key={malt.name}>
            {malt.name}: {malt.amount.value} {malt.amount.unit}
          </li>
        ))}
      </ul>
      <p>Hops:</p>
      <ul>
        {beerData.ingredients.hops.map((hop) => (
          <li key={hop.name}>
            {hop.name}: {hop.amount.value} {hop.amount.unit}, {hop.add},{" "}
            {hop.attribute}
          </li>
        ))}
      </ul>
      <p>Yeast: {beerData.ingredients.yeast}</p>
      </div>
      
    </div>
    </div>
    
  );
};

export default Reciept;

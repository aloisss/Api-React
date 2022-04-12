//import fetchToCurl from 'fetch-to-curl';
import React, { useEffect, useState } from "react";
import Create from './Create';
import './App.css';

const App = () => {
  const apiUrl = "https://api.up2tom.com/v3/models";

  const [model,setModel] = useState([]);
  const [drinkChoice,setDrinkChoice] = useState(null);

  useEffect(() => {
    fetch(apiUrl, {
      headers: {
        Authorization: "Token 9307bfd5fa011428ff198bb37547f979",
        "Content-Type": "application/vnd.api+json",
      },
    })
      .then((response) => response.json())      
      .then((json) => {
        const dataItems = [];
        Object.keys(json).forEach(key => dataItems.push(json[key]));
        setModel(dataItems);
      });
    
  }, []);

  const getDrinkChoice = (model) => {
    fetch(`${apiUrl}/${model.id}`, {
      headers: {
        Authorization: "Token 9307bfd5fa011428ff198bb37547f979",
        "Content-Type": "application/vnd.api+json",
      },
    })
      .then((response) => response.json())      
      .then((json) => {
        setDrinkChoice(json);
      });
  }

  return(
    <>
    <div className="container">
      <h1 className="mainHeading">Models</h1>
      {model.map((dataItems) => {
        return (
          <ul>
            {dataItems.map((dataItem) => (
              <li key={dataItem.id}>
                  <button onClick={() => getDrinkChoice(dataItem)}>
                    {dataItem?.attributes?.name}
                  </button>
              </li>
            ))}
        </ul>
        )
      })}
     </div>

    {drinkChoice &&  <Create model={drinkChoice}/>}
  
    </>  
  )
  
};

export default App;

import React, { useState } from 'react';
import Axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import './App.css';
import Recipe from "./component/Recipe";
import Alert from "./component/Alert";
const App = () => {
    const [query, setQuery] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [alert, setAlert] = useState("");

    const APP_ID = "45a22c03";

    const APP_KEY = "71b411c2ae1282ef002d81909e4c4f46";

    const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    const getData = async () => {
        if(query !== "") {
        const result = await Axios.get(url);
        if(!result.data.more) {
            return setAlert("No food to match with name");
        }

        setRecipes(result.data.hits)

        console.log(result);
        setAlert("");
        setQuery("");
        } else {
            setAlert("Please fill the form")
        }
    };

    const onChange = (e) => {
        setQuery(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        getData();
    }

    return (
        <div className="App">
            <h1>daily recipes</h1>
            <p></p>
            <form className="search-form" onSubmit={onSubmit}>
                {alert !== "" && <Alert alert={alert} />}
                <input type="text" placeholder="Search Recipes" autoComplete="off" onChange={onChange} value={query}/>
                <input type="submit" value="search" />
            </form>
            <div className="recipes">
                {recipes !== [] && recipes.map(recipe => <Recipe key={uuidv4 ()} recipe={recipe} />)}

            </div>
        </div>
    );
};

export default App

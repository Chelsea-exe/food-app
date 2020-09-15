import React, { useState } from 'react';
import Axios from 'axios';
import './App.css';
import Recipe from "./component/Recipe";
const App = () => {
    const [query, setQuery] = useState("");
    const [recipes, setRecipes] = useState([]);

    const APP_ID = "45a22c03";

    const APP_KEY = "71b411c2ae1282ef002d81909e4c4f46";

    const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    const getData = async () => {
        const result = await Axios.get(url);

        setRecipes(result.data.hits)

        console.log(result);
        setQuery("");
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
            <h1>Welcome to Food Searching App</h1>
            <form className="search-form" onSubmit={onSubmit}>
                <input type="text" placeholder="Search Recipes" autoComplete="off" onChange={onChange} value={query}/>
                <input type="submit" value="search" />
            </form>
            <div className="recipes">
                {recipes !== [] && recipes.map(recipe => <Recipe recipe={recipe} />)}

            </div>
        </div>
    );
};

export default App

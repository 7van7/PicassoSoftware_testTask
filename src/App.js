import React, { useState } from "react";
import axios from 'axios';

function App() {
    const [name, setName] = useState("");
    const [masOfcomp, masComp] = useState([])
    const changeHandler = (name) =>{
        setName(name)
        const urlcomp= ("https://autocomplete.clearbit.com/v1/companies/suggest?query=")
        const loadcompanies = async ()=> {
            const response = await axios.get(urlcomp + name);
            masComp(response.data)
        }
        loadcompanies();
        console.log(masOfcomp)
    }
    const clickhandler = (e)=>{
        setName(e.target.textContent)
    }

    return (
        <div className="company_search">

            <form action="">
                <h1>Компания</h1>
                <input
                    type="text"
                    name="name"
                    className="search_space"
                    autoComplete="off"
                    onChange={e => changeHandler(e.target.value)}
                    value={name} />

                <ul className="autocomplete_list">

                    {masOfcomp.map((company)=>{
                        if (name) {
                            return <li className="list_item" onClick={clickhandler}>
                                <img src={company.logo} alt="logo"/>
                                <div className="namecomp">
                                    <p>{company.name}</p>
                                    <a href={company.domain}>{company.domain}</a>
                                </div>
                            </li>
                        }
                    })
                    }
                </ul>
            </form>

        </div>

    );
}

export default App;
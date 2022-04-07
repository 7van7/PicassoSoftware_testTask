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

    const[isopen, setisOpean]= useState(true)

    const clickhandler = (e)=>{
        setName(e.target.textContent)
        setisOpean(!isopen)
    }

    const inputClick=()=>{
        setisOpean(true)
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
                    value={name}
                    onClick={inputClick}
                />

                <ul className="autocomplete_list">

                    {masOfcomp.map((company)=>{
                        if (name && isopen) {
                            return <li className="list_item" onClick={clickhandler}>
                                <img src={company.logo} alt="logo"/>
                                <div className="namecomp">
                                    <p>{company.name}</p>
                                    <a href="">{company.domain}</a>
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
import React, {useEffect, useState} from "react"
import Table from "./Table"
import Form from './Form'


function MyApp() {

    const [characters, setCharacters] = useState([]);

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    useEffect(() => {
        fetchUsers()
            .then((res)=>res.json())
            .then((json)=> setCharacters(json["users_list"]))
            .catch((error) => console.log(error))
    }, [] );

    function removeOneCharacter(index) {
        const updated = characters.filter((character, i) =>{
                return i !== index;
            }
        );
        setCharacters(updated);
    }

    function postUser(person){
        const promise = fetch("http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person)
        });
        return promise;
    }

    function updateList(person){
        postUser(person)
            .then( (res) => {
                // SetCharacters if we get proper HTTP Response 201
                // else log it and ignore
                if (res.status === 201){
                    setCharacters([...characters, person]);
                } else {
                    console.log(`Status code ${res.status} not 201`)
                }
            })
            .catch( (error) => console.log(error) );
    }

    return (
        <div className="container">
            <Table characterData={characters}
                removeCharacter={removeOneCharacter}/>
            <Form handleSubmit={updateList} />
        </div>
    );
}

export default MyApp;
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
            .then((res) => {
                if (res.status === 201){
                    // If we got the proper response code, convert
                    // to json and add to characters
                    res.json().then(
                        (json) => {
                            console.log(json);
                            setCharacters([...characters, json]);
                        }
                    ).catch( (error) => console.log(error));
                } else {
                    console.log(`Status code ${res.status} not 201`);
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
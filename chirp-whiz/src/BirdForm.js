import React, { useState } from 'react';
import API, { graphqlOperation } from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub';
import { createTodo } from './graphql/mutations'
import config from './aws-exports'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

API.configure(config);
PubSub.configure(config);

async function createNewTodo(newBird) {
    const todo = {
        name: newBird.birdName,
        image: newBird.birdImage,
        sound: newBird.birdSound,
        habitatImage: newBird.habitatImage,
        habitatSound: newBird.habitatSound  
    }

    window.location.reload(false);

    await API.graphql(graphqlOperation(createTodo, { input: todo }))
}

export function updateBird(target, newBird) {
    const name = target.name;
    let tempBird = newBird;
    tempBird[name] = target.value;

    return tempBird;
}

function BirdForm() {
    const [newBird, setNewBird] = useState({
        birdName: "",
        birdImage: "",
        birdSound: "",
        habitatImage: "",
        habitatSound: ""
    });

    function fillingForm(e) {
        setNewBird(updateBird(e.target, newBird));
    }

    return(
        <div>
            <h1>Bird Form</h1>
        <Card border="primary">
        <Card.Body>
            <form>
                <label>
                    Name of bird:<br/>
                    <input name="birdName" type="text" onChange={fillingForm}/>
                </label><br />
                <label>
                    Image of bird:<br/>
                    <input name="birdImage" type="text" onChange={fillingForm}/>
                </label><br />
                <label>
                    Sound clip of bird:<br/>
                    <input name="birdSound" type="text" onChange={fillingForm}/>
                </label><br />
                <label>
                    Habitat image of bird:<br/>
                    <input name="habitatImage" type="text" onChange={fillingForm}/>
                </label><br />
                <label>
                    Habitat sound of bird:<br/>
                    <input name="habitatSound" type="text" onChange={fillingForm}/>
                </label><br />
            </form>
            <Button variant="outline-light" style={{backgroundColor: "#ffa333"}} onClick={() => createNewTodo(newBird)}>Add Bird</Button>
      </Card.Body>
      </Card>
        </div>
    );
}

export default BirdForm;
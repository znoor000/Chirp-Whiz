import React, { useState } from 'react';
import API, { graphqlOperation } from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub';
import { createTodo } from './graphql/mutations'
import config from './aws-exports'

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

    await API.graphql(graphqlOperation(createTodo, { input: todo }))
}

function BirdForm() {
    return(
        <div>
            <h2>Bird Form</h2>
            <form>
                <label>
                    Name of bird:
                </label><br />
                <label>
                    Image of bird:
                </label><br />
                <label>
                    Sound clip of bird:
                </label><br />
                <label>
                    Habitat image of bird:
                </label><br />
                <label>
                    Habitat sound of bird:
                </label><br />
            </form>
            <button>Add Bird</button>
        </div>
    );
}

export default BirdForm;
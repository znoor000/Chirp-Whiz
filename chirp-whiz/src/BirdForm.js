import React, { useState } from 'react';
import API, { graphqlOperation } from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub';
import { createTodo } from './graphql/mutations'
import config from './aws-exports'

API.configure(config);
PubSub.configure(config);

async function createNewTodo(birdName, birdImage, birdSound, backgroundImage, backgroundSound) {
    const todo = {
      name: birdName,
      image: birdImage,
      sound: birdSound,
      habitatImage: backgroundImage,
      habitatSound: backgroundSound
    }

    await API.graphql(graphqlOperation(createTodo, { input: todo }))
}

function BirdForm() {
    return(
        <div>
            <h2>Bird Form</h2>
            {/* Bird Form code */}
        </div>
    );
}

export default BirdForm;
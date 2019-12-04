import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

function compare(a, b) {
    const scoreA = a.score;
    const scoreB = b.score;

    let comparison = 0;
    if (scoreA > scoreB) {
        comparison = 1;
    } else if (scoreA < scoreB) {
        comparison = -1;
    }

    return comparison;
}


function totalPercent(user) {
    let percent = 0;
    let corrTotal = user.correct.reduce((a, b) => a + b, 0);
    let incorrTotal = user.incorrect.reduce((a, b) => a + b, 0);

    if (corrTotal > 0 || incorrTotal > 0) {
        percent = (corrTotal/(corrTotal+incorrTotal))*100;
    }

    return percent.toFixed(2);
}

function scorify(users) {
    let newUserArray = [];
    for (let i = 0; i < users.length; i++) {
        newUserArray.push({
            name: users[i].name,
            score: totalPercent(users[i])
        })
    }
    return newUserArray;
}
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
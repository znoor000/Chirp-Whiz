import React from 'react';
import QuizQuestion from './quizComponents/QuizQuestion';
import Image from 'react-bootstrap/Image'
import AudioButton from './quizComponents/AudioButton'
import birdList from './birdList';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitForElement } from '@testing-library/react'
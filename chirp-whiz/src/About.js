import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';

function About() {
    return (
        <div>
            <br />
            <Jumbotron>
            <h1>About this Web Application:</h1>
            <p>Chirp Whiz started off as a simple idea for bird-lovers 
                who are stuck in the city or don't have spare time. </p>

                <p>Please peruse the glossary to get to know the birds on 
                our app and then quiz yourself to see how well you do at 
                identifying our birds! You can also use the tutorial to 
                practice without having your scores affected. </p>

                <p>You can check how well you identify 
                each bird in your stats on the User page. You can also view 
                the top players in our leaderboard in the Quiz page.</p>

                <p>On the Quiz page you can choose to identify a bird given 
                audio, image, or both. You can also choose the size of your 
                quiz session by choosing 5, 10, or 20 questions per quiz. 
                Lastly, you can limit the range of birds based on habitat - 
                select all habitats to be quized on ANY bird! 
            </p>
            </Jumbotron>
            <br/>
            <Jumbotron>
            <h1>Contact Us:</h1>
            <p>Email: lboylan000@citymail.cuny.edu or znoor000@citymail.cuny.edu</p>
            <p>If you want to see a bird that we do not have on our  
               website please let us know! It would really help if 
               you can include the name of the bird and links to audio 
               and images of it!</p>
            </Jumbotron>
            <br/>
            <Jumbotron>
            <h4>Credits:</h4>
            <p>This website was made possible by the United States 
                Geological Survey (USGS) and The Cornell Lab. Our 
                bird songs have been sourced from the USGS. All 
                other bird information and images are from The 
                Cornell Lab's All About Birds website.
            </p>
            <br/>
            <p>Thanks for checking out this site!</p>
            <p>Hangill Chong</p>
            <p>Liam Boylan</p>
            <p>Luis Medina</p>
            <p>Zohora Noor</p>
            </Jumbotron>
        </div>
    );
}

export default About;

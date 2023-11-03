const express = require('express');
const app = express();
const port = 5000;

const motoGP = [
    {
        circuit: 'Losail',
        location: 'Qatar',
        winner: {
            firstName: 'Andrea',
            lastName: 'Dovizioso',
            country: 'Italy'
        }
    },
    {
        circuit: 'Autodromo',
        location: 'Argentine',
        winner: {
            firstName: 'Cal',
            lastName: 'Crutchlow',
            country: 'UK'
        }
    },
    {
        circuit: 'De Jerez',
        location: 'Spain',
        winner: {
            firstName: 'Valentino',
            lastName: 'Rossi',
            country: 'Italy'
        }
    },
    {
        circuit: 'Mugello',
        location: 'Italy',
        winner: {
            firstName: 'Andrea',
            lastName: 'Dovizioso',
            country: 'Italy'
        }
    }
];

app.get('/', (req, res) => {
    res.send(motoGP);
});

app.get(`/country`,(req,res)=>{
    const countries = motoGP.map(race => race.winner.country);
    res.send(countries);
});

app.get('/name', (req, res) => {
    const winnerNames = motoGP.map(race => `${race.winner.firstName} ${race.winner.lastName}`);
    res.send(winnerNames);
});

app.get('*', (req, res) => {
    res.status(400).send('Bad Request');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
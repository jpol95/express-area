const express = require('express');
const app = express();
const morgan = require("morgan")
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.get('/burger', (req, res) => {
    res.send('<h1>We have juicy BeeseChurgers</h1>')
})

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
      Base URL: ${req.baseUrl}
      Host: ${req.hostname}
      Path: ${req.ip}
    `;
    res.send(responseText);
  });

  app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end(); //do not send any data back to the client
  });

  app.get("/sum", (req, res) => {
      const a = parseInt(req.query.a)
      const b = parseInt(req.query.b)
      if (!a){
          return res.status(400).send("Please provide a")
      }
      if (!b){
          return res.status(400).send("Please provide b")
      }
      const answer = `The sum of ${a} and ${b} is ${a + b}`
      res.send(answer)
  })

  app.get('/cipher', (req, res) => {
      const text = req.query.text
      const shift = parseInt(req.query.shift)
      if (!text) return res.status(400).send("Please enter a string to be encrypted")
      if (!shift) return res.status(400).send("Please enter a shift value")
      let result = ''
      for (let char of text) result += String.fromCharCode(((char.charCodeAt(0) + shift) - 97)%26 + 97)
      res.send(result)
  })

  app.get("/lotto", (req, res) => {
      const lottoNums = []
      if (!req.query.arr || !Array.isArray(req.query.arr) || req.query.arr.length != 6) res.status(400).send("Please enter 6 numbers")
      for (let entry in req.query.arr) lottoNums.push(parseInt(entry))
      const winningNums = []
      for (let i = 0; i < 6; i++){
        if (lottoNums.includes(Math.ceil(Math.random()*10))) winningNums.push(lottoNums[i])
      } 
      if (winningNums.length < 4) res.send("You lost. Damn that sucks bro hahahahahahahahahahahha")
      if (winningNums.length === 4) res.send("Free ticket")
      if (winningNums.length === 5) res.send("100 buckos")
      if (winningNums.length === 6) res.send("3IHBGEWRLGHWRHWERBGLEWRHGEWRL UYOU WON")
  })

  app.get('/greetings', (req, res) => {
    //1. get values from the request
    const name = req.query.name;
    const race = req.query.race;
  
    //2. validate the values
    if(!name) {
      //3. name was not provided
      return res.status(400).send('Please provide a name');
    }
  
    if(!race) {
      //3. race was not provided
      return res.status(400).send('Please provide a race');
    }
  
    //4. and 5. both name and race are valid so do the processing.
    const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;
  
    //6. send the response 
    res.send(greeting);
  });

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});


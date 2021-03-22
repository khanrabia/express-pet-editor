const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})

let pets = [
  {
    id: 1,
    species: "Dog",
    name: "Fido", 
    age: "5 years",
    notes: "Cute guy",
    likes: 0
  },
  {
    id: 2,
    species: "Cat",
    name: "Fluffy", 
    age: "8 months",
    notes: "Adorable girl",
    likes: 0
  },
  {
    id: 3,
    species: "Bird",
    name: "Polly", 
    age: "3 years",
    notes: "Lovable fellow",
    likes: 0
  },
]

app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})

app.get('/', (req, res) => {
  res.render("home.ejs", {pets})
})

app.get('/pets', (req, res) => {
  res.redirect('/')
})

app.use("/home/:id/", (req,res)=> {
  let addPet = pets.find(pet => pet.id === parseInt(req.params.id))
  if(addPet || req.params.id === "new"){
    req.addPet = addPet;
    next()
  } else{
    res.render("notfound.ejs", {name: "NOT FOUND"});
  }

})

app.put("/home/:id" ,(req, res)=> {
  let {name, species, age, notes, likes} = req.body;

  req.addPet.name = name;
  req.addPet.species = species;
  req.addPet.age = age;
  req.addPet.notes = notes;
  req.addPet.likes = likes;

})

app.patch("/home/:id", (req, res) => {
  req.addPet.done = !req.addPet.done;
  res.redirect(`/home/${req.params.id}`)
})
app.get("*", (req, res) => {
  res.render("notfound.ejs", {title: "Not Found"})
})
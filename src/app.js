const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/", (request, response) => {
  // const repositories = request.query;
  
 });

app.get("/repositories", (request, response) => {
 
  return response.json(repositories);
  
});

app.post("/repositories", (request, response) => {
    
    const { title, url, techs } = request.body;
    const repository = {id: uuid(), title, url, techs, like: 0};
    repositories.push(repository);
    return response.json(repository); 
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

    if (repositoryIndex < 0){
      return response.status(400).json({error: 'Repository not found.'});
    }
    const like = repositories[repositoryIndex].like;
   
    const repository = {
      id,
      title,
      url,
      techs,
      like,
    };
    repositories[repositoryIndex] = repository;

    return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  
    const { id } = request.params;

    const repositoryIndex = repositories.findIndex(repository => repository.id == id);

    if (repositoryIndex < 0){
        return response.status(400).json({error: 'repository not found.'})
    }

    repositories.splice(repositoryIndex, 1);

    return response.status(204).send();
  
});

app.post("/repositories/:id/like", (request, response) => {
      const { id } = request.params;
     
      const repositoryIndex = repositories.findIndex(repository => repository.id == id);
     
      if (repositoryIndex < 0){
        return response.status(400).json({error: 'Repository not found.'});
      }
     
    const intLike = repositories[repositoryIndex].like;
    repositories[repositoryIndex].like = (intLike +1);
     
     const repository = repositories[repositoryIndex];
     
     return response.json(repository);
});

module.exports = app;

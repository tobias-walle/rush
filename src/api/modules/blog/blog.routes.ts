import { Router } from 'express';
import { BlogStorage } from './blog.storage';

export const blogRouter = Router();

let storage;
if (module['hot'] && module['hot']['data'] && module['hot']['data']['storage']) {
  storage = module['hot']['data']['storage'];
} else {
  storage = new BlogStorage();
}

// Get all articles
blogRouter.get('/articles', (req, res) => {
  res.status(200).send(storage.articles);
});

// Get one articles
blogRouter.get('/articles/:id', (req, res) => {
  let {id} = req.params;
  let article = storage.getArticle(id);
  if (article) {
    res.status(200).send(article);
  } else {
    res.status(404).send();
  }
});

// Create an article
blogRouter.put('/articles', (req, res) => {
  let article = req.body;
  if (article && article.id) {
    storage.addArticle(article);
    res.status(201).send();
  } else {
    res.status(400).send();
  }
});

// Delete one articles
blogRouter.delete('/articles/:id', (req, res) => {
  let {id} = req.params;
  let article = storage.getArticle(id);
  if (article) {
    storage.removeArticle(article);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});


if (module['hot']) {
  module['hot'].dispose((data) => {
    data['storage'] = storage;
  });
}

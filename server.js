import http from 'http';

import homePage from './views/home/index.html.js';
import siteCss from './content/images/styles/site.css.js';
import addBreadPage from './views/addBreed.html.js';
import addCatPage from './views/addCat.html.js';

const cats = [
   {
      id: 1,
      imageUrl:'https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg',
      breed: 'Bombay Cat',
      description:'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',
   },
   {
      id: 2,
      imageUrl:'https://cdn.pixabay.com/photo/2015/06/19/14/20/cat-814952_1280.jpg',
      breed: 'Bombay Cat',
      description:'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',
   },
   {
      id: 3,
      imageUrl:'https://cdn.pixabay.com/photo/2018/08/08/05/12/cat-3591348_1280.jpg',
      breed: 'Bombay Cat',
      description:'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',
   },
   {
      id: 4,
      imageUrl:'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg',
      breed: 'Bombay Cat',
      description:'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',
   },
   {
      id: 5,
      imageUrl:'https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg',
      breed: 'Bombay Cat',
      description:'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',
   },
]

const server = http.createServer((req, res) => {
   if (req.url === '/styles/site.css') {
      res.writeHead(200, {
         'content-type': 'text/css',
      });

      res.write(siteCss);
      return res.end();
   }
   res.writeHead(200, {
      'content-type': 'text/html',
   });

   switch(req.url) {
      case '/':
         res.write(homePage);
         break;
      case '/cats/add-breed':
         res.write(addBreadPage);
         break;
      case '/cats/add-cat':
         res.write(addCatPage);
         break;      
      default:
         res.write('Page not found!')
         break;   
   }

 

   res.end();
});

server.listen(5000);
console.log('Server is listening on http://localhost:5000..')
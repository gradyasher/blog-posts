const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {BlogPosts} = require('./models');

const jsonParser = bodyParser.json();
const app = express();

app.use(morgan('common'));

app.use(jsonParser)

const content = [ 
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porta ut felis eu finibus. In hac habitasse platea dictumst. Mauris orci elit, ultrices at ante eu, tristique rutrum purus. Donec maximus metus eu felis dictum lobortis. Nulla eu imperdiet massa. Praesent volutpat ut ante eu efficitur. Pellentesque tempor lacus quis orci rhoncus, consectetur facilisis mauris ornare. Pellentesque elementum consequat fringilla. Morbi commodo massa nec convallis efficitur. Ut rhoncus vehicula elit sit amet interdum. Fusce ac quam sit amet magna scelerisque volutpat sed vitae eros. Proin eu lacinia libero. Fusce hendrerit velit vel ligula convallis facilisis. Nam nec faucibus enim, vitae volutpat sem. Vestibulum placerat dictum lacinia. Ut pharetra orci eget risus eleifend, id sollicitudin lorem hendrerit. Pellentesque sit amet velit commodo, vehicula est sed, ultricies nisi. Cras pulvinar rhoncus nisi sed euismod. Donec finibus risus non arcu auctor tincidunt. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
	"Curabitur tincidunt tristique nulla, eget laoreet lectus maximus eget. Nulla justo sem, condimentum nec nibh eget, blandit tempus nisi. Quisque in massa pellentesque, gravida lacus sit amet, semper nunc. Nullam egestas bibendum massa, sit amet imperdiet nunc ullamcorper sed. Cras porta sapien eu suscipit aliquam. Maecenas iaculis fringilla mi in commodo. Nam ut vestibulum elit. Donec vitae imperdiet justo. Nullam nec dignissim nunc, vel rutrum eros. Duis elementum quis orci aliquet molestie. Sed vehicula, nunc nec consectetur scelerisque, lorem ante feugiat augue, in facilisis sem augue at elit. Quisque tortor arcu, tempus at ornare sit amet, lobortis vestibulum magna. Donec consequat urna et odio finibus ultrices. Pellentesque pretium nibh metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla metus leo, vehicula vitae eleifend bibendum, tincidunt et massa. Nullam semper sem quis enim ullamcorper ultrices. Praesent tortor risus, rhoncus vitae rutrum in, varius id ipsum. Sed sed lectus pharetra, mattis arcu in, interdum velit. Suspendisse ultrices faucibus risus, nec blandit est luctus in. Cras sit amet consequat nisl. Aliquam erat volutpat. Duis viverra sodales arcu, ac scelerisque tellus. In mollis ut eros quis auctor. Nam vitae interdum dolor. Pellentesque libero justo, euismod id risus at, facilisis aliquam ipsum. Duis ac mauris sagittis, feugiat massa quis, fringilla massa. Aenean rutrum libero leo, vel hendrerit est suscipit vitae.",
	"Nulla metus leo, vehicula vitae eleifend bibendum, tincidunt et massa. Nullam semper sem quis enim ullamcorper ultrices. Praesent tortor risus, rhoncus vitae rutrum in, varius id ipsum. Sed sed lectus pharetra, mattis arcu in, interdum velit. Suspendisse ultrices faucibus risus, nec blandit est luctus in. Cras sit amet consequat nisl. Aliquam erat volutpat. Duis viverra sodales arcu, ac scelerisque tellus. In mollis ut eros quis auctor. Nam vitae interdum dolor. Pellentesque libero justo, euismod id risus at, facilisis aliquam ipsum. Duis ac mauris sagittis, feugiat massa quis, fringilla massa. Aenean rutrum libero leo, vel hendrerit est suscipit vitae. Phasellus ultricies luctus iaculis. Nulla id quam at nibh suscipit porttitor. Integer venenatis ac magna id auctor. Cras consectetur vel tortor sed lobortis. Morbi eleifend velit at varius laoreet. Aliquam fringilla arcu orci, a tristique est vehicula sagittis. Praesent volutpat orci purus, eu hendrerit lacus consectetur et. Praesent aliquam nisi tincidunt nulla sodales volutpat. Vivamus et dui in urna condimentum vestibulum. Vestibulum ultricies odio sit amet nulla vestibulum, ac elementum neque rhoncus. Sed ut augue sed ex interdum viverra sit amet et nibh. Ut cursus, ligula quis mattis egestas, eros turpis porttitor nulla, ut lobortis justo massa vestibulum lorem. Fusce dictum eu arcu a molestie. Morbi viverra et tellus id maximus. Suspendisse potenti."
]

BlogPosts.create("Lorem", content[0], "Ipsum", "500 BCE")
BlogPosts.create("Dolor", content[1], "Sit", "400 BCE")
BlogPosts.create("Porta", content[2], "Finibus", "500 BCE")


app.get('/blog-posts', (req, res) => {
  res.json(BlogPosts.get())
})

app.post('/blog-posts', (req, res) => {
  const requiredFields = [title, content, author, publishDate]
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i]
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message)
      return res.status(400).send(message)
    }
  }

  const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
  res.status(201).json(item)
});

app.put('/blog-posts', (req,res) => {
	const requiredFields = ['title', 'content', 'author', 'publishDate', 'id']
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i]
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message)
      return res.status(400).send(message)
    }
  }
  const updatedPost = BlogPosts.update(req.body)
  res.json(updatedPost)
})

app.delete('/blog-posts', (req, res) => {
	BlogPosts.delete(req.body.id)
	res.json(BlogPosts.get())
})

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});

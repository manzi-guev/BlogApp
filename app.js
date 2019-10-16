var bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  express = require('express'),
  app = express();
// APP CONFIG
mongoose.connect('mongodb://localhost/restful_blog_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// MONGOOSE/MODEL CONFIG
var BlogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  createdOn: { type: Date, default: Date.now }
});

var Blog = mongoose.model('Blog', BlogSchema);
// RESTFUL ROUTES
app.get('/', (req, res) => {
  res.send('Hello');
});
app.get('/blogs', (req, res) => {
  Blog.find({}, function(err, allblogs) {
    if (err) {
      console.log('ERROR!!!');
    } else {
      res.render('index', { blogs: allblogs });
    }
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is running`));

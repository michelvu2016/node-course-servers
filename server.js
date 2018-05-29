/**
 * http://usejsdoc.org/
 */

const express = require('express');
const hbs = require('hbs');;
const fs = require('fs')

const currentYear  = new Date().getFullYear();

const MAINTENANCE = false;

var port = 3000;
var host = 'localhost';

if (process.env.PORT)
	{
	   port = process.env.PORT;
	   host = '0.0.0.0';
	}



var app = express();

hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('getCurrentYear', () => {return new Date().getFullYear()});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.set('view engine', 'hbs');



app.use((req, res, next) => {
	let now = new Date().toString();
	let msg = `${now}: ${req.method}:${req.url}`;
	
	fs.appendFile('server.log', msg + "\n", (err) =>{});
	
	next();
});

app.use((req, res, next) => {
	if(MAINTENANCE)
		{
			res.render('maintenance.hbs',{
				pageTitle : 'Healthy Eating..',
				homeTitle : 'Healthy Life',
				maintWindow : '2-3 am'
				
			});
		}
	else
		{
			next();
		}
	
});

app.use(express.static(__dirname + "/public"));

app.get('/hobbies', (req, res) => {
	res.send({
		name: 'Mike Vu',
		likes: [
			'Biking',
			'Cities'
		]
	});
});

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle : 'Healhy Eating',
		currentYear : currentYear,
		homeTitle : 'Healthy Eating habits...' 
	})
	
});

app.get('/projects', (req, res) => {
	res.render("project.hbs", {
		pageTitle: 'Project Page',
		projectTitle: 'Node project',
		currentYear : currentYear
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
		currentYear : currentYear
		
	});
})

app.get('/info', (req, res) => {
	res.send({
		cat: "Health",
		toptic: "How to cure psoriasis"
	});
});

app.listen(port, host, () => {
	
	console.log(`Server listening on port ${port}`);
});



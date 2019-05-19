const express = require('express');
const bodyParser =require('body-parser');
const bcrypt =require('bcrypt-nodejs');
const cors =require('cors');
const knex = require('knex');
const register=require('./Controllers/register');
const signin=require('./Controllers/signin');
const profile=require('./Controllers/profile');
const image=require('./Controllers/image');

const db=knex({
	client:'pg',
	connection:{
		host:'127.0.0.1',
		user:'postgres',
		password:'1515',
		database:'smart_brain'
	}
})

db.select('*').from('users').then(data=>{
	console.log(data);
});
 
const app = express();
app.use(bodyParser.json());
app.use(cors());
//singin --> Post = Success / fail
app.post('/signin',signin.handleSignin(db,bcrypt));
//register --> Post = user
app.post('/register',register.handleRegister(db,bcrypt));
//profile/:userId --> Get =user
app.get('/profile/:id',profile.handleProfile(db));
//image --> PUT -->User
app.put('/image', image.handleImage(db));

app.listen(3001,()=>{
	console.log('app is running on port 3001')
})
const handleProfile=(db)=>(req,res)=>{
	const { id }=req.params;
	db.select('*').from('users').where({id})
	.then(user=>{if(user.length){res.json(user[0])}else{ res.status(404).json('no data found')}})
	.catch(err =>res.status(404).json('sominth went wrong'))
}

module.exports={
    handleProfile:handleProfile
}
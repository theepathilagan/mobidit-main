const { prisma } = require('../../services/prismaClient');
const passport = require('passport');
const LocalStrategy = require('passport-local')
var crypto = require('crypto');

//permet de verifier si le nom et mdp sont correct.
const verify = async( req, res ) =>{
  const { body:{
    username,
    password
  } } = req;
};

// Fonction de connexion
const login = async(req, res) =>{
  const { body:{
    username,
    password
  } } = req;
  try{
  const dbPassword = await prisma.users.findUnique({
    where: {
      username
    },
  });
  // Effectue le hachage du mot de passe fourni par l'utilisateur
  const hashedPassword = await crypto.pbkdf2Sync(password, process.env.SALT, 1000, 64, `sha512`).toString(`hex`); 
  if(dbPassword.password === hashedPassword){
    return res.json({
			succes: true,
      data: {
        id:dbPassword.id,
        username: dbPassword.username,
        img_url: dbPassword.img_url
      },
			message:"Connexion réussi",
			code: 200,
		});
  } else{
    return res.json({
			succes: false,
			message:"Mot de passe incorrect.",
			code: 200,
		});
  }

} catch (error) {
  console.log(error);
  let message;
  if(error == "ReferenceError: user is not defined"){
    message = "nom d'utilisateur incorrect."
  };
  return res.json({
    succes: false,
    message,
    code: 404,
  });
};
}

module.exports = {
  verify,
  login
};

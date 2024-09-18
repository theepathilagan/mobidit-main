const { prisma } = require('../../services/prismaClient');

const index = async (req, res) => {
	try {
		const posts = await prisma.posts.findMany();
		res.json({
			succes: true,
			data: posts,
			code: 200,
		});
	} catch (error) {
		return res.json({ succes: false, data: { error }, code: 400 });
	};
};

const show = async (req, res) =>{
  const {
		params: { id },
	} = req;
  try{
    const post = await prisma.posts.findUnique({
      where: {
        id:parseInt(id, 10)
      }
    });
    const subPost = await prisma.posts.findMany({
      where:{
        parent_id:post.id
      },
      orderBy: {
        date:'desc'
      },
      include:{
        users:{
          select:{
            username: true,
            img_url: true
          }
        }
      }
    });
      return res.json({
        succes: true,
        post,
        subPost,
        code: 200,
      });
      // return res.json({
      //   succes: true,
      //   message: 'Aucun posts a afficher.',
      //   code: 200,
      // });
  } catch (error){
    console.log(error);
		return res.json({ succes: false, data: { error }, code: 400 });
  }
};

const showUser = async (req, res) => {
  const {
		params: { username },
	} = req;
  try{
    const user = await prisma.users.findUnique({
			where: {
				username,
			},
		});
    const posts = await prisma.posts.findMany({
      where: {
        NOT:{
          user_id:user.id,
        }
      },
      orderBy: {
        date:'desc'
      },
      include:{
        users:{
          select:{
            username: true,
            img_url: true
          }
        }}
    });
      return res.json({
        succes: true,
        data: posts,
        code: 200,
      });
  } catch (error){
    console.log(error);
		return res.json({ succes: false, data: { error }, code: 400 });
  }
};

const create = async (req, res) =>{
  const { body:{
    text,
    parent_id,
    user_id,
    likes,
    dislike
  } } = req;
  try{
    const createPost = await prisma.posts.create({
      data: {
        text,
        user_id: parseInt(user_id, 10) || undefined,
        likes: parseInt(likes, 10) || undefined,
        dislike: parseInt(dislike, 10) || undefined,
        parent_id: parseInt(parent_id, 10) || undefined,
        date: new Date()
      },
    });
    return res.json({
      succes: true,
      data: createPost,
      code: 200
    });
  } catch(error){
    console.log(error);
    return res.json({ succes: false, error, code: 400});
  }
};

const update = async (req, res) =>{
  const {
		params: { id },
	} = req;
	const { body } = req;
  try{
    const updatePost = await prisma.posts.update({
      where:{
        id,
      },
      data: {
				...body,
			},
    });
    return res.json({
      succes: true,
      data: updatePost,
      code: 200
    });
  } catch(error){
    return res.json({ succes: false, error, code: 400});
  }
};

const supprimer = async(req, res) => {
  const {
		params: { id },
	} = req;
	try{
		const deletePost = prisma.users.delete({
			where: {
				id,
			},
		});
		return res.json({
			succes: true,
			data: deletePost,
			code: 200,
		});
	}catch (error) {
		return res.json({ succes: false, data: { error } });
	};
}

module.exports = {
  index,
  show,
  showUser,
  create,
  update,
  supprimer
};
import { Hono } from 'hono'
import { PrismaClient } from '../generated/prisma'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt';
import { createBlogPost, updateBlogPost } from 'hardposts-common';

type Bindings = {
  DATABASE_URL: string
  JWT_SECRET: string
}

type Variables = {
  userId: string
}

const blogsRouter = new Hono<{ Bindings: Bindings; Variables: Variables }>();




blogsRouter.get('/bulk', async (c) => {
    try{
    const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany({ select:{
    id: true,
    title: true,
    content: true,
    authorId: true,
    createdAt: true,
    published: true,
    author:{
      select:{
        name: true
          }
  } }});
  return c.json({ blogs });

    }catch(err){
      return c.json({ message: err }, 500)
    }
})

blogsRouter.get('/:id', async (c) => {
	const id = c.req.param('id')
	try{
    const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blog = await prisma.post.findFirst({
        where: { id: id },
        select:{
    id: true,
    title: true,
    content: true,
    authorId: true,
    createdAt: true,
    published: true,
    author:{
      select:{
        name: true,
          }
  } }
    })
    return c.json({  blog : blog })
    }catch(err){
      return c.json({ message: err }, 500)
    }
})

blogsRouter.use('/*', async (c, next) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ message: 'Unauthorized' }, 401);
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = await verify(token, c.env.JWT_SECRET);

    if (!payload) {
      return c.json({ message: 'Invalid token' }, 401);
    }
  c.set('userId', payload.id as string);
  await next();
  }  catch (err) {
    return c.json({ message: 'Invalid token' }, 401);
  }
  
});

blogsRouter.post('/create', async (c)=>{
    try{
    const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()
    body.authorId = c.get('userId');

    const {success} = createBlogPost.safeParse(body);
    if(!success){
      return c.json({ message: 'Invalid input' }, 400)
    }
    const blog = await prisma.post.create({
      data:{
        title: body.title,
        content: body.content,
        authorId: body.authorId,
        published: body.published
      } 
    })
    return c.json({ message: 'Blog Created',  blog })
    }catch(err){
      return c.json({ message: err }, 500)
    }
})


blogsRouter.put('/edit/:id', async (c) => {
	try{
    const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const postId = c.req.param('id');
    const {success} = updateBlogPost.safeParse(body);
    if(!success){
      return c.json({ message: 'Invalid input' }, 400)
    }
    const blog = await prisma.post.update({
        where: { id: postId, authorId: c.get('userId') },
      data:{
        title: body.title,
        content: body.content,
      } 
    })
    return c.json({ message: 'Blog Updated',  blog })
    }catch(err){
      return c.json({ message: err }, 500)
    }
})

export default blogsRouter;

import { Hono } from 'hono'
import { PrismaClient } from '../generated/prisma'
import { withAccelerate } from '@prisma/extension-accelerate'
import bcrypt from 'bcryptjs';
import { jwt, sign, verify } from 'hono/jwt';
import {signupInput, updateProfileInput} from 'hardposts-common'

type Bindings = {
  DATABASE_URL: string
  JWT_SECRET: string
}
type Variables = {
  userId: string
}
const userRouter = new Hono<{ Bindings: Bindings, Variables: Variables }>();


userRouter.post('/signup', async (c)=>{
  try{
    const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const {success} = signupInput.safeParse(body);
  if(!success){
    return c.json({ message: 'Invalid input' }, 400)
  }
  const hashedPassword = await bcrypt.hash(body.password, 11);

  const user = await prisma.user.create({
    data:{
      email: body.email,
      password: hashedPassword
    } 
  })
  const token = await sign({ id: user.id, exp:Math.floor(Date.now()/1000)+60*60*24 }, c.env.JWT_SECRET);
  c.set('userId', user.id);


  return c.json({ message: 'Signup successful', jwt: token })

  }catch(err){
    return c.json({ message: err }, 500)
  }
});


userRouter.post('/signin', async (c)=>{

  try{
  const body = await c.req.json();
  const{success} = signupInput.safeParse(body);
  if(!success){
    return c.json({ message: 'Invalid input' }, 400)
  }

  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const user = await prisma.user.findUnique({
    where:{
      email: body.email,
    }
  })

  if(!user){
    return c.json({ message: 'User not found' }, 404)
  }

  const isPasswordValid = await bcrypt.compare(body.password, user.password);

  if(!isPasswordValid){
    return c.json({ message: 'Invalid password' }, 401)
  }
  
  const token = await sign({ id: user.id, exp:Math.floor(Date.now()/1000)+60*60*24}, c.env.JWT_SECRET);
  c.set('userId', user.id);

  return c.json({ message: 'Signin successful', jwt: token })

  }catch(err){
    return c.json({ message: err }, 500)
  }
  });



 userRouter.use('/*', async(c, next)=>{

  try{
    const authHeader = c.req.header('Authorization');
    if(!authHeader || !authHeader.startsWith('Bearer ')){
      return c.json({ message: 'Authorization header missing or malformed' }, 401)
    }
    const token = authHeader.split(' ')[1];
    const payload = await verify(token, c.env.JWT_SECRET);
    c.set('userId', payload.id as string);
    await next();

  }catch(err){
    return c.json({ message: 'Unauthorizeddd' }, 401) 
  }

 }) 

 userRouter.post('/signout', async (c)=>{
  try{
    const userId = c.get('userId');
    const token = await sign({ id: userId, exp:Math.floor(Date.now()/1000)}, c.env.JWT_SECRET);
    return c.json({ message: 'Signout successful', jwt: token })
  }catch(err){
    return c.json({ message: err }, 500)
  }
});

userRouter.get('/profile', async (c)=>{
  try{
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const userId = c.get('userId');

  const user = await prisma.user.findFirst({
    where:{
      id: userId,
    },
    select:{
      id: true,
      email: true,
      name: true,
    }
  })
  if(!user){
    return c.json({ message: 'User not found' }, 404)
  }
  return c.json({ user })

}catch(err){
  return c.json({ message: err }, 404)
}
});

userRouter.put('/profile/edit', async (c)=>{
  try{
    const prisma = new PrismaClient({
      accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const userId = c.get('userId');
    const {success} = updateProfileInput.safeParse(body);
    if(!success){
      return c.json({ message: 'Invalid input' }, 400)
    }
    const updatedUser = await prisma.user.update({
      where:{
        id: userId,
      },
      data:{
        name: body.name,
        password: body.password ? await bcrypt.hash(body.password, 11) : undefined,
      }
    })
    return c.json({ message: 'Profile updated successfully' })
  }catch(err){
    return c.json({ message: err }, 500)
  }
});

export default userRouter;
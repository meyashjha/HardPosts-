import { Hono } from 'hono'
import  userRouter  from './routes/user';
import blogsRouter from './routes/blogs';
import { cors } from 'hono/cors'




type Bindings = {
  DATABASE_URL: string
  JWT_SECRET: string
}
const app = new Hono<{ Bindings: Bindings }>();
app.use('/*', cors({
  origin: 'http://localhost:5173',
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogsRouter); 

app.get('/', (c) => {
  return c.text('Hello Blogger!')
})

export default app


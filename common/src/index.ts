import z from 'zod';

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});
export type signupInputType = z.infer<typeof signupInput>;


export const updateProfileInput = z.object({
    name: z.string().min(2).max(100).optional(),
    password: z.string().min(6).optional()
})
export type updateProfileInputType = z.infer<typeof updateProfileInput>;


export  const createBlogPost = z.object({
    title: z.string().min(3).max(200),
    content: z.string().min(10),
    authorId: z.string(),
})
export type createBlogPostType = z.infer<typeof createBlogPost>;


export const updateBlogPost = z.object({
    title: z.string().min(3).max(200).optional(),
    content: z.string().min(10).optional(),
})
export type updateBlogPostType = z.infer<typeof updateBlogPost>;
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Post } from "../entity/Post";
import { paginateResponse } from "../helpers";
import { validationResult } from "express-validator";
import { User } from "../entity/User";

export class PostService {
  public static postRepository = AppDataSource.getRepository(Post)

  public static async createPost(req: any) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return { status_code: 422, message: errors.mapped() }
      }
  
      const user = await AppDataSource.getRepository(User).findOneBy({ id: parseInt(req.body.userId) })
      
      const post = new Post()
      post.title = req.body.title
      post.content = req.body.content
      post.author = req.body.author
      post.user = user
  
      await this.postRepository.save(post)
  
      return {
        status_code: 201,
        message: "Post created!",
        post: post
      }
      
    } catch (error) {
      console.error(error);
      return { status_code: 500, message: "An error occured while creating post" }
    }
  }

  public static async getAllPosts(req: any) {
    try {
      const page = parseInt(req.query.page as string) || 1
      const limit = parseInt(req.query.limit as string) || 5
      const skip = (page - 1) * limit
      const search = req.query.search
  
      let posts = await this.postRepository
        .createQueryBuilder("posts")
        .skip(skip)
        .take(limit)
        .getMany()
      
      // check if there is a search query
      if (search) {
        posts = await this.postRepository
          .createQueryBuilder("posts")
          .where("posts.title LIKE :search OR posts.content LIKE :search OR posts.author LIKE :search", { search: '%' + search + '%' })
          .skip(skip)
          .take(limit)
          .getMany()
      }
      const totalCount = posts.length
      const paginatePostResponse = paginateResponse(posts, page, limit, totalCount)
  
      return { status_code: 200, ...paginatePostResponse }
      
    } catch (error) {
      console.error(error);
      return { status_code: 500, message: "An error occured while creating posts" }
    }
  }

  public static async getOnePost(id: number) {
    try {
      const post = await this.postRepository.findOneBy({ id: id })
      if (!post) {
        return  { status_code: 404, message: "An error occured while creating post" }
      }

      return { status_code: 200, post: post}
      
    } catch (error) {
      console.error(error);
      return { status_code: 500, message: "An error occured while retrieving post details" }
    }
  }

  public static async showUserPosts(req: any) {
    try {
      const page = parseInt(req.query.page as string) || 1
      const limit = parseInt(req.query.limit as string) || 5
      const skip = (page - 1) * limit
      const search = req.query.search
  
      let posts = await this.postRepository
        .createQueryBuilder("posts")
        .leftJoin("posts.user", "user")
        .where("user.id = :id", { id: parseInt(req.params.id) })
        .skip(skip)
        .take(limit)
        .getMany()
      
      // check if there is a search query
      if (search) {
        posts = await this.postRepository
          .createQueryBuilder("posts")
          .leftJoin("posts.user", "user")
          .where("user.id = :id", { id: parseInt(req.params.id) })
          .andWhere("posts.title LIKE :search OR posts.content LIKE :search", { search: '%' + search + '%' })
          .skip(skip)
          .take(limit)
          .getMany()
      }
  
      const totalCount = posts.length
      const paginatePostResponse = paginateResponse(posts, page, limit, totalCount)
  
      return { status_code: 200, ...paginatePostResponse }
      
    } catch (error) {
      console.error(error)
      return { status_code: 500, message: "An error occured while retrieving user's posts" }
    }
  }

  public static async updatePost(postId: number, data: any) {
    try {
      let post = await this.postRepository.findOneBy({ id: postId })
      if (!post) {
        return  { status_code: 404, message: "A post with this id does not exist" }
      }

      await this.postRepository
      .createQueryBuilder()
      .update(post)
      .where("id = :id", { id: postId })
      .set({
        title: data.title ?? post.title,
        content: data.content ?? post.content,
        author: data.author ?? post.author,
      })
      .execute()

      post = await this.postRepository.findOneBy({ id: postId })
      return { 
        status_code: 200,
        message: "Updated Successfully!",
        post: post 
      }
      
    } catch (error) {
      console.error(error)
      return { status_code: 500, message: "An error occured while updating post" }
    }
  }

  public static async deletePost(postId: number) {
    try {
      const post = await this.postRepository.findOneBy({ id: postId })
      if (!post) {
        return  { status_code: 404, message: "A post with ithis id does not exist" }
      }

      await this.postRepository.remove(post)
      return { status_code: 200, message: "Post Deleted!" }

    } catch (error) {
      console.error(error)
      return { status_code: 500, message: "An error occured while deleting post" }
    }
  }
}

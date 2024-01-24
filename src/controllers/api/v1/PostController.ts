import { Request, Response } from "express";
import { PostService } from "../../../services/PostService";

export class PostController {

  public static async create(req: Request, res: Response) {
    const postCreationResponse = await PostService.createPost(req)
    return res.status(postCreationResponse.status_code).json(postCreationResponse)
  }
  public static async getAllPosts(req: Request, res: Response) {
    const postResponse = await PostService.getAllPosts(req)
    return res.status(postResponse.status_code).json(postResponse)
  }

  public static async getUserPosts(req: Request, res: Response) {
    const userPostResponse = await PostService.showUserPosts(req) 
    return res.status(userPostResponse.status_code).json(userPostResponse)
  }

  public static async getSinglePost(req: Request, res: Response) {
    const postResponse = await PostService.getOnePost(parseInt(req.params.id))
    return res.status(postResponse.status_code).json(postResponse)
  }

  public static async update(req: Request, res: Response) {
    const postUpdateResponse = await PostService.updatePost(parseInt(req.params.id), req.body)
    return res.status(postUpdateResponse.status_code).json(postUpdateResponse)
  }

  public static async destroy(req: Request, res: Response) {
    const postDeleteResponse = await PostService.deletePost(parseInt(req.params.id))
    return res.status(postDeleteResponse.status_code).json(postDeleteResponse)
  }
}

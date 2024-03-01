import { Request, Response } from "express"
import { ListingService } from "../../../services/ListingService"

export class ListingController {

  public static index = async(req:Request, res:Response) => {
    const listingsResult = await ListingService.getAllListings(req)
    return res.status(listingsResult.status_code).json(listingsResult)
  };

  public static create = async(req:Request, res:Response) => {
    const listingCreationResult = await ListingService.creatListing(req)
    return res.status(listingCreationResult.status_code).json(listingCreationResult)
  };

  public static show = async(req:Request, res:Response) => {
    const listingResult = await ListingService.getListing(parseInt(req.params.id))
    return res.status(listingResult.status_code).json(listingResult)
  };

  public static update = async(req:Request, res:Response) => {
    const listingUpdateResult = await ListingService.updateListing(parseInt(req.params.id), req.body)
    return res.status(listingUpdateResult.status_code).json(listingUpdateResult)
  };

  public static getUserListings = async(req:Request, res:Response) => {
    const userListingsResult = await ListingService.showUserListings(req) 
    return res.status(userListingsResult.status_code).json(userListingsResult)
  };

  public static destroy = async(req:Request, res:Response) => {
    const listingDeleteResult = await ListingService.deleteListing(parseInt(req.params.id))
    return res.status(listingDeleteResult.status_code).json(listingDeleteResult)
  };
}

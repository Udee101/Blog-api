import { Listing } from "../model/Listing"
import { AppDataSource } from "../data-source"
import { User } from "../model/User"
import { validationResult } from "express-validator"
import { paginateResponse } from "../helpers"
import { Errors } from "../values/Errors"

export class ListingService {
  private static listingRepository = AppDataSource.getRepository(Listing)

  public static async getAllListings(req: any) {
    try {
      const page = parseInt(req.query.page as string) || 1
      const limit = parseInt(req.query.limit as string) || 3
      const skip = (page - 1) * limit
      const search = req.query.search
  
      let listings = await this.listingRepository
        .createQueryBuilder("listings")
        .skip(skip)
        .take(limit)
        .getMany()
        
      if (search) {
        listings = await this.listingRepository
          .createQueryBuilder("listings")
          .where("listings.title LIKE :search OR listings.company LIKE :search OR listings.tags LIKE :search", { search: '%' + search + '%' })
          .skip(skip)
          .take(limit)
          .getMany()
      }
      const totalCount = listings.length
      const paginateListings = paginateResponse(listings, page, limit, totalCount)
  
      return { status_code: 200, ...paginateListings }
      
    } catch (error) {
      return Errors.FETCH_ALL_LISTINGS_SERVER_ERROR
    }
  };

  public static async getListing(id: number) {
    try {
      const listing = await this.listingRepository.findOneBy({ id: id })
      if (!listing) {
        return Errors.LISTING_NOT_FOUND
      }

      return { status_code: 200, listing: listing}
      
    } catch (error) {
      return Errors.LISTING_DETAILS_SERVER_ERROR
    }
  };

  public static async creatListing(req: any) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return { status_code: 400, error: errors.array() }
      }
  
      const user = await AppDataSource.getRepository(User).findOneBy({ id: parseInt(req.body.userId) })
      
      const listing = new Listing()
      listing.title = req.body.title
      listing.tags = req.body.tags
      listing.company = req.body.company
      listing.email = req.body.email
      listing.location = req.body.location
      listing.website = req.body.website
      listing.description = req.body.description
      listing.user = user
  
      await this.listingRepository.insert(listing)
  
      return {
        status_code: 201,
        message: "Job listing created!",
        listing: listing
      }
      
    } catch (error) {
      return Errors.LISTING_CREATION_SERVER_ERROR
    }
  };

  public static async updateListing(listingId: number, data: any) {
    try {
      let listing = await this.listingRepository.findOneBy({ id: listingId })
      if (!listing) {
        return Errors.LISTING_NOT_FOUND
      }

      await this.listingRepository
      .createQueryBuilder()
      .update(Listing)
      .where("id = :id", { id: listingId })
      .set({
        title: data.title ?? listing.title,
        tags: data.tags ?? listing.tags,
        company: data.company ?? listing.company,
        email: data.email ?? listing.email,
        location: data.location ?? listing.location,
        website: data.website ?? listing.website,
        description: data.description ?? listing.description,
      })
      .execute()

      listing = await this.listingRepository.findOneBy({ id: listingId })
      return { 
        status_code: 200,
        message: "Updated Successfully!",
        listing: listing 
      }
      
    } catch (error) {
      return Errors.LISTING_UPDATE_SERVER_ERROR
    }
  };

  public static async showUserListings(req: any) {
    try {
      const page = parseInt(req.query.page as string) || 1
      const limit = parseInt(req.query.limit as string) || 3
      const skip = (page - 1) * limit
      const search = req.query.search
  
      let listings = await this.listingRepository
        .createQueryBuilder("listings")
        .leftJoin("listings.user", "user")
        .where("user.id = :id", { id: parseInt(req.params.id) })
        .skip(skip)
        .take(limit)
        .getMany()
  
      if (search) {
        listings = await this.listingRepository
          .createQueryBuilder("listings")
          .leftJoin("listings.user", "user")
          .where("user.id = :id", { id: parseInt(req.params.id) })
          .andWhere("listings.title LIKE :search OR listings.company LIKE :search", { search: '%' + search + '%' })
          .skip(skip)
          .take(limit)
          .getMany()
      }
  
      const totalCount = listings.length
      const paginateListings = paginateResponse(listings, page, limit, totalCount)
      return { status_code: 200, ...paginateListings }
      
    } catch (error) {
      return Errors.USER_LISTINGS_SERVER_ERROR
    }
  };

  public static async deleteListing(listingId: number) {
    try {
      const listing = await this.listingRepository.findOneBy({ id: listingId })
      if (!listing) {
        return Errors.LISTING_NOT_FOUND
      }

      await this.listingRepository.remove(listing)
      return { status_code: 200, message: "Job listing Deleted!" }

    } catch (error) {
      return Errors.LISTING_DELETE_SERVER_ERROR
    }
  }
}

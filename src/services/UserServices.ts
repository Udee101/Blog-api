import { AppDataSource } from "../data-source"
import { User } from "../model/User"
import { Errors } from "../values/Errors"

export class UserService {

  public static async updateUser(userId: number, data: any) {
    try {
      const userRepository = AppDataSource.getRepository(User)
      let user = await userRepository.findOneBy({ id: userId })
  
      await userRepository
        .createQueryBuilder()
        .update(User)
        .set({
          first_name: data.first_name ?? user.first_name,
          last_name: data.last_name ?? user.last_name,
          middle_name: data.middle_name ?? user.middle_name,
          username: data.username ?? user.username,
          email: data.email ?? user.email,
          phone: data.phone ?? user.phone
        })
        .where("id = :id", { id: userId })
      .execute()
  
      user = await userRepository.findOneBy({ id: userId })
      
      return { 
        status_code: 200, 
        message: 'User Updated Successfully!',
        user: user 
      }
    } catch (error) {
      return Errors.USER_UPDATE_SERVER_ERROR
    }
  };
}

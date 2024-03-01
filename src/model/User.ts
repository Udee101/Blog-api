import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Listing } from "./Listing"
@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  first_name: string

  @Column()
  last_name: string

  @Column({ nullable: true })
  middle_name: string

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  phone: string

  @Column()
  password: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
  
  @OneToMany(() => Listing, (listing) => listing.user)
  listings: Listing[]

}

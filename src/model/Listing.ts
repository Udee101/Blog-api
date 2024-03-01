import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, UpdateDateColumn } from "typeorm"
import { User } from "./User"

@Entity('listings')
export class Listing {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string
  
  @Column()
  tags: string
  
  @Column()
  company: string
  
  @Column()
  location: string

  @Column()
  email: string
  
  @Column()
  website: string
  
  @Column()
  description: string
  
  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
  
  @ManyToOne(() => User, (user) => user.listings, {
    onDelete: "RESTRICT",
    cascade: ["update"]
  })
  user: User
}

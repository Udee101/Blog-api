import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Post } from "./Post"

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column({ unique: true })
    username: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date
    
    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]
    
}

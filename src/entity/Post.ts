import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity('posts')
export class Post {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({ type: "text" })
    content: string

    @Column()
    author: string
    
    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date

    @ManyToOne(() => User, (user) => user.posts, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE"
    })
    user: User

}

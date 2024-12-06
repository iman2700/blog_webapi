import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @Column({ type: 'text' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @Column({ nullable: true })
  image: string;

  @CreateDateColumn()
  createdAt: Date;
  
  @Column()
  userId: string;

  @UpdateDateColumn()
  updatedAt: Date;
}

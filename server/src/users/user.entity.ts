import { Hash } from "crypto";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

export enum AccountVerified {
  yes = 'yes',
  no = 'no',
}

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number; 

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ name: 'full_name' })
    fullName: string;

    @Column()
    password: string;

    @Column({ name: 'mobile_number', nullable: true })
    mobileNumber: string;

    @Column({ 
        type: 'enum',
        enum: AccountVerified,
        default: AccountVerified.no,
        name: 'account_verified',
    })
    accountVerified: AccountVerified;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
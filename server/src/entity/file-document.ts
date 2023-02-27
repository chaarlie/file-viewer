import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'file_document' })
export class FileDocument {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    originalName: string

    @Column()
    encodingFormat: string

    @Column()
    size: number

    @Column()
    pageNo: number

    @Column()
    mimeType: string

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    public created_at: Date

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    public updated_at: Date
}

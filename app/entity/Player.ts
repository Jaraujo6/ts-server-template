import { Column, Entity, ObjectIdColumn, Unique } from 'typeorm';

@Entity('players')
@Unique(['name'])
export class Player {
  @ObjectIdColumn()
  _id: string;

  @Column()
  name: string;

  @Column()
  jersey: number;

  @Column({ nullable: false })
  isPlayerGood: boolean;
}

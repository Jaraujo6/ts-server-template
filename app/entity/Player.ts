import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Player {
  @ObjectIdColumn()
  _id: string;

  @Column()
  name: string;

  @Column()
  jersey: number;

  @Column()
  isPlayerGood: boolean;
}

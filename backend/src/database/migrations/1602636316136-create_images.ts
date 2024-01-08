import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createImages1602636316136 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'images',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          isGenerated: false,
          isNullable: false,
        },
        {
          name: 'path',
          type: 'varchar'
        },
        {
          name: 'charity_event_id',
          type: 'uuid'
        }
      ],
      foreignKeys: [
        {
          name: 'image_charity_event',
          columnNames: ['charity_event_id'],
          referencedTableName: 'charity_events',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images')
  }

}

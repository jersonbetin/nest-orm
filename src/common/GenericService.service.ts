import { DeepPartial } from 'typeorm';

export abstract class GenericService<
  ENTITY,
  ID,
  DTO extends DeepPartial<ENTITY>,
  PARTIAL_DTO extends DeepPartial<ENTITY>
> {
  abstract create(data: DTO): Promise<ENTITY>;

  abstract update(id: ID, data: PARTIAL_DTO): Promise<ENTITY>;

  abstract delete(id: ID): Promise<boolean>;

  abstract findAll(): Promise<ENTITY[]>;

  abstract findOne(id: ID): Promise<ENTITY>;
}

export interface Mapper<Entity, Dto> {
  entityToDto(entity: Entity): Promise<Dto>;
}

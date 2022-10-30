import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Sucursal, SucursalRelations, Ciudad} from '../models';
import {CiudadRepository} from './ciudad.repository';

export class SucursalRepository extends DefaultCrudRepository<
  Sucursal,
  typeof Sucursal.prototype.id,
  SucursalRelations
> {

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Sucursal.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>,
  ) {
    super(Sucursal, dataSource);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
  }
}

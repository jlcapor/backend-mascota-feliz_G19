import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Ciudad, CiudadRelations, Departamento, Sucursal} from '../models';
import {DepartamentoRepository} from './departamento.repository';
import {SucursalRepository} from './sucursal.repository';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.id,
  CiudadRelations
> {

  public readonly departamento: BelongsToAccessor<Departamento, typeof Ciudad.prototype.id>;

  public readonly sucursal: HasManyRepositoryFactory<Sucursal, typeof Ciudad.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>, @repository.getter('SucursalRepository') protected sucursalRepositoryGetter: Getter<SucursalRepository>,
  ) {
    super(Ciudad, dataSource);
    this.sucursal = this.createHasManyRepositoryFactoryFor('sucursal', sucursalRepositoryGetter,);
    this.registerInclusionResolver('sucursal', this.sucursal.inclusionResolver);
    this.departamento = this.createBelongsToAccessorFor('departamento', departamentoRepositoryGetter,);
    this.registerInclusionResolver('departamento', this.departamento.inclusionResolver);
  }
}

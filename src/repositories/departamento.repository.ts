import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Departamento, DepartamentoRelations, Ciudad} from '../models';
import {CiudadRepository} from './ciudad.repository';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype.id,
  DepartamentoRelations
> {

  public readonly ciudad: HasManyRepositoryFactory<Ciudad, typeof Departamento.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>,
  ) {
    super(Departamento, dataSource);
    this.ciudad = this.createHasManyRepositoryFactoryFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
  }
}

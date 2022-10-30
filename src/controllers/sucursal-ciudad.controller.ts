import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Sucursal,
  Ciudad,
} from '../models';
import {SucursalRepository} from '../repositories';

export class SucursalCiudadController {
  constructor(
    @repository(SucursalRepository)
    public sucursalRepository: SucursalRepository,
  ) { }

  @get('/sucursals/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Ciudad belonging to Sucursal',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ciudad)},
          },
        },
      },
    },
  })
  async getCiudad(
    @param.path.string('id') id: typeof Sucursal.prototype.id,
  ): Promise<Ciudad> {
    return this.sucursalRepository.ciudad(id);
  }
}

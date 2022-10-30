import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Ciudad,
  Sucursal,
} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadSucursalController {
  constructor(
    @repository(CiudadRepository) protected ciudadRepository: CiudadRepository,
  ) { }

  @get('/ciudads/{id}/sucursals', {
    responses: {
      '200': {
        description: 'Array of Ciudad has many Sucursal',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sucursal)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Sucursal>,
  ): Promise<Sucursal[]> {
    return this.ciudadRepository.sucursal(id).find(filter);
  }

  @post('/ciudads/{id}/sucursals', {
    responses: {
      '200': {
        description: 'Ciudad model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sucursal)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Ciudad.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sucursal, {
            title: 'NewSucursalInCiudad',
            exclude: ['id'],
            optional: ['ciudadId']
          }),
        },
      },
    }) sucursal: Omit<Sucursal, 'id'>,
  ): Promise<Sucursal> {
    return this.ciudadRepository.sucursal(id).create(sucursal);
  }

  @patch('/ciudads/{id}/sucursals', {
    responses: {
      '200': {
        description: 'Ciudad.Sucursal PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sucursal, {partial: true}),
        },
      },
    })
    sucursal: Partial<Sucursal>,
    @param.query.object('where', getWhereSchemaFor(Sucursal)) where?: Where<Sucursal>,
  ): Promise<Count> {
    return this.ciudadRepository.sucursal(id).patch(sucursal, where);
  }

  @del('/ciudads/{id}/sucursals', {
    responses: {
      '200': {
        description: 'Ciudad.Sucursal DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Sucursal)) where?: Where<Sucursal>,
  ): Promise<Count> {
    return this.ciudadRepository.sucursal(id).delete(where);
  }
}

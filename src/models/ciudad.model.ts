import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Departamento} from './departamento.model';
import {Sucursal} from './sucursal.model';

@model()
export class Ciudad extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @belongsTo(() => Departamento)
  departamentoId: string;

  @hasMany(() => Sucursal)
  sucursal: Sucursal[];

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;

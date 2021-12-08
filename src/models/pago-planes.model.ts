import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {Plan} from './plan.model';

@model()
export class PagoPlanes extends Entity {
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
  cuota: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaPago: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @belongsTo(() => Mascota)
  mascotaId: string;

  @belongsTo(() => Plan)
  planId: string;

  constructor(data?: Partial<PagoPlanes>) {
    super(data);
  }
}

export interface PagoPlanesRelations {
  // describe navigational properties here
}

export type PagoPlanesWithRelations = PagoPlanes & PagoPlanesRelations;

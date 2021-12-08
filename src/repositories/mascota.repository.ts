import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mascota, MascotaRelations, Cliente, PagoPlanes} from '../models';
import {ClienteRepository} from './cliente.repository';
import {PagoPlanesRepository} from './pago-planes.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.id,
  MascotaRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Mascota.prototype.id>;

  public readonly pagoPlanes: HasManyRepositoryFactory<PagoPlanes, typeof Mascota.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('PagoPlanesRepository') protected pagoPlanesRepositoryGetter: Getter<PagoPlanesRepository>,
  ) {
    super(Mascota, dataSource);
    this.pagoPlanes = this.createHasManyRepositoryFactoryFor('pagoPlanes', pagoPlanesRepositoryGetter,);
    this.registerInclusionResolver('pagoPlanes', this.pagoPlanes.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}

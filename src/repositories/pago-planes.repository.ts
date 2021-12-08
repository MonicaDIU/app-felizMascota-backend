import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PagoPlanes, PagoPlanesRelations, Mascota, Plan} from '../models';
import {MascotaRepository} from './mascota.repository';
import {PlanRepository} from './plan.repository';

export class PagoPlanesRepository extends DefaultCrudRepository<
  PagoPlanes,
  typeof PagoPlanes.prototype.id,
  PagoPlanesRelations
> {

  public readonly mascota: BelongsToAccessor<Mascota, typeof PagoPlanes.prototype.id>;

  public readonly plan: BelongsToAccessor<Plan, typeof PagoPlanes.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>,
  ) {
    super(PagoPlanes, dataSource);
    this.plan = this.createBelongsToAccessorFor('plan', planRepositoryGetter,);
    this.registerInclusionResolver('plan', this.plan.inclusionResolver);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
  }
}

import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import { OrganizationsSearchParams } from "../types/hubs-search-params.interface";
import { OrganizationRelations } from "../types/organization-relations.enum";
import { OrganizationEntity } from "./organization.entity";

@EntityRepository(OrganizationEntity)
export class OrganizationsRepository extends Repository<OrganizationEntity> {
  async findOrganizationById(
    id: string,
    language: string,
    userId: string,
    relations: OrganizationRelations[]
  ) {
    const query = this.createQueryBuilder("o");
    this.addRelations(query, relations);

    return query
      .andWhere("o.id = :id")

      .setParameter("id", id)
      .setParameter("language", language)
      .setParameter("userId", userId)

      .getOne();
  }

  async findOrganizationsList(params: OrganizationsSearchParams) {
    const query = this.createQueryBuilder("o");

    this.addRelations(query, params.relations);
    this.setOrganizationSearchWheres(params, query);

    return query
      .setParameter("language", params.language)
      .setParameter("userId", params.userId)
      .getMany();
  }

  private setOrganizationSearchWheres(
    params: OrganizationsSearchParams,
    query: SelectQueryBuilder<OrganizationEntity>
  ) {
    if (params.search) {
      query
        .andWhere("o.name ILIKE :query")

        .orderBy("o.name = :name", "DESC")
        .addOrderBy("o.name ILIKE :startsWith", "DESC")

        .setParameter("query", `%${params.search}%`)
        .setParameter("startsWith", `${params.search}%`)
        .setParameter("name", params.search);
    }
    if (params.point) {
      query
        .andWhere(
          `ST_Distance(ST_GeomFromGeoJSON(:point), os."centerLocation") < :radius`
        )

        .setParameter(
          "point",
          JSON.stringify({
            type: "Point",
            coordinates: [params.point.lon, params.point.lat],
          })
        )
        .setParameter("radius", params.radius);
    }

    if (params.types) {
      query.andWhere("o.type IN (:...types)");
      query.setParameter("types", params.types);
    }

    if (params.isUserOwner) {
      query.andWhere('o."createdBy" = :userId');
    }
  }

  private addRelations(
    query: SelectQueryBuilder<OrganizationEntity>,
    relations: OrganizationRelations[]
  ) {
    if (relations.includes(OrganizationRelations.CONTACTS)) {
      query.leftJoinAndSelect("o.contacts", "oc");
    }
    if (relations.includes(OrganizationRelations.CONTACT_ACCESS)) {
      query.leftJoinAndSelect("oc.accesses", "oca", 'oca."userId" = :userId');
    }
  }
}

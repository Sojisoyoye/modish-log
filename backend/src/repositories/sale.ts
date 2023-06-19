import { Repository } from 'typeorm';
import { config } from "../config/database";
import { Sale } from "../entities";


// @Repository(Sale)
// export class SaleRepository extends ModelRepository<User, UserEntity> {
//   transform(model: User): UserEntity {
//     const tranformOptions = {
//       groups: allUserGroupsForSerializing
//     };
//     return plainToClass(
//       UserEntity, 
//       classToPlain(model, tranformOptions),
//       tranformOptions
//     );
//   }
//   transformMany(models: User[]): UserEntity[] {
//     return models.map(model => this.transform(model));
//   }
// }


export class SaleDto {
  productName: string = "";
  faced: string = "";
  size: string = "";
  quantity: number = 0;
  amount: number = 0;
  status: string = "";
  comment: string = "";
}

export const createSale = async (dto: SaleDto): Promise<Sale> => {
  const saleRepository = config.getRepository(Sale);
  const sale = new Sale();
  return saleRepository.save({
    ...sale,
    ...dto,
  });
};

export const updateSale = async (
  id: number,
  newSale: SaleDto
): Promise<any> => {
  const saleRepository = config.getRepository(Sale);
  const updatedSale = await saleRepository.update(id, { ...newSale });

  return updatedSale.affected;
};

export const getSales = async (): Promise<Array<Sale>> => {
  const saleRepository = config.getRepository(Sale);
  return saleRepository.find();
};

export const getSale = async (id: number): Promise<Sale | null> => {
  const saleRepository = config.getRepository(Sale);
  const sale = await saleRepository.findOneBy({ id: id });
  if (!sale) return null;
  return sale;
};

export const deleteSale = async (
  id: number
): Promise<number | undefined | null> => {
  const saleRepository = config.getRepository(Sale);

  const result = await saleRepository.delete(id);

  const { affected } = result;

  return affected;
};

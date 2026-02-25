import { AccountModel, IAccountDocument } from "../models/Account";
import { IAccount } from "../types/index";

export class AccountRepository {
  async create(data: IAccount): Promise<IAccountDocument> {
    return await AccountModel.create(data);
  }

  async findById(id: string): Promise<IAccountDocument | null> {
    return await AccountModel.findById(id);
  }

  async findByEmail(email: string): Promise<IAccountDocument | null> {
    return await AccountModel.findOne({ email });
  }

  async findAll(): Promise<IAccountDocument[]> {
    return await AccountModel.find();
  }

  async updateById(id: string, data: Partial<IAccount>): Promise<IAccountDocument | null> {
    return await AccountModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id: string): Promise<IAccountDocument | null> {
    return await AccountModel.findByIdAndDelete(id);
  }
}

import { HashCompare } from "@/domain/forum/application/cryptography/hash-comparer";
import { HashGenerator } from "@/domain/forum/application/cryptography/hash-generator";
import { compare, hash } from "bcryptjs";

export class BcryptHasher implements HashGenerator, HashCompare {
  private HASH_SALT_LENGTH = 8;

  hash(plai: string): Promise<string> {
    return hash(plai, this.HASH_SALT_LENGTH);
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }
}

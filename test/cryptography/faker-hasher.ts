import { HashCompare } from "@/domain/forum/application/cryptography/hash-comparer";
import { HashGenerator } from "@/domain/forum/application/cryptography/hash-generator";

export class FakeHasher implements HashGenerator, HashCompare {
  async hash(plai: string): Promise<string> {
    return plai.concat("-hashed");
  }
  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat("-hashed") === hash;
  }
}

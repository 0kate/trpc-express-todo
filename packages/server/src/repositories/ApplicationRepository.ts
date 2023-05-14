import type { PrismaClient } from '@prisma/client';

class ApplicationRepository {
  static client: PrismaClient;
}

export default ApplicationRepository;

import type { CefrLevel } from '@/shared/domain';
import type { UserAdminGateway } from '../ports/user-admin-gateway';

export interface SetStudentLevelInput {
  readonly userId: string;
  readonly level: CefrLevel;
}

/**
 * Sets the CEFR level that scopes a student's content. Only staff may do it and only on a student; both rules
 * are enforced by the backend (the set_student_level RPC under RLS), which this use case defers to.
 */
export class SetStudentLevel {
  constructor(private readonly users: UserAdminGateway) {}

  async execute(input: SetStudentLevelInput): Promise<void> {
    await this.users.setStudentLevel(input.userId, input.level);
  }
}

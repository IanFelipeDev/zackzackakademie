import type { CefrLevel, Role } from '@/shared/domain';
import {
  InviteEmailTakenError,
  UserAdminForbiddenError,
  UserDeactivatedError,
  UserHasReviewsError,
} from '../../domain/errors';
import type { Invitation } from '../../domain/invitation';
import type { ManagedUser } from '../../domain/managed-user';
import type { UserAdminGateway } from '../ports/user-admin-gateway';

export class InMemoryUserAdminGateway implements UserAdminGateway {
  readonly users: ManagedUser[] = [];
  readonly sentEmails: { userId: string; loginUrl: string }[] = [];
  /** Accounts that have given feedback, which the backend refuses to delete. */
  readonly reviewerIds = new Set<string>();

  listUsers(): Promise<ManagedUser[]> {
    return Promise.resolve([...this.users].sort((a, b) => a.displayName.localeCompare(b.displayName)));
  }

  invite(invitation: Invitation, loginUrl: string): Promise<void> {
    if (this.users.some((u) => u.email === invitation.email)) {
      return Promise.reject(new InviteEmailTakenError());
    }
    const id = `invited-${this.users.length + 1}`;
    this.users.push({
      id,
      email: invitation.email,
      displayName: invitation.displayName,
      role: invitation.role,
      level: null,
      createdAt: new Date(),
      accessStatus: 'pending_first_access',
      lastSeenAt: null,
    });
    this.sentEmails.push({ userId: id, loginUrl });
    return Promise.resolve();
  }

  changeRole(userId: string, role: Role): Promise<void> {
    this.update(userId, { role });
    return Promise.resolve();
  }

  setStudentLevel(userId: string, level: CefrLevel): Promise<void> {
    // Mirrors the set_student_level RPC: only a student may be levelled.
    if (this.find(userId)?.role !== 'student') return Promise.reject(new UserAdminForbiddenError());
    this.update(userId, { level });
    return Promise.resolve();
  }

  resendAccess(userId: string, loginUrl: string): Promise<void> {
    if (this.find(userId)?.accessStatus === 'deactivated') return Promise.reject(new UserDeactivatedError());
    this.update(userId, { accessStatus: 'pending_first_access' });
    this.sentEmails.push({ userId, loginUrl });
    return Promise.resolve();
  }

  deactivate(userId: string): Promise<void> {
    this.update(userId, { accessStatus: 'deactivated' });
    return Promise.resolve();
  }

  reactivate(userId: string): Promise<void> {
    this.update(userId, { accessStatus: 'active' });
    return Promise.resolve();
  }

  delete(userId: string): Promise<void> {
    if (this.reviewerIds.has(userId)) return Promise.reject(new UserHasReviewsError());
    const index = this.users.findIndex((u) => u.id === userId);
    if (index >= 0) this.users.splice(index, 1);
    return Promise.resolve();
  }

  private find(userId: string): ManagedUser | undefined {
    return this.users.find((u) => u.id === userId);
  }

  private update(userId: string, changes: Partial<ManagedUser>): void {
    const index = this.users.findIndex((u) => u.id === userId);
    const user = this.users[index];
    if (user) this.users[index] = { ...user, ...changes };
  }
}

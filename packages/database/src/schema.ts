import { relations, sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const taskStatusEnum = pgEnum("task_status", [
  "todo",
  "in-progress",
  "completed",
  "cancelled",
]);

export const tenantRoles = pgEnum("tenant_roles", ["owner", "admin", "member"]);

export const userPreferences = pgTable("user_preferences", {
  id: uuid().default(sql`gen_random_uuid()`).primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull().unique(),

  theme: varchar({ length: 50 }).default("system"),
  language: varchar({ length: 10 }).default("en"),
  timezone: varchar({ length: 100 }),

  defaultTaskStatus: varchar("default_task_status", { length: 50 }).default(
    "todo"
  ),

  emailNotifications: varchar("email_notifications", { length: 50 }).default(
    "enabled"
  ),
  taskReminders: varchar("task_reminders", { length: 50 }).default("enabled"),
  weeklyDigest: varchar("weekly_digest", { length: 50 }).default("disabled"),
  pushNotifications: varchar("push_notifications", { length: 50 }).default(
    "disabled"
  ),

  plan: varchar({ length: 50 }).default("free"),
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
  stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
  stripeSubscriptionStatus: varchar("stripe_subscription_status", {
    length: 50,
  }),
  stripePriceId: varchar("stripe_price_id", { length: 255 }),
  stripeCurrentPeriodEnd: timestamp("stripe_current_period_end"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const tasks = pgTable("tasks", {
  id: uuid().default(sql`gen_random_uuid()`).primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),

  title: varchar({ length: 255 }).notNull(),
  description: text(),
  status: taskStatusEnum().default("todo").notNull(),

  priority: integer("priority").default(0),

  dueDate: timestamp("due_date"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const users = pgTable("users", {
  id: uuid().default(sql`gen_random_uuid()`).primaryKey(),
  clerkId: varchar("clerk_id", { length: 255 }).unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").default(false),
  image: varchar("image", { length: 255 }),
  password: varchar("password", { length: 255 }),
  welcomeMailSent: boolean("welcome_mail_sent").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  active: boolean("active").default(true),
});

export const tenantMembers = pgTable("tenant_members", {
  id: uuid().default(sql`gen_random_uuid()`).primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  tenantId: uuid("tenant_id").references(() => tenants.id),
  role: tenantRoles().default("member"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const tenants = pgTable("tenants", {
  id: uuid().default(sql`gen_random_uuid()`).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const tenantInvitations = pgTable("tenant_invitations", {
  id: uuid().default(sql`gen_random_uuid()`).primaryKey(),
  tenantId: uuid("tenant_id").references(() => tenants.id),
  email: varchar("email", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const userPreferencesRelations = relations(
  userPreferences,
  ({ one }) => ({
    user: one(users, {
      fields: [userPreferences.userId],
      references: [users.clerkId],
    }),
  })
);

export const tasksRelations = relations(tasks, ({ one }) => ({
  user: one(users, {
    fields: [tasks.userId],
    references: [users.clerkId],
  }),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
  tenant: one(tenants, {
    fields: [users.tenantId],
    references: [tenants.id],
  }),
  preferences: one(userPreferences),
  tasks: many(tasks),
  memberships: many(tenantMembers),
}));

export const tenantsRelations = relations(tenants, ({ many }) => ({
  users: many(users),
  members: many(tenantMembers),
  invitations: many(tenantInvitations),
}));

export const tenantMembersRelations = relations(tenantMembers, ({ one }) => ({
  user: one(users, {
    fields: [tenantMembers.userId],
    references: [users.id],
  }),
  tenant: one(tenants, {
    fields: [tenantMembers.tenantId],
    references: [tenants.id],
  }),
}));

export const tenantInvitationsRelations = relations(
  tenantInvitations,
  ({ one }) => ({
    tenant: one(tenants, {
      fields: [tenantInvitations.tenantId],
      references: [tenants.id],
    }),
  })
);

export const schema = {
  userPreferences,
  tasks,
  users,
  tenants,
  tenantMembers,
  tenantInvitations,
  userPreferencesRelations,
  tasksRelations,
  usersRelations,
  tenantsRelations,
  tenantMembersRelations,
  tenantInvitationsRelations,
};

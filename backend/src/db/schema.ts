import { sqliteTable, text, integer, int } from "drizzle-orm/sqlite-core";

// --- Better Auth Tables ---

export const user = sqliteTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: integer("email_verified", { mode: "boolean" }).notNull(),
	image: text("image"),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});

export const session = sqliteTable("session", {
	id: text("id").primaryKey(),
	expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
	token: text("token").notNull().unique(),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id").notNull().references(() => user.id)
});

export const account = sqliteTable("account", {
	id: text("id").primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id").notNull().references(() => user.id),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp" }),
	refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp" }),
	scope: text("scope"),
	password: text("password"),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});

export const verification = sqliteTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
	createdAt: integer("created_at", { mode: "timestamp" }),
	updatedAt: integer("updated_at", { mode: "timestamp" })
});

// --- Portfolio Tables ---

export const profile = sqliteTable("profile", {
	id: int("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	tagline: text("tagline"),
	summary: text("summary"),
	email: text("email"),
	phone: text("phone"),
	location: text("location"),
	linkedin: text("linkedin"),
	github: text("github"),
	website: text("website"),
	avatarUrl: text("avatar_url"),
	resumeUrl: text("resume_url")
});

export const skill = sqliteTable("skill", {
	id: int("id").primaryKey({ autoIncrement: true }),
	category: text("category").notNull(), // e.g., "Frontend", "Backend", "Language"
	name: text("name").notNull(),
	proficiency: int("proficiency") // 1-100 optional
});

export const experience = sqliteTable("experience", {
	id: int("id").primaryKey({ autoIncrement: true }),
	company: text("company").notNull(),
	role: text("role").notNull(),
	startDate: text("start_date").notNull(), // YYYY-MM
	endDate: text("end_date"), // YYYY-MM or "Present"
	description: text("description"), // Markdown or bullet points
	location: text("location")
});

export const education = sqliteTable("education", {
	id: int("id").primaryKey({ autoIncrement: true }),
	institution: text("institution").notNull(),
	major: text("major").notNull(),
	startDate: text("start_date").notNull(), // YYYY-MM or "Sept 2023"
	endDate: text("end_date"), // YYYY-MM or "Present" or "now"
	description: text("description"), // Markdown or bullet points (GPA, scholarship, etc.)
	achievements: text("achievements") // JSON array or text for competitive programming achievements
});

export const project = sqliteTable("project", {
	id: int("id").primaryKey({ autoIncrement: true }),
	title: text("title").notNull(),
	description: text("description").notNull(),
	imageUrl: text("image_url"),
	liveUrl: text("live_url"),
	repoUrl: text("repo_url"),
	techStack: text("tech_stack"), // JSON string or comma-separated
	content: text("content"), // Detailed markdown content
	achievement: text("achievement"), // Achievement text (e.g., "Top 20 in VPBank Hackathon 2025")
	images: text("images") // JSON array of image URLs for project details
});

export const message = sqliteTable("message", {
	id: int("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	email: text("email").notNull(),
	content: text("content").notNull(),
	createdAt: integer("created_at", { mode: "timestamp" }).default(new Date())
});

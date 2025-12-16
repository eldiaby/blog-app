/**
 * post.test-data.ts
 * Sample data for testing Post schema & Zod validation
 */

export const validPost = {
	title: "Getting Started with Node.js",
	content:
		"Node.js is a powerful JavaScript runtime built on Chrome's V8 engine. It allows developers to build fast and scalable network applications.",
	tags: ["nodejs", "backend", "javascript"],
	category: "Backend Development",
	coverImage: {
		url: "https://example.com/images/nodejs-cover.png",
		publicId: "nodejs_cover_123",
	},
	seoTitle: "Learn Node.js for Beginners",
	seoDescription: "A beginner-friendly guide to getting started with Node.js.",
};

export const minimalPost = {
	title: "My First Blog Post",
	content: "This is my very first blog post content.",
	author: "66b8f1e2c9a1a2b3c4d5e6f7",
};

export const aiPost = {
	title: "Understanding REST APIs",
	content:
		"REST APIs are a way for systems to communicate over HTTP using standard methods like GET and POST.",
	author: "66b8f1e2c9a1a2b3c4d5e6f7",
	summary:
		"An introductory article explaining what REST APIs are and how they work.",
	seoTitle: "What Are REST APIs? Explained Simply",
	seoDescription:
		"Learn the basics of REST APIs, their principles, and how they are used in modern web development.",
};

export const invalidPost = {
	title: "Hi", // أقل من 3 حروف
	content: "Short", // أقل من 10 حروف
	author: "", // ObjectId فاضي
};

export const postsSeed = [
	{
		title: "Introduction to Node.js",
		content: "Node.js is a JavaScript runtime built on Chrome's V8 engine.",
		tags: ["nodejs", "backend", "javascript"],
		category: "Backend",
		views: 120,
		likes: [],
		isActive: true,
	},
	{
		title: "REST API Best Practices",
		content: "Designing REST APIs requires consistency and clarity.",
		tags: ["api", "rest", "backend"],
		category: "Backend",
		views: 340,
		likes: [],
		isActive: true,
	},
	{
		title: "MongoDB Schema Design Tips",
		content: "Schema design is critical for performance in MongoDB.",
		tags: ["mongodb", "database"],
		category: "Database",
		views: 215,
		likes: [],
		isActive: true,
	},
	{
		title: "TypeScript for Beginners",
		content: "TypeScript adds static typing to JavaScript.",
		tags: ["typescript", "frontend", "backend"],
		category: "Programming",
		views: 500,
		likes: [],
		isActive: true,
	},
	{
		title: "Understanding Express Middleware",
		content:
			"Middleware functions are functions that have access to req and res.",
		tags: ["express", "nodejs"],
		category: "Backend",
		views: 98,
		likes: [],
		isActive: true,
	},
	{
		title: "Soft Delete in MongoDB",
		content: "Soft delete allows you to keep data without removing it.",
		tags: ["mongodb", "soft-delete"],
		category: "Database",
		views: 60,
		likes: [],
		isActive: false, // 👈 بوست محذوف Soft Delete
	},
	{
		title: "AI in Blogging Platforms",
		content: "AI can generate summaries, tags, and recommendations.",
		tags: ["ai", "blog", "deepseek"],
		category: "AI",
		views: 410,
		likes: [],
		isActive: true,
	},
];

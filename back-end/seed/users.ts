export const registerTestData = [
	// بيانات صحيحة
	{
		name: "Ali Ahmed",
		email: "ali@example.com",
		password: "Aa123456!",
		passwordConfirm: "Aa123456!",
	},
	{
		name: "Sara Mohamed",
		email: "sara.m@example.com",
		password: "StrongP@ss1",
		passwordConfirm: "StrongP@ss1",
	},

	// خطأ: password mismatch
	{
		name: "Mona",
		email: "mona@example.com",
		password: "Aa123456!",
		passwordConfirm: "Aa123456",
	},

	// خطأ: email غير صحيح
	{
		name: "Khalid",
		email: "khalidexample.com",
		password: "Aa123456!",
		passwordConfirm: "Aa123456!",
	},

	// خطأ: password ضعيف
	{
		name: "Youssef",
		email: "youssef@example.com",
		password: "12345678",
		passwordConfirm: "12345678",
	},

	// خطأ: name فارغ
	{
		name: "",
		email: "emptyname@example.com",
		password: "Aa123456!",
		passwordConfirm: "Aa123456!",
	},
];

export const loginTestDat = [
	// بيانات صحيحة
	{ email: "ali@example.com", password: "Aa123456!" },
	{ email: "sara@example.com", password: "StrongP@ss1" },

	// خطأ: email غير صحيح
	{ email: "wrongemail.com", password: "Aa123456!" },

	// خطأ: password قصيرة
	{ email: "ali@example.com", password: "123" },

	// خطأ: email صحيح ولكن غير مسجل
	{ email: "notfound@example.com", password: "Aa123456!" },
];

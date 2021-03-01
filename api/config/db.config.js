module.exports = {
	HOST: "localhost",
	USER: "rubinhozzz",
	PASSWORD: "geheim",
	DB: "aves",
	dialect: "postgres",
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
};
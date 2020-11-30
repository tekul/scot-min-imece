const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

const getAllProfiles = () => {
	return pool.query("SELECT * FROM profiles").then((result) => result.rows);
};

const createProfile = (newProfile) => {
	return pool
		.query(
			"INSERT INTO profiles ( first_name, last_name, date_of_birth, gender, email, address, phone_number, type) values ( $1, $2, $3, $4, $5, $6, $7, $8)",
			[
				newProfile.firstname,
				newProfile.lastname,
				newProfile.dob,
				newProfile.gender,
				newProfile.email,
				newProfile.address,
				newProfile.phone,
				newProfile.profile_type,
			],
		)
		.then((result) => result.rows);
};

const deleteProfile = (profileId) => {
	return pool
		.query("DELETE FROM profiles WHERE id = $1", [profileId])
		.then((result) => result.rows);
};

const getProfileById = (id) => {
	return pool
		.query("SELECT * FROM profiles where id = $1", [id])
		.then((result) => result.rows[0]);
};

const getAllNationalities = () => {
	return pool.query("SELECT * FROM nationalities").then((result) => result.rows);
};

module.exports = {
	getAllProfiles,
	getProfileById,
	createProfile,
	deleteProfile,
	getAllNationalities,
};

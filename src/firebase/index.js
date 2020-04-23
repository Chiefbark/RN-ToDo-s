import firebase from "firebase";
import {AsyncStorage} from "react-native";

const firebaseConfig = {
	apiKey: "apiKey",
	authDomain: "authDomain",
	databaseURL: "databaseURL",
	storageBucket: "storageBucket"
};

if (!firebase.apps.length)
	firebase.initializeApp(firebaseConfig);

const db = firebase.database();

function getDatabase() {
	return db;
}

async function getUserKey() {
	let key = undefined;
	await AsyncStorage.getItem('@userKey', (error, result) => {
		if (!error) key = result; else console.log(error);
	});
	if (!key) {
		key = db.ref('users/').push().getKey();
		AsyncStorage.setItem('@userKey', key, (error) => console.log(error));
	}
	return key;
}

export default {getDatabase, getUserKey};

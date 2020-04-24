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

async function getNewShareKey(userKey) {
	return await db.ref('shares/').push({key: userKey, date: new Date().getTime()}).getKey();
}

async function checkShareKey(shareKey) {
	let key = undefined;
	await db.ref('shares/-' + shareKey).once('value').then(querySnapShot => {
		let data = querySnapShot.val() || undefined;
		if (data) {
			if (data.date + (1000 * 60 * 60 * 24) >= new Date().getTime()) key = data.key;
			db.ref('shares/-' + shareKey).remove();
		}
	});
	return key;
}

export default {getDatabase, getUserKey, getNewShareKey, checkShareKey};

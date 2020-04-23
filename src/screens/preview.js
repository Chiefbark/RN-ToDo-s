import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	FlatList,
	ActivityIndicator, TouchableHighlight, Image
} from 'react-native';
import Copy from '../components/Copy';
import Toast from 'react-native-simple-toast';

import Firebase from '../firebase';

export default class Preview extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			items: [],
			copy: false,
			userKey: this.props.route.params.userKey,
			friendKey: this.props.route.params.friendKey,
			edit: undefined,
			loading: true
		}
	}
	
	copyData() {
		let count = 0;
		for (let ii = 0; ii < this.state.items.length; ii++)
			Firebase.getDatabase().ref('users/' + this.state.userKey).push({text: this.state.items[ii][1].text}, error => {
				if (error)
					Toast.showWithGravity('Error while copying the data...', Toast.LONG, Toast.BOTTOM);
				else
					count++;
				if (!error && count == this.state.items.length)
					Toast.showWithGravity('Data copied successfully', Toast.LONG, Toast.BOTTOM);
			});
	}
	
	componentDidMount() {
		this.props.navigation.setOptions({
			headerRight: () =>
				<TouchableHighlight underlayColor={'blue'} onPress={() => this.setState({copy: true})}>
					<Image style={{width: 20, height: 20, marginRight: 16}} tintColor={'white'}
						   source={require('../../assets/icons/link.png')}/>
				</TouchableHighlight>
		});
		Firebase.getDatabase().ref('users/' + this.state.friendKey).on('value', querySnapShot => {
			let data = querySnapShot.val() || {};
			this.setState({items: Object.entries(data), loading: false});
		});
	}
	
	render() {
		const {items} = this.state;
		
		return (
			<View style={styles.container}>
				<FlatList
					data={items}
					ListEmptyComponent={
						!this.state.loading ?
							(<View style={{
								flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
								paddingVertical: 10, paddingHorizontal: 50, marginTop: 20
							}}>
								<Text style={{fontSize: 16, textAlign: 'center'}}>
									Well done! You don't have any pending tasks.
								</Text>
							</View>)
							: (<ActivityIndicator style={{marginTop: 100}} size={'large'} color={'blue'}/>)
					}
					keyExtractor={(item) => item[0]}
					renderItem={({item, index}) =>
						<View style={{
							flex: 1, flexDirection: 'row', alignItems: 'center',
							paddingVertical: 10, paddingLeft: 10,
							backgroundColor: (index % 2 == 0) ? 'white' : 'whitesmoke'
						}}>
							<Text style={{
								flex: 1,
								color: 'black'
							}}>{item[1].text}</Text>
						</View>
					}
				/>
				{this.state.copy && (
					<Copy
						onSubmit={() => {
							this.copyData();
							this.setState({copy: false});
						}}
						onCancel={() => this.setState({copy: false})}/>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	}
});

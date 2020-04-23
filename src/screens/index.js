import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	FlatList,
	TouchableHighlight,
	ActivityIndicator
} from 'react-native';
import {CommonActions} from '@react-navigation/native';

import Form from '../components/Form';
import Share from '../components/Share';

import Firebase from '../firebase';

export default class Index extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			items: [],
			form: false,
			share: false,
			userKey: undefined,
			edit: undefined,
			loading: true
		}
	}
	
	addTodo(text) {
		Firebase.getDatabase().ref('users/' + this.state.userKey).push({text: text});
	}
	
	removeTodo(id) {
		Firebase.getDatabase().ref('users/' + this.state.userKey + '/' + id).remove();
	}
	
	updateTodo(id, text) {
		Firebase.getDatabase().ref('users/' + this.state.userKey + '/' + id).set({text: text});
	}
	
	componentDidMount() {
		this.props.navigation.setOptions({
			headerRight: () =>
				<TouchableHighlight underlayColor={'blue'} onPress={() => this.setState({share: true})}>
					<Image style={{width: 20, height: 20, marginRight: 16}} tintColor={'white'}
						   source={require('../../assets/icons/share.png')}/>
				</TouchableHighlight>
		});
		Firebase.getUserKey()
			.then((key) => {
				this.setState({userKey: key});
				Firebase.getDatabase().ref('users/' + this.state.userKey).on('value', querySnapShot => {
					let data = querySnapShot.val() || {};
					this.setState({items: Object.entries(data), loading: false});
				});
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
							<TouchableHighlight
								style={{padding: 10, marginHorizontal: 5}}
								onPress={() => {
									this.setState({form: true, edit: item});
								}}>
								<Image style={{width: 16, height: 16}}
									   source={require('../../assets/icons/edit.png')}/>
							</TouchableHighlight>
							<TouchableHighlight
								style={{padding: 10, marginHorizontal: 5}}
								onPress={() => this.removeTodo(item[0])}>
								<Image style={{width: 16, height: 16}}
									   source={require('../../assets/icons/bin.png')}/>
							</TouchableHighlight>
						</View>
					}
				/>
				{!this.state.form && !this.state.share && (
					<TouchableHighlight style={styles.f_button}
										onPress={() => this.setState({form: true})}>
						<Image tintColor={'white'} style={{width: 16, height: 16}}
							   source={require('../../assets/icons/plus.png')}/>
					</TouchableHighlight>
				)}
				{this.state.form &&
				<Form item={this.state.edit}
					  onSubmit={(text, id) => {
						  if (!id)
							  this.addTodo(text);
						  else
							  this.updateTodo(id, text);
					
						  this.setState({form: false, edit: undefined});
					  }}
					  onCancel={() => this.setState({form: false, edit: undefined})}/>
				}
				{this.state.share &&
				<Share userKey={this.state.userKey}
					   onSubmit={(id) => {
						   this.setState({share: false});
						   this.props.navigation.dispatch(
							   CommonActions.navigate({
								   name: 'preview',
								   params: {userKey: this.state.userKey, friendKey: `-${id}`}
							   })
						   );
					   }}
					   onCancel={() => this.setState({share: false})}/>
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	f_button: {
		position: 'absolute',
		bottom: 50,
		right: 25,
		width: 60,
		height: 60,
		backgroundColor: 'blue',
		borderRadius: 100,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
		elevation: 10
	}
});

import React, {Fragment} from 'react';
import {Text, TextInput, TouchableHighlight, Modal, View} from "react-native";

import Firebase from '../firebase';

export default class Share extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			shareKey: undefined,
			text: undefined,
			onSubmit: this.props.onSubmit,
			onCancel: this.props.onCancel
		}
	}
	
	getNewShareKey() {
		Firebase.getNewShareKey(this.props.userKey).then(shareKey => this.setState({shareKey: shareKey}));
	}
	
	componentDidMount() {
		this.getNewShareKey();
	}
	
	render() {
		console.log(this.state.shareKey);
		return (
			<Fragment>
				<View style={{
					position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
					backgroundColor: '#CCCCCCAA'
				}}>
					<Modal
						animationType="slide"
						transparent={true}
						visible={true}
					>
						<View style={{flex: 1, justifyContent: 'center'}}>
							<View style={{
								backgroundColor: "white", borderRadius: 10,
								elevation: 5, marginHorizontal: 20, padding: 35
							}}>
								<Text selectable style={{
									fontSize: 16, fontWeight: 'bold', textAlign: 'center'
								}}>{this.state.shareKey?.slice(1)}</Text>
								<Text style={{textAlign: 'center', marginTop: 5}}>
									This is your user key. Send it to your friends to share your list!
								</Text>
								<TouchableHighlight
									style={{
										alignSelf: 'center',
										backgroundColor: 'blue', borderRadius: 4,
										paddingHorizontal: 20, paddingVertical: 10, marginVertical: 10
									}}
									onPress={() => this.getNewShareKey()}>
									<Text style={{color: 'white'}}>Generate new key</Text>
								</TouchableHighlight>
								<Text style={{textAlign: 'center', marginVertical: 5}}>
									Or enter your friend user keys here
								</Text>
								<TextInput placeholder={'User key...'} style={{borderBottomWidth: 1}}
										   value={this.state.text}
										   clearButtonMode={'always'}
										   onChangeText={(text) => this.setState({text: text})}/>
								<View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20}}>
									<TouchableHighlight
										style={{paddingHorizontal: 20, paddingVertical: 10}}
										onPress={() => {
											this.setState({text: undefined});
											this.state.onCancel();
										}}
									>
										<Text style={{
											color: 'black', fontWeight: 'bold', textAlign: 'center'
										}}>Cancel</Text>
									</TouchableHighlight>
									<TouchableHighlight
										style={{
											backgroundColor: 'blue', borderRadius: 4,
											paddingHorizontal: 20, paddingVertical: 10, marginLeft: 10
										}}
										onPress={() => {
											this.setState({text: this.state.text.trim()});
											if (!this.state.text || this.state.text === '')
												return;
											Firebase.checkShareKey(this.state.text).then(key => {
												if (key) {
													this.state.onSubmit(key);
													this.setState({text: undefined});
												} else alert('The key is no longer available');
											});
										}}
									>
										<Text
											style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Add</Text>
									</TouchableHighlight>
								</View>
							</View>
						</View>
					</Modal>
				</View>
			</Fragment>
		);
	}
}

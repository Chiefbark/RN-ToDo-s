import React, {Fragment} from 'react';
import {Text, TextInput, TouchableHighlight, Modal, View, ScrollView} from "react-native";

export default class Share extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			userKey: this.props.userKey,
			text: undefined,
			onSubmit: this.props.onSubmit,
			onCancel: this.props.onCancel
		}
	}
	
	render() {
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
									fontSize: 20, fontWeight: 'bold', textAlign: 'center'
								}}>{this.state.userKey.substring(1)}</Text>
								<Text style={{textAlign: 'center', marginTop: 5}}>
									This is your user key. Send it to your friends to share your list!
								</Text>
								<Text style={{textAlign: 'center', marginVertical: 5}}>
									Or enter your friend user keys here
								</Text>
								<TextInput placeholder={'User key...'} style={{borderBottomWidth: 1}}
										   value={this.state.text}
										   autoFocus={true}
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
											this.state.onSubmit(this.state.text);
											this.setState({text: undefined});
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

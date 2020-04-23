import React, {Fragment} from 'react';
import {Text, TextInput, TouchableHighlight, Modal, View, BackHandler} from "react-native";

export default class Form extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			item: this.props.item,
			text: this.props.item ? this.props.item[1].text : undefined,
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
								<TextInput placeholder={'New task...'} style={{borderBottomWidth: 1}}
										   value={this.state.text}
										   autoFocus={true}
										   clearButtonMode={'always'}
										   onChangeText={(text) => this.setState({text: text})}/>
								<View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20}}>
									<TouchableHighlight
										style={{paddingHorizontal: 20, paddingVertical: 10}}
										onPress={() => {
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
											this.state.onSubmit(this.state.text, this.state.item ? this.state.item[0] : undefined);
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

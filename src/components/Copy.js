import React, {Fragment} from 'react';
import {Text, TouchableHighlight, Modal, View} from "react-native";

export default class Copy extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
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
								<Text style={{fontWeight: 'bold', fontSize: 18}}>
									COPY DATA
								</Text>
								<Text style={{marginVertical: 5}}>
									Do you want to copy all the data of this list to yours?
								</Text>
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
											this.state.onSubmit(this.state.text);
										}}
									>
										<Text
											style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Copy</Text>
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

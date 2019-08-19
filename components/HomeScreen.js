import React from 'react';
import { StyleSheet, Image, Picker, View, Button } from 'react-native';


export default class HomeScreen extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        item:"",
        buttonDisabled:true
      }
    }
    static navigationOptions = {
      title: 'CNTI - Proyecto de Datos Abiertos',
    };
    render() {
      const {navigate} = this.props.navigation;
      return (
        <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.image} />

          <Picker
            selectedValue={this.state.item}
            style={{height: 50, width: 100}}
            onValueChange={(itemValue, itemIndex) =>{
                if(itemValue === "item") {
                  this.setState({buttonDisabled: true})      
                }else{
                  this.setState({buttonDisabled: false})      
                }   
                
                this.setState({item: itemValue})           
              }
            }
              style={styles.combo}
            >
            <Picker.Item label="Seleccione un Item" value="item" />
            <Picker.Item label="Farmacias" value="Farmacias" />
            <Picker.Item label="Hospitales" value="Hospitales" />
          </Picker>
          <View style={styles.button}>
            <Button 
              title="Ir a Mapa"
              onPress={() => navigate('Mapa', {item: this.state.item})}
              disabled={this.state.buttonDisabled}
            />
          </View>
        </View>
      );
    }
  }

  

  const styles  = StyleSheet.create({
    container:{
      flex: 1,
      alignItems: 'center'
    },
    image:{
      resizeMode:'contain', 
      width: '60%', 
      height: '60%',
      flex: 3,
      justifyContent: 'center'
    },
    combo:{
      resizeMode:'contain', 
      width: '60%', 
      height: '60%',
      flex: 3,
      justifyContent: 'center'

    },
    button:{
      resizeMode:'contain', 
      width: "30%", 
      height: "10%",
      flex: 3,
      justifyContent: 'center'
    }

  });
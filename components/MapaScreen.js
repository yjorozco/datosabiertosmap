import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions';

const pinColor = 'blue';

const urls= [
    "http://datos.gob.cl/api/action/datastore_search?resource_id=a60f93af-6a8a-45b6-85ff-267f5dd37ad6&limit=20"];


export default class  MapaScreen extends React.Component{
  static navigationOptions = {
    title: 'Ir al Menu Principal',
  };
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      ready: false,
      where: {lat:null, lng:null},
      data:[],
      error: false,
      item: navigation.getParam('item', 'NO-ID' ),
      mensaje: ""
   
    };
  
  

  }
  
  
  setUrl = (item) =>{
    if(this.state.item === "Farmacias"){
        return urls[0];
    }

    return null;
  }

  async componentDidMount() {


    let geoOptions = {
      enableHighAccuracy: true,
      timeOut: 20000,
      maximumAge: 60 * 60 * 24
    };
    
    try{

      const { status } = await Permissions.getAsync(Permissions.LOCATION)
      if (status !== 'granted') {
        const response = await Permissions.askAsync(Permissions.LOCATION)
      }
      this.setState({ready:false, error: null });
      await navigator.geolocation.getCurrentPosition( this.geoSuccess, 
                                              this.geoFailure,
                                              geoOptions);
      const url = await this.setUrl();
      if (url === null) throw this.setState({"mensaje":"No existe el item"});
      const response = await fetch(url);
      if (!response.ok) throw this.setState({"mensaje":"Hay un error de conexion"});
      const json = await response.json();
      const data = await json.result.records;
      this.setState({
        data
      });
    }catch(error){
      console.log(error);
      this.setState({
        error: true
      })
    }
    
  }
 

  
  geoSuccess = (position) => {
    this.setState({
        ready:true,
        where: {lat: position.coords.latitude,lng:position.coords.longitude }
      })
  }
  geoFailure = (err) => {
      this.setState({error: true});
  }
  getMarkers = () => {
      const  data  = this.state.data; 
      return data.map( (record, index) => {
        const lat = record.local_lat;
        const lon = record.local_lng;   
        const title =  record.local_nombre;
        return (<MapView.Marker title={title} key={index} coordinate = {{latitude: parseFloat(lat), longitude: parseFloat(lon)}} />)
      })
      
    }

  render() {
    return (
      (!this.state.error&&this.state.where.lat&&this.state.where.lng&&(<View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.state.where.lat,
            longitude: this.state.where.lng,
            latitudeDelta: 20,
            longitudeDelta: 12.5,
          }} 
          mapType={"mutedStandard"}
  
        >
        <MapView.Marker pinColor={pinColor} title={"Tu ubicación"} key={"VEN"} coordinate = {{latitude: parseFloat(this.state.where.lat), longitude: parseFloat(this.state.where.lng)}} />


        {this.getMarkers()}

        </MapView>
 
      </View>))
      
    ||
    (this.state.error && (<View><Text>{this.state.mensaje}</Text></View>))
    
  )
    ;
  }
}
 
const styles = StyleSheet.create({
  container: {
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  map: {
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
  },
  texto: {

  }
});
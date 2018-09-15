import React from 'react';
import { StyleSheet,StatusBar, Text, View } from 'react-native';
import {Location, Permissions} from 'expo';
import IonIcon  from 'react-native-vector-icons/Ionicons';
import {URL, API_KEY} from './components/weather';
import Highlighter from 'react-native-highlight-words';
export default class App extends React.Component {
  state = {
    currentTemp: 0,
    weather:'Default'

  }
  componentDidMount(){
      setTimeout(() =>  this.askPermissionsAsync(), 2000)
    
  }
askPermissionsAsync = async () => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
     return alert('failed')
  }
  let location = await Location.getCurrentPositionAsync({});
  let {latitude, longitude} = location.coords;
  // let data = await fetch(`${URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
  // console.log("data", data)
  return this.fetchWeather(latitude,longitude)
  };
 fetchWeather(lat = 25, lon = 25) {
    fetch(
      `${URL}?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        console.log(json)
        return (
        this.setState({currentTemp:Math.round(json.main.temp), weather:json.weather[0].main })
        )
      }).catch(err => this.setState({currentTemp:29,weather:'Rain'}))
  }
 
  render() {
    const mood = {
      'Default':{
        name:'ios-flash-outline',
        backgroundColor:'lightgreen',
        color:'steelblue',
        title:'Building A colorfull Weather App',
        desc:'colorfull',
        subtitle:'Awesome YAY!!!!'
      },
      'Clear':{
        name:'ios-partly-sunny-outline',
        
      },
      'Thunderstorm':{
        name:'ios-thunderstorm-outline',
        backgroundColor:'red',
        color:'#f0f',
        title:'Thunder Storm is COMING by Run, yay',
        desc:'COMING',
        subtitle:"I'm Afraid" 
      },
      'Rain':{
        name:'ios-rainy-outline',
        backgroundColor:'maroon',
        color:'#000',
        title:'i like rain, yay',
        desc:'RAIN',
        subtitle:'Great YAY!!!!'
      },
      'Clouds':{
          name:'ios-cloud-outline',
          backgroundColor:'maroon',
          color:'green',
          title:'Weather is very cloudy to me , yay',
          desc:'CLOUDY',
          subtitle:'Awesome YAY!!!!'
      }
    }
    return (
      <View style={[styles.container,{backgroundColor:mood[this.state.weather].backgroundColor ? mood[this.state.weather].backgroundColor : '#6c6000'}]}>
          <StatusBar hidden={true } />
          <View style={styles.header} >
              <IonIcon name ={mood[this.state.weather].name?mood[this.state.weather].name:'ios-flash-outline'} size = {38} color = 'white'/>
              <Text style={{fontSize:38,color:'#fff'}}>{this.state.currentTemp}°</Text>
          </View>
          <View style={styles.body} >
            <Text style={styles.title}>
              <Highlighter
                style={styles.innertext}
                highlightStyle={{color:mood[this.state.weather].color ? mood[this.state.weather].color : 'darkred'}}
                searchWords={[mood[this.state.weather].desc ? mood[this.state.weather].desc : '']}
                textToHighlight={mood[this.state.weather].title ? mood[this.state.weather].title : 'Loading TEXT from Server '}
              />
            </Text>
            <Text style={styles.subtitle}>
              {mood[this.state.weather].subtitle ?mood[this.state.weather].subtitle : 'Some Random Message' }
            </Text>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6c6000',
  },
  header:{
    height:75,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  body:{
    flex:1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding:15
  },
  title:{
    fontSize: 70,
    color:'#fff',
    padding:15
  },
  innertext:{
      fontSize:60,
      color:'#fff'
  },
  subtitle:{
    fontSize:18,
    color:"#fff",
    padding:15
  }
});
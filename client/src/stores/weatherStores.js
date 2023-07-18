import { defineStore } from 'pinia'
import axios from 'axios'
const SERVER_URL = 'http://localhost:3000'
import Swal from 'sweetalert2'

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    location: '',
    bucketListData: [],
    weather: [],
    locationCity: {},
    todayWeather: {},
    response: '',
    city: '',
    imgWeather: {
      Rain: 'https://cdn-icons-png.flaticon.com/512/54/54456.png',
      Clouds:
        'https://cdn.icon-icons.com/icons2/614/PNG/512/cloud-internet-symbol_icon-icons.com_56558.png'
    }
  }),
  actions: {
    async registration(dataUser) {
      try {
        await axios({
          url: `${SERVER_URL}/user/register`,
          method: 'post',
          data: dataUser
        })
        Swal.fire('Registration is successfull')
        this.router.push('/login')
      } catch (err) {
        console.log(err)
      }
    },

    async login(dataLogin) {
      try {
        const { data } = await axios({
          url: `${SERVER_URL}/user/login`,
          method: 'post',
          data: dataLogin
        })
        // console.log(data);
        localStorage.access_token = data.accessToken
        this.router.push('/')
        Swal.fire('Login successfull')
      } catch (err) {
        console.log(err)
      }
    },

    async addBucket(activity) {
      try {
        const data = await axios({
          url: `${SERVER_URL}/user/addBucket`,
          method: 'post',
          data: activity,
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data, 'add bucket <><><><><><>')
        Swal.fire('Activity has been added to your bucket list')
      } catch (err) {
        console.log(err)
      }
    },

    async bucketList() {
      try {
        const data = await axios({
          url: `${SERVER_URL}/user/Bucket`,
          method: 'get',
          headers: {
            access_token: localStorage.access_token
          }
        })
        // console.log(data.data, "ini di store");
        this.bucketListData = data.data
        console.log(this.bucketListData, 'ini di store')
      } catch (err) {
        console.log(err)
      }
    },

    async deleteList(id) {
        console.log(id);
      try {
        await axios({
          url: `${SERVER_URL}/user/delete/${id}`,
          method: 'delete',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.bucketList()
      } catch (err) {
        console.log(err)
      }
    },

    async fetchWeather() {
      try {
        const data = await axios({
          url: `${SERVER_URL}/weather`,
          method: 'post',
          data: this.locationCity
        })
        this.weather = data.data
        console.log(this.weather)
      } catch (err) {
        console.log(err)
      }
    },

    async geolocation(cityName) {
      console.log(cityName)
      try {
        const data = await axios({
          url: `${SERVER_URL}/weather/geo`,
          method: 'post',
          data: { cityName }
        })
        this.locationCity = data.data
        console.log(this.locationCity)
        this.fetchWeather()
        this.city = cityName
      } catch (err) {
        console.log(err)
      }
    },

    async currentWeather() {
      try {
        const data = await axios({
          url: `${SERVER_URL}/weather/current`,
          method: 'post',
          data: this.locationCity
        })
        this.todayWeather = data.data
        console.log(this.todayWeather);
      } catch (err) {
        console.log(err)
      }
    },

    async chatGPT(condition) {
      try {
        const data = await axios({
          url: `${SERVER_URL}/chatGPT`,
          method: 'post',
          data: condition
        })
        return data.data.choices[0].text
        // console.log(this.response);
      } catch (err) {
        console.log(err)
      }
    },

    async googleLogin(response) {
      // console.log(response);
      try {
        const { data } = await axios({
          method: 'post',
          url: `${SERVER_URL}/user/googlelogin`,
          headers: {
            google_token: response.credential
          }
        })
        // console.log(data);
        localStorage.access_token = data.accessToken
        this.router.push('/')
        Swal.fire('Login successfull')
      } catch (err) {
        // console.log(err);
        Swal.fire({
          title: 'Error!',
          text: `${err.response.data.message}`,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
    }
  }
})

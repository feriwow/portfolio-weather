<script>
import { mapActions, mapState } from 'pinia';
import { useWeatherStore } from '../stores/weatherStores';
import Swal from 'sweetalert2';


export default {
    data() {
        return {
            condition: {
                weatherCondition: this.cuaca.weather[0].description,
                cityName: ""
            },
            recommendation: [],
            // activity: {
            //     activity: "",
            //     time: "",
            //     place:""
            // }
        }
    },
    props: ["cuaca"],
    computed: {
        ...mapState(useWeatherStore, ["city", "response", "imgWeather"])
    },
    created() {
        this.condition.cityName = this.city
        // this.recommendation = this.response
    },
    methods: {
        ...mapActions(useWeatherStore, ["chatGPT", "addBucket"]),
        async writeRecommend() {
            const recomendation = await this.chatGPT(this.condition)
            if (this.recommendation.length < 3) {
                this.recommendation.push(recomendation)
            } else {
                console.log("mx 3");
            }
        },
        async format() {
            let text = this.recommendation
            let split = text.split("\n\n,")
            return (split[0]);

        },
        async toWIB(date) {
            console.log(date);
            const jamWIb = new Date(date).toLocaleDateString()
            console.log(jamWIb);
        },
        async addBukcetList(index) {
            // console.log(this.recommendation);
            if (localStorage.access_token) {
                this.addBucket({
                    activity: this.recommendation[index],
                    time: this.cuaca.dt_txt,
                    place: this.city
                })
            } else {
                Swal.fire("You must login first")
            }
        },

        clearList() {
            this.recommendation = []
        }

    }
}

</script>

<template>
    <div class="card border-info mt-5"
        style="width: 18rem; background: rgb(2,0,36);
                                                        background: linear-gradient(90deg, rgba(2,0,36,0.2945553221288515) 0%, rgba(2,0,36,0.3309698879551821) 100%);;">
        <!-- <img :src="imgUrl" alt="" class="card-img-top"> -->
        <div class="card-body ">
            <img :src="imgWeather[cuaca.weather[0].main]" alt="" style="width: 50px; height: 50px;">
            <h5 class="card-title text-white" id="text"> {{ cuaca.weather[0].main }}</h5>
            <p class="card-text text-white" id="text"> {{ cuaca.weather[0].description }}</p>
            <p class="card-text text-white" id="text"> {{ cuaca.dt_txt }} </p>
            <a @click.prevent="writeRecommend" href="" class="btn btn-outline-warning btn-sm">Recommend
                me</a>

            <a href="" class="btn btn-outline-danger btn-sm" @click.prevent="clearList"><i class="fa-solid fa-trash"
                    style="color: #ee3211;"></i></a>
            <div class="card-header text-white border-warning">
                Recommended activities
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item " v-for="(rekomen, index) in recommendation" :key="rekomen.id">{{ rekomen }}<a
                        @click.prevent="addBukcetList(index)" href="" class="btn btn-outline-danger btn-sm text-right"
                        id="plus"><i class="fa-solid fa-plus" style="color: #030303;"></i></a></li>
            </ul>
        </div>
    </div>
</template>

<style>
#text {
    opacity: 100%;
}
</style>
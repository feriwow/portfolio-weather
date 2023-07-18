<script>
import Card from "./cardWeather.vue"
import { mapActions, mapState, mapWritableState } from "pinia"
import { useWeatherStore } from "../stores/weatherStores"


export default {
    data() {
        return {
            location: "",
            pageNumber: 0
        }
    },
    components: {
        Card,
    },

    computed: {
        ...mapState(useWeatherStore, ["weather"]),
        ...mapWritableState(useWeatherStore, ["city"]),
        paginatedData() {
            const start = this.pageNumber * 5,
                end = start + 5;
            return this.weather.slice(start, end);
        }
    },

    methods: {
        ...mapActions(useWeatherStore, ["geolocation"]),

        getCoordinate() {
            this.geolocation(this.location)
            this.city = this.location
        },
        nextPage() {
            this.pageNumber++;
        },
        prevPage() {
            this.pageNumber--;
        },
        pageCount() {
            let l = this.weather.length
            return Math.ceil(l / 5);
        },
        isLimit() {
            // console.log(this.pageCount(), "pagecount");
            // console.log(this.pageNumber, "page number");
            if (this.pageNumber + 1 === this.pageCount()) {
                return true
            } else {
                return false
            }
        },

    }


}

</script>

<template>
    <!-- <video class="bg-video" playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop"><source src="../assets/giphy.gif" /></video> -->
    <!-- Masthead-->

    <div class="background-content container-fluid">
        <div class="masthead-content text-white">
            <div class="container-fluid px-5 pt-5">
                <h1 class="fst-italic lh-1 mb-4" style="font-family: 'Courier New', Courier, monospace;">Weather yuhuu!!!
                </h1>
                <p class="mb-6">Use Weather yuhuu to find an ideal activity for you based on the current weather!!!!</p>

                <form id="contactForm">
                    <!-- city address input-->
                    <div class="row input-group-newsletter">
                        <div class="col"><input v-model="location" class="form-control"
                                placeholder="Enter your location...." aria-label="Enter you location" /></div>
                        <div class="col-auto"><button @click.prevent="getCoordinate" class="btn btn-primary"
                                id="submitButton" type="submit">Recommend Me</button></div>
                    </div>
                </form>
            </div>
        </div>
        <div class="row gx-4">
            <Card v-for="cuaca in paginatedData" :key="cuaca.id" :cuaca="cuaca" />
        </div>
        <div v-if="weather.length">
            <!-- <a  v-for="(p, index) in paginatedData" :key="p.dt"> {{ index }}</a> -->
            <button v-if="pageNumber > 0" class="btn btn-dark m-2 rounded-pill" @click="prevPage">
                Previous
            </button>
            <button v-if="!isLimit()" class="btn btn-dark m-2 rounded-pill" @click="nextPage">
                Next
            </button>
        </div>
    </div>
</template>

<style scoped>
.background-content {
    background-image: url("../assets/giphy.gif");
    height: 100vh;
    background-repeat: no-repeat;
    object-fit: cover;
    background-size: cover;
    overflow: auto;
}
</style>
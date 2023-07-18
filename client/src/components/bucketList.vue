<script>
import {  mapActions, mapWritableState } from 'pinia';
import { useWeatherStore } from "../stores/weatherStores"

export default {
    data(){
        return{
            buckets:[]
        }
    },
    computed: {
        ...mapWritableState(useWeatherStore, ["bucketListData"])
    },
    created() {
        this.bucketList()
        // console.log(`1`);
    },
    mounted() {
        // console.log(this.bucketListData, `<<<`);
        this.buckets = this.bucketListData
    },
    methods: {
        ...mapActions(useWeatherStore, ["deleteList", "bucketList"])
    }
}
</script>

<template>
    <h1 v-if="bucketListData.length === 0"> You have not added any activity to your bucket list yet</h1>
    <section v-if="bucketListData.length >= 1" class="col-lg-12" id="product-section">
        <div class="row">
            <div class="col-12 table-responsive">
                <table class="table align-middle table-striped table-light">
                    <thead class="table-responsive">
                        <tr class="table-dark">
                            <th scope="col">Activity Name</th>
                            <th scope="col">Time</th>
                            <th scope="col">Place</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody id="table-product">
                        <tr v-for="bucket in bucketListData" :key="bucket.id">
                            <td class="fw-bold">{{ bucket.activity }}</td>
                            <td>{{ bucket.time }}</td>
                            <td>{{ bucket.place }}</td>
                            <td> <button class="btn btn-light rounded" @click.prevent="deleteList(bucket.id)"><i class="fa-solid fa-square-minus" style="color: #000000;"></i> Delete</button> </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>
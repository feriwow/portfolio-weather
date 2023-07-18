<script>
import { mapActions } from "pinia"
import { useWeatherStore } from "../stores/weatherStores"

export default {
    data() {
        return {
            dataLogin: {
                email: "",
                password: ""
            }
        }
    },

    methods: {
        ...mapActions(useWeatherStore, ["login", "googleLogin"]),
        toLogin() {
            // console.log(this.dataLogin, "ini di vue nya");
            this.login(this.dataLogin)
        },
        callback(response) {
            this.googleLogin(response)
        },
    }
}
</script>

<template>
    <body>
        <div class="background-content container-fluid">
        <div class="container">
            <div class="row">
                <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div class="card border-0 shadow rounded-3 my-5">
                        <div class="card-body p-4 p-sm-5">
                            <h5 class="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                            <form @submit.prevent="toLogin">
                                <div class="form-floating mb-3">
                                    <input v-model="dataLogin.email" type="email" class="form-control" id="floatingInput"
                                        placeholder="enter your email">
                                    <label for="floatingInput">Email address</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input v-model="dataLogin.password" type="password" class="form-control"
                                        id="floatingPassword" placeholder="Password">
                                    <label for="floatingPassword">Password</label>
                                </div>

                                <div class="d-grid">
                                    <button class="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Sign
                                        in</button>
                                </div>
                                <div id="emailHelp" class="form-text text-center mb-5 text-dark">Not
                                    Registered? <a href="#" class="text-dark fw-bold"
                                        @click.prevent="$router.push('/register')"> Create an
                                        Account</a>
                                </div>
                                <hr class="my-4">
                                <div class="d-grid mb-3 d-flex justify-content-center">
                                        <GoogleLogin :callback="callback"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body></template>

<style>
.background-content {
    background-image: url("../assets/sky-clouds.gif");
    height: 100%;
    background-repeat: no-repeat;
    object-fit: cover;
    background-size: cover;
    overflow: auto;
}
</style>
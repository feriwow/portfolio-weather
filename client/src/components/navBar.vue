<script>
export default{
    data(){
        return{
            isLogin: localStorage.access_token
        }
    },
    methods:{
        toLogout(){
            localStorage.clear()
            this.$router.push("login")
        }
    }
}

</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <img width="100" height="70"
            src="http://res.freestockphotos.biz/pictures/15/15146-illustration-of-a-stormy-cloud-pv.png"
            alt="logo" />
            <a class="navbar-brand" href="#!" @click.prevent="$router.push('/')">Weather Yuhuu!</a>
            <div class="container px-3 px-lg-4">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li class="nav-item"><a class="nav-link active" aria-current="page" href="#!" @click.prevent="$router.push('/')"><i class="fa-solid fa-house" style="color: #0c0c0e;"></i>  Home</a></li>
                        <li v-if="isLogin" class="nav-item"><a class="nav-link" href="#!" @click.prevent="$router.push('bucket')"><i class="fa-solid fa-bucket" style="color: #0f0f0f;"></i>Bucket </a></li>
                        <li v-if="!isLogin" class="nav-item"><a class="nav-link" href="#!" @click.prevent="$router.push('login')"><i class="fa-solid fa-user-check" style="color: #171717;"></i> Login</a></li>
                    <li v-if="isLogin" class="nav-item"><a class="nav-link" href="#!" @click.prevent="toLogout"><i class="fa-solid fa-right-from-bracket" style="color: #000000;"></i>  Logout</a></li>
                    </ul>
                </div>
            </div>
        </nav>
</template>
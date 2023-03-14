<template>
    <!--  at the middel of the page show you are log out -->
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-6 offset-md-3">
                    <div class="card">
                        <div class="card-body">
                            <h1 class="text-center">You are logged out</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name  : 'LogoutView',
    beforeMount() {
        localStorage.removeItem('token')
        setTimeout(()=>this.$router.push('/login') ,2000)
    }
}
</script>
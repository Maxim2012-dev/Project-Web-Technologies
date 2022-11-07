<template>
    <v-app>
        <v-form class="form">
            <h1 class="register-title">Sign Up Today!</h1>
            <v-text-field outlined label="Name" id="first-name" prepend-inner-icon="mdi-account-circle-outline">
            </v-text-field>
            <v-text-field outlined label="Telephone number" id="tel-number" prepend-inner-icon="mdi-phone-outline">
            </v-text-field>
            <v-text-field outlined label="E-mail address" id="e-mail" prepend-inner-icon="mdi-email-outline">
            </v-text-field>
            <v-text-field outlined label="Username" id="username" prepend-inner-icon="mdi-account-circle-outline">
            </v-text-field>
            <v-text-field outlined label="Password" id="password" prepend-inner-icon="mdi-lock-outline">
            </v-text-field>
            <div>
                <v-btn class="btn" text>Log in</v-btn>
                <v-btn class="btn" depressed>Register</v-btn>
            </div>
        </v-form>
    </v-app>
</template>

<script>
export default {
    name: 'SignUpForm',
}
</script>

<style>
.btn {
    margin: 15px;
}

.register-title {
    margin-bottom: 50px;
}

.form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
}
</style>
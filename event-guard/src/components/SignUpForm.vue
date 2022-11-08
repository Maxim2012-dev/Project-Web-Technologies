<template>
    <v-app>
        <v-form class="form">
            <h1>Sign Up Today!</h1>
            <h3 class="register-message">{{ register_type }} Registration</h3>
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
                <v-btn class="btn" text @click="login_event_handler">Log in</v-btn>
                <v-btn class="btn" depressed>Register</v-btn>
            </div>
        </v-form>
    </v-app>
</template>

<script>
export default {
    name: 'SignUpForm',
    props: ['register_type'],
    methods: {
        login_event_handler() {
            this.$emit('login-event', this.register_type)
        }
    }
}
</script>

<style>
.btn {
    margin: 15px;
}

.register-message {
    margin-bottom: 50px;
    color: gray;
}

.form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
}
</style>
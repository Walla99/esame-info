<template>
  <v-app id="app">
    <v-app-bar
      image="https://images.unsplash.com/photo-1509803874385-db7c23652552?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    >
      <template v-slot:prepend>
        <v-app-bar-nav-icon color="white" @click="drawer = !drawer">
        </v-app-bar-nav-icon>
      </template>

      <v-app-bar-title class="font-weight-bold text-white"
        >SkyWatch
        <v-icon end color="yellow" icon="mdi-white-balance-sunny" />
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <div class="mr-4">
        <BaseModal />
      </div>
    </v-app-bar>

    <v-navigation-drawer app color="#33739E" v-model="drawer" permanent>
      <v-container>
        <v-col align="center">
          <v-row class="mt-5" justify="center">
            <v-avatar size="x-large" color="white">
              <v-icon icon="mdi-account-circle-outline" />
            </v-avatar>
          </v-row>
          <v-row class="mt-5" justify="center">
            <p>Welcome back</p>
          </v-row>
        </v-col>
      </v-container>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>

    <v-footer padless class="mt-12">
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — Design by
        <strong>Valentina Degasperi, Saba Bonapace</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import BaseModal from "./components/BaseModal.vue";

const drawer = ref(false);
</script>



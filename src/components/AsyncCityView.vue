<template>
  <v-row v-if="route.query.preview">
    <!-- Sezione sinistra: Città e meteo -->
    <v-col cols="12" md="6" class="d-flex align-stretch">
      <v-card class="pa-6 flex-grow-1 bg-indigo darken-1 mt-4">
        <!-- Città -->
        <v-card-title class="text-h4 mb-2">
          {{ route.params.city }}
        </v-card-title>
        <!-- Data e Ora -->
        <v-card-subtitle class="text-subtitle-2 mb-6">
          {{
            new Date(weatherData.currentTime).toLocaleDateString("en-us", {
              weekday: "short",
              day: "2-digit",
              month: "long",
            })
          }}
          {{
            new Date(weatherData.currentTime).toLocaleTimeString("en-us", {
              hour: "2-digit",
              minute: "2-digit",
            })
          }}
        </v-card-subtitle>
        <!-- Temperatura -->
        <div class="text-h1 font-weight-bold mb-4">
          {{ Math.round(weatherData.current.temp) }}&deg;
        </div>
        <!-- Temperatura percepita -->
        <div class="mb-2">
          <span class="text-body-1">Feels like </span>
          <span class="text-h5 font-weight-medium">
            {{ Math.round(weatherData.current.feels_like) }}&deg;
          </span>
        </div>
        <!-- Descrizione del meteo -->
        <div class="mb-4 text-body-1 text-capitalize">
          {{ weatherData.current.weather[0].description }}
        </div>
        <!-- Icona del meteo -->
        <div class="d-flex justify-center align-center">
          <v-img
            :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
            max-width="150"
            alt="weather icon"
          ></v-img>
        </div>
      </v-card>
    </v-col>

    <!-- Sezione destra: Mappa -->
    <v-col cols="12" md="6" class="d-flex align-stretch">
      <v-card class="pa-6 flex-grow-1" outlined>
        <v-card-title class="text-h5">Map</v-card-title>
        <div class="map-container flex-grow-1">
          <!-- Placeholder per la mappa -->
          <iframe
            :src="`https://www.google.com/maps?q=${weatherData.lat},${weatherData.lon}&z=13&output=embed`"
            width="100%"
            height="100%"
            style="border: 0"
          ></iframe>
        </div>
      </v-card>
    </v-col>
  </v-row>
  <!-- Sezione inferiore: Carosello - Hourly Weather-->
  <v-col cols="12">
    <h2 class="text-center my-4">Hourly Weather</h2>
    <v-slide-group class="mx-8" show-arrows>
      <v-slide-item v-for="hourData in weatherData.hourly" :key="hourData.dt">
        <div class="carousel-item pa-4 text-center">
          <!-- Ora -->
          <h4>
            {{
              new Date(hourData.currentTime).toLocaleTimeString("en-us", {
                hour: "numeric",
              })
            }}
          </h4>
          <!-- Icona meteo -->
          <div class="d-flex justify-center align-center">
            <v-img
              :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
              :width="75"
              :height="75"
              alt="weather icon"
              contain
            ></v-img>
          </div>
          <!-- Temperatura -->
          <div class="text-h5 mt-2">{{ Math.round(hourData.temp) }}&deg;</div>
        </div>
      </v-slide-item>
    </v-slide-group>

    <v-divider></v-divider>

    <!-- Sezione inferiore: Carosello - Weekly Weather-->
    <h2 class="text-center mt-4">7 Day Forecast</h2>
    <div class="mt-4" v-for="day in weatherData.daily" :key="day.dt">
      <h4>
        {{
          new Date(day.dt * 1000).toLocaleDateString("en-us", {
            weekday: "long",
          })
        }}
      </h4>
      <!-- Icona meteo -->
      <div class="d-flex justify-center align-center">
        <v-img
          :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
          :width="60"
          :height="60"
          alt="weather icon"
          contain
        ></v-img>
      </div>
      <!-- Temperatura -->
      <div class="text-h5 mt-2">
        <span>H: {{ Math.round(day.temp.max) }} &deg;</span>
        <span>L: {{ Math.round(day.temp.min) }} &deg;</span>
      </div>
    </div>
  </v-col>
</template>
  

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const openApiKey = "b8d4fbd1be7f5dd5592b653ec52b0c5b";
const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${route.query.lat}&lon=${route.query.lng}&appid=${openApiKey}&units=metric`
    );

    // cal current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;

    // cal hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });

    return weatherData.data;
  } catch (err) {
    console.log(err);
  }
};

const weatherData = await getWeatherData();
</script>


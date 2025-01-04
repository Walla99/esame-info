<template>
  <v-dialog max-width="500" v-show="modalActive">
    <template v-slot:activator="{ props: activatorProps }">
      <v-icon
        v-bind="activatorProps"
        icon="mdi-information-outline"
        color="white"
      ></v-icon>
      <v-icon icon="mdi-plus" color="white" end @click="addCity"></v-icon>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <!-- Titolo della Card -->
        <v-card-title class="text-h6 mt-3">About</v-card-title>

        <!-- Contenuto della Card -->
        <v-card-text>
          <div>
            <strong>What you can do:</strong>
            <p>
              SkyWatch allows you to track the current and future weather of
              cities of your choosing.
            </p>
          </div>
          <div class="my-5">
            <strong>How it works:</strong>
            <ol class="px-5">
              <li>
                Search for your city by entering the name into the search bar.
              </li>
              <li>
                Select a city within the results; this will take you to the
                current weather for your selection.
              </li>
              <li>
                Track the city by clicking on the "+" icon in the top right.
                This will save the city to view later on the home page.
              </li>
            </ol>
          </div>
          <div>
            <strong>Removing a city:</strong>
            <p>
              If you no longer wish to track a city, select the city on the home
              page. At the bottom of the page, there will be an option to delete
              the city.
            </p>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            class="ma-3"
            color="#33739E"
            variant="flat"
            @click="isActive.value = false"
            >Close Dialog</v-btn
          >
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useRoute, useRouter } from "vue-router";
import app from "@/database/firebase";

// Inizializza Firestore
const db = getFirestore(app);

// Inizializza Vue Router
const route = useRoute();
const router = useRouter();

const addCity = async () => {
  try {
    // Crea il nuovo oggetto della città
    const locationObj = {
      state: route.params.state,
      city: route.params.city,
      coords: {
        lat: route.query.lat,
        lng: route.query.lng,
      },
    };

    // Salva il nuovo oggetto nella collezione "savedCities"
    const cityDocRef = await addDoc(collection(db, "savedCities"), locationObj);

    // Ottieni l'ID generato automaticamente
    const generatedId = cityDocRef.id;

    // Aggiorna i parametri del router
    let query = Object.assign({}, route.query);
    delete query.preview;
    query.id = generatedId; // Usa l'ID generato automaticamente
    router.replace({ query });
  } catch (error) {
    console.error("Errore durante l'aggiunta della città:", error.message);
  }
};
</script>

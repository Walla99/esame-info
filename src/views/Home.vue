<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="4" md="6" lg="8">
        <v-text-field
          label="Search for a city or state"
          v-model="searchQuery"
          @input="getSearchResult"
        ></v-text-field>
        <v-card variant="tonal">
          <v-list v-if="apiSearchResult">
            <p class="py-2 px-2" v-if="searchError">
              Sorry, something went wrong, please try again.
            </p>
            <p
              class="py-2 px-2"
              v-if="!searchError && apiSearchResult.length === 0"
            >
              No results match your query, try a different term.
            </p>
            <v-list-item
              v-else
              v-for="searchResult in apiSearchResult"
              :key="searchResult.id"
              class="hoverable-item"
              @click="previewCity(searchResult)"
            >
              <v-list-item-title>{{
                searchResult.place_name
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const apiKey =
  "pk.eyJ1IjoidmFsZW50aW5hZGVnYXNwZXJpIiwiYSI6ImNtM3NtdnZrazBmdzQycnNsM2ppc3c5dm0ifQ.Po9qoD7wCXBYd4gKlLNf5A";
const searchQuery = ref("");
const queryTimeout = ref(null);
const apiSearchResult = ref(null);
const searchError = ref(null);

const previewCity = (searchResult) => {
  console.log("Risultato della ricerca:", searchResult);

  // Controlla se place_name è valido
  if (!searchResult.place_name) {
    console.error("Errore: `place_name` non è definito.");
    return;
  }

  // Esegui lo split per ottenere città e stato
  const parts = searchResult.place_name.split(",");
  const city = parts[0]?.trim() || "UnknownCity"; // Primo elemento come città
  const state = parts[1] ? parts[1].trim().replaceAll(" ", "") : null; // Secondo elemento come stato o null

  // Naviga verso la nuova rotta
  router.push({
    name: "cityView",
    params: { state, city },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true,
    },
  });
};

const getSearchResult = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${apiKey}&types=place`
        );
        apiSearchResult.value = result.data.features;
      } catch {
        searchError.value = true;
      }

      return;
    }
    apiSearchResult.value = null;
  }, 300);
};
</script>

<style scoped>
.hoverable-item:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}
</style>


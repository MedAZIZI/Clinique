<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import coverImage from '../assets/img/LoginCover.png'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')

const handleSubmit = (event) => {
  event.preventDefault()
  if (!email.value || !password.value) {
    error.value = 'Merci de remplir email et mot de passe.'
    return
  }

  localStorage.setItem('proclinic-auth', 'connected')
  router.replace('/dashboard')
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="grid w-full max-w-6xl lg:grid-cols-2">
      <div class="hidden lg:block">
        <img
          :src="coverImage"
          alt="Login cover"
          class="h-[calc(100vh-96px)] w-full object-cover"
        />
      </div>

      <div class="flex items-center justify-center bg-white px-6 py-12 sm:px-10 lg:px-12">
        <div class="w-full max-w-lg">
          <div class="mb-8">
            <h2 class="text-3xl font-bold tracking-tight text-slate-900">Connexion à ProClinic</h2>
            <p class="mt-3 text-sm text-slate-600">
              Connectez-vous pour accéder à votre espace de gestion des patients.
            </p>
          </div>

          <form @submit="handleSubmit" class="space-y-6">
            <div class="space-y-6">
              <div>
                <label for="email" class="block text-sm font-medium text-slate-700">Email</label>
                <div class="mt-1">
                  <input
                    id="email"
                    v-model="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    class="block w-full rounded-2xl border border-slate-300 bg-white py-3 px-4 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between">
                  <label for="password" class="text-sm font-medium text-slate-700">Mot de passe</label>
                  <a href="#" class="text-sm text-sky-600 hover:text-sky-500">Mot de passe oublié ?</a>
                </div>
                <div class="mt-1">
                  <input
                    id="password"
                    v-model="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required
                    class="block w-full rounded-2xl border border-slate-300 bg-white py-3 px-4 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>
              </div>

              <div class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <p class="text-sm font-medium text-slate-900">Connexion sécurisée</p>
                <p class="mt-1 text-sm text-slate-500">Vous pouvez vous connecter avec votre adresse email et mot de passe.</p>
              </div>
            </div>

            <button
              type="submit"
              class="flex w-full justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              Se connecter
            </button>

            <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

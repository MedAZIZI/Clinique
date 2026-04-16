<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">Paramètres</h1>
        <p class="text-sm text-slate-500 mt-1">Configuration de la clinique et paramètres utilisateur</p>
      </div>
    </div>

    <!-- Settings Tabs -->
    <div class="bg-white rounded-lg shadow-sm ring-1 ring-slate-200">
      <div class="flex border-b border-slate-200">
        <button 
          @click="activeTab = 'profile'" 
          :class="['px-6 py-3 font-medium transition', activeTab === 'profile' ? 'text-sky-600 border-b-2 border-sky-600' : 'text-slate-600 hover:text-slate-900']"
        >
          👤 Profil
        </button>
        <button 
          @click="activeTab = 'clinic'" 
          :class="['px-6 py-3 font-medium transition', activeTab === 'clinic' ? 'text-sky-600 border-b-2 border-sky-600' : 'text-slate-600 hover:text-slate-900']"
        >
          🏥 Clinique
        </button>
        <button 
          @click="activeTab = 'notifications'" 
          :class="['px-6 py-3 font-medium transition', activeTab === 'notifications' ? 'text-sky-600 border-b-2 border-sky-600' : 'text-slate-600 hover:text-slate-900']"
        >
          🔔 Notifications
        </button>
        <button 
          @click="activeTab = 'security'" 
          :class="['px-6 py-3 font-medium transition', activeTab === 'security' ? 'text-sky-600 border-b-2 border-sky-600' : 'text-slate-600 hover:text-slate-900']"
        >
          🔐 Sécurité
        </button>
      </div>

      <div class="p-6">
        <!-- Profile Tab -->
        <div v-show="activeTab === 'profile'" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-slate-900 mb-2">Nom Complet</label>
            <input type="text" value="Dr. Jean Dupont" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent">
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-900 mb-2">Email</label>
            <input type="email" value="jean.dupont@proclinic.fr" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent">
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-900 mb-2">Poste</label>
            <input type="text" value="Administrateur" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent">
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-900 mb-2">Téléphone</label>
            <input type="tel" value="+33 1 23 45 67 89" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent">
          </div>
          <button class="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition">✓ Enregistrer</button>
        </div>

        <!-- Clinic Tab -->
        <div v-show="activeTab === 'clinic'" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-slate-900 mb-2">Nom Clinique</label>
            <input type="text" value="ProClinic - Clinique Principale" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent">
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-900 mb-2">Adresse</label>
            <input type="text" value="123 Rue de la Santé, 75000 Paris" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent">
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-slate-900 mb-2">Téléphone</label>
              <input type="tel" value="+33 1 XX XX XX XX" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent">
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-900 mb-2">Fax</label>
              <input type="tel" value="+33 1 XX XX XX XX" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent">
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-900 mb-2">Email Clinique</label>
            <input type="email" value="contact@proclinic.fr" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent">
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-900 mb-2">Site Web</label>
            <input type="url" value="www.proclinic.fr" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent">
          </div>
          <button class="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition">✓ Enregistrer</button>
        </div>

        <!-- Notifications Tab -->
        <div v-show="activeTab === 'notifications'" class="space-y-4">
          <div class="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <p class="font-medium text-slate-900">Notification de nouveaux patients</p>
              <p class="text-xs text-slate-500">Recevoir une alerte quand un patient est enregistré</p>
            </div>
            <label class="flex items-center">
              <input type="checkbox" checked class="w-4 h-4 rounded border-slate-300">
              <span class="ml-2 text-sm text-slate-600"></span>
            </label>
          </div>
          <div class="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <p class="font-medium text-slate-900">Alertes d'admission</p>
              <p class="text-xs text-slate-500">Notifications pour les nouvelles hospitalisations</p>
            </div>
            <label class="flex items-center">
              <input type="checkbox" checked class="w-4 h-4 rounded border-slate-300">
            </label>
          </div>
          <div class="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <p class="font-medium text-slate-900">Rappels de rendez-vous</p>
              <p class="text-xs text-slate-500">Notifications pour les rendez-vous à venir</p>
            </div>
            <label class="flex items-center">
              <input type="checkbox" class="w-4 h-4 rounded border-slate-300">
            </label>
          </div>
          <div class="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <p class="font-medium text-slate-900">Rapports quotidiens</p>
              <p class="text-xs text-slate-500">Résumé des activités du jour</p>
            </div>
            <label class="flex items-center">
              <input type="checkbox" checked class="w-4 h-4 rounded border-slate-300">
            </label>
          </div>
          <button class="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition">✓ Enregistrer</button>
        </div>

        <!-- Security Tab -->
        <div v-show="activeTab === 'security'" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-slate-900 mb-2">Mot de Passe Actuel</label>
            <input type="password" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent">
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-900 mb-2">Nouveau Mot de Passe</label>
            <input type="password" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent">
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-900 mb-2">Confirmer Mot de Passe</label>
            <input type="password" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent">
          </div>
          <button class="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition">✓ Changer Mot de Passe</button>
          
          <div class="mt-8 pt-8 border-t border-slate-200">
            <h3 class="text-lg font-semibold text-slate-900 mb-4">Sessions Actives</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <p class="font-medium text-slate-900">Session Actuelle</p>
                  <p class="text-xs text-slate-500">Chrome sur Windows - IP: 192.168.1.1</p>
                </div>
                <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Actif</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('profile')
</script>

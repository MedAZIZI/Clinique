<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('Tout')
const tabs = ['Médecins', 'Infirmiers', 'Tout']

const doctors = [
  {
    id: 1,
    firstName: 'Martin',
    lastName: 'Dupuis',
    specialty: 'Cardiologie',
    phone: '06 12 34 56 78',
    email: 'martin.dupuis@clinique26.com',
    orderNumber: 'MD-1024',
    service: 'Cardiologie',
    type: 'Interne',
    status: 'Actif',
    address: '14 avenue des Tilleuls',
    city: 'Paris',
    observation: 'Responsable service cardiologie',
  },
  {
    id: 2,
    firstName: 'Sophie',
    lastName: 'Laurent',
    specialty: 'Généraliste',
    phone: '06 23 45 67 89',
    email: 'sophie.laurent@clinique26.com',
    orderNumber: 'MD-1098',
    service: 'Consultation',
    type: 'Externe',
    status: 'Actif',
    address: '9 rue des Fleurs',
    city: 'Lyon',
    observation: 'Consultations enfants et adultes',
  },
  {
    id: 3,
    firstName: 'Pierre',
    lastName: 'Bernard',
    specialty: 'Chirurgie',
    phone: '06 98 76 54 32',
    email: 'pierre.bernard@clinique26.com',
    orderNumber: 'MD-1077',
    service: 'Chirurgie',
    type: 'Interne',
    status: 'Inactif',
    address: '3 boulevard Victor Hugo',
    city: 'Marseille',
    observation: 'Congé maternité jusqu’à début mai',
  },
  {
    id: 4,
    firstName: 'Claire',
    lastName: 'Morel',
    specialty: 'Pédiatrie',
    phone: '06 87 65 43 21',
    email: 'claire.morel@clinique26.com',
    orderNumber: 'MD-1150',
    service: 'Pédiatrie',
    type: 'Externe',
    status: 'Actif',
    address: '27 impasse des Lilas',
    city: 'Nice',
    observation: 'Consultations pédiatriques',
  },
  {
    id: 5,
    firstName: 'Julien',
    lastName: 'Leroy',
    specialty: 'Dermatologie',
    phone: '06 54 32 10 98',
    email: 'julien.leroy@clinique26.com',
    orderNumber: 'MD-1182',
    service: 'Dermatologie',
    type: 'Interne',
    status: 'Actif',
    address: '5 rue Jean Jaurès',
    city: 'Toulouse',
    observation: 'Suivi des pathologies cutanées',
  },
]

const nurses = [
  {
    id: 101,
    firstName: 'Anne',
    lastName: 'Lefebvre',
    specialty: 'Soins généraux',
    phone: '06 11 22 33 44',
    email: 'anne.lefebvre@clinique26.com',
    orderNumber: '',
    service: 'Urgence',
    type: 'Interne',
    status: 'Actif',
    address: '12 rue du Marché',
    city: 'Paris',
    observation: 'Référente triage urgences',
  },
  {
    id: 102,
    firstName: 'Michel',
    lastName: 'Durand',
    specialty: 'Soins intensifs',
    phone: '06 33 44 55 66',
    email: 'michel.durand@clinique26.com',
    orderNumber: '',
    service: 'Réanimation',
    type: 'Interne',
    status: 'Actif',
    address: '8 rue des Écoles',
    city: 'Lille',
    observation: 'Spécialiste soins critiques',
  },
  {
    id: 103,
    firstName: 'Claire',
    lastName: 'Henry',
    specialty: 'Soins obstétriques',
    phone: '06 77 88 55 22',
    email: 'claire.henry@clinique26.com',
    orderNumber: '',
    service: 'Maternité',
    type: 'Externe',
    status: 'Inactif',
    address: '4 place Bellecour',
    city: 'Lyon',
    observation: 'Disponible à partir du 15 avril',
  },
  {
    id: 104,
    firstName: 'Nicolas',
    lastName: 'David',
    specialty: 'Soins d’oncologie',
    phone: '06 77 66 55 44',
    email: 'nicolas.david@clinique26.com',
    orderNumber: '',
    service: 'Oncologie',
    type: 'Interne',
    status: 'Actif',
    address: '18 avenue Foch',
    city: 'Nancy',
    observation: 'Suivi des chimiothérapies',
  },
  {
    id: 105,
    firstName: 'Emilie',
    lastName: 'Pollet',
    specialty: 'Soins de rééducation',
    phone: '06 88 77 66 55',
    email: 'emilie.pollet@clinique26.com',
    orderNumber: '',
    service: 'Rééducation',
    type: 'Externe',
    status: 'Actif',
    address: '22 rue de la Gare',
    city: 'Reims',
    observation: 'Accompagnement post-opératoire',
  },
]

const displayedStaff = computed(() => {
  if (activeTab.value === 'Médecins') return doctors
  if (activeTab.value === 'Infirmiers') return nurses
  return [...doctors, ...nurses]
})

const totalDoctors = computed(() => doctors.length)
const totalNurses = computed(() => nurses.length)
const totalActif = computed(() => displayedStaff.value.filter((item) => item.status === 'Actif').length)
const totalInactif = computed(() => displayedStaff.value.filter((item) => item.status === 'Inactif').length)

const getStatusClass = (status) => {
  return status === 'Actif'
    ? 'bg-green-100 text-green-800'
    : 'bg-red-100 text-red-800'
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">Personnel</h1>
        <p class="text-sm text-slate-500 mt-1">Gestion des médecins et infirmiers</p>
      </div>
      <button class="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition">
        + Ajouter Personnel
      </button>
    </div>

    <div class="flex flex-wrap gap-2 bg-slate-100 rounded-full p-2">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="activeTab = tab"
        :class="[
          'px-4 py-2 rounded-full text-sm font-medium transition',
          activeTab === tab ? 'bg-sky-600 text-white' : 'text-slate-700 hover:bg-slate-200'
        ]"
      >
        {{ tab }}
      </button>
    </div>

    <div class="grid grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-lg shadow-sm ring-1 ring-slate-200">
        <p class="text-sm text-slate-600">Médecins</p>
        <p class="text-3xl font-bold text-slate-900">{{ totalDoctors }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm ring-1 ring-slate-200">
        <p class="text-sm text-slate-600">Infirmiers</p>
        <p class="text-3xl font-bold text-slate-900">{{ totalNurses }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm ring-1 ring-slate-200">
        <p class="text-sm text-slate-600">Actifs</p>
        <p class="text-3xl font-bold text-green-600">{{ totalActif }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm ring-1 ring-slate-200">
        <p class="text-sm text-slate-600">Inactifs</p>
        <p class="text-3xl font-bold text-red-600">{{ totalInactif }}</p>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm ring-1 ring-slate-200 p-6">
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm text-left">
          <thead class="bg-slate-50">
            <tr>
              <th class="px-4 py-3 font-semibold text-slate-900">Nom</th>
              <th class="px-4 py-3 font-semibold text-slate-900">Prénom</th>
              <th class="px-4 py-3 font-semibold text-slate-900">Spécialité</th>
              <th class="px-4 py-3 font-semibold text-slate-900">Téléphone</th>
              <th class="px-4 py-3 font-semibold text-slate-900">Email</th>
              <th class="px-4 py-3 font-semibold text-slate-900">N° d’ordre</th>
              <th class="px-4 py-3 font-semibold text-slate-900">Service</th>
              <th class="px-4 py-3 font-semibold text-slate-900">Type</th>
              <th class="px-4 py-3 font-semibold text-slate-900">Statut</th>
              <th class="px-4 py-3 font-semibold text-slate-900">Ville</th>
              <th class="px-4 py-3 font-semibold text-slate-900">Observation</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="member in displayedStaff" :key="member.id" class="border-b border-slate-100 hover:bg-slate-50">
              <td class="px-4 py-3 font-medium text-slate-900">{{ member.lastName }}</td>
              <td class="px-4 py-3 text-slate-600">{{ member.firstName }}</td>
              <td class="px-4 py-3 text-slate-600">{{ member.specialty }}</td>
              <td class="px-4 py-3 text-slate-600">{{ member.phone }}</td>
              <td class="px-4 py-3 text-slate-600">{{ member.email }}</td>
              <td class="px-4 py-3 text-slate-600">{{ member.orderNumber || '-' }}</td>
              <td class="px-4 py-3 text-slate-600">{{ member.service }}</td>
              <td class="px-4 py-3 text-slate-600">{{ member.type }}</td>
              <td class="px-4 py-3">
                <span :class="getStatusClass(member.status) + ' px-2 py-1 rounded-full text-xs font-semibold'">{{ member.status }}</span>
              </td>
              <td class="px-4 py-3 text-slate-600">{{ member.city }}</td>
              <td class="px-4 py-3 text-slate-600">{{ member.observation }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">Voir Hospitalisation</h1>
        <p class="text-sm text-slate-500 mt-1">Détails de l'hospitalisation {{ $route.params.id }}</p>
      </div>
      <div class="flex items-center space-x-4">
        <button @click="displayMode = displayMode === 'tabs' ? 'single' : 'tabs'" class="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition">
          {{ displayMode === 'tabs' ? 'Affichage unique' : 'Affichage en onglets' }}
        </button>
        <router-link to="/hospitalizations" class="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition">
          Retour à la liste
        </router-link>
      </div>
    </div>

    <!-- Affichage en onglets -->
    <div v-if="displayMode === 'tabs'" class="bg-white rounded-lg shadow-sm ring-1 ring-slate-200">
      <TabGroup>
        <TabList class="flex gap-2 bg-slate-100 p-2 border-b border-slate-200" as="div">
          <Tab
            v-for="tab in tabs"
            :key="tab.name"
            v-slot="{ selected }"
            :class="[
              'px-4 py-2 text-sm font-semibold rounded-t-lg transition-all flex items-center outline-none border-b-2',
              selected
                ? 'bg-slate-200 text-sky-700 border-sky-600 shadow-sm'
                : 'text-slate-500 border-transparent hover:text-slate-700 hover:bg-slate-50'
            ]"
          >
            <component :is="tab.icon" :class="['w-4 h-4 mr-2', selected ? 'text-sky-600' : 'text-slate-400']" />
            {{ tab.name }}
          </Tab>
        </TabList>

        <TabPanels class="p-6">
          <TabPanel>
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-slate-900">Informations générales</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-medium text-slate-700">Patient</label>
                  <p class="mt-1 text-sm text-slate-900">{{ hospitalization.patientName }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-slate-700">Médecin responsable</label>
                  <p class="mt-1 text-sm text-slate-900">{{ hospitalization.doctorId }}</p>
                </div>
              </div>
              <div>
                <label class="text-sm font-medium text-slate-700">Motif d'hospitalisation</label>
                <p class="mt-1 text-sm text-slate-900">{{ hospitalization.reason }}</p>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-medium text-slate-700">Statut</label>
                  <p class="mt-1 text-sm text-slate-900">{{ hospitalization.status }}</p>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-slate-900">Information du séjour</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-medium text-slate-700">Date d'entrée</label>
                  <p class="mt-1 text-sm text-slate-900">{{ hospitalization.admissionDate }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-slate-700">Date de sortie</label>
                  <p class="mt-1 text-sm text-slate-900">{{ hospitalization.dischargeDate || '—' }}</p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-medium text-slate-700">Lit</label>
                  <p class="mt-1 text-sm text-slate-900">{{ hospitalization.bedId }}</p>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-slate-900">Actes médicaux</h3>
              <div class="overflow-x-auto">
                <table class="w-full text-sm border-collapse">
                  <thead class="bg-slate-100">
                    <tr>
                      <th class="border border-slate-300 px-3 py-2 text-left">Acte</th>
                      <th class="border border-slate-300 px-3 py-2 text-left">Code AMO</th>
                      <th class="border border-slate-300 px-3 py-2 text-left">Cotation</th>
                      <th class="border border-slate-300 px-3 py-2 text-left">Médecin</th>
                      <th class="border border-slate-300 px-3 py-2 text-right">Prix</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="act in hospitalization.acts" :key="act.id">
                      <td class="border border-slate-300 px-3 py-2">{{ act.name }}</td>
                      <td class="border border-slate-300 px-3 py-2">{{ act.code }}</td>
                      <td class="border border-slate-300 px-3 py-2">{{ act.cotation }}</td>
                      <td class="border border-slate-300 px-3 py-2">{{ act.doctor }}</td>
                      <td class="border border-slate-300 px-3 py-2 text-right">{{ act.price }}€</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-slate-900">Facturation</h3>
              <div class="grid grid-cols-3 gap-4 bg-slate-50 p-4 rounded-lg">
                <div>
                  <p class="text-sm text-slate-600">Montant total</p>
                  <p class="text-2xl font-bold text-slate-900">{{ totalActsPrice }}€</p>
                </div>
                <div>
                  <p class="text-sm text-slate-600">Part mutuelle</p>
                  <p class="text-2xl font-bold text-slate-900">{{ hospitalization.mutuellePart }}€</p>
                </div>
                <div>
                  <p class="text-sm text-slate-600">Part patient</p>
                  <p class="text-2xl font-bold text-slate-900">{{ hospitalization.patientPart }}€</p>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-slate-900">Observations</h3>
              <div>
                <label class="text-sm font-medium text-slate-700">Notes médicales</label>
                <p class="mt-1 text-sm text-slate-900">{{ hospitalization.notes }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-slate-700">Observation générale</label>
                <p class="mt-1 text-sm text-slate-900">{{ hospitalization.observation }}</p>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>

    <!-- Affichage en une seule page -->
    <div v-else class="space-y-6">
      <div class="bg-white p-6 rounded-lg shadow-sm ring-1 ring-slate-200">
        <h3 class="text-lg font-semibold text-slate-900 mb-4">Informations générales</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-slate-700">Patient</label>
            <p class="mt-1 text-sm text-slate-900">{{ hospitalization.patientName }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-slate-700">Médecin responsable</label>
            <p class="mt-1 text-sm text-slate-900">{{ hospitalization.doctorId }}</p>
          </div>
        </div>
        <div class="mt-4">
          <label class="text-sm font-medium text-slate-700">Motif d'hospitalisation</label>
          <p class="mt-1 text-sm text-slate-900">{{ hospitalization.reason }}</p>
        </div>
        <div class="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label class="text-sm font-medium text-slate-700">Statut</label>
            <p class="mt-1 text-sm text-slate-900">{{ hospitalization.status }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm ring-1 ring-slate-200">
        <h3 class="text-lg font-semibold text-slate-900 mb-4">Information du séjour</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-slate-700">Date d'entrée</label>
            <p class="mt-1 text-sm text-slate-900">{{ hospitalization.admissionDate }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-slate-700">Date de sortie</label>
            <p class="mt-1 text-sm text-slate-900">{{ hospitalization.dischargeDate || '—' }}</p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label class="text-sm font-medium text-slate-700">Lit</label>
            <p class="mt-1 text-sm text-slate-900">{{ hospitalization.bedId }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm ring-1 ring-slate-200">
        <h3 class="text-lg font-semibold text-slate-900 mb-4">Actes médicaux</h3>
        <div class="overflow-x-auto">
          <table class="w-full text-sm border-collapse">
            <thead class="bg-slate-100">
              <tr>
                <th class="border border-slate-300 px-3 py-2 text-left">Acte</th>
                <th class="border border-slate-300 px-3 py-2 text-left">Code AMO</th>
                <th class="border border-slate-300 px-3 py-2 text-left">Cotation</th>
                <th class="border border-slate-300 px-3 py-2 text-left">Médecin</th>
                <th class="border border-slate-300 px-3 py-2 text-right">Prix</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="act in hospitalization.acts" :key="act.id">
                <td class="border border-slate-300 px-3 py-2">{{ act.name }}</td>
                <td class="border border-slate-300 px-3 py-2">{{ act.code }}</td>
                <td class="border border-slate-300 px-3 py-2">{{ act.cotation }}</td>
                <td class="border border-slate-300 px-3 py-2">{{ act.doctor }}</td>
                <td class="border border-slate-300 px-3 py-2 text-right">{{ act.price }}€</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm ring-1 ring-slate-200">
        <h3 class="text-lg font-semibold text-slate-900 mb-4">Facturation</h3>
        <div class="grid grid-cols-3 gap-4 bg-slate-50 p-4 rounded-lg">
          <div>
            <p class="text-sm text-slate-600">Montant total</p>
            <p class="text-2xl font-bold text-slate-900">{{ totalActsPrice }}€</p>
          </div>
          <div>
            <p class="text-sm text-slate-600">Part mutuelle</p>
            <p class="text-2xl font-bold text-slate-900">{{ hospitalization.mutuellePart }}€</p>
          </div>
          <div>
            <p class="text-sm text-slate-600">Part patient</p>
            <p class="text-2xl font-bold text-slate-900">{{ hospitalization.patientPart }}€</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm ring-1 ring-slate-200">
        <h3 class="text-lg font-semibold text-slate-900 mb-4">Observations</h3>
        <div class="mb-4">
          <label class="text-sm font-medium text-slate-700">Notes médicales</label>
          <p class="mt-1 text-sm text-slate-900">{{ hospitalization.notes }}</p>
        </div>
        <div>
          <label class="text-sm font-medium text-slate-700">Observation générale</label>
          <p class="mt-1 text-sm text-slate-900">{{ hospitalization.observation }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { InformationCircleIcon, HomeIcon, DocumentTextIcon, CurrencyDollarIcon, EyeIcon } from '@heroicons/vue/20/solid'

const displayMode = ref('tabs')

const tabs = [
  { name: 'Infos', icon: InformationCircleIcon },
  { name: 'Séjour', icon: HomeIcon },
  { name: 'Actes', icon: DocumentTextIcon },
  { name: 'Facturation', icon: CurrencyDollarIcon },
  { name: 'Observations', icon: EyeIcon }
]

// Mock data - à remplacer par une vraie récupération depuis l'API
const hospitalization = ref({
  id: 1,
  patientId: 1,
  patientName: 'Sofia Moreau',
  medicalRecord: 'MED-1001',
  doctorId: 'Dr. Martin Dupuis',
  reason: 'Suivi post-opératoire',
  status: 'En cours',
  admissionDate: '2026-04-05',
  dischargeDate: '',
  bedId: 'A102',
  acts: [
    { id: 1, name: 'Consultation cardiologie', code: 'K051', cotation: 'K1', doctor: 'Dr. Dupuis', price: 80 },
    { id: 2, name: 'Électrocardiogramme', code: 'K352', cotation: 'K2', doctor: 'Dr. Dupuis', price: 45 }
  ],
  mutuellePart: 200,
  patientPart: 125,
  notes: 'Surveillance tension artérielle',
  observation: 'Bonne évolution postopératoire'
})

const totalActsPrice = computed(() => {
  return hospitalization.value.acts.reduce((sum, act) => sum + (act.price || 0), 0)
})
</script>
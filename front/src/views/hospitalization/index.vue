<script setup>
import { ref, computed } from 'vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDownIcon, InformationCircleIcon, HomeIcon, DocumentTextIcon, CurrencyDollarIcon, EyeIcon } from '@heroicons/vue/20/solid'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

const showForm = ref(false)
const search = ref('')
const activePage = ref(1)
const perPage = 10

const tabs = [
  { name: 'Infos', icon: InformationCircleIcon },
  { name: 'Séjour', icon: HomeIcon },
  { name: 'Actes', icon: DocumentTextIcon },
  { name: 'Facturation', icon: CurrencyDollarIcon },
  { name: 'Observations', icon: EyeIcon }
]

const doctors = [
  'Dr. Martin Dupuis',
  'Dr. Sophie Laurent',
  'Dr. Pierre Bernard',
  'Dr. Claire Morel',
  'Dr. Julien Leroy'
]

const patients = [
  { id: 1, name: 'Sofia Moreau', medicalRecord: 'MED-1001' },
  { id: 2, name: 'Lucas Martin', medicalRecord: 'MED-1002' },
  { id: 3, name: 'Emma Garcia', medicalRecord: 'MED-1003' },
  { id: 4, name: 'Nora Petit', medicalRecord: 'MED-1004' },
  { id: 5, name: 'Julien Leroy', medicalRecord: 'MED-1005' },
  { id: 6, name: 'Alice Marchand', medicalRecord: 'MED-1006' },
]

const beds = ref([
  { id: 'A101', room: 'Médecine', type: 'Simple', status: 'Libre' },
  { id: 'A102', room: 'Médecine', type: 'Simple', status: 'Occupé' },
  { id: 'A103', room: 'Médecine', type: 'Double', status: 'Libre' },
  { id: 'B201', room: 'Chirurgie', type: 'Simple', status: 'Occupé' },
  { id: 'B202', room: 'Chirurgie', type: 'Double', status: 'Libre' },
  { id: 'C301', room: 'Urgence', type: 'VIP', status: 'Libre' },
  { id: 'D401', room: 'Pédiatrie', type: 'Simple', status: 'Occupé' },
  { id: 'D402', room: 'Pédiatrie', type: 'Simple', status: 'Libre' },
])

const medicalActs = [
  { id: 1, name: 'Consultation cardiologie', code: 'K051', price: 80 },
  { id: 2, name: 'Électrocardiogramme', code: 'K352', price: 45 },
  { id: 3, name: 'Intervention chirurgicale', code: 'NKDA011', price: 450 },
  { id: 4, name: 'Écographie abdominale', code: 'K502', price: 70 },
  { id: 5, name: 'Consultation généraliste', code: 'C001', price: 50 },
  { id: 6, name: 'Radiographie thoracique', code: 'K123', price: 60 },
  { id: 7, name: 'Analyse de sang', code: 'BIO001', price: 35 },
  { id: 8, name: 'Échographie cardiaque', code: 'K361', price: 100 },
  { id: 9, name: 'IRM crânien', code: 'K532', price: 300 },
  { id: 10, name: 'Suture intervention', code: 'SURG001', price: 150 },
  { id: 11, name: 'Pansement stérile', code: 'PANS001', price: 25 },
  { id: 12, name: 'Injection intraveineuse', code: 'INJ001', price: 40 }
]

const hospitalizations = ref([
  {
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
  },
  {
    id: 2,
    patientId: 2,
    patientName: 'Lucas Martin',
    medicalRecord: 'MED-1002',
    doctorId: 'Dr. Sophie Laurent',
    reason: 'Appendicectomie',
    status: 'Terminé',
    admissionDate: '2026-04-02',
    dischargeDate: '2026-04-07',
    bedId: 'B201',
    acts: [
      { id: 1, name: 'Intervention chirurgicale', code: 'NKDA011', cotation: 'K3', doctor: 'Dr. Laurent', price: 450 },
      { id: 2, name: 'Écographie abdominale', code: 'K502', cotation: 'K2', doctor: 'Dr. Laurent', price: 70 }
    ],
    mutuellePart: 350,
    patientPart: 170,
    notes: 'Rééducation débutée',
    observation: 'Sortie autorisée'
  }
])

const form = ref({
  patientId: '',
  doctorId: '',
  reason: '',
  status: 'En cours',
  admissionDate: new Date().toISOString().split('T')[0],
  dischargeDate: '',
  bedId: '',
  acts: [],
  mutuellePart: 0,
  patientPart: 0,
  notes: '',
  observation: ''
})

const newAct = ref({
  selectedAct: null,
  cotation: '',
  doctor: ''
})

const showDeleteConfirm = ref(false)
const recordToDelete = ref(null)

const availableBeds = computed(() => {
  return beds.value.filter(bed => bed.status === 'Libre' || bed.id === form.value.bedId)
})

const totalActsPrice = computed(() => {
  return form.value.acts.reduce((sum, act) => sum + (act.price || 0), 0)
})

const filteredHospitalizations = computed(() => {
  const normalizedSearch = search.value.toLowerCase().trim()
  return hospitalizations.value.filter(record => {
    return [record.patientName, record.medicalRecord, record.reason, record.doctorId]
      .join(' ')
      .toLowerCase()
      .includes(normalizedSearch)
  })
})

const paginatedHospitalizations = computed(() => {
  const start = (activePage.value - 1) * perPage
  return filteredHospitalizations.value.slice(start, start + perPage)
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredHospitalizations.value.length / perPage)))

const stats = computed(() => ({
  totalActive: hospitalizations.value.filter(h => h.status === 'En cours').length,
  totalCompleted: hospitalizations.value.filter(h => h.status === 'Terminé').length,
  freeBeds: beds.value.filter(b => b.status === 'Libre').length,
  occupiedBeds: beds.value.filter(b => b.status === 'Occupé').length
}))

const addAct = () => {
  if (newAct.value.selectedAct) {
    const selectedActData = medicalActs.find(act => act.id === Number(newAct.value.selectedAct))
    if (selectedActData) {
      form.value.acts.push({
        id: Date.now(),
        name: selectedActData.name,
        code: selectedActData.code,
        cotation: newAct.value.cotation,
        doctor: newAct.value.doctor,
        price: selectedActData.price
      })
      newAct.value = { selectedAct: null, cotation: '', doctor: '' }
    }
  }
}

const removeAct = (id) => {
  form.value.acts = form.value.acts.filter(act => act.id !== id)
}

const saveHospitalization = () => {
  const selectedPatient = patients.find(p => p.id === Number(form.value.patientId))
  if (!selectedPatient) return

  const newRecord = {
    id: Math.max(0, ...hospitalizations.value.map(h => h.id)) + 1,
    ...form.value,
    patientId: Number(form.value.patientId),
    patientName: selectedPatient.name,
    medicalRecord: selectedPatient.medicalRecord,
    acts: form.value.acts
  }

  hospitalizations.value.unshift(newRecord)

  const bed = beds.value.find(b => b.id === form.value.bedId)
  if (bed && form.value.status === 'En cours') {
    bed.status = 'Occupé'
  }

  resetForm()
  showForm.value = false
}

const resetForm = () => {
  form.value = {
    patientId: '',
    doctorId: '',
    reason: '',
    status: 'En cours',
    admissionDate: new Date().toISOString().split('T')[0],
    dischargeDate: '',
    bedId: '',
    acts: [],
    mutuellePart: 0,
    patientPart: 0,
    notes: '',
    observation: ''
  }
  newAct.value = { selectedAct: null, cotation: '', doctor: '' }
}

const deleteHospitalization = (id) => {
  const record = hospitalizations.value.find(h => h.id === id)
  if (record && record.bedId) {
    const bed = beds.value.find(b => b.id === record.bedId)
    if (bed && record.status === 'En cours') bed.status = 'Libre'
  }
  hospitalizations.value = hospitalizations.value.filter(h => h.id !== id)
}

const confirmDelete = (record) => {
  showDeleteConfirm.value = true
  recordToDelete.value = record
}

const deleteConfirmed = () => {
  if (recordToDelete.value) {
    deleteHospitalization(recordToDelete.value.id)
  }
  showDeleteConfirm.value = false
  recordToDelete.value = null
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">Hospitalisation</h1>
        <p class="text-sm text-slate-500 mt-1">Gestion des séjours et actes médicaux</p>
      </div>
      <button @click="showForm = true; resetForm()" class="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition">
        + Admission
      </button>
    </div>

    <div class="grid grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-lg shadow-sm ring-1 ring-slate-200">
        <p class="text-sm text-slate-600">En cours</p>
        <p class="text-3xl font-bold text-green-600">{{ stats.totalActive }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm ring-1 ring-slate-200">
        <p class="text-sm text-slate-600">Terminés</p>
        <p class="text-3xl font-bold text-slate-900">{{ stats.totalCompleted }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm ring-1 ring-slate-200">
        <p class="text-sm text-slate-600">Lits libres</p>
        <p class="text-3xl font-bold text-sky-600">{{ stats.freeBeds }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm ring-1 ring-slate-200">
        <p class="text-sm text-slate-600">Occupés</p>
        <p class="text-3xl font-bold text-orange-600">{{ stats.occupiedBeds }}</p>
      </div>
    </div>

    <div class="bg-white p-4 rounded-lg shadow-sm ring-1 ring-slate-200">
      <input
        v-model="search"
        type="text"
        placeholder="Rechercher par patient, médecin, motif..."
        class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
      />
    </div>

    <div class="bg-white rounded-lg shadow-sm ring-1 ring-slate-200 overflow-hidden flex flex-col h-[calc(100vh-400px)]">
      <div class="overflow-x-auto overflow-y-auto flex-1">
        <table class="min-w-full divide-y divide-slate-200">
          <thead class="bg-slate-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Patient</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Médecin</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date entrée</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date sortie</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Lit</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Statut</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-slate-200">
            <tr v-for="record in paginatedHospitalizations" :key="record.id" class="hover:bg-slate-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{{ record.patientName }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{{ record.doctorId }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{{ record.admissionDate }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{{ record.dischargeDate || '—' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{{ record.bedId }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'px-2 py-1 text-xs font-semibold rounded-full',
                    record.status === 'En cours'
                      ? 'bg-green-100 text-green-800'
                      : record.status === 'Terminé'
                        ? 'bg-slate-100 text-slate-800'
                        : 'bg-yellow-100 text-yellow-800'
                  ]"
                >
                  {{ record.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Menu as="div" class="relative inline-block text-left">
                  <MenuButton class="flex items-center justify-center px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition">
                    Actions <ChevronDownIcon class="ml-2 w-4 h-4" />
                  </MenuButton>
                  <MenuItems class="absolute right-0 z-10 w-48 mt-2 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div class="py-1">
                      <MenuItem v-slot="{ active }">
                        <button @click="$router.push(`/hospitalizations/${record.id}`)" :class="[active ? 'bg-slate-100 text-slate-900' : 'text-slate-700', 'block w-full text-left px-4 py-2 text-sm']">
                          👁️ Voir
                        </button>
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                        <button @click="$router.push(`/hospitalizations/${record.id}/edit`)" :class="[active ? 'bg-slate-100 text-slate-900' : 'text-slate-700', 'block w-full text-left px-4 py-2 text-sm']">
                          ✎ Modifier
                        </button>
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                        <button :class="[active ? 'bg-slate-100 text-slate-900' : 'text-slate-700', 'block w-full text-left px-4 py-2 text-sm']">
                          👤 Consulter patient
                        </button>
                      </MenuItem>
                      <div class="border-t border-slate-200 my-1"></div>
                      <MenuItem v-slot="{ active }">
                        <button @click="confirmDelete(record)" :class="[active ? 'bg-red-100 text-red-900' : 'text-red-700', 'block w-full text-left px-4 py-2 text-sm']">
                          🗑️ Supprimer
                        </button>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Menu>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex items-center justify-between p-4 border-t border-slate-200">
        <p class="text-sm text-slate-500">{{ paginatedHospitalizations.length }} enregistrements sur {{ filteredHospitalizations.length }}</p>
        <div class="flex items-center space-x-2">
          <button @click="activePage = Math.max(1, activePage - 1)" :disabled="activePage === 1" class="px-3 py-1 text-sm border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50">Précédent</button>
          <span class="text-sm text-slate-600">{{ activePage }} / {{ totalPages }}</span>
          <button @click="activePage = Math.min(totalPages, activePage + 1)" :disabled="activePage === totalPages" class="px-3 py-1 text-sm border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50">Suivant</button>
        </div>
      </div>
    </div>

    <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <div class="w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
        <TabGroup>
          <TabList class="flex gap-2 bg-slate-100 p-2 border-b border-slate-200" as="div">
            <Tab
              v-for="tab in tabs"
              :key="tab.name"
              v-slot="{ selected }"
              as="template"
            >
              <button
                :class="[
                  'px-4 py-2 text-sm font-semibold rounded-t-lg transition-all flex items-center outline-none border-b-2',
                  selected
                    ? 'bg-white text-sky-700 border-sky-600 shadow-sm'
                    : 'text-slate-500 border-transparent hover:text-slate-700 hover:bg-slate-50'
                ]"
              >
                <component :is="tab.icon" :class="['w-4 h-4 mr-2', selected ? 'text-sky-600' : 'text-slate-400']" />
                {{ tab.name }}
              </button>
            </Tab>
          </TabList>

          <form @submit.prevent="saveHospitalization">
            <TabPanels class="p-6">
              <TabPanel>
                <div class="space-y-4">
                  <h3 class="text-lg font-semibold text-slate-900">Informations générales</h3>
                  <div class="grid grid-cols-2 gap-4">
                    <label>
                      <span class="text-sm font-medium text-slate-700">Patient</span>
                      <select v-model="form.patientId" class="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg" required>
                        <option value="">Sélectionner</option>
                        <option v-for="p in patients" :key="p.id" :value="p.id">{{ p.name }}</option>
                      </select>
                    </label>
                    <label>
                      <span class="text-sm font-medium text-slate-700">Médecin responsable</span>
                      <select v-model="form.doctorId" class="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg" required>
                        <option value="">Sélectionner</option>
                        <option v-for="doc in doctors" :key="doc" :value="doc">{{ doc }}</option>
                      </select>
                    </label>
                  </div>
                  <label>
                    <span class="text-sm font-medium text-slate-700">Motif d'hospitalisation</span>
                    <textarea v-model="form.reason" rows="3" class="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg" required></textarea>
                  </label>
                  <div class="grid grid-cols-2 gap-4">
                    <label>
                      <span class="text-sm font-medium text-slate-700">Statut</span>
                      <select v-model="form.status" class="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg">
                        <option value="En cours">En cours</option>
                        <option value="Terminé">Terminé</option>
                        <option value="En observation">En observation</option>
                      </select>
                    </label>
                  </div>
                </div>
              </TabPanel>

              <TabPanel>
                <div class="space-y-4">
                  <h3 class="text-lg font-semibold text-slate-900">Information du séjour</h3>
                  <div class="grid grid-cols-2 gap-4">
                    <label>
                      <span class="text-sm font-medium text-slate-700">Date d'entrée</span>
                      <input v-model="form.admissionDate" type="date" class="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg" required />
                    </label>
                    <label>
                      <span class="text-sm font-medium text-slate-700">Date de sortie</span>
                      <input v-model="form.dischargeDate" type="date" class="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg" />
                    </label>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <label>
                      <span class="text-sm font-medium text-slate-700">Lit (disponibles)</span>
                      <select v-model="form.bedId" class="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg" required>
                        <option value="">Sélectionner</option>
                        <option v-for="bed in availableBeds" :key="bed.id" :value="bed.id">
                          {{ bed.id }} - {{ bed.room }} ({{ bed.type }})
                        </option>
                      </select>
                    </label>
                    <label>
                      <span class="text-sm font-medium text-slate-700">Chambre (auto-affichée)</span>
                      <input
                        :value="beds.find(b => b.id === form.bedId)?.room || 'N/A'"
                        type="text"
                        disabled
                        class="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50"
                      />
                    </label>
                  </div>
                </div>
              </TabPanel>

              <TabPanel>
                <div class="space-y-4">
                  <h3 class="text-lg font-semibold text-slate-900">Actes médicaux</h3>
                  <div class="bg-slate-50 p-4 rounded-lg space-y-3">
                    <div class="grid grid-cols-6 gap-2">
                      <select v-model="newAct.selectedAct" class="col-span-3 px-2 py-2 border border-slate-300 rounded text-sm">
                        <option value="">Sélectionner un acte...</option>
                        <option v-for="act in medicalActs" :key="act.id" :value="act.id">
                          {{ act.name }} ({{ act.code }}) - {{ act.price }}€
                        </option>
                      </select>
                      <input v-model="newAct.cotation" type="text" placeholder="Cotation" class="px-2 py-2 border border-slate-300 rounded text-sm" />
                      <input v-model="newAct.doctor" type="text" placeholder="Médecin" class="px-2 py-2 border border-slate-300 rounded text-sm" />
                      <button type="button" @click="addAct" class="px-2 py-2 bg-sky-600 text-white rounded text-sm font-medium hover:bg-sky-700">+</button>
                    </div>
                  </div>
                  <div class="overflow-x-auto">
                    <table class="w-full text-sm border-collapse">
                      <thead class="bg-slate-100">
                        <tr>
                          <th class="border border-slate-300 px-3 py-2 text-left">Acte</th>
                          <th class="border border-slate-300 px-3 py-2 text-left">Code AMO</th>
                          <th class="border border-slate-300 px-3 py-2 text-left">Cotation</th>
                          <th class="border border-slate-300 px-3 py-2 text-left">Médecin</th>
                          <th class="border border-slate-300 px-3 py-2 text-right">Prix</th>
                          <th class="border border-slate-300 px-3 py-2 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="act in form.acts" :key="act.id">
                          <td class="border border-slate-300 px-3 py-2">{{ act.name }}</td>
                          <td class="border border-slate-300 px-3 py-2">{{ act.code }}</td>
                          <td class="border border-slate-300 px-3 py-2">{{ act.cotation }}</td>
                          <td class="border border-slate-300 px-3 py-2">{{ act.doctor }}</td>
                          <td class="border border-slate-300 px-3 py-2 text-right">{{ act.price }}€</td>
                          <td class="border border-slate-300 px-3 py-2 text-center">
                            <button type="button" @click="removeAct(act.id)" class="text-red-600 hover:text-red-900">✕</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="text-right p-3 bg-slate-50 font-semibold">
                      Montant total: {{ totalActsPrice }}€
                    </div>
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
                  </div>
                  <label>
                    <span class="text-sm font-medium text-slate-700">Part mutuelle (€)</span>
                    <input v-model.number="form.mutuellePart" type="number" class="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg" />
                  </label>
                  <label>
                    <span class="text-sm font-medium text-slate-700">Part patient (€)</span>
                    <input v-model.number="form.patientPart" type="number" class="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg" />
                  </label>
                </div>
              </TabPanel>

              <TabPanel>
                <div class="space-y-4">
                  <h3 class="text-lg font-semibold text-slate-900">Observations</h3>
                  <label>
                    <span class="text-sm font-medium text-slate-700">Notes médicales</span>
                    <textarea v-model="form.notes" rows="4" class="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg"></textarea>
                  </label>
                  <label>
                    <span class="text-sm font-medium text-slate-700">Observation générale</span>
                    <textarea v-model="form.observation" rows="4" class="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg"></textarea>
                  </label>
                </div>
              </TabPanel>
            </TabPanels>

            <div class="flex items-center justify-end gap-3 pt-6 border-t border-slate-200 px-6 pb-6">
              <button type="button" @click="showForm = false" class="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50">
                Annuler
              </button>
              <button type="submit" class="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700">
                Enregistrer
              </button>
            </div>
          </form>
        </TabGroup>
      </div>
    </div>

    <div v-if="showDeleteConfirm" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-sm">
        <h3 class="text-lg font-semibold text-slate-900">Confirmation</h3>
        <p class="text-slate-600 mt-2">Supprimer l'hospitalisation de <span class="font-semibold">{{ recordToDelete?.patientName }}</span> ?</p>
        <div class="flex items-center justify-end gap-3 mt-6">
          <button @click="showDeleteConfirm = false" class="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50">Annuler</button>
          <button @click="deleteConfirmed" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
</template>
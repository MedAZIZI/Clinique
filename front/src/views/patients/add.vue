<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const sexOptions = ['Femme', 'Homme']
const statusOptions = ['Actif', 'Hospitalisé', 'Sorti', 'Inactif']
const insuranceTypes = ['Payant', 'CNSS', 'CNOPS', 'CNAM', 'Mutuelle']
const relationshipOptions = ['Titulaire', 'Conjoint', 'Enfant', 'Parent']
const doctors = ['Dr. Martin Dupuis', 'Dr. Sophie Laurent', 'Dr. Pierre Bernard']

const isEditMode = ref(false)
const patient = ref({
  // Informations personnelles
  firstName: '',
  lastName: '',
  sex: '',
  dob: '',
  age: 0,
  cin: '',
  phone: '',
  gsm: '',
  email: '',
  address: '',
  city: '',
  profession: '',
  // Informations administratives
  medicalRecord: '',
  patientId: '',
  treatingDoctor: '',
  status: 'Actif',
  // Assurance / prise en charge
  insuranceType: '',
  adherentNumber: '',
  adherentCin: '',
  relationship: '',
  affiliation: '',
  som: '',
  // Informations médicales
  antecedents: '',
  allergies: '',
  medicalNotes: '',
  // Métadonnées
  createdAt: '',
  updatedAt: ''
})

const patients = ref([])

// Charger les patients depuis localStorage et gérer le mode édition
onMounted(() => {
  const savedPatients = localStorage.getItem('clinic26_patients')
  if (savedPatients) {
    patients.value = JSON.parse(savedPatients)
  }

  // Vérifier si on est en mode édition
  const patientId = route.query.id
  if (patientId) {
    isEditMode.value = true
    const existingPatient = patients.value.find(p => p.id == patientId)
    if (existingPatient) {
      patient.value = { ...existingPatient }
    }
  } else {
    // Mode création : initialiser createdAt
    patient.value.createdAt = new Date().toISOString().split('T')[0]
  }
})

// Simuler une base de données de patients (dans un vrai projet, ceci viendrait d'une API)
const patientsDB = ref([
  {
    id: 1,
    // Informations personnelles
    firstName: 'Sofia',
    lastName: 'Moreau',
    sex: 'Femme',
    dob: '1987-03-18',
    age: 39,
    cin: 'AB123456',
    phone: '06 12 34 56 78',
    gsm: '06 12 34 56 78',
    email: 'sofia.moreau@email.com',
    address: '12 rue du Parc',
    city: 'Paris',
    profession: 'Enseignante',
    // Informations administratives
    medicalRecord: 'MED-1001',
    patientId: 'PAT-2026-001',
    treatingDoctor: 'Dr. Martin Dupuis',
    status: 'Actif',
    // Assurance / prise en charge
    insuranceType: 'CNSS',
    adherentNumber: 'CNSS-789456',
    adherentCin: 'CD987654',
    relationship: 'Titulaire',
    affiliation: 'Fonctionnaire',
    som: 'SOM-456123',
    // Informations médicales
    antecedents: 'Hypertension légère, diabète gestationnel',
    allergies: 'Penicilline, latex',
    medicalNotes: 'Suivi cardiologique régulier, contrôle tension mensuel',
    // Métadonnées
    createdAt: '2026-03-22',
    updatedAt: '2026-04-10'
  },
  // ... autres patients ...
])

onMounted(() => {
  const patientId = route.query.id
  if (patientId) {
    isEditMode.value = true
    // Simuler la récupération d'un patient existant
    const existingPatient = patientsDB.value.find(p => p.id === parseInt(patientId))
    if (existingPatient) {
      patient.value = { ...existingPatient }
    }
  }
})

// Calcul automatique de l'âge
const calculateAge = () => {
  if (patient.value.dob) {
    const today = new Date()
    const birthDate = new Date(patient.value.dob)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    patient.value.age = age
  }
}

// Générer numéro de dossier automatique
const generateMedicalRecord = () => {
  const timestamp = Date.now()
  patient.value.medicalRecord = `MED-${timestamp.toString().slice(-4)}`
}

// Générer matricule patient automatique
const generatePatientId = () => {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  patient.value.patientId = `PAT-${year}-${random}`
}

const savePatient = () => {
  // Validation basique
  if (!patient.value.firstName || !patient.value.lastName || !patient.value.sex || !patient.value.dob || !patient.value.phone || !patient.value.address || !patient.value.city || !patient.value.treatingDoctor) {
    alert('Veuillez remplir tous les champs obligatoires (*)')
    return
  }

  // Générer les numéros automatiques si pas déjà fait
  if (!patient.value.medicalRecord) generateMedicalRecord()
  if (!patient.value.patientId) generatePatientId()

  // Mettre à jour la date de modification
  patient.value.updatedAt = new Date().toISOString().split('T')[0]

  // Sauvegarder dans localStorage
  if (isEditMode.value) {
    // Mise à jour
    const index = patients.value.findIndex(p => p.id === patient.value.id)
    if (index >= 0) {
      patients.value[index] = { ...patient.value }
    }
  } else {
    // Ajout
    const newId = Math.max(...patients.value.map(p => p.id), 0) + 1
    patient.value.id = newId
    patients.value.push({ ...patient.value })
  }

  localStorage.setItem('clinic26_patients', JSON.stringify(patients.value))

  // Redirection vers la liste des patients
  router.push('/patients')
}

const cancel = () => {
  router.push('/patients')
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">{{ isEditMode ? 'Modifier le Patient' : 'Ajouter un Patient' }}</h1>
        <p class="text-sm text-slate-500 mt-1">{{ isEditMode ? 'Modifier les informations du patient' : 'Créer un nouveau dossier patient' }}</p>
      </div>
      <button @click="cancel" class="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition">
        ← Retour à la liste
      </button>
    </div>

    <!-- Form -->
    <div class="bg-white rounded-lg shadow-sm ring-1 ring-slate-200 p-6">
      <form @submit.prevent="savePatient" class="space-y-8">
        <!-- Section A: Informations personnelles -->
        <div class="border border-slate-200 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-slate-900 mb-6 flex items-center">
            <span class="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm font-medium mr-3">A</span>
            Informations personnelles
          </h3>
          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-slate-900 mb-2">
                Nom <span class="text-red-500">*</span>
              </label>
              <input
                v-model="patient.lastName"
                type="text"
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                placeholder="Entrez le nom de famille"
                required
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-900 mb-2">
                Prénom <span class="text-red-500">*</span>
              </label>
              <input
                v-model="patient.firstName"
                type="text"
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                placeholder="Entrez le prénom"
                required
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-900 mb-2">
                Sexe <span class="text-red-500">*</span>
              </label>
              <select
                v-model="patient.sex"
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                required
              >
                <option value="">Sélectionner le sexe</option>
                <option v-for="sex in sexOptions" :key="sex" :value="sex">{{ sex }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-900 mb-2">
                Date de naissance <span class="text-red-500">*</span>
              </label>
              <input
                v-model="patient.dob"
                @change="calculateAge"
                type="date"
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                required
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-900 mb-2">Âge</label>
              <input
                :value="patient.age + ' ans'"
                type="text"
                class="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-600"
                readonly
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-900 mb-2">CIN</label>
              <input
                v-model="patient.cin"
                type="text"
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                placeholder="Numéro de carte d'identité"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-900 mb-2">
                Téléphone <span class="text-red-500">*</span>
              </label>
              <input
                v-model="patient.phone"
                type="tel"
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                placeholder="06 XX XX XX XX"
                required
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-900 mb-2">GSM</label>
              <input
                v-model="patient.gsm"
                type="tel"
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                placeholder="06 XX XX XX XX"
              >
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-medium text-slate-900 mb-2">Email</label>
              <input
                v-model="patient.email"
                type="email"
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                placeholder="patient@email.com"
              >
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-medium text-slate-900 mb-2">
                Adresse <span class="text-red-500">*</span>
              </label>
              <input
                v-model="patient.address"
                type="text"
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                placeholder="Numéro et nom de rue"
                required
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-900 mb-2">
                Ville <span class="text-red-500">*</span>
              </label>
              <input
                v-model="patient.city"
                type="text"
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                placeholder="Ville"
                required
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-900 mb-2">Profession</label>
              <input
                v-model="patient.profession"
                type="text"
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                placeholder="Profession ou activité"
              >
            </div>
          </div>
        </div>

        <!-- Section B: Informations administratives -->
        <div class="border border-slate-200 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-slate-900 mb-6 flex items-center">
            <span class="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm font-medium mr-3">B</span>
            Informations administratives
          </h3>
          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-slate-900 mb-2">Numéro dossier</label>
              <div class="flex gap-2">
                <input
                  v-model="patient.medicalRecord"
                  type="text"
                  class="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                  placeholder="Auto-généré"
                  readonly
                >
                <button
                  type="button"
                  @click="generateMedicalRecord"
                  class="px-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition"
                  title="Générer automatiquement"
                >
                  🔄
                </button>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-900 mb-2">Matricule patient</label>
              <div class="flex gap-2">
                <input
                  v-model="patient.patientId"
                  type="text"
                  class="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                  placeholder="Auto-généré"
                  readonly
                >
                <button
                  type="button"
                  @click="generatePatientId"
                  class="px-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition"
                  title="Générer automatiquement"
                >
                  🔄
                </button>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-900 mb-2">
                Médecin traitant <span class="text-red-500">*</span>
              </label>
              <select
                v-model="patient.treatingDoctor"
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                required
              >
                <option value="">Sélectionner un médecin</option>
                <option v-for="doctor in doctors" :key="doctor" :value="doctor">{{ doctor }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-900 mb-2">
                Statut <span class="text-red-500">*</span>
              </label>
              <select
                v-model="patient.status"
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                required
              >
                <option v-for="status in statusOptions" :key="status" :value="status">{{ status }}</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Section C: Assurance / prise en charge -->
        <div class="border border-slate-200 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-slate-900 mb-6 flex items-center">
            <span class="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm font-medium mr-3">C</span>
            Assurance / prise en charge
          </h3>
          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-slate-900 mb-2">
                Type assurance <span class="text-red-500">*</span>
              </label>
              <select
                v-model="patient.insuranceType"
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                required
              >
                <option value="">Sélectionner le type</option>
                <option v-for="type in insuranceTypes" :key="type" :value="type">{{ type }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-900 mb-2">Numéro adhérent</label>
              <input
                v-model="patient.adherentNumber"
                type="text"
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                placeholder="Numéro d'adhérent"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-900 mb-2">CIN adhérent</label>
              <input
                v-model="patient.adherentCin"
                type="text"
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                placeholder="CIN de l'adhérent"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-900 mb-2">Lien de parenté</label>
              <select
                v-model="patient.relationship"
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
              >
                <option value="">Sélectionner</option>
                <option v-for="rel in relationshipOptions" :key="rel" :value="rel">{{ rel }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-900 mb-2">Affiliation</label>
              <input
                v-model="patient.affiliation"
                type="text"
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                placeholder="Type d'affiliation"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-900 mb-2">SOM</label>
              <input
                v-model="patient.som"
                type="text"
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                placeholder="Numéro SOM si applicable"
              >
            </div>
          </div>
        </div>

        <!-- Section D: Informations médicales -->
        <div class="border border-slate-200 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-slate-900 mb-6 flex items-center">
            <span class="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm font-medium mr-3">D</span>
            Informations médicales
          </h3>
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-slate-900 mb-2">Antécédents</label>
              <textarea
                v-model="patient.antecedents"
                rows="4"
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                placeholder="Liste des antécédents médicaux, chirurgicaux, familiaux..."
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-900 mb-2">Allergies</label>
              <textarea
                v-model="patient.allergies"
                rows="3"
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                placeholder="Liste des allergies connues (médicaments, aliments, environnement...)"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-900 mb-2">Observations générales</label>
              <textarea
                v-model="patient.medicalNotes"
                rows="4"
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                placeholder="Notes médicales générales, remarques importantes..."
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Section E: Métadonnées -->
        <div class="border border-slate-200 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-slate-900 mb-6 flex items-center">
            <span class="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm font-medium mr-3">E</span>
            Métadonnées
          </h3>
          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-slate-900 mb-2">Date création</label>
              <input
                v-model="patient.createdAt"
                type="date"
                class="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-600"
                readonly
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-900 mb-2">Dernière mise à jour</label>
              <input
                v-model="patient.updatedAt"
                type="date"
                class="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-600"
                readonly
              >
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-4 pt-6 border-t border-slate-200">
          <button @click="cancel" type="button" class="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition font-medium">
            Annuler
          </button>
          <button type="submit" class="px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition font-medium">
            💾 {{ isEditMode ? 'Mettre à Jour' : 'Sauvegarder le Patient' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
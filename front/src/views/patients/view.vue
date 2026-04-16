<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

const route = useRoute()

// Mock patient data - in real app, this would come from API
const patient = ref({
  id: parseInt(route.params.id),
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
  status: '',
  // Assurance / prise en charge
  insuranceType: '',
  adherentNumber: '',
  adherentCin: '',
  relationship: '',
  affiliation: '',
  som: '',
  // Informations médicales de base
  bloodType: 'A+',
  allergies: '',
  medicalHistory: '',
  surgicalHistory: '',
  chronicDiseases: '',
  // Historique médical
  consultations: [],
  diagnostics: [],
  hospitalizations: [],
  treatments: [],
  // Actes médicaux
  medicalActs: [],
  // Prescriptions
  prescriptions: [],
  // Documents médicaux
  medicalDocuments: [],
  // Observations médicales
  medicalObservations: [],
  // Constantes vitales
  vitalSigns: [],
  createdAt: '',
  updatedAt: ''
})

// Tabs configuration
const tabs = [
  { name: 'Informations générales' },
  { name: 'Informations médicales' },
  { name: 'Historique médical' },
  { name: 'Hospitalisations' },
  { name: 'Actes médicaux' },
  { name: 'Prescriptions' },
  { name: 'Documents médicaux' },
  { name: 'Observations' },
  { name: 'Constantes vitales' }
]

// Load patient data
onMounted(() => {
  loadPatientData()
})

const loadPatientData = () => {
  // Mock data loading - replace with actual API call
  const mockPatients = [
    {
      id: 1,
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
      medicalRecord: 'MED-1001',
      patientId: 'PAT-2026-001',
      treatingDoctor: 'Dr. Martin Dupuis',
      status: 'Actif',
      insuranceType: 'CNSS',
      adherentNumber: 'CNSS-789456',
      adherentCin: 'CD987654',
      relationship: 'Titulaire',
      affiliation: 'Fonctionnaire',
      som: 'SOM-456123',
      bloodType: 'A+',
      allergies: 'Penicilline, latex',
      medicalHistory: 'Hypertension légère, diabète gestationnel',
      surgicalHistory: 'Appendicectomie (2015)',
      chronicDiseases: 'Hypertension artérielle',
      consultations: [
        { date: '2026-04-10', doctor: 'Dr. Martin Dupuis', reason: 'Contrôle tension', notes: 'Tension stable' },
        { date: '2026-03-15', doctor: 'Dr. Sophie Laurent', reason: 'Consultation générale', notes: 'Bilan annuel' }
      ],
      diagnostics: [
        { date: '2026-01-20', diagnosis: 'Hypertension artérielle', doctor: 'Dr. Martin Dupuis' },
        { date: '2025-06-10', diagnosis: 'Diabète gestationnel', doctor: 'Dr. Sophie Laurent' }
      ],
      hospitalizations: [
        { id: 1, admissionDate: '2025-02-15', dischargeDate: '2025-02-20', reason: 'Accouchement', doctor: 'Dr. Sophie Laurent', summary: 'Accouchement par césarienne, bébé en bonne santé' }
      ],
      treatments: [
        { name: 'Amlodipine', startDate: '2026-01-20', endDate: null, dosage: '5mg/jour', doctor: 'Dr. Martin Dupuis' },
        { name: 'Metformine', startDate: '2025-06-10', endDate: '2025-12-31', dosage: '500mg x2/jour', doctor: 'Dr. Sophie Laurent' }
      ],
      medicalActs: [
        { date: '2026-04-10', act: 'Consultation cardiologie', code: 'AMO-001', price: 150 },
        { date: '2026-03-15', act: 'Bilan sanguin complet', code: 'AMO-002', price: 75 },
        { date: '2026-02-20', act: 'Échographie cardiaque', code: 'AMO-003', price: 200 },
        { date: '2026-01-15', act: 'Radiographie thoracique', code: 'AMO-004', price: 120 }
      ],
      prescriptions: [
        { date: '2026-04-10', medications: [{ name: 'Amlodipine', dosage: '5mg', duration: '30 jours', frequency: '1x/jour' }], doctor: 'Dr. Martin Dupuis' }
      ],
      medicalDocuments: [
        { name: 'Radio thorax 2026', type: 'Radiographie', date: '2026-04-05', file: 'radio_2026.pdf' },
        { name: 'Analyse sanguine complète', type: 'Laboratoire', date: '2026-03-15', file: 'analyse_2026.pdf' },
        { name: 'Échographie cardiaque', type: 'Imagerie', date: '2026-02-20', file: 'echo_2026.pdf' },
        { name: 'Ordonnance hypertension', type: 'Prescription', date: '2026-04-10', file: 'ordo_2026.pdf' },
        { name: 'Compte rendu consultation', type: 'Consultation', date: '2026-03-15', file: 'cr_consult_2026.pdf' }
      ],
      medicalObservations: [
        { date: '2026-04-10', doctor: 'Dr. Martin Dupuis', notes: 'Patient se plaint de maux de tête occasionnels. Tension 140/90.' },
        { date: '2026-03-15', doctor: 'Dr. Sophie Laurent', notes: 'Bilan annuel satisfaisant. Poursuivre traitement.' }
      ],
      vitalSigns: [
        { date: '2026-04-10', bloodPressure: '140/90', temperature: '36.8°C', heartRate: '72 bpm', weight: '68 kg' },
        { date: '2026-03-15', bloodPressure: '135/85', temperature: '36.7°C', heartRate: '70 bpm', weight: '67.5 kg' }
      ],
      createdAt: '2026-03-22',
      updatedAt: '2026-04-10'
    }
    // Add more patients as needed
  ]

  const foundPatient = mockPatients.find(p => p.id === patient.value.id)
  if (foundPatient) {
    patient.value = foundPatient
  }
}

// Helper functions
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR')
}

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'Actif':
      return 'bg-green-100 text-green-800'
    case 'Inactif':
      return 'bg-red-100 text-red-800'
    case 'Hospitalisé':
      return 'bg-yellow-100 text-yellow-800'
    case 'Sorti':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">Dossier Médical</h1>
        <p class="text-sm text-slate-500 mt-1">{{ patient.lastName }} {{ patient.firstName }} - {{ patient.patientId }}</p>
      </div>
      <div class="flex items-center space-x-4">
        <router-link to="/patients" class="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition">
          Retour à la liste
        </router-link>
      </div>
    </div>

    <!-- Status Badge -->
    <div class="flex items-center space-x-4">
      <span :class="getStatusBadgeClass(patient.status)" class="inline-flex px-3 py-1 text-sm font-semibold rounded-full">
        {{ patient.status }}
      </span>
      <span class="text-sm text-slate-600">Médecin traitant: {{ patient.treatingDoctor }}</span>
    </div>

    <!-- Affichage en onglets -->
    <div class="bg-white rounded-lg shadow-sm ring-1 ring-slate-200">
      <TabGroup>
        <TabList class="flex gap-2 bg-slate-100 p-2 border-b border-slate-200 overflow-x-auto" as="div">
          <Tab
            v-for="tab in tabs"
            :key="tab.name"
            v-slot="{ selected }"
            :class="[
              'px-4 py-2 text-sm font-semibold rounded-t-lg transition-all flex items-center outline-none border-b-2 whitespace-nowrap',
              selected
                ? 'bg-slate-200 text-sky-700 border-sky-600 shadow-sm'
                : 'text-slate-500 border-transparent hover:text-slate-700 hover:bg-slate-50'
            ]"
          >
            {{ tab.name }}
          </Tab>
        </TabList>

        <TabPanels class="p-6">
          <!-- Informations générales -->
          <TabPanel>
            <div class="space-y-6">
              <h3 class="text-lg font-semibold text-slate-900">Informations personnelles</h3>
              <div class="grid grid-cols-2 gap-6">
                <div>
                  <label class="text-sm font-medium text-slate-700">Nom complet</label>
                  <p class="mt-1 text-sm text-slate-900">{{ patient.lastName }} {{ patient.firstName }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-slate-700">Sexe</label>
                  <p class="mt-1 text-sm text-slate-900">{{ patient.sex }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-slate-700">Date de naissance</label>
                  <p class="mt-1 text-sm text-slate-900">{{ formatDate(patient.dob) }} ({{ patient.age }} ans)</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-slate-700">CIN</label>
                  <p class="mt-1 text-sm text-slate-900">{{ patient.cin }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-slate-700">Téléphone</label>
                  <p class="mt-1 text-sm text-slate-900">{{ patient.phone }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-slate-700">Email</label>
                  <p class="mt-1 text-sm text-slate-900">{{ patient.email }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-slate-700">Adresse</label>
                  <p class="mt-1 text-sm text-slate-900">{{ patient.address }}, {{ patient.city }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-slate-700">Profession</label>
                  <p class="mt-1 text-sm text-slate-900">{{ patient.profession }}</p>
                </div>
              </div>

              <h3 class="text-lg font-semibold text-slate-900 mt-8">Informations administratives</h3>
              <div class="grid grid-cols-2 gap-6">
                <div>
                  <label class="text-sm font-medium text-slate-700">N° Dossier médical</label>
                  <p class="mt-1 text-sm text-slate-900">{{ patient.medicalRecord }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-slate-700">ID Patient</label>
                  <p class="mt-1 text-sm text-slate-900">{{ patient.patientId }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-slate-700">Assurance</label>
                  <p class="mt-1 text-sm text-slate-900">{{ patient.insuranceType }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-slate-700">N° Adhérent</label>
                  <p class="mt-1 text-sm text-slate-900">{{ patient.adherentNumber }}</p>
                </div>
              </div>
            </div>
          </TabPanel>

          <!-- Informations médicales de base -->
          <TabPanel>
            <div class="space-y-6">
              <h3 class="text-lg font-semibold text-slate-900">Informations médicales de base</h3>
              <div class="grid grid-cols-1 gap-6">
                <div>
                  <label class="text-sm font-medium text-slate-700">Groupe sanguin</label>
                  <p class="mt-1 text-sm text-slate-900">{{ patient.bloodType }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-slate-700">Allergies</label>
                  <p class="mt-1 text-sm text-slate-900">{{ patient.allergies || 'Aucune connue' }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-slate-700">Antécédents médicaux</label>
                  <p class="mt-1 text-sm text-slate-900">{{ patient.medicalHistory || 'Aucun' }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-slate-700">Antécédents chirurgicaux</label>
                  <p class="mt-1 text-sm text-slate-900">{{ patient.surgicalHistory || 'Aucun' }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-slate-700">Maladies chroniques</label>
                  <p class="mt-1 text-sm text-slate-900">{{ patient.chronicDiseases || 'Aucune' }}</p>
                </div>
              </div>
            </div>
          </TabPanel>

          <!-- Historique médical -->
          <TabPanel>
            <div class="space-y-6">
              <h3 class="text-lg font-semibold text-slate-900">Consultations</h3>
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-slate-200">
                  <thead class="bg-slate-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Médecin</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Motif</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Notes</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-slate-200">
                    <tr v-for="consultation in patient.consultations" :key="consultation.date">
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ formatDate(consultation.date) }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ consultation.doctor }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ consultation.reason }}</td>
                      <td class="px-6 py-4 text-sm text-slate-900">{{ consultation.notes }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 class="text-lg font-semibold text-slate-900 mt-8">Diagnostics</h3>
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-slate-200">
                  <thead class="bg-slate-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Diagnostic</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Médecin</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-slate-200">
                    <tr v-for="diagnostic in patient.diagnostics" :key="diagnostic.date">
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ formatDate(diagnostic.date) }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ diagnostic.diagnosis }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ diagnostic.doctor }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 class="text-lg font-semibold text-slate-900 mt-8">Traitements</h3>
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-slate-200">
                  <thead class="bg-slate-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Traitement</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Début</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Fin</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Posologie</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Médecin</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-slate-200">
                    <tr v-for="treatment in patient.treatments" :key="treatment.name">
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ treatment.name }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ formatDate(treatment.startDate) }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ treatment.endDate ? formatDate(treatment.endDate) : 'En cours' }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ treatment.dosage }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ treatment.doctor }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabPanel>

          <!-- Hospitalisations -->
          <TabPanel>
            <div class="space-y-6">
              <h3 class="text-lg font-semibold text-slate-900">Historique des hospitalisations</h3>
              <div class="space-y-4">
                <div v-for="hosp in patient.hospitalizations" :key="hosp.id" class="bg-slate-50 p-4 rounded-lg">
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="text-sm font-medium text-slate-700">Date d'entrée</label>
                      <p class="mt-1 text-sm text-slate-900">{{ formatDate(hosp.admissionDate) }}</p>
                    </div>
                    <div>
                      <label class="text-sm font-medium text-slate-700">Date de sortie</label>
                      <p class="mt-1 text-sm text-slate-900">{{ hosp.dischargeDate ? formatDate(hosp.dischargeDate) : 'En cours' }}</p>
                    </div>
                    <div>
                      <label class="text-sm font-medium text-slate-700">Motif</label>
                      <p class="mt-1 text-sm text-slate-900">{{ hosp.reason }}</p>
                    </div>
                    <div>
                      <label class="text-sm font-medium text-slate-700">Médecin</label>
                      <p class="mt-1 text-sm text-slate-900">{{ hosp.doctor }}</p>
                    </div>
                  </div>
                  <div class="mt-4">
                    <label class="text-sm font-medium text-slate-700">Résumé</label>
                    <p class="mt-1 text-sm text-slate-900">{{ hosp.summary }}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          <!-- Actes médicaux -->
          <TabPanel>
            <div class="space-y-6">
              <h3 class="text-lg font-semibold text-slate-900">Actes médicaux</h3>
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-slate-200">
                  <thead class="bg-slate-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Acte</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Code AMO</th>
                      <th class="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Prix</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-slate-200">
                    <tr v-for="act in patient.medicalActs" :key="act.date">
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ formatDate(act.date) }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ act.act }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ act.code }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900 text-right">{{ act.price }} DH</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabPanel>

          <!-- Prescriptions -->
          <TabPanel>
            <div class="space-y-6">
              <h3 class="text-lg font-semibold text-slate-900">Prescriptions (Ordonnances)</h3>
              <div class="space-y-4">
                <div v-for="prescription in patient.prescriptions" :key="prescription.date" class="bg-slate-50 p-4 rounded-lg">
                  <div class="flex justify-between items-start mb-4">
                    <div>
                      <p class="text-sm font-medium text-slate-900">{{ formatDate(prescription.date) }}</p>
                      <p class="text-sm text-slate-600">Dr. {{ prescription.doctor }}</p>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <div v-for="med in prescription.medications" :key="med.name" class="bg-white p-3 rounded border">
                      <div class="grid grid-cols-2 gap-4">
                        <div>
                          <label class="text-sm font-medium text-slate-700">Médicament</label>
                          <p class="mt-1 text-sm text-slate-900">{{ med.name }}</p>
                        </div>
                        <div>
                          <label class="text-sm font-medium text-slate-700">Posologie</label>
                          <p class="mt-1 text-sm text-slate-900">{{ med.dosage }}</p>
                        </div>
                        <div>
                          <label class="text-sm font-medium text-slate-700">Fréquence</label>
                          <p class="mt-1 text-sm text-slate-900">{{ med.frequency }}</p>
                        </div>
                        <div>
                          <label class="text-sm font-medium text-slate-700">Durée</label>
                          <p class="mt-1 text-sm text-slate-900">{{ med.duration }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          <!-- Documents médicaux -->
          <TabPanel>
            <div class="space-y-6">
              <h3 class="text-lg font-semibold text-slate-900">Documents médicaux</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="doc in patient.medicalDocuments" :key="doc.name" class="bg-slate-50 p-4 rounded-lg border">
                  <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0">
                      📎
                    </div>
                    <div class="flex-1">
                      <h4 class="text-sm font-medium text-slate-900">{{ doc.name }}</h4>
                      <p class="text-sm text-slate-600">{{ doc.type }}</p>
                      <p class="text-sm text-slate-500">{{ formatDate(doc.date) }}</p>
                      <button class="mt-2 text-sky-600 hover:text-sky-800 text-sm">Télécharger</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          <!-- Observations médicales -->
          <TabPanel>
            <div class="space-y-6">
              <h3 class="text-lg font-semibold text-slate-900">Observations médicales</h3>
              <div class="space-y-4">
                <div v-for="obs in patient.medicalObservations" :key="obs.date" class="bg-slate-50 p-4 rounded-lg">
                  <div class="flex justify-between items-start mb-2">
                    <p class="text-sm font-medium text-slate-900">{{ formatDate(obs.date) }}</p>
                    <p class="text-sm text-slate-600">Dr. {{ obs.doctor }}</p>
                  </div>
                  <p class="text-sm text-slate-900">{{ obs.notes }}</p>
                </div>
              </div>
            </div>
          </TabPanel>

          <!-- Constantes vitales -->
          <TabPanel>
            <div class="space-y-6">
              <h3 class="text-lg font-semibold text-slate-900">Constantes vitales</h3>
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-slate-200">
                  <thead class="bg-slate-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Tension</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Température</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Fréquence cardiaque</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Poids</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-slate-200">
                    <tr v-for="vital in patient.vitalSigns" :key="vital.date">
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ formatDate(vital.date) }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ vital.bloodPressure }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ vital.temperature }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ vital.heartRate }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ vital.weight }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  </div>
</template>
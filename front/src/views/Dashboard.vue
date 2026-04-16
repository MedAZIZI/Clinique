<script setup>
import { ref, computed } from 'vue'

// Rôles disponibles
const roles = [
  { id: 'admin', name: '👑 Admin', label: 'Administrateur' },
  { id: 'doctor', name: '👨‍⚕️ Médecin', label: 'Médecin' },
  { id: 'secretary', name: '🧾 Secrétaire', label: 'Secrétaire' },
  { id: 'accountant', name: '💰 Comptable', label: 'Comptable' }
]

const selectedRole = ref('admin')

// Données mockées pour chaque rôle
const adminData = {
  stats: [
    { label: 'Revenus totaux', value: '2.4M DH', change: '+15.3%', icon: '💰', color: 'bg-green-500/10 text-green-700' },
    { label: 'Lits occupés', value: '87/95', change: '91.6%', icon: '🛏️', color: 'bg-blue-500/10 text-blue-700' },
    { label: 'Activité mensuelle', value: '1,247', change: '+8.2%', icon: '📊', color: 'bg-purple-500/10 text-purple-700' },
    { label: 'Taux d\'occupation', value: '92%', change: '+2.1%', icon: '📈', color: 'bg-orange-500/10 text-orange-700' }
  ],
  recentActivity: [
    { type: 'Admission', patient: 'Emma Dupont', time: '09:00', status: 'En cours' },
    { type: 'Sortie', patient: 'Lucas Martin', time: '11:30', status: 'Terminée' },
    { type: 'Consultation', patient: 'Nora Petit', time: '14:15', status: 'Planifiée' },
    { type: 'Intervention', patient: 'Mia Laurent', time: '16:00', status: 'Urgente' }
  ],
  alerts: [
    { message: 'Stock de médicaments faible', type: 'warning', time: '2h' },
    { message: 'Maintenance serveur programmée', type: 'info', time: '1j' },
    { message: 'Nouveau règlement CNSS', type: 'success', time: '3j' }
  ]
}

const doctorData = {
  stats: [
    { label: 'Mes patients', value: '156', change: '+12', icon: '👥', color: 'bg-sky-500/10 text-sky-700' },
    { label: 'Hospitalisations', value: '8', change: '+2', icon: '🏥', color: 'bg-red-500/10 text-red-700' },
    { label: 'Consultations/jour', value: '24', change: '+4', icon: '📅', color: 'bg-emerald-500/10 text-emerald-700' },
    { label: 'Actes ce mois', value: '89', change: '+15%', icon: '⚕️', color: 'bg-violet-500/10 text-violet-700' }
  ],
  patients: [
    { name: 'Emma Dupont', condition: 'Hypertension', nextVisit: '2026-04-20', status: 'Suivi régulier' },
    { name: 'Lucas Martin', condition: 'Diabète', nextVisit: '2026-04-18', status: 'Contrôle mensuel' },
    { name: 'Nora Petit', condition: 'Cardiopathie', nextVisit: '2026-04-22', status: 'Hospitalisée' },
    { name: 'Mia Laurent', condition: 'Post-opératoire', nextVisit: '2026-04-25', status: 'Récupération' }
  ],
  recentActs: [
    { patient: 'Emma Dupont', act: 'Consultation cardiologie', time: '09:00', cost: '150 DH' },
    { patient: 'Lucas Martin', act: 'Bilan sanguin', time: '10:30', cost: '75 DH' },
    { patient: 'Nora Petit', act: 'Échographie', time: '11:15', cost: '200 DH' },
    { patient: 'Mia Laurent', act: 'Radio thorax', time: '14:00', cost: '120 DH' }
  ]
}

const secretaryData = {
  stats: [
    { label: 'Admissions aujourd\'hui', value: '12', change: '+3', icon: '📥', color: 'bg-blue-500/10 text-blue-700' },
    { label: 'RDV en attente', value: '28', change: '+5', icon: '⏰', color: 'bg-yellow-500/10 text-yellow-700' },
    { label: 'Patients actifs', value: '1,245', change: '+22', icon: '👥', color: 'bg-green-500/10 text-green-700' },
    { label: 'Tâches urgentes', value: '7', change: '-2', icon: '🚨', color: 'bg-red-500/10 text-red-700' }
  ],
  admissions: [
    { patient: 'Emma Dupont', room: '201', doctor: 'Dr. Martin', time: '09:00', status: 'En cours' },
    { patient: 'Lucas Martin', room: '305', doctor: 'Dr. Laurent', time: '10:30', status: 'Préparation' },
    { patient: 'Nora Petit', room: 'ICU-2', doctor: 'Dr. Bernard', time: '11:15', status: 'Urgent' },
    { patient: 'Mia Laurent', room: '401', doctor: 'Dr. Petit', time: '14:00', status: 'Planifiée' }
  ],
  quickSearch: [
    { type: 'Patient', query: 'Dupont Emma', result: 'PAT-2026-001' },
    { type: 'Chambre', query: '201', result: 'Libre' },
    { type: 'Médecin', query: 'Dr. Martin', result: 'Cardiologie' },
    { type: 'RDV', query: 'Aujourd\'hui 14h', result: '3 disponibles' }
  ]
}

const accountantData = {
  stats: [
    { label: 'Factures en attente', value: '45', change: '+8', icon: '📄', color: 'bg-orange-500/10 text-orange-700' },
    { label: 'Paiements reçus', value: '892K DH', change: '+12.5%', icon: '💳', color: 'bg-green-500/10 text-green-700' },
    { label: 'Revenus mensuels', value: '2.4M DH', change: '+15.3%', icon: '💰', color: 'bg-blue-500/10 text-blue-700' },
    { label: 'Impayés', value: '23K DH', change: '-5.2%', icon: '⚠️', color: 'bg-red-500/10 text-red-700' }
  ],
  invoices: [
    { number: 'FAC-2026-001', patient: 'Emma Dupont', amount: '2,450 DH', status: 'Payée', date: '2026-04-15' },
    { number: 'FAC-2026-002', patient: 'Lucas Martin', amount: '1,850 DH', status: 'En attente', date: '2026-04-14' },
    { number: 'FAC-2026-003', patient: 'Nora Petit', amount: '5,200 DH', status: 'Partiellement payée', date: '2026-04-13' },
    { number: 'FAC-2026-004', patient: 'Mia Laurent', amount: '890 DH', status: 'Impayée', date: '2026-04-12' }
  ],
  payments: [
    { method: 'Espèces', amount: '15,450 DH', count: 23, trend: '+8%' },
    { method: 'Carte bancaire', amount: '28,900 DH', count: 45, trend: '+12%' },
    { method: 'Virement', amount: '45,200 DH', count: 12, trend: '+5%' },
    { method: 'Chèque', amount: '12,300 DH', count: 8, trend: '-3%' }
  ]
}

// Données dynamiques selon le rôle sélectionné
const currentData = computed(() => {
  switch (selectedRole.value) {
    case 'admin':
      return adminData
    case 'doctor':
      return doctorData
    case 'secretary':
      return secretaryData
    case 'accountant':
      return accountantData
    default:
      return adminData
  }
})

// Fonctions utilitaires
const getStatusColor = (status) => {
  switch (status) {
    case 'Payée':
    case 'Terminée':
    case 'Confirmé':
      return 'bg-green-100 text-green-800'
    case 'En attente':
    case 'Préparation':
    case 'Planifiée':
      return 'bg-yellow-100 text-yellow-800'
    case 'Impayée':
    case 'Urgent':
    case 'Urgente':
      return 'bg-red-100 text-red-800'
    case 'Partiellement payée':
    case 'En cours':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const formatCurrency = (amount) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
</script>

<template>
  <div class="space-y-8">
    <!-- Sélection de rôle -->
    <section class="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p class="text-sm font-medium uppercase tracking-[0.24em] text-sky-600">Tableau de bord</p>
          <h1 class="mt-3 text-3xl font-semibold text-slate-950">Bienvenue sur ProClinic</h1>
          <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Sélectionnez votre rôle pour accéder à votre tableau de bord personnalisé.</p>
        </div>
        <div class="flex flex-wrap gap-3">
          <button
            v-for="role in roles"
            :key="role.id"
            @click="selectedRole = role.id"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2',
              selectedRole === role.id
                ? 'bg-sky-600 text-white shadow-lg'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            ]"
          >
            <span>{{ role.name }}</span>
            <span class="hidden sm:inline">{{ role.label }}</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Dashboard Admin -->
    <div v-if="selectedRole === 'admin'">
      <!-- Statistiques globales -->
      <section class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <div v-for="stat in currentData.stats" :key="stat.label" class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between gap-4">
            <div class="text-4xl">{{ stat.icon }}</div>
            <div class="rounded-2xl px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-700">{{ stat.label }}</div>
          </div>
          <div class="mt-6 flex items-end justify-between gap-4">
            <div>
              <p class="text-4xl font-semibold text-slate-950">{{ stat.value }}</p>
              <p class="mt-2 text-sm text-slate-500">Ce mois</p>
            </div>
            <div :class="stat.color + ' rounded-2xl px-3 py-2 text-sm font-semibold'">{{ stat.change }}</div>
          </div>
        </div>
      </section>

      <!-- Activité récente et alertes -->
      <section class="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 class="text-lg font-semibold text-slate-950">Activité récente</h2>
              <p class="mt-1 text-sm text-slate-500">Dernières opérations du centre</p>
            </div>
            <button class="rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700">Voir tout</button>
          </div>
          <div class="space-y-4">
            <div v-for="activity in currentData.recentActivity" :key="activity.patient" class="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <p class="font-medium text-slate-900">{{ activity.patient }}</p>
                <p class="text-sm text-slate-600">{{ activity.type }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-slate-900">{{ activity.time }}</p>
                <span :class="getStatusColor(activity.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ activity.status }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="text-lg font-semibold text-slate-950 mb-6">Alertes système</h2>
          <div class="space-y-4">
            <div v-for="alert in currentData.alerts" :key="alert.message" class="flex items-start gap-3 p-3 rounded-lg" :class="alert.type === 'warning' ? 'bg-yellow-50' : alert.type === 'success' ? 'bg-green-50' : 'bg-blue-50'">
              <div class="flex-shrink-0 w-2 h-2 rounded-full mt-2" :class="alert.type === 'warning' ? 'bg-yellow-400' : alert.type === 'success' ? 'bg-green-400' : 'bg-blue-400'"></div>
              <div class="flex-1">
                <p class="text-sm font-medium text-slate-900">{{ alert.message }}</p>
                <p class="text-xs text-slate-500">il y a {{ alert.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Dashboard Médecin -->
    <div v-if="selectedRole === 'doctor'">
      <!-- Statistiques personnelles -->
      <section class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <div v-for="stat in currentData.stats" :key="stat.label" class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between gap-4">
            <div class="text-4xl">{{ stat.icon }}</div>
            <div class="rounded-2xl px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-700">{{ stat.label }}</div>
          </div>
          <div class="mt-6 flex items-end justify-between gap-4">
            <div>
              <p class="text-4xl font-semibold text-slate-950">{{ stat.value }}</p>
              <p class="mt-2 text-sm text-slate-500">Ce mois</p>
            </div>
            <div :class="stat.color + ' rounded-2xl px-3 py-2 text-sm font-semibold'">{{ stat.change }}</div>
          </div>
        </div>
      </section>

      <!-- Patients et actes récents -->
      <section class="grid gap-6 xl:grid-cols-2">
        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 class="text-lg font-semibold text-slate-950">Mes patients</h2>
              <p class="mt-1 text-sm text-slate-500">Suivi des patients actifs</p>
            </div>
            <button class="rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700">Voir tous</button>
          </div>
          <div class="space-y-4">
            <div v-for="patient in currentData.patients" :key="patient.name" class="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <p class="font-medium text-slate-900">{{ patient.name }}</p>
                <p class="text-sm text-slate-600">{{ patient.condition }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-slate-900">{{ patient.nextVisit }}</p>
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  {{ patient.status }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 class="text-lg font-semibold text-slate-950">Actes récents</h2>
              <p class="mt-1 text-sm text-slate-500">Dernières interventions médicales</p>
            </div>
            <button class="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">Voir tout</button>
          </div>
          <div class="space-y-4">
            <div v-for="act in currentData.recentActs" :key="act.patient" class="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <p class="font-medium text-slate-900">{{ act.patient }}</p>
                <p class="text-sm text-slate-600">{{ act.act }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-slate-900">{{ act.time }}</p>
                <p class="text-sm text-slate-600">{{ act.cost }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Dashboard Secrétaire -->
    <div v-if="selectedRole === 'secretary'">
      <!-- Statistiques -->
      <section class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <div v-for="stat in currentData.stats" :key="stat.label" class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between gap-4">
            <div class="text-4xl">{{ stat.icon }}</div>
            <div class="rounded-2xl px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-700">{{ stat.label }}</div>
          </div>
          <div class="mt-6 flex items-end justify-between gap-4">
            <div>
              <p class="text-4xl font-semibold text-slate-950">{{ stat.value }}</p>
              <p class="mt-2 text-sm text-slate-500">Aujourd'hui</p>
            </div>
            <div :class="stat.color + ' rounded-2xl px-3 py-2 text-sm font-semibold'">{{ stat.change }}</div>
          </div>
        </div>
      </section>

      <!-- Admissions et recherche rapide -->
      <section class="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 class="text-lg font-semibold text-slate-950">Admissions aujourd'hui</h2>
              <p class="mt-1 text-sm text-slate-500">Gestion des entrées/sorties</p>
            </div>
            <button class="rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700">Voir tout</button>
          </div>
          <div class="space-y-4">
            <div v-for="admission in currentData.admissions" :key="admission.patient" class="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <p class="font-medium text-slate-900">{{ admission.patient }}</p>
                <p class="text-sm text-slate-600">Ch. {{ admission.room }} - {{ admission.doctor }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-slate-900">{{ admission.time }}</p>
                <span :class="getStatusColor(admission.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ admission.status }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="text-lg font-semibold text-slate-950 mb-6">Recherche rapide</h2>
          <div class="space-y-4">
            <div v-for="search in currentData.quickSearch" :key="search.query" class="p-4 bg-slate-50 rounded-lg">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-medium text-slate-500 uppercase tracking-wider">{{ search.type }}</span>
                <span class="text-sm font-medium text-slate-900">{{ search.result }}</span>
              </div>
              <p class="text-sm text-slate-700">{{ search.query }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Dashboard Comptable -->
    <div v-if="selectedRole === 'accountant'">
      <!-- Statistiques financières -->
      <section class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <div v-for="stat in currentData.stats" :key="stat.label" class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between gap-4">
            <div class="text-4xl">{{ stat.icon }}</div>
            <div class="rounded-2xl px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-700">{{ stat.label }}</div>
          </div>
          <div class="mt-6 flex items-end justify-between gap-4">
            <div>
              <p class="text-4xl font-semibold text-slate-950">{{ stat.value }}</p>
              <p class="mt-2 text-sm text-slate-500">Ce mois</p>
            </div>
            <div :class="stat.color + ' rounded-2xl px-3 py-2 text-sm font-semibold'">{{ stat.change }}</div>
          </div>
        </div>
      </section>

      <!-- Factures et paiements -->
      <section class="grid gap-6 xl:grid-cols-2">
        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 class="text-lg font-semibold text-slate-950">Factures récentes</h2>
              <p class="mt-1 text-sm text-slate-500">Suivi des paiements</p>
            </div>
            <button class="rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700">Voir toutes</button>
          </div>
          <div class="space-y-4">
            <div v-for="invoice in currentData.invoices" :key="invoice.number" class="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <p class="font-medium text-slate-900">{{ invoice.patient }}</p>
                <p class="text-sm text-slate-600">{{ invoice.number }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-slate-900">{{ invoice.amount }}</p>
                <span :class="getStatusColor(invoice.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ invoice.status }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 class="text-lg font-semibold text-slate-950">Modes de paiement</h2>
              <p class="mt-1 text-sm text-slate-500">Répartition des recettes</p>
            </div>
            <button class="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">Rapport</button>
          </div>
          <div class="space-y-4">
            <div v-for="payment in currentData.payments" :key="payment.method" class="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <p class="font-medium text-slate-900">{{ payment.method }}</p>
                <p class="text-sm text-slate-600">{{ payment.count }} transactions</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-slate-900">{{ payment.amount }}</p>
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  {{ payment.trend }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

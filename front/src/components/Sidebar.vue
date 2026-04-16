<script setup>
import { useRouter } from 'vue-router'
import { 
  HomeIcon, 
  UserGroupIcon,
  ClipboardDocumentListIcon,
  CalendarIcon, 
  CreditCardIcon, 
  UserIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon
} from '@heroicons/vue/24/outline'
import { ref } from 'vue'

const router = useRouter()
const expandedGroups = ref({})

const toggleGroup = (groupKey) => {
  expandedGroups.value[groupKey] = !expandedGroups.value[groupKey]
}

const logout = () => {
  localStorage.removeItem('proclinic-auth')
  router.replace('/login')
}

const navItems = [
  {
    label: 'Dashboard',
    icon: HomeIcon,
    href: '/dashboard',
    group: null,
    description: 'Vue globale & Statistiques'
  },
  {
    label: 'Patients',
    icon: UserGroupIcon,
    href: '/patients',
    group: null,
    description: 'Module de base'
  },
  {
    label: 'Hospitalisations',
    icon: ClipboardDocumentListIcon,
    href: '/hospitalizations',
    group: null,
    description: 'Cœur du système'
  },
  {
    label: 'Rendez-vous',
    icon: CalendarIcon,
    href: '/appointments',
    group: null,
    description: 'Gestion du planning'
  },
  {
    label: 'Facturation',
    icon: CreditCardIcon,
    href: '/billing',
    group: null,
    description: 'Partie financière'
  },
  {
    label: 'Médecins & Personnel',
    icon: UserIcon,
    href: '/doctors',
    group: null,
    description: 'Organisation interne'
  },
  {
    label: 'Chambres & Lits',
    icon: BuildingOfficeIcon,
    href: '/rooms',
    group: null,
    description: 'Disponibilité'
  },
  {
    label: 'Rapports',
    icon: ChartBarIcon,
    href: '/reports',
    group: null,
    description: 'Statistiques & Revenus'
  },
  {
    label: 'Paramètres',
    icon: Cog6ToothIcon,
    href: '/settings',
    group: null,
    description: 'Configuration'
  }
]
</script>

<template>
  <aside class="w-64 bg-gradient-to-b from-slate-900 to-slate-800 shadow-lg ring-1 ring-slate-700 flex flex-col">
    <!-- Header -->
    <div class="flex h-16 items-center justify-between px-6 border-b border-slate-700">
      <div>
        <h1 class="text-xl font-bold text-white">ProClinic</h1>
        <p class="text-xs text-slate-400">Clinique Management</p>
      </div>
      <button 
        @click="logout" 
        class="rounded-lg bg-slate-700 p-2 text-slate-300 transition hover:bg-red-600 hover:text-white" 
        title="Déconnexion"
      >
        <ArrowRightOnRectangleIcon class="h-5 w-5" />
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto px-3 py-4">
      <ul class="space-y-2">
        <li v-for="item in navItems" :key="item.label">
          <router-link 
            :to="item.href" 
            class="group flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
            active-class="bg-sky-600 text-white"
            :title="`${item.label} - ${item.description}`"
          >
            <component :is="item.icon" class="h-5 w-5 flex-shrink-0" />
            <div class="flex-1">
              <p>{{ item.label }}</p>
              <p class="text-xs text-slate-400 group-hover:text-slate-300">{{ item.description }}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Footer Info -->
    <div class="border-t border-slate-700 p-4">
      <div class="rounded-lg bg-slate-700 bg-opacity-50 p-3 text-center text-xs text-slate-300">
        <p>© 2026 ProClinic</p>
        <p class="text-slate-400">Tous droits réservés</p>
      </div>
    </div>
  </aside>
</template>

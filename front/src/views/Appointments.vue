<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">Rendez-vous</h1>
        <p class="text-sm text-slate-500 mt-1">Gestion du planning et agenda médecins</p>
      </div>
      <button class="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition">
        + Nouveau Rendez-vous
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-lg shadow-sm ring-1 ring-slate-200">
        <p class="text-sm text-slate-600">Rendez-vous Aujourd'hui</p>
        <p class="text-3xl font-bold text-slate-900">12</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm ring-1 ring-slate-200">
        <p class="text-sm text-slate-600">Cette Semaine</p>
        <p class="text-3xl font-bold text-slate-900">48</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm ring-1 ring-slate-200">
        <p class="text-sm text-slate-600">Confirmés</p>
        <p class="text-3xl font-bold text-green-600">42</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm ring-1 ring-slate-200">
        <p class="text-sm text-slate-600">En Attente</p>
        <p class="text-3xl font-bold text-orange-600">6</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-3 gap-6">
      <!-- Calendar -->
      <div class="col-span-2 bg-white rounded-lg shadow-sm ring-1 ring-slate-200 p-6">
        <h2 class="text-lg font-semibold text-slate-900 mb-4">Calendrier</h2>
        <div class="text-center py-12 text-slate-500">
          📅 Calendrier des rendez-vous - À implémenter
        </div>
      </div>

      <!-- Doctor Schedule -->
      <div class="bg-white rounded-lg shadow-sm ring-1 ring-slate-200 p-6">
        <h2 class="text-lg font-semibold text-slate-900 mb-4">Agenda Médecins</h2>
        <div class="space-y-3">
          <div class="p-3 bg-slate-50 rounded-lg">
            <p class="font-medium text-sm text-slate-900">Dr. Martin</p>
            <p class="text-xs text-slate-500">10 rendez-vous</p>
          </div>
          <div class="p-3 bg-slate-50 rounded-lg">
            <p class="font-medium text-sm text-slate-900">Dr. Dupont</p>
            <p class="text-xs text-slate-500">8 rendez-vous</p>
          </div>
          <div class="p-3 bg-slate-50 rounded-lg">
            <p class="font-medium text-sm text-slate-900">Dr. Laurent</p>
            <p class="text-xs text-slate-500">6 rendez-vous</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Upcoming Appointments -->
    <div class="bg-white rounded-lg shadow-sm ring-1 ring-slate-200 p-6">
      <h2 class="text-lg font-semibold text-slate-900 mb-4">Rendez-vous à Venir</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-slate-200">
              <th class="px-4 py-3 text-left font-semibold text-slate-900">Heure</th>
              <th class="px-4 py-3 text-left font-semibold text-slate-900">Patient</th>
              <th class="px-4 py-3 text-left font-semibold text-slate-900">Médecin</th>
              <th class="px-4 py-3 text-left font-semibold text-slate-900">Type</th>
              <th class="px-4 py-3 text-left font-semibold text-slate-900">Statut</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-slate-100 hover:bg-slate-50">
              <td class="px-4 py-3 text-slate-600">09:00</td>
              <td class="px-4 py-3 text-slate-900 font-medium">Jean Dupont</td>
              <td class="px-4 py-3 text-slate-600">Dr. Martin</td>
              <td class="px-4 py-3 text-slate-600">Consultation</td>
              <td class="px-4 py-3"><span class="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Confirmé</span></td>
            </tr>
            <tr class="border-b border-slate-100 hover:bg-slate-50">
              <td class="px-4 py-3 text-slate-600">10:30</td>
              <td class="px-4 py-3 text-slate-900 font-medium">Marie Martin</td>
              <td class="px-4 py-3 text-slate-600">Dr. Dupont</td>
              <td class="px-4 py-3 text-slate-600">Suivi</td>
              <td class="px-4 py-3"><span class="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">En Attente</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

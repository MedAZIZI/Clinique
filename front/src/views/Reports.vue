<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">Rapports & Statistiques</h1>
        <p class="text-sm text-slate-500 mt-1">Rapports mensuels, revenus et taux d'occupation</p>
      </div>
      <button class="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition">
        📥 Télécharger Rapport
      </button>
    </div>

    <!-- Key Metrics -->
    <div class="grid grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-lg shadow-sm ring-1 ring-slate-200">
        <p class="text-sm text-slate-600">Patients Traités</p>
        <p class="text-3xl font-bold text-slate-900">342</p>
        <p class="text-xs text-green-600 mt-2">↑ 8% vs mois dernier</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm ring-1 ring-slate-200">
        <p class="text-sm text-slate-600">Taux d'Occupation</p>
        <p class="text-3xl font-bold text-slate-900">62%</p>
        <p class="text-xs text-slate-500 mt-2">92/148 lits occupés</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm ring-1 ring-slate-200">
        <p class="text-sm text-slate-600">Revenu Total</p>
        <p class="text-3xl font-bold text-green-600">485,230 €</p>
        <p class="text-xs text-green-600 mt-2">↑ 15% vs mois dernier</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm ring-1 ring-slate-200">
        <p class="text-sm text-slate-600">Séjour Moyen</p>
        <p class="text-3xl font-bold text-slate-900">4.2 j</p>
        <p class="text-xs text-slate-500 mt-2">Jours</p>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-2 gap-6">
      <div class="bg-white rounded-lg shadow-sm ring-1 ring-slate-200 p-6">
        <h2 class="text-lg font-semibold text-slate-900 mb-4">Revenus Mensuels</h2>
        <div class="text-center py-16 text-slate-500">
          📊 Graphique des revenus - À implémenter
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm ring-1 ring-slate-200 p-6">
        <h2 class="text-lg font-semibold text-slate-900 mb-4">Occupation par Département</h2>
        <div class="text-center py-16 text-slate-500">
          🎯 Graphique d'occupation - À implémenter
        </div>
      </div>
    </div>

    <!-- Monthly Report -->
    <div class="bg-white rounded-lg shadow-sm ring-1 ring-slate-200 p-6">
      <h2 class="text-lg font-semibold text-slate-900 mb-4">Rapports Disponibles</h2>
      <div class="space-y-2">
        <div class="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100">
          <div>
            <p class="font-medium text-slate-900">Rapport Mars 2026</p>
            <p class="text-xs text-slate-500">Généré le 01/04/2026</p>
          </div>
          <div class="flex gap-2">
            <button class="px-3 py-1 text-sm bg-sky-100 text-sky-700 rounded hover:bg-sky-200">👁️ Voir</button>
            <button class="px-3 py-1 text-sm bg-slate-200 text-slate-700 rounded hover:bg-slate-300">📥 Télécharger</button>
          </div>
        </div>
        <div class="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100">
          <div>
            <p class="font-medium text-slate-900">Rapport Février 2026</p>
            <p class="text-xs text-slate-500">Généré le 01/03/2026</p>
          </div>
          <div class="flex gap-2">
            <button class="px-3 py-1 text-sm bg-sky-100 text-sky-700 rounded hover:bg-sky-200">👁️ Voir</button>
            <button class="px-3 py-1 text-sm bg-slate-200 text-slate-700 rounded hover:bg-slate-300">📥 Télécharger</button>
          </div>
        </div>
        <div class="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100">
          <div>
            <p class="font-medium text-slate-900">Rapport Janvier 2026</p>
            <p class="text-xs text-slate-500">Généré le 01/02/2026</p>
          </div>
          <div class="flex gap-2">
            <button class="px-3 py-1 text-sm bg-sky-100 text-sky-700 rounded hover:bg-sky-200">👁️ Voir</button>
            <button class="px-3 py-1 text-sm bg-slate-200 text-slate-700 rounded hover:bg-slate-300">📥 Télécharger</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Department Performance -->
    <div class="bg-white rounded-lg shadow-sm ring-1 ring-slate-200 p-6">
      <h2 class="text-lg font-semibold text-slate-900 mb-4">Performance par Département</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-slate-200">
              <th class="px-4 py-3 text-left font-semibold text-slate-900">Département</th>
              <th class="px-4 py-3 text-left font-semibold text-slate-900">Patients</th>
              <th class="px-4 py-3 text-left font-semibold text-slate-900">Lits Occupés</th>
              <th class="px-4 py-3 text-left font-semibold text-slate-900">Taux</th>
              <th class="px-4 py-3 text-left font-semibold text-slate-900">Revenu</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-slate-100 hover:bg-slate-50">
              <td class="px-4 py-3 text-slate-900 font-medium">Cardiologie</td>
              <td class="px-4 py-3 text-slate-600">45</td>
              <td class="px-4 py-3 text-slate-600">20/24</td>
              <td class="px-4 py-3"><span class="text-orange-600 font-medium">83%</span></td>
              <td class="px-4 py-3 text-slate-900 font-medium">89,500 €</td>
            </tr>
            <tr class="border-b border-slate-100 hover:bg-slate-50">
              <td class="px-4 py-3 text-slate-900 font-medium">Pneumologie</td>
              <td class="px-4 py-3 text-slate-600">38</td>
              <td class="px-4 py-3 text-slate-600">18/20</td>
              <td class="px-4 py-3"><span class="text-orange-600 font-medium">90%</span></td>
              <td class="px-4 py-3 text-slate-900 font-medium">76,200 €</td>
            </tr>
            <tr class="border-b border-slate-100 hover:bg-slate-50">
              <td class="px-4 py-3 text-slate-900 font-medium">Chirurgie</td>
              <td class="px-4 py-3 text-slate-600">52</td>
              <td class="px-4 py-3 text-slate-600">28/28</td>
              <td class="px-4 py-3"><span class="text-red-600 font-medium">100%</span></td>
              <td class="px-4 py-3 text-slate-900 font-medium">125,800 €</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

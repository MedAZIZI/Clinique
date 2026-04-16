<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">Facturation</h1>
        <p class="text-sm text-slate-500 mt-1">Gestion des factures, paiements et historique</p>
      </div>
      <button class="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition">
        + Nouvelle Facture
      </button>
    </div>

    <!-- Financial Stats -->
    <div class="grid grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-lg shadow-sm ring-1 ring-slate-200">
        <p class="text-sm text-slate-600">Chiffre d'Affaires</p>
        <p class="text-3xl font-bold text-slate-900">125,450 €</p>
        <p class="text-xs text-green-600 mt-2">↑ 12% vs mois dernier</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm ring-1 ring-slate-200">
        <p class="text-sm text-slate-600">Factures Impayées</p>
        <p class="text-3xl font-bold text-red-600">8</p>
        <p class="text-xs text-slate-500 mt-2">45,000 € à recouvrer</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm ring-1 ring-slate-200">
        <p class="text-sm text-slate-600">Paiements Ce Mois</p>
        <p class="text-3xl font-bold text-green-600">92,300 €</p>
        <p class="text-xs text-slate-500 mt-2">Taux de récupération: 95%</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm ring-1 ring-slate-200">
        <p class="text-sm text-slate-600">Moyenne par Facture</p>
        <p class="text-3xl font-bold text-slate-900">1,250 €</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-3 gap-6">
      <!-- Chart -->
      <div class="col-span-2 bg-white rounded-lg shadow-sm ring-1 ring-slate-200 p-6">
        <h2 class="text-lg font-semibold text-slate-900 mb-4">Revenu Mensuel</h2>
        <div class="text-center py-12 text-slate-500">
          📊 Graphique des revenus - À implémenter
        </div>
      </div>

      <!-- Recent -->
      <div class="bg-white rounded-lg shadow-sm ring-1 ring-slate-200 p-6">
        <h2 class="text-lg font-semibold text-slate-900 mb-4">Récent</h2>
        <div class="space-y-3">
          <div class="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
            <p class="font-medium text-sm text-slate-900">Facture #2024-001</p>
            <p class="text-xs text-green-600">✓ Payée</p>
          </div>
          <div class="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
            <p class="font-medium text-sm text-slate-900">Facture #2024-002</p>
            <p class="text-xs text-orange-600">⏳ En attente</p>
          </div>
          <div class="p-3 bg-slate-50 rounded-lg border-l-4 border-slate-300">
            <p class="font-medium text-sm text-slate-900">Facture #2024-003</p>
            <p class="text-xs text-slate-600">📝 Brouillon</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Invoices Table -->
    <div class="bg-white rounded-lg shadow-sm ring-1 ring-slate-200 p-6">
      <h2 class="text-lg font-semibold text-slate-900 mb-4">Factures Récentes</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-slate-200">
              <th class="px-4 py-3 text-left font-semibold text-slate-900">N° Facture</th>
              <th class="px-4 py-3 text-left font-semibold text-slate-900">Patient</th>
              <th class="px-4 py-3 text-left font-semibold text-slate-900">Montant</th>
              <th class="px-4 py-3 text-left font-semibold text-slate-900">Date</th>
              <th class="px-4 py-3 text-left font-semibold text-slate-900">Statut</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-slate-100 hover:bg-slate-50">
              <td class="px-4 py-3 text-slate-900 font-medium">#2024-001</td>
              <td class="px-4 py-3 text-slate-600">Jean Dupont</td>
              <td class="px-4 py-3 text-slate-900 font-medium">1,500 €</td>
              <td class="px-4 py-3 text-slate-600">10/04/2026</td>
              <td class="px-4 py-3"><span class="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">✓ Payée</span></td>
            </tr>
            <tr class="border-b border-slate-100 hover:bg-slate-50">
              <td class="px-4 py-3 text-slate-900 font-medium">#2024-002</td>
              <td class="px-4 py-3 text-slate-600">Marie Martin</td>
              <td class="px-4 py-3 text-slate-900 font-medium">800 €</td>
              <td class="px-4 py-3 text-slate-600">09/04/2026</td>
              <td class="px-4 py-3"><span class="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">⏳ Impayée</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

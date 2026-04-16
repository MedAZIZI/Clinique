<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">Chambres & Lits</h1>
        <p class="text-sm text-slate-500 mt-1">Gestion des chambres et disponibilité des lits</p>
      </div>
      <button class="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition">
        + Ajouter Chambre
      </button>
    </div>

    <!-- Rooms Stats -->
    <div class="grid grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-lg shadow-sm ring-1 ring-slate-200">
        <p class="text-sm text-slate-600">Total Lits</p>
        <p class="text-3xl font-bold text-slate-900">148</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm ring-1 ring-slate-200">
        <p class="text-sm text-slate-600">Lits Occupés</p>
        <p class="text-3xl font-bold text-orange-600">92</p>
        <p class="text-xs text-slate-500 mt-2">Taux: 62%</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm ring-1 ring-slate-200">
        <p class="text-sm text-slate-600">Lits Disponibles</p>
        <p class="text-3xl font-bold text-green-600">56</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm ring-1 ring-slate-200">
        <p class="text-sm text-slate-600">Chambres</p>
        <p class="text-3xl font-bold text-slate-900">42</p>
      </div>
    </div>

    <!-- Floor Overview -->
    <div class="grid grid-cols-2 gap-6">
      <!-- Floors -->
      <div class="space-y-4">
        <h2 class="text-lg font-semibold text-slate-900">Étages</h2>
        <div class="grid gap-3">
          <div class="p-4 bg-white rounded-lg shadow-sm ring-1 ring-slate-200 hover:ring-sky-300">
            <div class="flex justify-between items-center mb-2">
              <h3 class="font-semibold text-slate-900">Étage 1 - Urgences</h3>
              <span class="text-xs font-medium text-white bg-orange-500 px-2 py-1 rounded">12/20 lits</span>
            </div>
            <div class="w-full bg-slate-200 rounded-full h-2">
              <div class="bg-orange-500 h-2 rounded-full" style="width: 60%"></div>
            </div>
          </div>
          <div class="p-4 bg-white rounded-lg shadow-sm ring-1 ring-slate-200 hover:ring-sky-300">
            <div class="flex justify-between items-center mb-2">
              <h3 class="font-semibold text-slate-900">Étage 2 - Cardiologie</h3>
              <span class="text-xs font-medium text-white bg-green-500 px-2 py-1 rounded">8/24 lits</span>
            </div>
            <div class="w-full bg-slate-200 rounded-full h-2">
              <div class="bg-green-500 h-2 rounded-full" style="width: 33%"></div>
            </div>
          </div>
          <div class="p-4 bg-white rounded-lg shadow-sm ring-1 ring-slate-200 hover:ring-sky-300">
            <div class="flex justify-between items-center mb-2">
              <h3 class="font-semibold text-slate-900">Étage 3 - Pneumologie</h3>
              <span class="text-xs font-medium text-white bg-orange-500 px-2 py-1 rounded">18/20 lits</span>
            </div>
            <div class="w-full bg-slate-200 rounded-full h-2">
              <div class="bg-orange-500 h-2 rounded-full" style="width: 90%"></div>
            </div>
          </div>
          <div class="p-4 bg-white rounded-lg shadow-sm ring-1 ring-slate-200 hover:ring-sky-300">
            <div class="flex justify-between items-center mb-2">
              <h3 class="font-semibold text-slate-900">Étage 4 - Chirurgie</h3>
              <span class="text-xs font-medium text-white bg-red-500 px-2 py-1 rounded">28/28 lits</span>
            </div>
            <div class="w-full bg-slate-200 rounded-full h-2">
              <div class="bg-red-500 h-2 rounded-full" style="width: 100%"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Room Types -->
      <div class="space-y-4">
        <h2 class="text-lg font-semibold text-slate-900">Types de Chambres</h2>
        <div class="grid gap-3">
          <div class="p-4 bg-white rounded-lg shadow-sm ring-1 ring-slate-200">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-semibold text-slate-900">Chambres Simples</h3>
                <p class="text-xs text-slate-500">1 lit par chambre</p>
              </div>
              <span class="text-lg font-bold text-slate-900">24</span>
            </div>
            <p class="text-xs text-slate-500 mt-2">18 occupées - 6 disponibles</p>
          </div>
          <div class="p-4 bg-white rounded-lg shadow-sm ring-1 ring-slate-200">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-semibold text-slate-900">Chambres Doubles</h3>
                <p class="text-xs text-slate-500">2 lits par chambre</p>
              </div>
              <span class="text-lg font-bold text-slate-900">12</span>
            </div>
            <p class="text-xs text-slate-500 mt-2">20 occupées - 4 disponibles</p>
          </div>
          <div class="p-4 bg-white rounded-lg shadow-sm ring-1 ring-slate-200">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-semibold text-slate-900">Soins Intensifs</h3>
                <p class="text-xs text-slate-500">Monitoring 24/24</p>
              </div>
              <span class="text-lg font-bold text-slate-900">6</span>
            </div>
            <p class="text-xs text-slate-500 mt-2">6 occupées - 0 disponibles</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Available Rooms Table -->
    <div class="bg-white rounded-lg shadow-sm ring-1 ring-slate-200 p-6">
      <h2 class="text-lg font-semibold text-slate-900 mb-4">Lits Disponibles</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-slate-200">
              <th class="px-4 py-3 text-left font-semibold text-slate-900">Chambre</th>
              <th class="px-4 py-3 text-left font-semibold text-slate-900">Étage</th>
              <th class="px-4 py-3 text-left font-semibold text-slate-900">Type</th>
              <th class="px-4 py-3 text-left font-semibold text-slate-900">Lit #</th>
              <th class="px-4 py-3 text-left font-semibold text-slate-900">Statut</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-slate-100 hover:bg-slate-50">
              <td class="px-4 py-3 text-slate-900 font-medium">201</td>
              <td class="px-4 py-3 text-slate-600">2</td>
              <td class="px-4 py-3 text-slate-600">Simple</td>
              <td class="px-4 py-3 text-slate-600">A</td>
              <td class="px-4 py-3"><span class="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Disponible</span></td>
            </tr>
            <tr class="border-b border-slate-100 hover:bg-slate-50">
              <td class="px-4 py-3 text-slate-900 font-medium">305</td>
              <td class="px-4 py-3 text-slate-600">3</td>
              <td class="px-4 py-3 text-slate-600">Double</td>
              <td class="px-4 py-3 text-slate-600">B</td>
              <td class="px-4 py-3"><span class="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Disponible</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

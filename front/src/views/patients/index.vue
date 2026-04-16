<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const filterSex = ref('')
const filterStatus = ref('')
const activePage = ref(1)
const perPage = 10
const showDeleteConfirm = ref(false)
const patientToDelete = ref(null)

const sexOptions = ['Femme', 'Homme']
const statusOptions = ['Actif', 'Hospitalisé', 'Sorti', 'Inactif']
const insuranceTypes = ['Payant', 'CNSS', 'CNOPS', 'CNAM', 'Mutuelle']

const patients = ref([
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
  {
    id: 2,
    firstName: 'Lucas',
    lastName: 'Dubois',
    sex: 'Homme',
    dob: '1992-07-12',
    age: 34,
    cin: 'CD789123',
    phone: '06 98 76 54 32',
    gsm: '06 98 76 54 32',
    email: 'lucas.dubois@email.com',
    address: '45 avenue des Champs',
    city: 'Lyon',
    profession: 'Développeur',
    medicalRecord: 'MED-1002',
    patientId: 'PAT-2026-002',
    treatingDoctor: 'Dr. Sophie Laurent',
    status: 'Hospitalisé',
    insuranceType: 'CNOPS',
    adherentNumber: 'CNOPS-456789',
    adherentCin: 'EF123456',
    relationship: 'Titulaire',
    affiliation: 'Privé',
    som: 'SOM-789456',
    antecedents: 'Aucun antécédent particulier',
    allergies: 'Aucune connue',
    medicalNotes: 'Visite annuelle de contrôle, vaccinations à jour',
    createdAt: '2026-03-15',
    updatedAt: '2026-04-08'
  },
  {
    id: 3,
    firstName: 'Emma',
    lastName: 'Garcia',
    sex: 'Femme',
    dob: '1985-11-25',
    age: 40,
    cin: 'EF456789',
    phone: '06 54 32 10 98',
    gsm: '06 54 32 10 98',
    email: 'emma.garcia@email.com',
    address: '78 rue de la République',
    city: 'Marseille',
    profession: 'Médecin',
    medicalRecord: 'MED-1003',
    patientId: 'PAT-2026-003',
    treatingDoctor: 'Dr. Martin Dupuis',
    status: 'Actif',
    insuranceType: 'CNAM',
    adherentNumber: 'CNAM-123789',
    adherentCin: 'GH456123',
    relationship: 'Titulaire',
    affiliation: 'Fonctionnaire',
    som: 'SOM-123789',
    antecedents: 'Aucun antécédent significatif',
    allergies: 'Aucune connue',
    medicalNotes: 'Contrôle annuel, bilan sanguin normal',
    createdAt: '2026-03-28',
    updatedAt: '2026-04-09'
  },
  {
    id: 4,
    firstName: 'Nora',
    lastName: 'Petit',
    sex: 'Femme',
    dob: '1975-02-09',
    age: 51,
    cin: 'MN147258',
    phone: '06 31 22 77 44',
    gsm: '06 31 22 77 44',
    email: 'nora.petit@email.com',
    address: '7 rue de la République',
    city: 'Nantes',
    profession: 'Comptable',
    medicalRecord: 'MED-1004',
    patientId: 'PAT-2026-004',
    treatingDoctor: 'Dr. Martin Dupuis',
    status: 'Sorti',
    insuranceType: 'CNSS',
    adherentNumber: 'CNSS-963852',
    adherentCin: 'OP741963',
    relationship: 'Titulaire',
    affiliation: 'Fonctionnaire',
    som: 'SOM-852741',
    antecedents: 'Diabète de type 2, hypertension',
    allergies: 'Aspirine, iode',
    medicalNotes: 'Contrôle glycémique mensuel, suivi cardiologique',
    createdAt: '2026-04-06',
    updatedAt: '2026-04-10'
  },
  {
    id: 5,
    firstName: 'Julien',
    lastName: 'Leroy',
    sex: 'Homme',
    dob: '1980-09-14',
    age: 45,
    cin: 'QR369258',
    phone: '06 77 12 44 55',
    gsm: '06 77 12 44 55',
    email: 'julien.leroy@email.com',
    address: '23 boulevard Saint-Michel',
    city: 'Toulouse',
    profession: 'Professeur',
    medicalRecord: 'MED-1005',
    patientId: 'PAT-2026-005',
    treatingDoctor: 'Dr. Sophie Laurent',
    status: 'Hospitalisé',
    insuranceType: 'CNSS',
    adherentNumber: 'CNSS-741369',
    adherentCin: 'ST852147',
    relationship: 'Titulaire',
    affiliation: 'Fonctionnaire',
    som: 'SOM-369147',
    antecedents: 'Hypertension artérielle, hypercholestérolémie',
    allergies: 'Statines',
    medicalNotes: 'Bilan lipidique annuel, traitement antihypertenseur',
    createdAt: '2026-03-12',
    updatedAt: '2026-04-05'
  },
  {
    id: 6,
    firstName: 'Alice',
    lastName: 'Marchand',
    sex: 'Femme',
    dob: '2000-09-17',
    age: 25,
    cin: 'AB741963',
    phone: '06 22 33 44 55',
    gsm: '06 22 33 44 55',
    email: 'alice.marchand@email.com',
    address: '6 rue de la Liberté',
    city: 'Reims',
    profession: 'Journaliste',
    medicalRecord: 'MED-1006',
    patientId: 'PAT-2026-006',
    treatingDoctor: 'Dr. Sophie Laurent',
    status: 'Actif',
    insuranceType: 'CNAM',
    adherentNumber: 'CNAM-258369',
    adherentCin: 'CD963741',
    relationship: 'Titulaire',
    affiliation: 'CDI',
    som: 'SOM-741963',
    antecedents: 'Aucun antécédent particulier',
    allergies: 'Aucune connue',
    medicalNotes: 'Visite de contrôle annuelle, vaccinations à jour',
    createdAt: '2026-04-01',
    updatedAt: '2026-04-08'
  },
  {
    id: 7,
    firstName: 'Antoine',
    lastName: 'Roux',
    sex: 'Homme',
    dob: '1995-06-27',
    age: 30,
    cin: 'YZ147369',
    phone: '06 55 44 77 22',
    gsm: '06 55 44 77 22',
    email: 'antoine.roux@email.com',
    address: '22 rue des Roses',
    city: 'Toulouse',
    profession: 'Ingénieur',
    medicalRecord: 'MED-1007',
    patientId: 'PAT-2026-007',
    treatingDoctor: 'Dr. Martin Dupuis',
    status: 'Inactif',
    insuranceType: 'CNOPS',
    adherentNumber: 'CNOPS-852147',
    adherentCin: 'AB741963',
    relationship: 'Titulaire',
    affiliation: 'Privé',
    som: 'SOM-963852',
    antecedents: 'Aucun antécédent significatif',
    allergies: 'Aucune connue',
    medicalNotes: 'Visite annuelle de contrôle, vaccinations à jour',
    createdAt: '2026-04-03',
    updatedAt: '2026-04-10'
  },
  {
    id: 8,
    firstName: 'Camille',
    lastName: 'Fournier',
    sex: 'Femme',
    dob: '1989-04-15',
    age: 37,
    cin: 'CD258741',
    phone: '06 22 11 88 33',
    gsm: '06 22 11 88 33',
    email: 'camille.fournier@email.com',
    address: '9 rue de la Paix',
    city: 'Lille',
    profession: 'Avocate',
    medicalRecord: 'MED-1008',
    patientId: 'PAT-2026-008',
    treatingDoctor: 'Dr. Sophie Laurent',
    status: 'Actif',
    insuranceType: 'Mutuelle',
    adherentNumber: 'MUT-369258',
    adherentCin: 'EF147369',
    relationship: 'Titulaire',
    affiliation: 'Libéral',
    som: 'SOM-258369',
    antecedents: 'Aucun antécédent particulier',
    allergies: 'Aucune connue',
    medicalNotes: 'Suivi gynécologique annuel, vaccinations à jour',
    createdAt: '2026-03-20',
    updatedAt: '2026-04-07'
  },
  {
    id: 9,
    firstName: 'Thomas',
    lastName: 'Bonnet',
    sex: 'Homme',
    dob: '1978-12-03',
    age: 47,
    cin: 'GH963852',
    phone: '06 44 55 66 77',
    gsm: '06 44 55 66 77',
    email: 'thomas.bonnet@email.com',
    address: '15 place de la Comédie',
    city: 'Montpellier',
    profession: 'Architecte',
    medicalRecord: 'MED-1009',
    patientId: 'PAT-2026-009',
    treatingDoctor: 'Dr. Pierre Bernard',
    status: 'Actif',
    insuranceType: 'CNSS',
    adherentNumber: 'CNSS-147258',
    adherentCin: 'IJ369741',
    relationship: 'Titulaire',
    affiliation: 'Fonctionnaire',
    som: 'SOM-741258',
    antecedents: 'Aucun antécédent significatif',
    allergies: 'Aucune connue',
    medicalNotes: 'Visite annuelle de contrôle, bilan sanguin normal',
    createdAt: '2026-03-25',
    updatedAt: '2026-04-06'
  },
  {
    id: 10,
    firstName: 'Léa',
    lastName: 'Bonnet',
    sex: 'Femme',
    dob: '1993-08-19',
    age: 32,
    cin: 'JK741852',
    phone: '06 77 88 55 22',
    gsm: '06 77 88 55 22',
    email: 'lea.bonnet@email.com',
    address: '4 place Bellecour',
    city: 'Lyon',
    profession: 'Designer',
    medicalRecord: 'MED-1010',
    patientId: 'PAT-2026-010',
    treatingDoctor: 'Dr. Martin Dupuis',
    status: 'Actif',
    insuranceType: 'CNAM',
    adherentNumber: 'CNAM-741852',
    adherentCin: 'MN369258',
    relationship: 'Titulaire',
    affiliation: 'CDD',
    som: 'SOM-369741',
    antecedents: 'Anémie ferriprive, aménorrhée secondaire',
    allergies: 'Aucune connue',
    medicalNotes: 'Supplémentation ferrique, suivi gynécologique',
    createdAt: '2026-04-04',
    updatedAt: '2026-04-09'
  },
  {
    id: 11,
    firstName: 'Maxime',
    lastName: 'Lambert',
    sex: 'Homme',
    dob: '1985-11-30',
    age: 40,
    cin: 'OP852963',
    phone: '06 44 33 22 11',
    gsm: '06 44 33 22 11',
    email: 'maxime.lambert@email.com',
    address: '27 rue Victor Hugo',
    city: 'Strasbourg',
    profession: 'Professeur',
    medicalRecord: 'MED-1011',
    patientId: 'PAT-2026-011',
    treatingDoctor: 'Dr. Sophie Laurent',
    status: 'Actif',
    insuranceType: 'CNSS',
    adherentNumber: 'CNSS-369147',
    adherentCin: 'QR741258',
    relationship: 'Titulaire',
    affiliation: 'Fonctionnaire',
    som: 'SOM-852369',
    antecedents: 'Dépression majeure, anxiété généralisée',
    allergies: 'Benzodiazépines',
    medicalNotes: 'Suivi psychiatrique mensuel, traitement ISRS',
    createdAt: '2026-03-18',
    updatedAt: '2026-04-07'
  },
  {
    id: 12,
    firstName: 'Chloé',
    lastName: 'Girard',
    sex: 'Femme',
    dob: '1998-05-22',
    age: 27,
    cin: 'RS369741',
    phone: '06 11 22 33 44',
    gsm: '06 11 22 33 44',
    email: 'chloe.girard@email.com',
    address: '31 rue de la Gare',
    city: 'Nice',
    profession: 'Étudiante',
    medicalRecord: 'MED-1012',
    patientId: 'PAT-2026-012',
    treatingDoctor: 'Dr. Martin Dupuis',
    status: 'Actif',
    insuranceType: 'CNAM',
    adherentNumber: 'CNAM-963741',
    adherentCin: 'TU852369',
    relationship: 'Titulaire',
    affiliation: 'Étudiant',
    som: 'SOM-147369',
    antecedents: 'Aucun antécédent particulier',
    allergies: 'Aucune connue',
    medicalNotes: 'Visite de contrôle annuelle, vaccinations à jour',
    createdAt: '2026-04-02',
    updatedAt: '2026-04-09'
  },
  {
    id: 13,
    firstName: 'Nicolas',
    lastName: 'David',
    sex: 'Homme',
    dob: '1965-12-11',
    age: 60,
    cin: 'EF852147',
    phone: '06 77 66 55 44',
    gsm: '06 77 66 55 44',
    email: 'nicolas.david@email.com',
    address: '18 avenue Foch',
    city: 'Nancy',
    profession: 'Retraité',
    medicalRecord: 'MED-1013',
    patientId: 'PAT-2026-013',
    treatingDoctor: 'Dr. Pierre Bernard',
    status: 'Actif',
    insuranceType: 'CNSS',
    adherentNumber: 'CNSS-741369',
    adherentCin: 'YZ147258',
    relationship: 'Titulaire',
    affiliation: 'Fonctionnaire',
    som: 'SOM-369147',
    antecedents: 'Hypertension artérielle, hypercholestérolémie',
    allergies: 'Statines',
    medicalNotes: 'Bilan lipidique annuel, traitement antihypertenseur',
    createdAt: '2026-03-12',
    updatedAt: '2026-04-05'
  },
  {
    id: 14,
    firstName: 'Alice',
    lastName: 'Marchand',
    sex: 'Femme',
    dob: '2000-09-17',
    age: 25,
    cin: 'AB741963',
    phone: '06 22 33 44 55',
    gsm: '06 22 33 44 55',
    email: 'alice.marchand@email.com',
    address: '6 rue de la Liberté',
    city: 'Reims',
    profession: 'Journaliste',
    medicalRecord: 'MED-1014',
    patientId: 'PAT-2026-014',
    treatingDoctor: 'Dr. Sophie Laurent',
    status: 'Actif',
    insuranceType: 'CNAM',
    adherentNumber: 'CNAM-258369',
    adherentCin: 'CD963741',
    relationship: 'Titulaire',
    affiliation: 'CDI',
    som: 'SOM-741963',
    antecedents: 'Aucun antécédent particulier',
    allergies: 'Aucune connue',
    medicalNotes: 'Visite de contrôle annuelle, vaccinations à jour',
    createdAt: '2026-04-01',
    updatedAt: '2026-04-08'
  },
  {
    id: 15,
    firstName: 'Nicolas',
    lastName: 'David',
    sex: 'Homme',
    dob: '1965-12-11',
    age: 60,
    cin: 'EF852147',
    phone: '06 77 66 55 44',
    gsm: '06 77 66 55 44',
    email: 'nicolas.david@email.com',
    address: '18 avenue Foch',
    city: 'Nancy',
    profession: 'Retraité',
    medicalRecord: 'MED-1015',
    patientId: 'PAT-2026-015',
    treatingDoctor: 'Dr. Pierre Bernard',
    status: 'Actif',
    insuranceType: 'CNSS',
    adherentNumber: 'CNSS-741369',
    adherentCin: 'YZ147258',
    relationship: 'Titulaire',
    affiliation: 'Fonctionnaire',
    som: 'SOM-369147',
    antecedents: 'Hypertension artérielle, hypercholestérolémie',
    allergies: 'Statines',
    medicalNotes: 'Bilan lipidique annuel, traitement antihypertenseur',
    createdAt: '2026-03-12',
    updatedAt: '2026-04-05'
  },
  {
    id: 16,
    firstName: 'Mathieu',
    lastName: 'Colin',
    sex: 'Homme',
    dob: '1990-02-28',
    age: 36,
    cin: 'MN741258',
    phone: '06 99 88 77 66',
    gsm: '06 99 88 77 66',
    email: 'mathieu.colin@email.com',
    address: '12 rue de la Mairie',
    city: 'Grenoble',
    profession: 'Consultant',
    medicalRecord: 'MED-1016',
    patientId: 'PAT-2026-016',
    treatingDoctor: 'Dr. Sophie Laurent',
    status: 'Actif',
    insuranceType: 'CNOPS',
    adherentNumber: 'CNOPS-369741',
    adherentCin: 'OP963147',
    relationship: 'Titulaire',
    affiliation: 'Privé',
    som: 'SOM-852147',
    antecedents: 'Aucun antécédent significatif',
    allergies: 'Aucune connue',
    medicalNotes: 'Visite annuelle de contrôle, bilan sanguin régulier',
    createdAt: '2026-04-05',
    updatedAt: '2026-04-10'
  },
  {
    id: 17,
    firstName: 'Mathieu',
    lastName: 'Colin',
    sex: 'Homme',
    dob: '1990-02-28',
    age: 36,
    cin: 'MN741258',
    phone: '06 99 88 77 66',
    gsm: '06 99 88 77 66',
    email: 'mathieu.colin@email.com',
    address: '12 rue de la Mairie',
    city: 'Grenoble',
    profession: 'Consultant',
    medicalRecord: 'MED-1017',
    patientId: 'PAT-2026-017',
    treatingDoctor: 'Dr. Sophie Laurent',
    status: 'Actif',
    insuranceType: 'CNOPS',
    adherentNumber: 'CNOPS-369741',
    adherentCin: 'OP963147',
    relationship: 'Titulaire',
    affiliation: 'Privé',
    som: 'SOM-852147',
    antecedents: 'Aucun antécédent significatif',
    allergies: 'Aucune connue',
    medicalNotes: 'Visite annuelle de contrôle, bilan sanguin régulier',
    createdAt: '2026-04-05',
    updatedAt: '2026-04-10'
  },
  {
    id: 18,
    firstName: 'Julie',
    lastName: 'Renard',
    sex: 'Femme',
    dob: '1970-10-19',
    age: 55,
    cin: 'QR258369',
    phone: '06 55 66 77 88',
    gsm: '06 55 66 77 88',
    email: 'julie.renard@email.com',
    address: '8 place de la Cathédrale',
    city: 'Amiens',
    profession: 'Bibliothécaire',
    medicalRecord: 'MED-1018',
    patientId: 'PAT-2026-018',
    treatingDoctor: 'Dr. Pierre Bernard',
    status: 'Actif',
    insuranceType: 'CNSS',
    adherentNumber: 'CNSS-963741',
    adherentCin: 'ST147258',
    relationship: 'Titulaire',
    affiliation: 'Fonctionnaire',
    som: 'SOM-369852',
    antecedents: 'Aucun antécédent significatif',
    allergies: 'Aucune connue',
    medicalNotes: 'Visite annuelle de contrôle, bilan sanguin normal',
    createdAt: '2026-03-30',
    updatedAt: '2026-04-08'
  },
  {
    id: 19,
    firstName: 'Hugo',
    lastName: 'Simon',
    sex: 'Homme',
    dob: '1988-01-14',
    age: 38,
    cin: 'TU741963',
    phone: '06 33 44 55 66',
    gsm: '06 33 44 55 66',
    email: 'hugo.simon@email.com',
    address: '25 rue du Commerce',
    city: 'Rouen',
    profession: 'Commerçant',
    medicalRecord: 'MED-1019',
    patientId: 'PAT-2026-019',
    treatingDoctor: 'Dr. Martin Dupuis',
    status: 'Actif',
    insuranceType: 'CNOPS',
    adherentNumber: 'CNOPS-147369',
    adherentCin: 'UV852741',
    relationship: 'Titulaire',
    affiliation: 'Indépendant',
    som: 'SOM-963147',
    antecedents: 'Aucun antécédent significatif',
    allergies: 'Aucune connue',
    medicalNotes: 'Visite annuelle de contrôle, vaccinations à jour',
    createdAt: '2026-04-07',
    updatedAt: '2026-04-10'
  },
  {
    id: 20,
    firstName: 'Manon',
    lastName: 'Simon',
    sex: 'Femme',
    dob: '1995-03-08',
    age: 31,
    cin: 'VW369147',
    phone: '06 33 44 55 66',
    gsm: '06 33 44 55 66',
    email: 'manon.simon@email.com',
    address: '23 avenue Jean Jaurès',
    city: 'Orléans',
    profession: 'Enseignante',
    medicalRecord: 'MED-1020',
    patientId: 'PAT-2026-020',
    treatingDoctor: 'Dr. Sophie Laurent',
    status: 'Actif',
    insuranceType: 'CNAM',
    adherentNumber: 'CNAM-369852',
    adherentCin: 'AB147369',
    relationship: 'Titulaire',
    affiliation: 'Fonctionnaire',
    som: 'SOM-741369',
    antecedents: 'Migraine avec aura, anxiété',
    allergies: 'Triptans',
    medicalNotes: 'Suivi neurologique, traitement prophylactique',
    createdAt: '2026-04-03',
    updatedAt: '2026-04-10'
  }
])

const filteredPatients = computed(() => {
  return patients.value.filter(patient => {
    const matchesSearch = !search.value ||
      `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(search.value.toLowerCase()) ||
      patient.medicalRecord.toLowerCase().includes(search.value.toLowerCase()) ||
      patient.patientId.toLowerCase().includes(search.value.toLowerCase())

    const matchesSex = !filterSex.value || patient.sex === filterSex.value
    const matchesStatus = !filterStatus.value || patient.status === filterStatus.value

    return matchesSearch && matchesSex && matchesStatus
  })
})

const paginatedPatients = computed(() => {
  const start = (activePage.value - 1) * perPage
  const end = start + perPage
  return filteredPatients.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredPatients.value.length / perPage)
})

const confirmDelete = (patient) => {
  patientToDelete.value = patient
  showDeleteConfirm.value = true
}

const deletePatient = () => {
  if (patientToDelete.value) {
    const index = patients.value.findIndex(p => p.id === patientToDelete.value.id)
    if (index > -1) {
      patients.value.splice(index, 1)
    }
    showDeleteConfirm.value = false
    patientToDelete.value = null
  }
}

const cancelDelete = () => {
  showDeleteConfirm.value = false
  patientToDelete.value = null
}

// Fonctions helper
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

const getStatusBadgeText = (status) => {
  switch (status) {
    case 'Actif':
      return '🟢 Actif'
    case 'Inactif':
      return '🔴 Inactif'
    case 'Hospitalisé':
      return '🟡 Hospitalisé'
    case 'Sorti':
      return '🔵 Sorti'
    default:
      return status
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">Patients</h1>
        <p class="text-sm text-slate-500 mt-1">Gestion des dossiers patients</p>
      </div>
      <button @click="$router.push('/patients/add')" class="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition">
        + Ajouter Patient
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-lg shadow-sm ring-1 ring-slate-200">
        <p class="text-sm text-slate-600">Total Patients</p>
        <p class="text-3xl font-bold text-slate-900">{{ patients.length }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm ring-1 ring-slate-200">
        <p class="text-sm text-slate-600">Patients Actifs</p>
        <p class="text-3xl font-bold text-green-600">{{ patients.filter(p => p.status === 'Actif').length }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm ring-1 ring-slate-200">
        <p class="text-sm text-slate-600">Nouveaux ce mois</p>
        <p class="text-3xl font-bold text-sky-600">{{ patients.filter(p => p.createdAt.startsWith('2026-04')).length }}</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm ring-1 ring-slate-200">
        <p class="text-sm text-slate-600">Femmes / Hommes</p>
        <p class="text-3xl font-bold text-slate-900">{{ patients.filter(p => p.sex === 'Femme').length }} / {{ patients.filter(p => p.sex === 'Homme').length }}</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white p-4 rounded-lg shadow-sm ring-1 ring-slate-200">
      <div class="flex flex-wrap gap-4">
        <div class="flex-1 min-w-64">
          <input v-model="search" type="text" placeholder="Rechercher par nom, dossier médical ou ID patient..." class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
        </div>
        <select v-model="filterSex" class="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
          <option value="">Tous les sexes</option>
          <option v-for="sex in sexOptions" :key="sex" :value="sex">{{ sex }}</option>
        </select>
        <select v-model="filterStatus" class="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
          <option value="">Tous les statuts</option>
          <option v-for="status in statusOptions" :key="status" :value="status">{{ status }}</option>
        </select>
      </div>
    </div>

    <!-- Patients Table -->
    <div class="bg-white rounded-lg shadow-sm ring-1 ring-slate-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200">
          <thead class="bg-slate-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nom complet</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Âge / Date naissance</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Téléphone</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">CIN</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Ville</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Assurance</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Statut</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-slate-200">
            <tr v-for="patient in paginatedPatients" :key="patient.id" class="hover:bg-slate-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-slate-900">{{ patient.lastName }} {{ patient.firstName }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-slate-900">{{ patient.age }} ans</div>
                <div class="text-sm text-slate-500">{{ formatDate(patient.dob) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ patient.phone }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ patient.cin }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ patient.city }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{{ patient.insuranceType }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusBadgeClass(patient.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ getStatusBadgeText(patient.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center space-x-2">
                  <button @click="$router.push(`/patients/${patient.id}`)" class="text-slate-400 hover:text-slate-600" title="Voir">
                    👁
                  </button>
                  <button @click="$router.push(`/patients/add?id=${patient.id}`)" class="text-sky-600 hover:text-sky-900" title="Modifier">
                    ✏️
                  </button>
                  <button @click="confirmDelete(patient)" class="text-red-600 hover:text-red-900" title="Supprimer">
                    🗑
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between">
      <div class="text-sm text-slate-700">
        Affichage de {{ (activePage - 1) * perPage + 1 }} à {{ Math.min(activePage * perPage, filteredPatients.length) }} sur {{ filteredPatients.length }} patients
      </div>
      <div class="flex items-center space-x-2">
        <button @click="activePage--" :disabled="activePage === 1" class="px-3 py-1 border border-slate-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50">
          Précédent
        </button>
        <span class="px-3 py-1 text-sm text-slate-700">Page {{ activePage }} sur {{ totalPages }}</span>
        <button @click="activePage++" :disabled="activePage === totalPages" class="px-3 py-1 border border-slate-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50">
          Suivant
        </button>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-slate-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="cancelDelete">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" @click.stop>
        <div class="mt-3">
          <h3 class="text-lg font-medium text-slate-900 mb-4">Confirmer la suppression</h3>
          <p class="text-sm text-slate-600 mb-6">
            Êtes-vous sûr de vouloir supprimer le patient <strong>{{ patientToDelete?.firstName }} {{ patientToDelete?.lastName }}</strong> ?
            Cette action est irréversible.
          </p>
          <div class="flex justify-end space-x-3">
            <button @click="cancelDelete" class="px-4 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition">
              Annuler
            </button>
            <button @click="deletePatient" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>��< s c r i p t   s e t u p > 
 i m p o r t   {   r e f   }   f r o m   
 
 \ v u e \ ' 
 c o n s t   p a t i e n t s   =   r e f ( [ {   i d :   1 ,   f i r s t N a m e :   \ T e s t \ ' ,   l a s t N a m e :   \ P a t i e n t \ '   } ] ) 
 < / s c r i p t > 
 < t e m p l a t e > 
     < d i v > 
         < h 1 > P a t i e n t s < / h 1 > 
         < u l > 
             < l i   v - f o r = " p a t i e n t   i n   p a t i e n t s "   : k e y = " p a t i e n t . i d " > 
                 { {   p a t i e n t . f i r s t N a m e   } }   { {   p a t i e n t . l a s t N a m e   } } 
             < / l i > 
         < / u l > 
     < / d i v > 
 < / t e m p l a t e > 
 
 
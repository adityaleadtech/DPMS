// ============ HIERARCHY DATA ============
export const HIERARCHY = {
  country: 'India',
  states: [
    {
      name: 'Chhattisgarh',
      districts: [
        {
          name: 'Raipur',
          parliamentConstituencies: [
            {
              name: 'Raipur',
              assemblyConstituencies: [
                {
                  name: 'Raipur City South',
                  blocks: [
                    {
                      name: 'Raipur South Block',
                      panchayats: [
                        {
                          name: 'Gram Panchayat Rajnagar',
                          pollingBooths: [
                            { name: 'Booth 101', code: '101' },
                            { name: 'Booth 102', code: '102' }
                          ],
                          villages: ['Rajnagar', 'Kesla', 'Patan']
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: 'Bilaspur',
          parliamentConstituencies: [
            {
              name: 'Bilaspur',
              assemblyConstituencies: [
                {
                  name: 'Bilaspur City',
                  blocks: [
                    {
                      name: 'Bilaspur Block',
                      panchayats: [
                        {
                          name: 'Gram Panchayat Bilaspur',
                          pollingBooths: [
                            { name: 'Booth 201', code: '201' },
                            { name: 'Booth 202', code: '202' }
                          ],
                          villages: ['Bilaspur City', 'Ratanpur', 'Kota']
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: 'Durg',
          parliamentConstituencies: [
            {
              name: 'Durg',
              assemblyConstituencies: [
                {
                  name: 'Durg City',
                  blocks: [
                    {
                      name: 'Durg Block',
                      panchayats: [
                        {
                          name: 'Gram Panchayat Durg',
                          pollingBooths: [
                            { name: 'Booth 301', code: '301' },
                            { name: 'Booth 302', code: '302' }
                          ],
                          villages: ['Durg City', 'Bhilai', 'Risali']
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// ============ USERS ============
export const USERS = [
  { 
    id: 'pm1', 
    name: 'Narendra Modi', 
    role: 'PM', 
    region: 'India', 
    password: 'pm123',
    email: 'pm@india.gov.in'
  },
  { 
    id: 'cm1', 
    name: 'Vishnu Deo Sai', 
    role: 'CM', 
    region: 'Chhattisgarh', 
    password: 'cm123',
    email: 'cm@chhattisgarh.gov.in'
  },
  { 
    id: 'minister1', 
    name: 'Ram Vichar Netam', 
    role: 'Minister', 
    region: 'Chhattisgarh',
    department: 'Agriculture',
    password: 'minister123',
    email: 'rv.netam@cg.gov.in'
  },
  { 
    id: 'mp1', 
    name: 'Brijmohan Agrawal', 
    role: 'MP', 
    region: 'Raipur', 
    password: 'mp123',
    email: 'mp.raipur@parliament.gov.in'
  },
  { 
    id: 'mla1', 
    name: 'Neeraj Singh', 
    role: 'MLA', 
    region: 'Raipur City South', 
    password: 'mla123',
    email: 'mla.raipursouth@assembly.gov.in'
  },
  { 
    id: 'surveyor1', 
    name: 'Amit Surveyor', 
    role: 'Surveyor', 
    region: 'Raipur', 
    password: 'surveyor123',
    email: 'surveyor@cg.gov.in'
  },
  { 
    id: 'auditor1', 
    name: 'Rajesh Auditor', 
    role: 'Auditor', 
    region: 'Chhattisgarh', 
    password: 'auditor123',
    email: 'auditor@cg.gov.in'
  },
  { 
    id: 'user1', 
    name: 'Amit Kumar', 
    role: 'USER', 
    region: 'Raipur', 
    password: 'user123',
    email: 'amit.kumar@gmail.com'
  }
];

// ============ VOTERS ============
export const VOTERS = Array.from({ length: 500 }, (_, i) => {
  const firstNames = ['Rahul', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Neha', 'Raj', 'Kavya', 'Arjun', 'Meera', 'Suresh', 'Anita', 'Deepak', 'Sunita', 'Ravi', 'Pooja', 'Kiran', 'Manoj', 'Jyoti', 'Sanjay'];
  const lastNames = ['Kumar', 'Singh', 'Sharma', 'Patel', 'Verma', 'Yadav', 'Gupta', 'Joshi', 'Malik', 'Reddy', 'Sahu', 'Kashyap', 'Chauhan', 'Thakur', 'Rathore'];
  const genders = ['Male', 'Female', 'Other'];
  const castes = ['General', 'OBC', 'SC', 'ST'];
  const relations = ['Father', 'Mother', 'Husband', 'Wife'];
  
  // States with their districts
  const states = [
    { name: 'Chhattisgarh', districts: ['Raipur', 'Bilaspur', 'Durg', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon', 'Ambikapur', 'Dhamtari', 'Mahasamund'] },
    { name: 'Madhya Pradesh', districts: ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Rewa', 'Satna', 'Katni', 'Chhindwara'] },
    { name: 'Maharashtra', districts: ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Solapur', 'Amravati', 'Kolhapur', 'Sangli'] },
    { name: 'Uttar Pradesh', districts: ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Prayagraj', 'Ghaziabad', 'Noida', 'Meerut', 'Aligarh', 'Bareilly'] }
  ];
  
  const stateData = states[i % states.length];
  const district = stateData.districts[i % stateData.districts.length];
  const state = stateData.name;
  
  // Constituencies based on state
  const constituencies = {
    'Chhattisgarh': ['Raipur City South', 'Raipur City North', 'Bilaspur', 'Durg City', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon', 'Ambikapur', 'Dhamtari'],
    'Madhya Pradesh': ['Bhopal North', 'Bhopal South', 'Indore City', 'Jabalpur West', 'Gwalior East', 'Ujjain North', 'Sagar City', 'Rewa East', 'Satna West', 'Katni South'],
    'Maharashtra': ['Mumbai South', 'Mumbai North', 'Pune City', 'Nagpur West', 'Thane East', 'Nashik Central', 'Aurangabad North', 'Solapur City', 'Amravati East', 'Kolhapur South'],
    'Uttar Pradesh': ['Lucknow Central', 'Kanpur North', 'Varanasi East', 'Agra West', 'Prayagraj South', 'Ghaziabad City', 'Noida East', 'Meerut West', 'Aligarh North', 'Bareilly South']
  };
  
  const blocks = {
    'Chhattisgarh': ['Raipur South Block', 'Raipur North Block', 'Bilaspur Block', 'Durg Block', 'Raigarh Block', 'Jagdalpur Block'],
    'Madhya Pradesh': ['Bhopal South Block', 'Indore East Block', 'Jabalpur West Block', 'Gwalior North Block', 'Ujjain East Block', 'Sagar South Block'],
    'Maharashtra': ['Mumbai South Block', 'Pune East Block', 'Nagpur West Block', 'Thane North Block', 'Nashik South Block', 'Aurangabad East Block'],
    'Uttar Pradesh': ['Lucknow North Block', 'Kanpur South Block', 'Varanasi East Block', 'Agra West Block', 'Prayagraj North Block', 'Ghaziabad East Block']
  };
  
  const panchayats = ['Gram Panchayat Rajnagar', 'Gram Panchayat Kesla', 'Gram Panchayat Patan', 'Gram Panchayat Tilda', 'Gram Panchayat Simga'];
  const booths = ['Booth 101', 'Booth 102', 'Booth 103', 'Booth 104', 'Booth 105'];
  const villages = ['Rajnagar', 'Kesla', 'Patan', 'Tilda', 'Simga', 'Kurud', 'Risali', 'Bhatapara', 'Pallari', 'Khairagarh'];
  
  const stateConstituencies = constituencies[state] || ['Constituency 1', 'Constituency 2'];
  const stateBlocks = blocks[state] || ['Block 1', 'Block 2'];
  
  return {
    id: `VOT${String(1000 + i).padStart(4, '0')}`,
    name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
    voterId: `${state.substring(0, 2).toUpperCase()}/${district.substring(0, 3).toUpperCase()}/${String(100000 + i).padStart(6, '0')}`,
    state: state,
    district: district,
    constituency: stateConstituencies[i % stateConstituencies.length],
    age: 18 + (i % 62),
    status: i % 7 === 0 ? 'Inactive' : 'Active',
    boothNumber: booths[i % booths.length],
    caste: castes[i % castes.length],
    email: `voter${i}@gmail.com`,
    phoneNumber: `98${String(70000000 + i).slice(0, 8)}`,
    dateOfBirth: `19${80 + (i % 20)}-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}`,
    gender: genders[i % genders.length],
    relationName: `${firstNames[(i + 5) % firstNames.length]} ${lastNames[(i + 3) % lastNames.length]}`,
    relationType: relations[i % relations.length],
    houseNumber: `${100 + i}`,
    village: villages[i % villages.length],
    block: stateBlocks[i % stateBlocks.length],
    panchayat: panchayats[i % panchayats.length],
    pollingBooth: booths[i % booths.length],
    registeredDate: `2024-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}`
  };
});

// ============ DEVELOPMENT TYPES ============
export const DEVELOPMENT_TYPES = [
  'Water Supply',
  'Road Construction',
  'School Building',
  'Hospital Construction',
  'Drainage',
  'Electricity',
  'Street Lights',
  'Community Center',
  'Housing',
  'Agriculture Support',
  'Bridge Construction',
  'Park Development',
  'Market Complex',
  'Bus Stand',
  'Irrigation Canal'
];

// ============ DEVELOPMENT PROJECTS ============
export const DEVELOPMENT_PROJECTS = Array.from({ length: 35 }, (_, i) => {
  const districts = ['Raipur', 'Bilaspur', 'Durg', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon', 'Ambikapur', 'Dhamtari', 'Mahasamund'];
  const constituencies = ['Raipur City South', 'Raipur City North', 'Bilaspur', 'Durg City', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon', 'Ambikapur', 'Dhamtari'];
  const blocks = ['Raipur South Block', 'Raipur North Block', 'Bilaspur Block', 'Durg Block', 'Raigarh Block', 'Jagdalpur Block', 'Korba Block', 'Rajnandgaon Block'];
  const villages = ['Rajnagar', 'Kesla', 'Patan', 'Tilda', 'Simga', 'Kurud', 'Risali', 'Bhatapara', 'Pallari', 'Khairagarh'];
  
  const statuses = ['Draft', 'Approved', 'In Progress', 'Completed', 'Closed', 'Delayed'];
  const fundSources = ['Government Fund', 'Personal Fund', 'Mixed'];
  const developmentTypes = DEVELOPMENT_TYPES;
  const reps = ['Ram Vichar Netam', 'Vishnu Deo Sai', 'Brijmohan Agrawal', 'Neeraj Singh'];
  
  const target = 500 + Math.floor(Math.random() * 1500);
  const completed = Math.floor(Math.random() * target);
  const progress = Math.round((completed / target) * 100);
  
  const isDelayed = [3, 7, 12, 18, 24, 30].includes(i % 31);
  const status = isDelayed ? 'Delayed' : statuses[i % statuses.length];
  
  return {
    id: `DEV${String(100 + i).padStart(3, '0')}`,
    name: `${developmentTypes[i % developmentTypes.length]} Project - ${districts[i % districts.length]}`,
    type: developmentTypes[i % developmentTypes.length],
    description: `Development of ${developmentTypes[i % developmentTypes.length].toLowerCase()} in ${villages[i % villages.length]} village, ${districts[i % districts.length]} district.`,
    district: districts[i % districts.length],
    constituency: constituencies[i % constituencies.length],
    block: blocks[i % blocks.length],
    panchayat: ['Gram Panchayat Rajnagar', 'Gram Panchayat Kesla', 'Gram Panchayat Patan', 'Gram Panchayat Tilda'][i % 4],
    village: villages[i % villages.length],
    pollingBooth: `Booth ${100 + (i % 10)}`,
    status: status,
    progress: isDelayed ? Math.floor(Math.random() * 30) : progress,
    target: target,
    completed: isDelayed ? Math.floor(Math.random() * 150) : completed,
    budget: (i + 1) * 2500000 + Math.floor(Math.random() * 5000000),
    allocated: (i + 1) * 1500000 + Math.floor(Math.random() * 3000000),
    fundSource: fundSources[i % fundSources.length],
    governmentFund: (i + 1) * 1000000 + Math.floor(Math.random() * 2000000),
    personalFund: Math.floor(Math.random() * 500000),
    startDate: isDelayed ? `2023-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}` : `2024-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}`,
    expectedCompletion: isDelayed ? `2024-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}` : `2025-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}`,
    createdBy: reps[i % reps.length],
    createdDate: `2024-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}`,
    images: [`https://images.unsplash.com/photo-${150000000 + i * 1000}?w=600&h=400&fit=crop`],
    delayedReason: isDelayed ? ['Weather conditions', 'Land acquisition issues', 'Labor shortage', 'Material supply delay', 'Budget constraints', 'Legal issues'][i % 6] : undefined,
    milestones: [
      { name: 'Survey Completed', completed: i % 3 !== 0, date: `2024-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}` },
      { name: 'Foundation Laid', completed: i % 2 !== 0, date: `2024-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}` },
      { name: 'Construction Started', completed: i % 2 === 0, date: `2024-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}` },
      { name: 'Final Inspection', completed: false, date: `2025-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}` }
    ]
  };
});

// ============ COMPLAINTS ============
export const COMPLAINTS = Array.from({ length: 80 }, (_, i) => {
  const statuses = ['Open', 'In Progress', 'Resolved', 'Closed'];
  const priorities = ['Critical', 'High', 'Medium', 'Low'];
  const titles = ['Road Damage', 'Street Light Issue', 'Water Supply', 'Waste Management', 'Drainage', 'Park Maintenance', 'School Building', 'Hospital Facility', 'Electricity', 'Bridge Construction', 'Bus Service', 'Market Complex'];
  const districts = ['Raipur', 'Bilaspur', 'Durg', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon', 'Ambikapur'];
  const constituencies = ['Raipur City South', 'Raipur City North', 'Bilaspur', 'Durg City', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon'];
  
  return {
    id: `CMP${String(200 + i).padStart(4, '0')}`,
    title: titles[i % titles.length],
    category: ['Infrastructure', 'Utilities', 'Sanitation', 'Environment', 'Public Works', 'Education', 'Health', 'Energy', 'Transport'][i % 9],
    status: statuses[i % statuses.length],
    priority: priorities[i % priorities.length],
    date: `2024-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}`,
    submittedBy: ['Ravi', 'Anita', 'Suresh', 'Jyoti', 'Prakash', 'Deepak', 'Sunita', 'Ramesh', 'Kavita', 'Sanjay'][i % 10],
    location: ['Sector 12', 'Old City', 'Industrial Area', 'Residential Zone', 'Market', 'Village', 'Township'][i % 7],
    progress: Math.floor(Math.random() * 100),
    district: districts[i % districts.length],
    constituency: constituencies[i % constituencies.length],
    block: ['Raipur South Block', 'Raipur North Block', 'Bilaspur Block', 'Durg Block'][i % 4],
    village: ['Rajnagar', 'Kesla', 'Patan', 'Tilda', 'Simga'][i % 5],
    voterId: `CG/RAI/${String(100000 + i).padStart(6, '0')}`,
    assignedTo: ['Amit Surveyor', 'Rajesh Auditor', 'Pending'][i % 3]
  };
});

// ============ MEETINGS ============
export const MEETINGS = Array.from({ length: 40 }, (_, i) => {
  const purposes = ['Development Discussion', 'Infrastructure Review', 'Health Planning', 'Education Meeting', 'Employment Strategy', 'Water Management', 'Road Construction', 'Housing Scheme', 'Sanitation Drive', 'Agriculture Planning'];
  const statuses = ['Pending', 'Scheduled', 'Completed', 'Rescheduled', 'Cancelled'];
  const districts = ['Raipur', 'Bilaspur', 'Durg', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon', 'Ambikapur'];
  const constituencies = ['Raipur City South', 'Raipur City North', 'Bilaspur', 'Durg City', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon'];
  
  return {
    id: `MTG${String(400 + i).padStart(4, '0')}`,
    citizenName: ['Amit', 'Suman', 'Rajesh', 'Pooja', 'Kiran', 'Manoj', 'Deepa', 'Ritu', 'Sanjay', 'Neelam'][i % 10],
    purpose: purposes[i % purposes.length],
    dateRequested: `2024-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}`,
    scheduledDate: `2024-${String(1 + (i % 12)).padStart(2, '0')}-${String(15 + (i % 13)).padStart(2, '0')}`,
    status: statuses[i % statuses.length],
    priority: ['High', 'Medium', 'Low', 'Urgent'][i % 4],
    location: districts[i % districts.length],
    district: districts[i % districts.length],
    constituency: constituencies[i % constituencies.length],
    block: ['Raipur South Block', 'Raipur North Block', 'Bilaspur Block', 'Durg Block'][i % 4],
    voterId: `CG/RAI/${String(100000 + i).padStart(6, '0')}`,
    agenda: ['Infrastructure Discussion', 'Budget Allocation', 'Project Review', 'Citizen Grievances'][i % 4]
  };
});

// ============ SCHEMES (Yojnas) ============
export const SCHEMES = [
  {
    id: 'sch1',
    name: 'PM Kisan Samman Nidhi',
    category: 'Agriculture',
    department: 'Agriculture',
    status: 'Active',
    launchDate: '2019-02-01',
    beneficiaries: 200000,
    targetBeneficiaries: 250000,
    budget: 450000000,
    allocated: 380000000,
    progress: 85,
    description: 'Direct income support of Rs. 6000 per year to farmers.',
    district: 'All Districts',
    party: 'BJP',
    image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=600&h=400&fit=crop'
  },
  {
    id: 'sch2',
    name: 'Godhan Nyay Yojana',
    category: 'Agriculture',
    department: 'Agriculture',
    status: 'Active',
    launchDate: '2023-01-26',
    beneficiaries: 45000,
    targetBeneficiaries: 60000,
    budget: 120000000,
    allocated: 110400000,
    progress: 92,
    description: 'Cow dung procurement and vermi-compost production for organic farming.',
    district: 'All Districts',
    party: 'BJP',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop'
  },
  {
    id: 'sch3',
    name: 'Mukhyamantri Vriksha Sampada Yojana',
    category: 'Environment',
    department: 'Forest',
    status: 'Active',
    launchDate: '2023-08-15',
    beneficiaries: 25000,
    targetBeneficiaries: 40000,
    budget: 250000000,
    allocated: 162500000,
    progress: 65,
    description: 'Massive afforestation drive to increase green cover.',
    district: 'All Districts',
    party: 'BJP',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop'
  },
  {
    id: 'sch4',
    name: 'Jal Jeevan Mission',
    category: 'Water',
    department: 'PHE',
    status: 'Active',
    launchDate: '2020-08-15',
    beneficiaries: 280000,
    targetBeneficiaries: 350000,
    budget: 520000000,
    allocated: 364000000,
    progress: 70,
    description: 'Ensuring safe drinking water to every rural household.',
    district: 'All Districts',
    party: 'BJP',
    image: 'https://images.unsplash.com/photo-1542142700-f1bb426403d4?w=600&h=400&fit=crop'
  },
  {
    id: 'sch5',
    name: 'Ayushman Bharat',
    category: 'Health',
    department: 'Health',
    status: 'Active',
    launchDate: '2018-09-23',
    beneficiaries: 500000,
    targetBeneficiaries: 600000,
    budget: 295000000,
    allocated: 236000000,
    progress: 80,
    description: 'Cashless health insurance up to Rs. 5 lakh per family.',
    district: 'All Districts',
    party: 'BJP',
    image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=600&h=400&fit=crop'
  },
  {
    id: 'sch6',
    name: 'Har Ghar Jal Yojana',
    category: 'Water',
    department: 'PHE',
    status: 'Active',
    launchDate: '2024-01-01',
    beneficiaries: 15000,
    targetBeneficiaries: 25000,
    budget: 85000000,
    allocated: 51000000,
    progress: 60,
    description: 'Tap water connection to every household in rural areas.',
    district: 'Raipur, Bilaspur, Durg',
    party: 'BJP',
    image: 'https://images.unsplash.com/photo-1564135624576-c5c88640f235?w=600&h=400&fit=crop'
  },
  {
    id: 'sch7',
    name: 'Smart City Mission',
    category: 'Urban Development',
    department: 'Urban Administration',
    status: 'Active',
    launchDate: '2023-02-15',
    beneficiaries: 120000,
    targetBeneficiaries: 150000,
    budget: 680000000,
    allocated: 489600000,
    progress: 72,
    description: 'Smart infrastructure in urban areas.',
    district: 'Raipur',
    party: 'BJP',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=400&fit=crop'
  },
  {
    id: 'sch8',
    name: 'PM Awas Yojana',
    category: 'Housing',
    department: 'Housing',
    status: 'Active',
    launchDate: '2015-06-25',
    beneficiaries: 85000,
    targetBeneficiaries: 100000,
    budget: 350000000,
    allocated: 297500000,
    progress: 85,
    description: 'Housing for all by 2024.',
    district: 'All Districts',
    party: 'BJP',
    image: 'https://images.unsplash.com/photo-1576941089069-8d2d71702df5?w=600&h=400&fit=crop'
  }
];

// ============ FUNDING ============
export const FUNDING = Array.from({ length: 35 }, (_, i) => {
  const districts = ['Raipur', 'Bilaspur', 'Durg', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon', 'Ambikapur'];
  const constituencies = ['Raipur City South', 'Raipur City North', 'Bilaspur', 'Durg City', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon'];
  const projects = ['Har Ghar Jal', 'Road Construction', 'School Building', 'Hospital', 'Drainage', 'Electricity', 'Street Lights', 'Community Center'];
  const sources = ['Government Fund', 'Personal Fund', 'Mixed'];
  
  return {
    id: `FUND${String(500 + i).padStart(4, '0')}`,
    projectName: `${projects[i % projects.length]} - ${districts[i % districts.length]}`,
    fundSource: sources[i % sources.length],
    governmentAmount: (i + 1) * 1000000 + Math.floor(Math.random() * 2000000),
    personalAmount: Math.floor(Math.random() * 500000),
    totalAmount: (i + 1) * 1500000 + Math.floor(Math.random() * 3000000),
    allocated: (i + 1) * 1000000 + Math.floor(Math.random() * 2000000),
    utilized: (i + 1) * 600000 + Math.floor(Math.random() * 1500000),
    utilization: Math.floor(40 + Math.random() * 55),
    district: districts[i % districts.length],
    constituency: constituencies[i % constituencies.length],
    block: ['Raipur South Block', 'Raipur North Block', 'Bilaspur Block', 'Durg Block'][i % 4],
    status: ['Active', 'Completed', 'Under Review', 'Approved'][i % 4],
    createdBy: i % 3 === 0 ? 'Ram Vichar Netam' : 'Vishnu Deo Sai',
    date: `2024-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}`,
    voterContributions: Array.from({ length: 5 + (i % 5) }, (_, j) => ({
      voterId: `CG/RAI/${String(100000 + j).padStart(6, '0')}`,
      name: `Voter ${j + 1}`,
      amount: Math.floor(100 + Math.random() * 2000),
      date: `2024-${String(1 + (j % 12)).padStart(2, '0')}-${String(1 + (j % 28)).padStart(2, '0')}`
    }))
  };
});

// ============ REGISTRATIONS ============
export const REGISTRATIONS = Array.from({ length: 50 }, (_, i) => {
  const firstNames = ['Anjali', 'Ramesh', 'Sunita', 'Rajesh', 'Priyanka', 'Vijay', 'Sanjana', 'Deepak', 'Neha', 'Amit', 'Pooja', 'Kiran', 'Manoj', 'Jyoti', 'Sanjay'];
  const lastNames = ['Kumari', 'Singh', 'Patel', 'Verma', 'Sharma', 'Yadav', 'Gupta', 'Joshi', 'Malik', 'Reddy'];
  const statuses = ['Pending', 'Approved', 'Rejected'];
  const districts = ['Raipur', 'Bilaspur', 'Durg', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon', 'Ambikapur'];
  const constituencies = ['Raipur City South', 'Raipur City North', 'Bilaspur', 'Durg City', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon'];
  
  return {
    id: `REG${String(900 + i).padStart(4, '0')}`,
    name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
    mobile: `97${String(50000000 + i).slice(0, 8)}`,
    email: `user${i}@gmail.com`,
    address: ['Sector 12', 'Old City', 'Industrial Area', 'Residential Zone', 'Market', 'Village'][i % 6],
    registrationDate: `2024-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}`,
    status: statuses[i % statuses.length],
    wantsVolunteer: i % 5 === 0 || i % 7 === 0,
    district: districts[i % districts.length],
    constituency: constituencies[i % constituencies.length],
    block: ['Raipur South Block', 'Raipur North Block', 'Bilaspur Block', 'Durg Block'][i % 4],
    age: 22 + (i % 45),
    gender: ['Male', 'Female', 'Other'][i % 3],
    occupation: ['Student', 'Farmer', 'Teacher', 'Business', 'Professional', 'Healthcare', 'Engineer', 'Govt Service'][i % 8],
    voterId: `CG/${districts[i % districts.length].substring(0,3).toUpperCase()}/${String(100000 + i).padStart(6, '0')}`
  };
});

// ============ VOLUNTEERS ============
export const VOLUNTEERS = Array.from({ length: 45 }, (_, i) => {
  const firstNames = ['Ravi', 'Sneha', 'Vikram', 'Ananya', 'Rahul', 'Pooja', 'Kiran', 'Deepak', 'Meera', 'Suresh'];
  const lastNames = ['Sharma', 'Patel', 'Verma', 'Reddy', 'Singh', 'Kumar', 'Yadav', 'Joshi'];
  const skills = ['Community Work', 'Teaching', 'Health Worker', 'Agricultural Expert', 'IT Professional', 'Social Worker'];
  const statuses = ['Pending', 'Active', 'Inactive'];
  const districts = ['Raipur', 'Bilaspur', 'Durg', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon', 'Ambikapur'];
  const constituencies = ['Raipur City South', 'Raipur City North', 'Bilaspur', 'Durg City', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon'];
  
  return {
    id: `VOL${String(300 + i).padStart(4, '0')}`,
    name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
    mobile: `99${String(60000000 + i).slice(0, 8)}`,
    email: `volunteer${i}@gmail.com`,
    joinDate: `2024-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}`,
    status: statuses[i % statuses.length],
    area: districts[i % districts.length],
    constituency: constituencies[i % constituencies.length],
    block: ['Raipur South Block', 'Raipur North Block', 'Bilaspur Block', 'Durg Block'][i % 4],
    tasksAssigned: Math.floor(Math.random() * 6) + 1,
    skills: skills[i % skills.length],
    voterId: `CG/${districts[i % districts.length].substring(0,3).toUpperCase()}/${String(100000 + i).padStart(6, '0')}`,
    registrationId: `REG${String(900 + i).padStart(4, '0')}`
  };
});

// ============ NEWS ============
export const NEWS = [
  {
    id: 'news1',
    title: 'CM Vishnu Deo Sai Inaugurates 100-Bed Hospital in Raipur',
    category: 'Health',
    publishDate: '2024-06-15',
    source: 'PTI',
    importance: 'High',
    image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=600&h=400&fit=crop',
    summary: 'Chief Minister Vishnu Deo Sai inaugurated a state-of-the-art 100-bed hospital in Raipur, providing advanced healthcare facilities to citizens.',
    district: 'Raipur'
  },
  {
    id: 'news2',
    title: 'Chhattisgarh Records 45% Increase in Forest Cover',
    category: 'Environment',
    publishDate: '2024-06-12',
    source: 'Times of India',
    importance: 'High',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop',
    summary: 'Under the Mukhyamantri Vriksha Sampada Yojana, Chhattisgarh has recorded a significant 45% increase in forest cover over the past year.',
    district: 'Surguja'
  },
  {
    id: 'news3',
    title: 'Godhan Nyay Yojana Benefits 45,000 Farmers',
    category: 'Agriculture',
    publishDate: '2024-06-10',
    source: 'The Hindu',
    importance: 'High',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop',
    summary: 'The innovative Godhan Nyay Yojana has benefited 45,000 farmers in Chhattisgarh, promoting organic farming and rural livelihoods.',
    district: 'Balod'
  },
  {
    id: 'news4',
    title: 'Nava Raipur to Get India\'s First AI-Driven Traffic System',
    category: 'Technology',
    publishDate: '2024-06-08',
    source: 'NDTV',
    importance: 'High',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=400&fit=crop',
    summary: 'Nava Raipur is set to become India\'s first city with an AI-driven intelligent traffic management system, reducing congestion by 40%.',
    district: 'Raipur'
  }
];

// ============ NOTIFICATIONS ============
export const NOTIFICATIONS = Array.from({ length: 50 }, (_, i) => {
  const titles = ['New Complaint Registered', 'Meeting Scheduled', 'Scheme Progress Update', 'Fund Allocation Approved', 'Project Milestone Achieved', 'News Published', 'Volunteer Registration', 'Jan Sabha Announced', 'Policy Change', 'Infrastructure Update'];
  const types = ['Info', 'Success', 'Warning', 'Alert'];
  const districts = ['Raipur', 'Bilaspur', 'Durg', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon', 'Ambikapur'];
  const constituencies = ['Raipur City South', 'Raipur City North', 'Bilaspur', 'Durg City', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon'];
  
  return {
    id: `NOTIF${String(700 + i).padStart(4, '0')}`,
    title: titles[i % titles.length],
    message: `This is a notification about development activity in ${districts[i % districts.length]} district.`,
    type: types[i % types.length],
    date: `2024-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}`,
    read: i % 4 === 0 ? false : true,
    district: districts[i % districts.length],
    constituency: constituencies[i % constituencies.length]
  };
});

// ============ JANSABHA (Public Meetings) ============
export const JANSABHA = [
  {
    id: 'js1',
    title: 'BJP Development Council Meeting',
    date: '2024-08-15',
    time: '10:00 AM',
    venue: 'BJP Bhawan, Raipur',
    purpose: 'Review of development projects under BJP government',
    status: 'Upcoming',
    district: 'Raipur',
    constituency: 'Raipur City South',
    block: 'Raipur South Block',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=400&fit=crop',
    agenda: [
      { 
        id: 'a1', 
        title: 'Rally Participation', 
        details: 'Massive rally for awareness about BJP government schemes. Expected participation: 1000+ party workers. Route: BJP Bhawan to City Center.',
        duration: '2 hours',
        responsible: 'Party Organization'
      },
      { 
        id: 'a2', 
        title: 'Manifesto Generation for 2028 Elections', 
        details: 'Collaborative development of BJP manifesto with citizen inputs. Focus areas: Infrastructure, Health, Education, Employment, Agriculture.',
        duration: '1.5 hours',
        responsible: 'Manifesto Committee'
      },
      { 
        id: 'a3', 
        title: 'Bridge Inauguration in Rajnagar', 
        details: 'Inauguration of newly constructed bridge connecting Rajnagar to industrial area. Rs. 2.5 crore project under BJP government.',
        duration: '1 hour',
        responsible: 'PWD Department'
      },
      { 
        id: 'a4', 
        title: 'Budget Allocation Discussion', 
        details: 'Review and approve budget allocation for upcoming development projects. Focus on BJP priority areas: Infrastructure, Agriculture, Healthcare.',
        duration: '2 hours',
        responsible: 'Finance Department'
      }
    ]
  },
  {
    id: 'js2',
    title: 'Agriculture Development Meet',
    date: '2024-08-25',
    time: '11:00 AM',
    venue: 'Krishi Bhavan, Raipur',
    purpose: 'Discuss agricultural development and farmer welfare schemes',
    status: 'Upcoming',
    district: 'Raipur',
    constituency: 'Raipur City South',
    block: 'Raipur South Block',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=400&fit=crop',
    agenda: [
      { 
        id: 'b1', 
        title: 'Farmer Welfare Schemes Review', 
        details: 'Review of BJP government farmer schemes - PM Kisan, Godhan Nyay Yojana, and new agricultural initiatives.',
        duration: '1.5 hours',
        responsible: 'Agriculture Department'
      },
      { 
        id: 'b2', 
        title: 'Organic Farming Promotion', 
        details: 'Strategy to promote organic farming through Godhan Nyay Yojana and vermi-compost units.',
        duration: '1 hour',
        responsible: 'Agriculture Department'
      }
    ]
  }
];

// ============ SURVEY REPORTS ============
export const SURVEY_REPORTS = Array.from({ length: 40 }, (_, i) => {
  const districts = ['Raipur', 'Bilaspur', 'Durg', 'Raigarh', 'Jagdalpur', 'Korba'];
  const projectIds = DEVELOPMENT_PROJECTS.map(p => p.id);
  const surveyors = ['Amit Surveyor', 'Ravi Surveyor', 'Sneha Surveyor'];
  
  return {
    id: `SRV${String(600 + i).padStart(4, '0')}`,
    projectId: projectIds[i % projectIds.length],
    projectName: DEVELOPMENT_PROJECTS[i % DEVELOPMENT_PROJECTS.length].name,
    surveyor: surveyors[i % surveyors.length],
    visitDate: `2024-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}`,
    completion: Math.floor(20 + Math.random() * 80),
    remarks: ['Progress is good', 'Need more resources', 'On track', 'Delayed due to weather', 'Quality is excellent'][i % 5],
    images: [
      `https://images.unsplash.com/photo-${150000000 + i * 1000}?w=600&h=400&fit=crop`
    ],
    district: districts[i % districts.length],
    status: ['Pending Review', 'Approved', 'Rejected'][i % 3]
  };
});

// ============ AUDIT REPORTS ============
export const AUDIT_REPORTS = Array.from({ length: 30 }, (_, i) => {
  const districts = ['Raipur', 'Bilaspur', 'Durg', 'Raigarh', 'Jagdalpur', 'Korba'];
  const projectIds = DEVELOPMENT_PROJECTS.map(p => p.id);
  const auditors = ['Rajesh Auditor', 'Priya Auditor', 'Manoj Auditor'];
  
  return {
    id: `AUD${String(800 + i).padStart(4, '0')}`,
    projectId: projectIds[i % projectIds.length],
    projectName: DEVELOPMENT_PROJECTS[i % DEVELOPMENT_PROJECTS.length].name,
    auditor: auditors[i % auditors.length],
    auditDate: `2024-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}`,
    findings: ['All work completed as per specification', 'Minor issues found', 'Quality standards met', 'Work in progress'][i % 4],
    recommendations: ['Continue as planned', 'Rectify minor issues', 'Speed up progress'][i % 3],
    status: ['Pending', 'Verified', 'Rejected', 'Approved'][i % 4],
    district: districts[i % districts.length],
    images: [
      `https://images.unsplash.com/photo-${150000000 + i * 2000}?w=600&h=400&fit=crop`
    ]
  };
});

// ============ HIERARCHY HELPER FUNCTIONS ============

// Get all states
export const getStates = () => {
  return ['Chhattisgarh', 'Madhya Pradesh', 'Maharashtra', 'Uttar Pradesh'];
};

// Get districts for a state
export const getDistricts = (state) => {
  const stateDistricts = {
    'Chhattisgarh': ['Raipur', 'Bilaspur', 'Durg', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon', 'Ambikapur', 'Dhamtari', 'Mahasamund'],
    'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Rewa', 'Satna', 'Katni', 'Chhindwara'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Solapur', 'Amravati', 'Kolhapur', 'Sangli'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Prayagraj', 'Ghaziabad', 'Noida', 'Meerut', 'Aligarh', 'Bareilly']
  };
  if (!state) return [];
  return stateDistricts[state] || [];
};

// Get assembly constituencies for a state and district
export const getAssemblyConstituencies = (state, district) => {
  const assemblyMap = {
    'Chhattisgarh': {
      'Raipur': ['Raipur City South', 'Raipur City North'],
      'Bilaspur': ['Bilaspur City', 'Bilaspur Rural'],
      'Durg': ['Durg City', 'Durg Gramin'],
      'Raigarh': ['Raigarh City', 'Raigarh Rural'],
      'Jagdalpur': ['Jagdalpur City', 'Jagdalpur Rural'],
      'Korba': ['Korba City', 'Korba Rural'],
      'Rajnandgaon': ['Rajnandgaon City', 'Rajnandgaon Rural'],
      'Ambikapur': ['Ambikapur City', 'Ambikapur Rural'],
      'Dhamtari': ['Dhamtari City', 'Dhamtari Rural'],
      'Mahasamund': ['Mahasamund City', 'Mahasamund Rural']
    },
    'Madhya Pradesh': {
      'Bhopal': ['Bhopal North', 'Bhopal South'],
      'Indore': ['Indore City', 'Indore Rural'],
      'Jabalpur': ['Jabalpur West', 'Jabalpur East'],
      'Gwalior': ['Gwalior East', 'Gwalior West'],
      'Ujjain': ['Ujjain North', 'Ujjain South'],
      'Sagar': ['Sagar City', 'Sagar Rural'],
      'Rewa': ['Rewa East', 'Rewa West'],
      'Satna': ['Satna North', 'Satna South'],
      'Katni': ['Katni City', 'Katni Rural'],
      'Chhindwara': ['Chhindwara City', 'Chhindwara Rural']
    },
    'Maharashtra': {
      'Mumbai': ['Mumbai South', 'Mumbai North', 'Mumbai East', 'Mumbai West'],
      'Pune': ['Pune City', 'Pune Rural', 'Pune East', 'Pune West'],
      'Nagpur': ['Nagpur West', 'Nagpur East', 'Nagpur North', 'Nagpur South'],
      'Thane': ['Thane City', 'Thane Rural'],
      'Nashik': ['Nashik Central', 'Nashik East'],
      'Aurangabad': ['Aurangabad North', 'Aurangabad South'],
      'Solapur': ['Solapur City', 'Solapur Rural'],
      'Amravati': ['Amravati City', 'Amravati Rural'],
      'Kolhapur': ['Kolhapur City', 'Kolhapur Rural'],
      'Sangli': ['Sangli City', 'Sangli Rural']
    },
    'Uttar Pradesh': {
      'Lucknow': ['Lucknow Central', 'Lucknow North', 'Lucknow South', 'Lucknow East'],
      'Kanpur': ['Kanpur North', 'Kanpur South', 'Kanpur East', 'Kanpur West'],
      'Varanasi': ['Varanasi East', 'Varanasi West', 'Varanasi North', 'Varanasi South'],
      'Agra': ['Agra West', 'Agra East', 'Agra North'],
      'Prayagraj': ['Prayagraj South', 'Prayagraj North'],
      'Ghaziabad': ['Ghaziabad City', 'Ghaziabad Rural'],
      'Noida': ['Noida East', 'Noida West'],
      'Meerut': ['Meerut West', 'Meerut East'],
      'Aligarh': ['Aligarh North', 'Aligarh South'],
      'Bareilly': ['Bareilly City', 'Bareilly Rural']
    }
  };
  
  if (!state || !district) return [];
  return assemblyMap[state]?.[district] || ['Assembly 1', 'Assembly 2'];
};

// Get blocks for a state, district, and assembly constituency
export const getBlocks = (state, district, assembly) => {
  const blockMap = {
    'Chhattisgarh': {
      'Raipur': {
        'Raipur City South': ['Raipur South Block 1', 'Raipur South Block 2'],
        'Raipur City North': ['Raipur North Block 1', 'Raipur North Block 2']
      },
      'Bilaspur': {
        'Bilaspur City': ['Bilaspur Block 1', 'Bilaspur Block 2'],
        'Bilaspur Rural': ['Bilaspur Rural Block 1', 'Bilaspur Rural Block 2']
      },
      'Durg': {
        'Durg City': ['Durg Block 1', 'Durg Block 2'],
        'Durg Gramin': ['Durg Gramin Block 1', 'Durg Gramin Block 2']
      }
    },
    'Madhya Pradesh': {
      'Bhopal': {
        'Bhopal North': ['Bhopal North Block 1', 'Bhopal North Block 2'],
        'Bhopal South': ['Bhopal South Block 1', 'Bhopal South Block 2']
      },
      'Indore': {
        'Indore City': ['Indore City Block 1', 'Indore City Block 2'],
        'Indore Rural': ['Indore Rural Block 1', 'Indore Rural Block 2']
      }
    },
    'Maharashtra': {
      'Mumbai': {
        'Mumbai South': ['Mumbai South Block 1', 'Mumbai South Block 2'],
        'Mumbai North': ['Mumbai North Block 1', 'Mumbai North Block 2']
      },
      'Pune': {
        'Pune City': ['Pune City Block 1', 'Pune City Block 2'],
        'Pune Rural': ['Pune Rural Block 1', 'Pune Rural Block 2']
      }
    },
    'Uttar Pradesh': {
      'Lucknow': {
        'Lucknow Central': ['Lucknow Central Block 1', 'Lucknow Central Block 2'],
        'Lucknow North': ['Lucknow North Block 1', 'Lucknow North Block 2']
      },
      'Kanpur': {
        'Kanpur North': ['Kanpur North Block 1', 'Kanpur North Block 2'],
        'Kanpur South': ['Kanpur South Block 1', 'Kanpur South Block 2']
      }
    }
  };
  
  if (!state || !district || !assembly) return [];
  return blockMap[state]?.[district]?.[assembly] || ['Default Block 1', 'Default Block 2'];
};

// Get panchayats for a state, district, assembly, and block
export const getPanchayats = (state, district, assembly, block) => {
  const panchayatMap = {
    'Raipur South Block 1': ['Gram Panchayat Rajnagar', 'Gram Panchayat Kesla'],
    'Raipur South Block 2': ['Gram Panchayat Patan', 'Gram Panchayat Tilda'],
    'Raipur North Block 1': ['Gram Panchayat Simga', 'Gram Panchayat Kurud'],
    'Raipur North Block 2': ['Gram Panchayat Risali', 'Gram Panchayat Bhatapara'],
    'Bilaspur Block 1': ['Gram Panchayat Bilaspur', 'Gram Panchayat Ratanpur'],
    'Bilaspur Block 2': ['Gram Panchayat Kota', 'Gram Panchayat Lormi'],
    'Durg Block 1': ['Gram Panchayat Durg', 'Gram Panchayat Bhilai'],
    'Durg Block 2': ['Gram Panchayat Risali', 'Gram Panchayat Durg Gramin']
  };
  
  if (!block) return [];
  return panchayatMap[block] || ['Gram Panchayat Default 1', 'Gram Panchayat Default 2'];
};

// Get polling booths for a state, district, assembly, block, and panchayat
export const getPollingBooths = (state, district, assembly, block, panchayat) => {
  const boothMap = {
    'Gram Panchayat Rajnagar': ['Booth 101', 'Booth 102', 'Booth 103'],
    'Gram Panchayat Kesla': ['Booth 104', 'Booth 105', 'Booth 106'],
    'Gram Panchayat Patan': ['Booth 107', 'Booth 108'],
    'Gram Panchayat Tilda': ['Booth 109', 'Booth 110'],
    'Gram Panchayat Simga': ['Booth 111', 'Booth 112'],
    'Gram Panchayat Kurud': ['Booth 113', 'Booth 114'],
    'Gram Panchayat Risali': ['Booth 115', 'Booth 116'],
    'Gram Panchayat Bhatapara': ['Booth 117', 'Booth 118'],
    'Gram Panchayat Bilaspur': ['Booth 201', 'Booth 202'],
    'Gram Panchayat Ratanpur': ['Booth 203', 'Booth 204'],
    'Gram Panchayat Kota': ['Booth 205', 'Booth 206'],
    'Gram Panchayat Lormi': ['Booth 207', 'Booth 208']
  };
  
  if (!panchayat) return [];
  return boothMap[panchayat] || ['Booth 101', 'Booth 102'];
};

// Get villages for a state, district, assembly, block, panchayat, and booth
export const getVillages = (state, district, assembly, block, panchayat, booth) => {
  const villageMap = {
    'Booth 101': ['Rajnagar', 'Kesla'],
    'Booth 102': ['Patan', 'Tilda'],
    'Booth 103': ['Simga', 'Kurud'],
    'Booth 104': ['Risali', 'Bhatapara'],
    'Booth 105': ['Pallari', 'Khairagarh'],
    'Booth 106': ['Dongargarh', 'Manpur'],
    'Booth 107': ['Barwahi', 'Pendra'],
    'Booth 108': ['Kota', 'Lormi'],
    'Booth 201': ['Bilaspur City', 'Ratanpur'],
    'Booth 202': ['Kota', 'Mungeli'],
    'Booth 203': ['Janjgir', 'Champa'],
    'Booth 204': ['Sakti', 'Akaltara']
  };
  
  if (!booth) return [];
  return villageMap[booth] || ['Village 1', 'Village 2'];
};

// ============ DASHBOARD STATS ============
export const getDashboardStats = () => {
  const totalVoters = VOTERS.length;
  const activeVoters = VOTERS.filter(v => v.status === 'Active').length;
  const totalComplaints = COMPLAINTS.length;
  const openComplaints = COMPLAINTS.filter(c => c.status === 'Open').length;
  const resolvedComplaints = COMPLAINTS.filter(c => c.status === 'Resolved' || c.status === 'Closed').length;
  const totalProjects = DEVELOPMENT_PROJECTS.length;
  const activeProjects = DEVELOPMENT_PROJECTS.filter(p => p.status === 'Active' || p.status === 'In Progress').length;
  const completedProjects = DEVELOPMENT_PROJECTS.filter(p => p.status === 'Completed').length;
  const totalSchemes = SCHEMES.length;
  const activeSchemes = SCHEMES.filter(s => s.status === 'Active').length;
  const totalBeneficiaries = SCHEMES.reduce((sum, s) => sum + s.beneficiaries, 0);
  const totalMeetings = MEETINGS.length;
  const pendingMeetings = MEETINGS.filter(m => m.status === 'Pending').length;
  const totalFunding = FUNDING.reduce((sum, f) => sum + f.totalAmount, 0);
  const totalUtilized = FUNDING.reduce((sum, f) => sum + f.utilized, 0);
  const totalRegistrations = REGISTRATIONS.length;
  const pendingRegistrations = REGISTRATIONS.filter(r => r.status === 'Pending').length;
  const totalVolunteers = VOLUNTEERS.length;
  const pendingVolunteers = VOLUNTEERS.filter(v => v.status === 'Pending').length;
  const totalSurveys = SURVEY_REPORTS.length;
  const totalAudits = AUDIT_REPORTS.length;
  const delayedProjects = DEVELOPMENT_PROJECTS.filter(p => p.status === 'Delayed' || (p.status === 'In Progress' && p.progress < 30)).length;
  
  return {
    totalVoters,
    activeVoters,
    totalComplaints,
    openComplaints,
    resolvedComplaints,
    totalProjects,
    activeProjects,
    completedProjects,
    totalSchemes,
    activeSchemes,
    totalBeneficiaries,
    totalMeetings,
    pendingMeetings,
    totalFunding,
    totalUtilized,
    totalRegistrations,
    pendingRegistrations,
    totalVolunteers,
    pendingVolunteers,
    totalSurveys,
    totalAudits,
    delayedProjects
  };
};
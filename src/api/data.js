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
                },
                {
                  name: 'Raipur City North',
                  blocks: [
                    {
                      name: 'Raipur North Block',
                      panchayats: [
                        {
                          name: 'Gram Panchayat Simga',
                          pollingBooths: [
                            { name: 'Booth 103', code: '103' },
                            { name: 'Booth 104', code: '104' }
                          ],
                          villages: ['Simga', 'Kurud', 'Risali']
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
                },
                {
                  name: 'Bilaspur Rural',
                  blocks: [
                    {
                      name: 'Bilaspur Rural Block',
                      panchayats: [
                        {
                          name: 'Gram Panchayat Lormi',
                          pollingBooths: [
                            { name: 'Booth 203', code: '203' },
                            { name: 'Booth 204', code: '204' }
                          ],
                          villages: ['Lormi', 'Mungeli', 'Janjgir']
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
                },
                {
                  name: 'Durg Gramin',
                  blocks: [
                    {
                      name: 'Durg Gramin Block',
                      panchayats: [
                        {
                          name: 'Gram Panchayat Dongargarh',
                          pollingBooths: [
                            { name: 'Booth 303', code: '303' },
                            { name: 'Booth 304', code: '304' }
                          ],
                          villages: ['Dongargarh', 'Manpur', 'Barwahi']
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
          name: 'Raigarh',
          parliamentConstituencies: [
            {
              name: 'Raigarh',
              assemblyConstituencies: [
                {
                  name: 'Raigarh City',
                  blocks: [
                    {
                      name: 'Raigarh Block',
                      panchayats: [
                        {
                          name: 'Gram Panchayat Raigarh',
                          pollingBooths: [
                            { name: 'Booth 401', code: '401' },
                            { name: 'Booth 402', code: '402' }
                          ],
                          villages: ['Raigarh City', 'Sakti', 'Akaltara']
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
          name: 'Jagdalpur',
          parliamentConstituencies: [
            {
              name: 'Bastar',
              assemblyConstituencies: [
                {
                  name: 'Jagdalpur City',
                  blocks: [
                    {
                      name: 'Jagdalpur Block',
                      panchayats: [
                        {
                          name: 'Gram Panchayat Jagdalpur',
                          pollingBooths: [
                            { name: 'Booth 501', code: '501' },
                            { name: 'Booth 502', code: '502' }
                          ],
                          villages: ['Jagdalpur City', 'Bastar', 'Kondagaon']
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
          name: 'Korba',
          parliamentConstituencies: [
            {
              name: 'Korba',
              assemblyConstituencies: [
                {
                  name: 'Korba City',
                  blocks: [
                    {
                      name: 'Korba Block',
                      panchayats: [
                        {
                          name: 'Gram Panchayat Korba',
                          pollingBooths: [
                            { name: 'Booth 601', code: '601' },
                            { name: 'Booth 602', code: '602' }
                          ],
                          villages: ['Korba City', 'Katghora', 'Pali']
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
          name: 'Rajnandgaon',
          parliamentConstituencies: [
            {
              name: 'Rajnandgaon',
              assemblyConstituencies: [
                {
                  name: 'Rajnandgaon City',
                  blocks: [
                    {
                      name: 'Rajnandgaon Block',
                      panchayats: [
                        {
                          name: 'Gram Panchayat Rajnandgaon',
                          pollingBooths: [
                            { name: 'Booth 701', code: '701' },
                            { name: 'Booth 702', code: '702' }
                          ],
                          villages: ['Rajnandgaon City', 'Dongargaon', 'Khujji']
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
          name: 'Ambikapur',
          parliamentConstituencies: [
            {
              name: 'Sarguja',
              assemblyConstituencies: [
                {
                  name: 'Ambikapur City',
                  blocks: [
                    {
                      name: 'Ambikapur Block',
                      panchayats: [
                        {
                          name: 'Gram Panchayat Ambikapur',
                          pollingBooths: [
                            { name: 'Booth 801', code: '801' },
                            { name: 'Booth 802', code: '802' }
                          ],
                          villages: ['Ambikapur City', 'Surguja', 'Lundra']
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
          name: 'Dhamtari',
          parliamentConstituencies: [
            {
              name: 'Kanker',
              assemblyConstituencies: [
                {
                  name: 'Dhamtari City',
                  blocks: [
                    {
                      name: 'Dhamtari Block',
                      panchayats: [
                        {
                          name: 'Gram Panchayat Dhamtari',
                          pollingBooths: [
                            { name: 'Booth 901', code: '901' },
                            { name: 'Booth 902', code: '902' }
                          ],
                          villages: ['Dhamtari City', 'Kurud', 'Sihawa']
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
          name: 'Mahasamund',
          parliamentConstituencies: [
            {
              name: 'Mahasamund',
              assemblyConstituencies: [
                {
                  name: 'Mahasamund City',
                  blocks: [
                    {
                      name: 'Mahasamund Block',
                      panchayats: [
                        {
                          name: 'Gram Panchayat Mahasamund',
                          pollingBooths: [
                            { name: 'Booth 1001', code: '1001' },
                            { name: 'Booth 1002', code: '1002' }
                          ],
                          villages: ['Mahasamund City', 'Saraipali', 'Basna']
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
    },
    {
      name: 'Madhya Pradesh',
      districts: [
        {
          name: 'Bhopal',
          parliamentConstituencies: [
            {
              name: 'Bhopal',
              assemblyConstituencies: [
                {
                  name: 'Bhopal North',
                  blocks: [
                    {
                      name: 'Bhopal North Block',
                      panchayats: [
                        {
                          name: 'Gram Panchayat Bhopal North',
                          pollingBooths: [
                            { name: 'Booth MP-101', code: 'MP-101' },
                            { name: 'Booth MP-102', code: 'MP-102' }
                          ],
                          villages: ['Bhopal City', 'Kolar', 'Berasia']
                        }
                      ]
                    }
                  ]
                },
                {
                  name: 'Bhopal South',
                  blocks: [
                    {
                      name: 'Bhopal South Block',
                      panchayats: [
                        {
                          name: 'Gram Panchayat Bhopal South',
                          pollingBooths: [
                            { name: 'Booth MP-103', code: 'MP-103' },
                            { name: 'Booth MP-104', code: 'MP-104' }
                          ],
                          villages: ['Kolar', 'Berasia', 'Sehore']
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
          name: 'Indore',
          parliamentConstituencies: [
            {
              name: 'Indore',
              assemblyConstituencies: [
                {
                  name: 'Indore City',
                  blocks: [
                    {
                      name: 'Indore City Block',
                      panchayats: [
                        {
                          name: 'Gram Panchayat Indore',
                          pollingBooths: [
                            { name: 'Booth MP-201', code: 'MP-201' },
                            { name: 'Booth MP-202', code: 'MP-202' }
                          ],
                          villages: ['Indore City', 'Rau', 'Depalpur']
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
          name: 'Jabalpur',
          parliamentConstituencies: [
            {
              name: 'Jabalpur',
              assemblyConstituencies: [
                {
                  name: 'Jabalpur West',
                  blocks: [
                    {
                      name: 'Jabalpur West Block',
                      panchayats: [
                        {
                          name: 'Gram Panchayat Jabalpur',
                          pollingBooths: [
                            { name: 'Booth MP-301', code: 'MP-301' },
                            { name: 'Booth MP-302', code: 'MP-302' }
                          ],
                          villages: ['Jabalpur City', 'Katni', 'Rewa']
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
    },
    {
      name: 'Maharashtra',
      districts: [
        {
          name: 'Mumbai',
          parliamentConstituencies: [
            {
              name: 'Mumbai',
              assemblyConstituencies: [
                {
                  name: 'Mumbai South',
                  blocks: [
                    {
                      name: 'Mumbai South Block',
                      panchayats: [
                        {
                          name: 'Gram Panchayat Mumbai South',
                          pollingBooths: [
                            { name: 'Booth MH-101', code: 'MH-101' },
                            { name: 'Booth MH-102', code: 'MH-102' }
                          ],
                          villages: ['Mumbai City', 'Colaba', 'Worli']
                        }
                      ]
                    }
                  ]
                },
                {
                  name: 'Mumbai North',
                  blocks: [
                    {
                      name: 'Mumbai North Block',
                      panchayats: [
                        {
                          name: 'Gram Panchayat Mumbai North',
                          pollingBooths: [
                            { name: 'Booth MH-103', code: 'MH-103' },
                            { name: 'Booth MH-104', code: 'MH-104' }
                          ],
                          villages: ['Andheri', 'Bandra', 'Santacruz']
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
          name: 'Pune',
          parliamentConstituencies: [
            {
              name: 'Pune',
              assemblyConstituencies: [
                {
                  name: 'Pune City',
                  blocks: [
                    {
                      name: 'Pune City Block',
                      panchayats: [
                        {
                          name: 'Gram Panchayat Pune',
                          pollingBooths: [
                            { name: 'Booth MH-201', code: 'MH-201' },
                            { name: 'Booth MH-202', code: 'MH-202' }
                          ],
                          villages: ['Pune City', 'Kothrud', 'Pimpri']
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
          name: 'Nagpur',
          parliamentConstituencies: [
            {
              name: 'Nagpur',
              assemblyConstituencies: [
                {
                  name: 'Nagpur West',
                  blocks: [
                    {
                      name: 'Nagpur West Block',
                      panchayats: [
                        {
                          name: 'Gram Panchayat Nagpur',
                          pollingBooths: [
                            { name: 'Booth MH-301', code: 'MH-301' },
                            { name: 'Booth MH-302', code: 'MH-302' }
                          ],
                          villages: ['Nagpur City', 'Wardha', 'Bhandara']
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
    },
    {
      name: 'Uttar Pradesh',
      districts: [
        {
          name: 'Lucknow',
          parliamentConstituencies: [
            {
              name: 'Lucknow',
              assemblyConstituencies: [
                {
                  name: 'Lucknow Central',
                  blocks: [
                    {
                      name: 'Lucknow Central Block',
                      panchayats: [
                        {
                          name: 'Gram Panchayat Lucknow Central',
                          pollingBooths: [
                            { name: 'Booth UP-101', code: 'UP-101' },
                            { name: 'Booth UP-102', code: 'UP-102' }
                          ],
                          villages: ['Lucknow City', 'Gomti Nagar', 'Aliganj']
                        }
                      ]
                    }
                  ]
                },
                {
                  name: 'Lucknow North',
                  blocks: [
                    {
                      name: 'Lucknow North Block',
                      panchayats: [
                        {
                          name: 'Gram Panchayat Lucknow North',
                          pollingBooths: [
                            { name: 'Booth UP-103', code: 'UP-103' },
                            { name: 'Booth UP-104', code: 'UP-104' }
                          ],
                          villages: ['Hazratganj', 'Chowk', 'Aminabad']
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
          name: 'Kanpur',
          parliamentConstituencies: [
            {
              name: 'Kanpur',
              assemblyConstituencies: [
                {
                  name: 'Kanpur North',
                  blocks: [
                    {
                      name: 'Kanpur North Block',
                      panchayats: [
                        {
                          name: 'Gram Panchayat Kanpur',
                          pollingBooths: [
                            { name: 'Booth UP-201', code: 'UP-201' },
                            { name: 'Booth UP-202', code: 'UP-202' }
                          ],
                          villages: ['Kanpur City', 'Unnao', 'Bithoor']
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
          name: 'Varanasi',
          parliamentConstituencies: [
            {
              name: 'Varanasi',
              assemblyConstituencies: [
                {
                  name: 'Varanasi East',
                  blocks: [
                    {
                      name: 'Varanasi East Block',
                      panchayats: [
                        {
                          name: 'Gram Panchayat Varanasi',
                          pollingBooths: [
                            { name: 'Booth UP-301', code: 'UP-301' },
                            { name: 'Booth UP-302', code: 'UP-302' }
                          ],
                          villages: ['Varanasi City', 'Sarnath', 'Ramnagar']
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
    email: 'pm@india.gov.in',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Narendra_Modi_%28crop%29.jpg/220px-Narendra_Modi_%28crop%29.jpg',
    department: 'Prime Minister Office'
  },
  { 
    id: 'cm1', 
    name: 'Vishnu Deo Sai', 
    role: 'CM', 
    region: 'Chhattisgarh', 
    password: 'cm123',
    email: 'cm@chhattisgarh.gov.in',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Vishnu_Deo_Sai.jpg/220px-Vishnu_Deo_Sai.jpg',
    department: 'Chief Minister Office'
  },
  { 
    id: 'minister1', 
    name: 'Ram Vichar Netam', 
    role: 'Minister', 
    region: 'Chhattisgarh',
    department: 'Agriculture',
    password: 'minister123',
    email: 'rv.netam@cg.gov.in',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9I7glunkVzaWPJaeMhAzGhmvP4m-A_jsW9h9jOm_5GBHQTWvLnrwbcyWG0iRHyZGshs08D3-eMBiCyxxlcX1xfTLK-755Sz9nW0umvx8&s=10'
  },
  { 
    id: 'minister2', 
    name: 'Arjun Singh', 
    role: 'Minister', 
    region: 'Chhattisgarh',
    department: 'Health',
    password: 'minister123',
    email: 'arjun.singh@cg.gov.in',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=center'
  },
  { 
    id: 'minister3', 
    name: 'Meena Sharma', 
    role: 'Minister', 
    region: 'Chhattisgarh',
    department: 'Education',
    password: 'minister123',
    email: 'meena.sharma@cg.gov.in',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=center'
  },
  { 
    id: 'mp1', 
    name: 'Brijmohan Agrawal', 
    role: 'MP', 
    region: 'Raipur', 
    password: 'mp123',
    email: 'mp.raipur@parliament.gov.in',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=center'
  },
  { 
    id: 'mla1', 
    name: 'Neeraj Singh', 
    role: 'MLA', 
    region: 'Raipur City South', 
    password: 'mla123',
    email: 'mla.raipursouth@assembly.gov.in',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=center'
  },
  { 
    id: 'surveyor1', 
    name: 'Amit Surveyor', 
    role: 'Surveyor', 
    region: 'Raipur', 
    password: 'surveyor123',
    email: 'surveyor@cg.gov.in',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center'
  },
  { 
    id: 'auditor1', 
    name: 'Rajesh Auditor', 
    role: 'Auditor', 
    region: 'Chhattisgarh', 
    password: 'auditor123',
    email: 'auditor@cg.gov.in',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center'
  },
  { 
    id: 'user1', 
    name: 'Amit Kumar', 
    role: 'USER', 
    region: 'Raipur', 
    password: 'user123',
    email: 'amit.kumar@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center'
  }
];

// ============ VOTERS - Distributed Across All Districts ============
export const VOTERS = Array.from({ length: 600 }, (_, i) => {
  const firstNames = ['Rahul', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Neha', 'Raj', 'Kavya', 'Arjun', 'Meera', 'Suresh', 'Anita', 'Deepak', 'Sunita', 'Ravi', 'Pooja', 'Kiran', 'Manoj', 'Jyoti', 'Sanjay', 'Ramesh', 'Kavita', 'Vijay', 'Anjali', 'Sanjay'];
  const lastNames = ['Kumar', 'Singh', 'Sharma', 'Patel', 'Verma', 'Yadav', 'Gupta', 'Joshi', 'Malik', 'Reddy', 'Sahu', 'Kashyap', 'Chauhan', 'Thakur', 'Rathore', 'Mehta', 'Agarwal', 'Dubey', 'Mishra', 'Tiwari'];
  const genders = ['Male', 'Female', 'Other'];
  const castes = ['General', 'OBC', 'SC', 'ST'];
  const relations = ['Father', 'Mother', 'Husband', 'Wife'];
  
  // All states with their complete districts
  const allStates = [
    { 
      name: 'Chhattisgarh', 
      districts: ['Raipur', 'Bilaspur', 'Durg', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon', 'Ambikapur', 'Dhamtari', 'Mahasamund'] 
    },
    { 
      name: 'Madhya Pradesh', 
      districts: ['Bhopal', 'Indore', 'Jabalpur'] 
    },
    { 
      name: 'Maharashtra', 
      districts: ['Mumbai', 'Pune', 'Nagpur'] 
    },
    { 
      name: 'Uttar Pradesh', 
      districts: ['Lucknow', 'Kanpur', 'Varanasi'] 
    }
  ];
  
  // Distribute voters evenly across states and districts
  const stateIndex = i % allStates.length;
  const stateData = allStates[stateIndex];
  const state = stateData.name;
  const district = stateData.districts[i % stateData.districts.length];
  
  // Constituencies based on state and district
  const constituencies = {
    'Chhattisgarh': {
      'Raipur': ['Raipur City South', 'Raipur City North'],
      'Bilaspur': ['Bilaspur City', 'Bilaspur Rural'],
      'Durg': ['Durg City', 'Durg Gramin'],
      'Raigarh': ['Raigarh City'],
      'Jagdalpur': ['Jagdalpur City'],
      'Korba': ['Korba City'],
      'Rajnandgaon': ['Rajnandgaon City'],
      'Ambikapur': ['Ambikapur City'],
      'Dhamtari': ['Dhamtari City'],
      'Mahasamund': ['Mahasamund City']
    },
    'Madhya Pradesh': {
      'Bhopal': ['Bhopal North', 'Bhopal South'],
      'Indore': ['Indore City'],
      'Jabalpur': ['Jabalpur West']
    },
    'Maharashtra': {
      'Mumbai': ['Mumbai South', 'Mumbai North'],
      'Pune': ['Pune City'],
      'Nagpur': ['Nagpur West']
    },
    'Uttar Pradesh': {
      'Lucknow': ['Lucknow Central', 'Lucknow North'],
      'Kanpur': ['Kanpur North'],
      'Varanasi': ['Varanasi East']
    }
  };
  
  // Blocks based on state
  const blocks = {
    'Chhattisgarh': {
      'Raipur': ['Raipur South Block', 'Raipur North Block'],
      'Bilaspur': ['Bilaspur Block', 'Bilaspur Rural Block'],
      'Durg': ['Durg Block', 'Durg Gramin Block'],
      'Raigarh': ['Raigarh Block'],
      'Jagdalpur': ['Jagdalpur Block'],
      'Korba': ['Korba Block'],
      'Rajnandgaon': ['Rajnandgaon Block'],
      'Ambikapur': ['Ambikapur Block'],
      'Dhamtari': ['Dhamtari Block'],
      'Mahasamund': ['Mahasamund Block']
    },
    'Madhya Pradesh': {
      'Bhopal': ['Bhopal North Block', 'Bhopal South Block'],
      'Indore': ['Indore City Block'],
      'Jabalpur': ['Jabalpur West Block']
    },
    'Maharashtra': {
      'Mumbai': ['Mumbai South Block', 'Mumbai North Block'],
      'Pune': ['Pune City Block'],
      'Nagpur': ['Nagpur West Block']
    },
    'Uttar Pradesh': {
      'Lucknow': ['Lucknow Central Block', 'Lucknow North Block'],
      'Kanpur': ['Kanpur North Block'],
      'Varanasi': ['Varanasi East Block']
    }
  };
  
  const panchayats = ['Gram Panchayat Rajnagar', 'Gram Panchayat Kesla', 'Gram Panchayat Patan', 'Gram Panchayat Tilda', 'Gram Panchayat Simga', 'Gram Panchayat Kurud', 'Gram Panchayat Risali', 'Gram Panchayat Bhatapara'];
  const booths = ['Booth 101', 'Booth 102', 'Booth 103', 'Booth 104', 'Booth 105', 'Booth 106', 'Booth 107', 'Booth 108'];
  const villages = ['Rajnagar', 'Kesla', 'Patan', 'Tilda', 'Simga', 'Kurud', 'Risali', 'Bhatapara', 'Pallari', 'Khairagarh', 'Dongargarh', 'Manpur', 'Barwahi', 'Pendra', 'Kota', 'Lormi'];
  
  const stateConstituencies = constituencies[state]?.[district] || ['Constituency 1'];
  const stateBlocks = blocks[state]?.[district] || ['Block 1'];
  
  const constituency = stateConstituencies[i % stateConstituencies.length];
  const block = stateBlocks[i % stateBlocks.length];
  const panchayat = panchayats[i % panchayats.length];
  const booth = booths[i % booths.length];
  const village = villages[i % villages.length];
  
  return {
    id: `VOT${String(1000 + i).padStart(4, '0')}`,
    name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
    voterId: `${state.substring(0, 2).toUpperCase()}/${district.substring(0, 3).toUpperCase()}/${String(100000 + i).padStart(6, '0')}`,
    state: state,
    district: district,
    constituency: constituency,
    age: 18 + (i % 62),
    status: i % 7 === 0 ? 'Inactive' : 'Active',
    boothNumber: booth,
    caste: castes[i % castes.length],
    email: `voter${i}@gmail.com`,
    phoneNumber: `98${String(70000000 + i).slice(0, 8)}`,
    dateOfBirth: `19${80 + (i % 20)}-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}`,
    gender: genders[i % genders.length],
    relationName: `${firstNames[(i + 5) % firstNames.length]} ${lastNames[(i + 3) % lastNames.length]}`,
    relationType: relations[i % relations.length],
    houseNumber: `${100 + i}`,
    village: village,
    block: block,
    panchayat: panchayat,
    pollingBooth: booth,
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
export const DEVELOPMENT_PROJECTS = Array.from({ length: 45 }, (_, i) => {
  const allStates = ['Chhattisgarh', 'Madhya Pradesh', 'Maharashtra', 'Uttar Pradesh'];
  const state = allStates[i % allStates.length];
  
  const districtsByState = {
    'Chhattisgarh': ['Raipur', 'Bilaspur', 'Durg', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon', 'Ambikapur', 'Dhamtari', 'Mahasamund'],
    'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi']
  };
  
  const constituenciesByState = {
    'Chhattisgarh': ['Raipur City South', 'Raipur City North', 'Bilaspur', 'Durg City', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon', 'Ambikapur', 'Dhamtari'],
    'Madhya Pradesh': ['Bhopal North', 'Bhopal South', 'Indore City', 'Jabalpur West'],
    'Maharashtra': ['Mumbai South', 'Mumbai North', 'Pune City', 'Nagpur West'],
    'Uttar Pradesh': ['Lucknow Central', 'Lucknow North', 'Kanpur North', 'Varanasi East']
  };
  
  const blocksByState = {
    'Chhattisgarh': ['Raipur South Block', 'Raipur North Block', 'Bilaspur Block', 'Durg Block', 'Raigarh Block', 'Jagdalpur Block', 'Korba Block', 'Rajnandgaon Block'],
    'Madhya Pradesh': ['Bhopal South Block', 'Indore East Block', 'Jabalpur West Block'],
    'Maharashtra': ['Mumbai South Block', 'Pune East Block', 'Nagpur West Block'],
    'Uttar Pradesh': ['Lucknow North Block', 'Kanpur South Block', 'Varanasi East Block']
  };
  
  const district = districtsByState[state]?.[i % (districtsByState[state]?.length || 1)] || 'Raipur';
  const constituency = constituenciesByState[state]?.[i % (constituenciesByState[state]?.length || 1)] || 'Raipur City South';
  const block = blocksByState[state]?.[i % (blocksByState[state]?.length || 1)] || 'Default Block';
  
  const villages = ['Rajnagar', 'Kesla', 'Patan', 'Tilda', 'Simga', 'Kurud', 'Risali', 'Bhatapara', 'Pallari', 'Khairagarh'];
  const statuses = ['Draft', 'Approved', 'In Progress', 'Completed', 'Closed', 'Delayed'];
  const fundSources = ['Government Fund', 'Personal Fund', 'Mixed'];
  const developmentTypes = DEVELOPMENT_TYPES;
  const reps = ['Ram Vichar Netam', 'Vishnu Deo Sai', 'Brijmohan Agrawal', 'Neeraj Singh', 'Arjun Singh', 'Meena Sharma'];
  
  const target = 500 + Math.floor(Math.random() * 1500);
  const completed = Math.floor(Math.random() * target);
  const progress = Math.round((completed / target) * 100);
  
  const isDelayed = [3, 7, 12, 18, 24, 30, 35, 40].includes(i % 45);
  const status = isDelayed ? 'Delayed' : statuses[i % statuses.length];
  
  return {
    id: `DEV${String(100 + i).padStart(3, '0')}`,
    name: `${developmentTypes[i % developmentTypes.length]} Project - ${district}`,
    type: developmentTypes[i % developmentTypes.length],
    description: `Development of ${developmentTypes[i % developmentTypes.length].toLowerCase()} in ${villages[i % villages.length]} village, ${district} district.`,
    state: state,
    district: district,
    constituency: constituency,
    block: block,
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
  const allDistricts = ['Raipur', 'Bilaspur', 'Durg', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon', 'Ambikapur', 'Dhamtari', 'Mahasamund', 'Bhopal', 'Indore', 'Jabalpur', 'Mumbai', 'Pune', 'Nagpur', 'Lucknow', 'Kanpur', 'Varanasi'];
  const constituencies = ['Raipur City South', 'Raipur City North', 'Bilaspur', 'Durg City', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon', 'Ambikapur', 'Dhamtari', 'Mahasamund', 'Bhopal North', 'Bhopal South', 'Indore City', 'Jabalpur West', 'Mumbai South', 'Mumbai North', 'Pune City', 'Nagpur West', 'Lucknow Central', 'Lucknow North', 'Kanpur North', 'Varanasi East'];
  
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
    district: allDistricts[i % allDistricts.length],
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
  const allDistricts = ['Raipur', 'Bilaspur', 'Durg', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon', 'Ambikapur', 'Dhamtari', 'Mahasamund', 'Bhopal', 'Indore', 'Jabalpur', 'Mumbai', 'Pune', 'Nagpur', 'Lucknow', 'Kanpur', 'Varanasi'];
  const constituencies = ['Raipur City South', 'Raipur City North', 'Bilaspur', 'Durg City', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon', 'Ambikapur', 'Dhamtari', 'Mahasamund', 'Bhopal North', 'Bhopal South', 'Indore City', 'Jabalpur West', 'Mumbai South', 'Mumbai North', 'Pune City', 'Nagpur West', 'Lucknow Central', 'Lucknow North', 'Kanpur North', 'Varanasi East'];
  
  return {
    id: `MTG${String(400 + i).padStart(4, '0')}`,
    citizenName: ['Amit', 'Suman', 'Rajesh', 'Pooja', 'Kiran', 'Manoj', 'Deepa', 'Ritu', 'Sanjay', 'Neelam'][i % 10],
    purpose: purposes[i % purposes.length],
    dateRequested: `2024-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}`,
    scheduledDate: `2024-${String(1 + (i % 12)).padStart(2, '0')}-${String(15 + (i % 13)).padStart(2, '0')}`,
    status: statuses[i % statuses.length],
    priority: ['High', 'Medium', 'Low', 'Urgent'][i % 4],
    location: allDistricts[i % allDistricts.length],
    district: allDistricts[i % allDistricts.length],
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
  }
];

// ============ FUNDING ============
export const FUNDING = Array.from({ length: 35 }, (_, i) => {
  const allDistricts = ['Raipur', 'Bilaspur', 'Durg', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon', 'Ambikapur', 'Dhamtari', 'Mahasamund', 'Bhopal', 'Indore', 'Jabalpur', 'Mumbai', 'Pune', 'Nagpur', 'Lucknow', 'Kanpur', 'Varanasi'];
  const constituencies = ['Raipur City South', 'Raipur City North', 'Bilaspur', 'Durg City', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon', 'Ambikapur', 'Dhamtari', 'Mahasamund', 'Bhopal North', 'Bhopal South', 'Indore City', 'Jabalpur West', 'Mumbai South', 'Mumbai North', 'Pune City', 'Nagpur West', 'Lucknow Central', 'Lucknow North', 'Kanpur North', 'Varanasi East'];
  const projects = ['Har Ghar Jal', 'Road Construction', 'School Building', 'Hospital', 'Drainage', 'Electricity', 'Street Lights', 'Community Center'];
  const sources = ['Government Fund', 'Personal Fund', 'Mixed'];
  
  return {
    id: `FUND${String(500 + i).padStart(4, '0')}`,
    projectName: `${projects[i % projects.length]} - ${allDistricts[i % allDistricts.length]}`,
    fundSource: sources[i % sources.length],
    governmentAmount: (i + 1) * 1000000 + Math.floor(Math.random() * 2000000),
    personalAmount: Math.floor(Math.random() * 500000),
    totalAmount: (i + 1) * 1500000 + Math.floor(Math.random() * 3000000),
    allocated: (i + 1) * 1000000 + Math.floor(Math.random() * 2000000),
    utilized: (i + 1) * 600000 + Math.floor(Math.random() * 1500000),
    utilization: Math.floor(40 + Math.random() * 55),
    district: allDistricts[i % allDistricts.length],
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
  const allDistricts = ['Raipur', 'Bilaspur', 'Durg', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon', 'Ambikapur', 'Dhamtari', 'Mahasamund', 'Bhopal', 'Indore', 'Jabalpur', 'Mumbai', 'Pune', 'Nagpur', 'Lucknow', 'Kanpur', 'Varanasi'];
  const constituencies = ['Raipur City South', 'Raipur City North', 'Bilaspur', 'Durg City', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon', 'Ambikapur', 'Dhamtari', 'Mahasamund', 'Bhopal North', 'Bhopal South', 'Indore City', 'Jabalpur West', 'Mumbai South', 'Mumbai North', 'Pune City', 'Nagpur West', 'Lucknow Central', 'Lucknow North', 'Kanpur North', 'Varanasi East'];
  
  return {
    id: `REG${String(900 + i).padStart(4, '0')}`,
    name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
    mobile: `97${String(50000000 + i).slice(0, 8)}`,
    email: `user${i}@gmail.com`,
    address: ['Sector 12', 'Old City', 'Industrial Area', 'Residential Zone', 'Market', 'Village'][i % 6],
    registrationDate: `2024-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}`,
    status: statuses[i % statuses.length],
    wantsVolunteer: i % 5 === 0 || i % 7 === 0,
    district: allDistricts[i % allDistricts.length],
    constituency: constituencies[i % constituencies.length],
    block: ['Raipur South Block', 'Raipur North Block', 'Bilaspur Block', 'Durg Block'][i % 4],
    age: 22 + (i % 45),
    gender: ['Male', 'Female', 'Other'][i % 3],
    occupation: ['Student', 'Farmer', 'Teacher', 'Business', 'Professional', 'Healthcare', 'Engineer', 'Govt Service'][i % 8],
    voterId: `CG/${allDistricts[i % allDistricts.length].substring(0,3).toUpperCase()}/${String(100000 + i).padStart(6, '0')}`
  };
});

// ============ VOLUNTEERS ============
export const VOLUNTEERS = Array.from({ length: 45 }, (_, i) => {
  const firstNames = ['Ravi', 'Sneha', 'Vikram', 'Ananya', 'Rahul', 'Pooja', 'Kiran', 'Deepak', 'Meera', 'Suresh'];
  const lastNames = ['Sharma', 'Patel', 'Verma', 'Reddy', 'Singh', 'Kumar', 'Yadav', 'Joshi'];
  const skills = ['Community Work', 'Teaching', 'Health Worker', 'Agricultural Expert', 'IT Professional', 'Social Worker'];
  const statuses = ['Pending', 'Active', 'Inactive'];
  const allDistricts = ['Raipur', 'Bilaspur', 'Durg', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon', 'Ambikapur', 'Dhamtari', 'Mahasamund', 'Bhopal', 'Indore', 'Jabalpur', 'Mumbai', 'Pune', 'Nagpur', 'Lucknow', 'Kanpur', 'Varanasi'];
  const constituencies = ['Raipur City South', 'Raipur City North', 'Bilaspur', 'Durg City', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon', 'Ambikapur', 'Dhamtari', 'Mahasamund', 'Bhopal North', 'Bhopal South', 'Indore City', 'Jabalpur West', 'Mumbai South', 'Mumbai North', 'Pune City', 'Nagpur West', 'Lucknow Central', 'Lucknow North', 'Kanpur North', 'Varanasi East'];
  
  return {
    id: `VOL${String(300 + i).padStart(4, '0')}`,
    name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
    mobile: `99${String(60000000 + i).slice(0, 8)}`,
    email: `volunteer${i}@gmail.com`,
    joinDate: `2024-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}`,
    status: statuses[i % statuses.length],
    area: allDistricts[i % allDistricts.length],
    constituency: constituencies[i % constituencies.length],
    block: ['Raipur South Block', 'Raipur North Block', 'Bilaspur Block', 'Durg Block'][i % 4],
    tasksAssigned: Math.floor(Math.random() * 6) + 1,
    skills: skills[i % skills.length],
    voterId: `CG/${allDistricts[i % allDistricts.length].substring(0,3).toUpperCase()}/${String(100000 + i).padStart(6, '0')}`,
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
    image: 'https://indianmasterminds.com/wp-content/uploads/2026/04/cm-sai.jpg',
    summary: 'Chief Minister Vishnu Deo Sai inaugurated a state-of-the-art 100-bed hospital in Raipur, providing advanced healthcare facilities to citizens.',
    district: 'Raipur',
    state: 'Chhattisgarh'
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
    district: 'Surguja',
    state: 'Chhattisgarh'
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
    district: 'Balod',
    state: 'Chhattisgarh'
  },
  {
    id: 'news4',
    title: 'Nava Raipur to Get India\'s First AI-Driven Traffic System',
    category: 'Technology',
    publishDate: '2024-06-08',
    source: 'NDTV',
    importance: 'High',
    image: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202505/raipur-to-host-indias-first-ai-based-data-park-key-details-inside-ai-generated-imagecanva-050155330-16x9_0.jpg?VersionId=HukQteYFFuDcMrrICpsVAoHLgxjpbI2c',
    summary: 'Nava Raipur is set to become India\'s first city with an AI-driven intelligent traffic management system, reducing congestion by 40%.',
    district: 'Raipur',
    state: 'Chhattisgarh'
  },
  {
    id: 'news5',
    title: 'Madhya Pradesh Launches New Industrial Policy 2024',
    category: 'Industry',
    publishDate: '2024-06-05',
    source: 'Business Standard',
    importance: 'High',
    image: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=600&h=400&fit=crop',
    summary: 'Madhya Pradesh government announced a new industrial policy with incentives to boost manufacturing and create jobs.',
    district: 'Bhopal',
    state: 'Madhya Pradesh'
  },
  {
    id: 'news6',
    title: 'Maharashtra to Get 5 New Smart Cities',
    category: 'Urban Development',
    publishDate: '2024-06-01',
    source: 'The Hindu',
    importance: 'High',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=400&fit=crop',
    summary: 'Maharashtra government announced 5 new smart cities in the state with an investment of Rs. 10,000 crore.',
    district: 'Mumbai',
    state: 'Maharashtra'
  }
];

// ============ NOTIFICATIONS ============
export const NOTIFICATIONS = Array.from({ length: 50 }, (_, i) => {
  const titles = ['New Complaint Registered', 'Meeting Scheduled', 'Scheme Progress Update', 'Fund Allocation Approved', 'Project Milestone Achieved', 'News Published', 'Volunteer Registration', 'Jan Sabha Announced', 'Policy Change', 'Infrastructure Update'];
  const types = ['Info', 'Success', 'Warning', 'Alert'];
  const allDistricts = ['Raipur', 'Bilaspur', 'Durg', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon', 'Ambikapur', 'Dhamtari', 'Mahasamund', 'Bhopal', 'Indore', 'Jabalpur', 'Mumbai', 'Pune', 'Nagpur', 'Lucknow', 'Kanpur', 'Varanasi'];
  const constituencies = ['Raipur City South', 'Raipur City North', 'Bilaspur', 'Durg City', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon', 'Ambikapur', 'Dhamtari', 'Mahasamund', 'Bhopal North', 'Bhopal South', 'Indore City', 'Jabalpur West', 'Mumbai South', 'Mumbai North', 'Pune City', 'Nagpur West', 'Lucknow Central', 'Lucknow North', 'Kanpur North', 'Varanasi East'];
  const states = ['Chhattisgarh', 'Madhya Pradesh', 'Maharashtra', 'Uttar Pradesh'];
  
  return {
    id: `NOTIF${String(700 + i).padStart(4, '0')}`,
    title: titles[i % titles.length],
    message: `This is a notification about development activity in ${allDistricts[i % allDistricts.length]} district.`,
    type: types[i % types.length],
    date: `2024-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}`,
    read: i % 4 === 0 ? false : true,
    state: states[i % states.length],
    district: allDistricts[i % allDistricts.length],
    constituency: constituencies[i % constituencies.length]
  };
});

// ============ JANSABHA ============
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
    state: 'Chhattisgarh',
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
    state: 'Chhattisgarh',
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
    'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi']
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
      'Raigarh': ['Raigarh City'],
      'Jagdalpur': ['Jagdalpur City'],
      'Korba': ['Korba City'],
      'Rajnandgaon': ['Rajnandgaon City'],
      'Ambikapur': ['Ambikapur City'],
      'Dhamtari': ['Dhamtari City'],
      'Mahasamund': ['Mahasamund City']
    },
    'Madhya Pradesh': {
      'Bhopal': ['Bhopal North', 'Bhopal South'],
      'Indore': ['Indore City'],
      'Jabalpur': ['Jabalpur West']
    },
    'Maharashtra': {
      'Mumbai': ['Mumbai South', 'Mumbai North'],
      'Pune': ['Pune City'],
      'Nagpur': ['Nagpur West']
    },
    'Uttar Pradesh': {
      'Lucknow': ['Lucknow Central', 'Lucknow North'],
      'Kanpur': ['Kanpur North'],
      'Varanasi': ['Varanasi East']
    }
  };
  
  if (!state || !district) return [];
  return assemblyMap[state]?.[district] || ['Assembly 1'];
};

// Get blocks for a state, district, and assembly constituency
export const getBlocks = (state, district, assembly) => {
  const blockMap = {
    'Chhattisgarh': {
      'Raipur': {
        'Raipur City South': ['Raipur South Block'],
        'Raipur City North': ['Raipur North Block']
      },
      'Bilaspur': {
        'Bilaspur City': ['Bilaspur Block'],
        'Bilaspur Rural': ['Bilaspur Rural Block']
      },
      'Durg': {
        'Durg City': ['Durg Block'],
        'Durg Gramin': ['Durg Gramin Block']
      },
      'Raigarh': {
        'Raigarh City': ['Raigarh Block']
      },
      'Jagdalpur': {
        'Jagdalpur City': ['Jagdalpur Block']
      },
      'Korba': {
        'Korba City': ['Korba Block']
      },
      'Rajnandgaon': {
        'Rajnandgaon City': ['Rajnandgaon Block']
      },
      'Ambikapur': {
        'Ambikapur City': ['Ambikapur Block']
      },
      'Dhamtari': {
        'Dhamtari City': ['Dhamtari Block']
      },
      'Mahasamund': {
        'Mahasamund City': ['Mahasamund Block']
      }
    },
    'Madhya Pradesh': {
      'Bhopal': {
        'Bhopal North': ['Bhopal North Block'],
        'Bhopal South': ['Bhopal South Block']
      },
      'Indore': {
        'Indore City': ['Indore City Block']
      },
      'Jabalpur': {
        'Jabalpur West': ['Jabalpur West Block']
      }
    },
    'Maharashtra': {
      'Mumbai': {
        'Mumbai South': ['Mumbai South Block'],
        'Mumbai North': ['Mumbai North Block']
      },
      'Pune': {
        'Pune City': ['Pune City Block']
      },
      'Nagpur': {
        'Nagpur West': ['Nagpur West Block']
      }
    },
    'Uttar Pradesh': {
      'Lucknow': {
        'Lucknow Central': ['Lucknow Central Block'],
        'Lucknow North': ['Lucknow North Block']
      },
      'Kanpur': {
        'Kanpur North': ['Kanpur North Block']
      },
      'Varanasi': {
        'Varanasi East': ['Varanasi East Block']
      }
    }
  };
  
  if (!state || !district || !assembly) return [];
  return blockMap[state]?.[district]?.[assembly] || ['Default Block'];
};

// Get panchayats
export const getPanchayats = (state, district, assembly, block) => {
  const panchayatMap = {
    'Raipur South Block': ['Gram Panchayat Rajnagar', 'Gram Panchayat Kesla'],
    'Raipur North Block': ['Gram Panchayat Simga', 'Gram Panchayat Kurud'],
    'Bilaspur Block': ['Gram Panchayat Bilaspur', 'Gram Panchayat Ratanpur'],
    'Bilaspur Rural Block': ['Gram Panchayat Lormi', 'Gram Panchayat Mungeli'],
    'Durg Block': ['Gram Panchayat Durg', 'Gram Panchayat Bhilai'],
    'Durg Gramin Block': ['Gram Panchayat Dongargarh', 'Gram Panchayat Manpur'],
    'Raigarh Block': ['Gram Panchayat Raigarh', 'Gram Panchayat Sakti'],
    'Jagdalpur Block': ['Gram Panchayat Jagdalpur', 'Gram Panchayat Bastar'],
    'Korba Block': ['Gram Panchayat Korba', 'Gram Panchayat Katghora'],
    'Rajnandgaon Block': ['Gram Panchayat Rajnandgaon', 'Gram Panchayat Dongargaon'],
    'Ambikapur Block': ['Gram Panchayat Ambikapur', 'Gram Panchayat Surguja'],
    'Dhamtari Block': ['Gram Panchayat Dhamtari', 'Gram Panchayat Kurud'],
    'Mahasamund Block': ['Gram Panchayat Mahasamund', 'Gram Panchayat Saraipali'],
    'Bhopal North Block': ['Gram Panchayat Bhopal North', 'Gram Panchayat Kolar'],
    'Bhopal South Block': ['Gram Panchayat Bhopal South', 'Gram Panchayat Sehore'],
    'Indore City Block': ['Gram Panchayat Indore', 'Gram Panchayat Rau'],
    'Jabalpur West Block': ['Gram Panchayat Jabalpur', 'Gram Panchayat Katni'],
    'Mumbai South Block': ['Gram Panchayat Mumbai South', 'Gram Panchayat Colaba'],
    'Mumbai North Block': ['Gram Panchayat Mumbai North', 'Gram Panchayat Andheri'],
    'Pune City Block': ['Gram Panchayat Pune', 'Gram Panchayat Kothrud'],
    'Nagpur West Block': ['Gram Panchayat Nagpur', 'Gram Panchayat Wardha'],
    'Lucknow Central Block': ['Gram Panchayat Lucknow Central', 'Gram Panchayat Gomti Nagar'],
    'Lucknow North Block': ['Gram Panchayat Lucknow North', 'Gram Panchayat Hazratganj'],
    'Kanpur North Block': ['Gram Panchayat Kanpur', 'Gram Panchayat Unnao'],
    'Varanasi East Block': ['Gram Panchayat Varanasi', 'Gram Panchayat Sarnath']
  };
  
  if (!block) return [];
  return panchayatMap[block] || ['Gram Panchayat Default'];
};

// Get polling booths
export const getPollingBooths = (state, district, assembly, block, panchayat) => {
  const boothMap = {
    'Gram Panchayat Rajnagar': ['Booth 101', 'Booth 102'],
    'Gram Panchayat Kesla': ['Booth 103', 'Booth 104'],
    'Gram Panchayat Simga': ['Booth 105', 'Booth 106'],
    'Gram Panchayat Kurud': ['Booth 107', 'Booth 108'],
    'Gram Panchayat Bilaspur': ['Booth 201', 'Booth 202'],
    'Gram Panchayat Ratanpur': ['Booth 203', 'Booth 204'],
    'Gram Panchayat Lormi': ['Booth 205', 'Booth 206'],
    'Gram Panchayat Mungeli': ['Booth 207', 'Booth 208'],
    'Gram Panchayat Durg': ['Booth 301', 'Booth 302'],
    'Gram Panchayat Bhilai': ['Booth 303', 'Booth 304'],
    'Gram Panchayat Dongargarh': ['Booth 305', 'Booth 306'],
    'Gram Panchayat Manpur': ['Booth 307', 'Booth 308'],
    'Gram Panchayat Raigarh': ['Booth 401', 'Booth 402'],
    'Gram Panchayat Sakti': ['Booth 403', 'Booth 404'],
    'Gram Panchayat Jagdalpur': ['Booth 501', 'Booth 502'],
    'Gram Panchayat Bastar': ['Booth 503', 'Booth 504'],
    'Gram Panchayat Korba': ['Booth 601', 'Booth 602'],
    'Gram Panchayat Katghora': ['Booth 603', 'Booth 604'],
    'Gram Panchayat Rajnandgaon': ['Booth 701', 'Booth 702'],
    'Gram Panchayat Dongargaon': ['Booth 703', 'Booth 704'],
    'Gram Panchayat Ambikapur': ['Booth 801', 'Booth 802'],
    'Gram Panchayat Surguja': ['Booth 803', 'Booth 804'],
    'Gram Panchayat Dhamtari': ['Booth 901', 'Booth 902'],
    'Gram Panchayat Mahasamund': ['Booth 1001', 'Booth 1002'],
    'Gram Panchayat Saraipali': ['Booth 1003', 'Booth 1004'],
    'Gram Panchayat Bhopal North': ['Booth MP-101', 'Booth MP-102'],
    'Gram Panchayat Kolar': ['Booth MP-103', 'Booth MP-104'],
    'Gram Panchayat Bhopal South': ['Booth MP-105', 'Booth MP-106'],
    'Gram Panchayat Sehore': ['Booth MP-107', 'Booth MP-108'],
    'Gram Panchayat Indore': ['Booth MP-201', 'Booth MP-202'],
    'Gram Panchayat Rau': ['Booth MP-203', 'Booth MP-204'],
    'Gram Panchayat Jabalpur': ['Booth MP-301', 'Booth MP-302'],
    'Gram Panchayat Katni': ['Booth MP-303', 'Booth MP-304'],
    'Gram Panchayat Mumbai South': ['Booth MH-101', 'Booth MH-102'],
    'Gram Panchayat Colaba': ['Booth MH-103', 'Booth MH-104'],
    'Gram Panchayat Mumbai North': ['Booth MH-105', 'Booth MH-106'],
    'Gram Panchayat Andheri': ['Booth MH-107', 'Booth MH-108'],
    'Gram Panchayat Pune': ['Booth MH-201', 'Booth MH-202'],
    'Gram Panchayat Kothrud': ['Booth MH-203', 'Booth MH-204'],
    'Gram Panchayat Nagpur': ['Booth MH-301', 'Booth MH-302'],
    'Gram Panchayat Wardha': ['Booth MH-303', 'Booth MH-304'],
    'Gram Panchayat Lucknow Central': ['Booth UP-101', 'Booth UP-102'],
    'Gram Panchayat Gomti Nagar': ['Booth UP-103', 'Booth UP-104'],
    'Gram Panchayat Lucknow North': ['Booth UP-105', 'Booth UP-106'],
    'Gram Panchayat Hazratganj': ['Booth UP-107', 'Booth UP-108'],
    'Gram Panchayat Kanpur': ['Booth UP-201', 'Booth UP-202'],
    'Gram Panchayat Unnao': ['Booth UP-203', 'Booth UP-204'],
    'Gram Panchayat Varanasi': ['Booth UP-301', 'Booth UP-302'],
    'Gram Panchayat Sarnath': ['Booth UP-303', 'Booth UP-304']
  };
  
  if (!panchayat) return [];
  return boothMap[panchayat] || ['Booth 101'];
};

// Get villages
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
    'Booth 204': ['Sakti', 'Akaltara'],
    'Booth 301': ['Durg City', 'Bhilai'],
    'Booth 302': ['Risali', 'Bhatapara'],
    'Booth 303': ['Dongargarh', 'Manpur'],
    'Booth 304': ['Barwahi', 'Pendra'],
    'Booth 401': ['Raigarh City', 'Sakti'],
    'Booth 402': ['Akaltara', 'Janjgir'],
    'Booth 501': ['Jagdalpur City', 'Bastar'],
    'Booth 502': ['Kondagaon', 'Narayanpur'],
    'Booth 601': ['Korba City', 'Katghora'],
    'Booth 602': ['Pali', 'Rampur'],
    'Booth 701': ['Rajnandgaon City', 'Dongargaon'],
    'Booth 702': ['Khujji', 'Mohla'],
    'Booth 801': ['Ambikapur City', 'Surguja'],
    'Booth 802': ['Lundra', 'Samri'],
    'Booth 901': ['Dhamtari City', 'Kurud'],
    'Booth 902': ['Sihawa', 'Risali'],
    'Booth 1001': ['Mahasamund City', 'Saraipali'],
    'Booth 1002': ['Basna', 'Khallari'],
    'Booth MP-101': ['Bhopal City', 'Kolar'],
    'Booth MP-102': ['Berasia', 'Sehore'],
    'Booth MP-201': ['Indore City', 'Rau'],
    'Booth MP-202': ['Depalpur', 'Sanwer'],
    'Booth MP-301': ['Jabalpur City', 'Katni'],
    'Booth MP-302': ['Rewa', 'Satna'],
    'Booth MH-101': ['Mumbai City', 'Colaba'],
    'Booth MH-102': ['Worli', 'Bandra'],
    'Booth MH-201': ['Pune City', 'Kothrud'],
    'Booth MH-202': ['Pimpri', 'Chinchwad'],
    'Booth MH-301': ['Nagpur City', 'Wardha'],
    'Booth MH-302': ['Bhandara', 'Gondia'],
    'Booth UP-101': ['Lucknow City', 'Gomti Nagar'],
    'Booth UP-102': ['Aliganj', 'Hazratganj'],
    'Booth UP-201': ['Kanpur City', 'Unnao'],
    'Booth UP-202': ['Bithoor', 'Kalyanpur'],
    'Booth UP-301': ['Varanasi City', 'Sarnath'],
    'Booth UP-302': ['Ramnagar', 'Chandauli']
  };
  
  if (!booth) return [];
  return villageMap[booth] || ['Village 1'];
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
  
  const stateProjects = {};
  DEVELOPMENT_PROJECTS.forEach(p => {
    const state = p.state || 'Chhattisgarh';
    if (!stateProjects[state]) stateProjects[state] = 0;
    stateProjects[state]++;
  });
  
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
    delayedProjects,
    stateProjects
  };
};

// ============ RBAC HELPER FUNCTIONS ============

// Check if user can access a specific page
export const canAccessPage = (user, page) => {
  if (!user) return false;
  
  const role = user.role;
  
  // Pages restricted from users (citizens)
  const restrictedForUsers = ['voters', 'funding', 'jansabha', 'volunteers', 'registrations', 'notifications', 'meetings'];
  
  // Users (citizens) cannot access restricted pages
  if (role === 'USER') {
    if (restrictedForUsers.includes(page)) return false;
    return true;
  }
  
  // All other roles can access everything
  return true;
};

// Check if user can update/delete (write operations) - Users cannot write
export const canWrite = (user) => {
  if (!user) return false;
  return user.role !== 'USER';
};

// Get users by role
export const getUsersByRole = (role) => {
  return USERS.filter(u => u.role === role);
};

// Get ministers
export const getMinisters = () => {
  return USERS.filter(u => u.role === 'Minister');
};

// Get projects by state
export const getProjectsByState = (state) => {
  return DEVELOPMENT_PROJECTS.filter(p => p.state === state);
};

// Get projects by district
export const getProjectsByDistrict = (district) => {
  return DEVELOPMENT_PROJECTS.filter(p => p.district === district);
};

// Get projects by constituency
export const getProjectsByConstituency = (constituency) => {
  return DEVELOPMENT_PROJECTS.filter(p => p.constituency === constituency);
};

// Get projects by minister
export const getProjectsByMinister = (ministerName) => {
  return DEVELOPMENT_PROJECTS.filter(p => p.createdBy === ministerName);
};
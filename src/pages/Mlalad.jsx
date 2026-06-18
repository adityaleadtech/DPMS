import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet, 
  Search, 
  XCircle, 
  Users, 
  MapPin, 
  IndianRupee,
  Download,
  Printer,
  Eye,
  Plus,
  Edit,
  Calendar,
  FileText,
  Building2,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  PieChart,
  Award,
  User,
  Filter,
  Target,
  CheckSquare,
  Clock as ClockIcon,
  AlertCircle,
  Sprout,
  Image as ImageIcon,
  X
} from 'lucide-react';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import { useAuth } from '../context/AuthContext';
import { canAccessPage, canWrite } from '../api/data';

// MLA LED Fund Data - Agriculture Minister themed
const MLA_LED_FUND_DATA = [
  {
    id: 'MLF001',
    mlaName: 'Ram Vichar Netam',
    constituency: 'Ramanujganj',
    district: 'Balrampur',
    state: 'Chhattisgarh',
    financialYear: '2025-26',
    designation: 'Minister of Agriculture',

    totalFund: 40000000,      // ₹4 Crore
    utilized: 28600000,       // ₹2.86 Crore
    balance: 11400000,        // ₹1.14 Crore

    status: 'Active',

    projects: [
      {
        id: 'P001',
        name: 'Farm Pond Construction for Small Farmers',
        category: 'Agriculture Infrastructure',
        location: 'Aragahi Village',
        amount: 6500000,
        status: 'Completed',
        progress: 100,
        executingAgency: 'Agriculture Department',
        startDate: '2025-04-05',
        expectedCompletion: '2025-06-30',
        actualCompletion: '2025-06-25',
        images: [
          'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=600&h=400&fit=crop',
          'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop',
          'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop'
        ],
        documents: [],
        remarks: '20 farm ponds constructed benefiting 45 farmers'
      },
      {
        id: 'P002',
        name: 'Organic Farming Demonstration Centre',
        category: 'Agriculture Extension',
        location: 'Bhawanipur',
        amount: 4500000,
        status: 'In Progress',
        progress: 75,
        executingAgency: 'Agriculture Department',
        startDate: '2025-04-18',
        expectedCompletion: '2025-08-15',
        actualCompletion: null,
        images: [
          'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
          'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&h=400&fit=crop'
        ],
        documents: [],
        remarks: 'Organic farming training centre under construction'
      },
      {
        id: 'P003',
        name: 'Solar Powered Drip Irrigation System',
        category: 'Irrigation',
        location: 'Bagra Village',
        amount: 2200000,
        status: 'Completed',
        progress: 100,
        executingAgency: 'Agriculture Department',
        startDate: '2025-05-08',
        expectedCompletion: '2025-07-15',
        actualCompletion: '2025-07-10',
        images: [
          'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=600&h=400&fit=crop',
          'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop'
        ],
        documents: [],
        remarks: 'Solar drip irrigation installed in 12 acres'
      },
      {
        id: 'P004',
        name: 'Agri-Processing Unit for Farmers Producer Organization',
        category: 'Agri-Processing',
        location: 'Ramanujganj',
        amount: 8200000,
        status: 'In Progress',
        progress: 60,
        executingAgency: 'Agriculture Department',
        startDate: '2025-06-02',
        expectedCompletion: '2025-09-30',
        actualCompletion: null,
        images: [
          'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&h=400&fit=crop',
          'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop'
        ],
        documents: [],
        remarks: 'Processing unit structure ready, equipment installation pending'
      },
      {
        id: 'P005',
        name: 'Paddy Straw Management & Compost Production',
        category: 'Agriculture Waste Management',
        location: 'Banapati',
        amount: 7200000,
        status: 'Approved',
        progress: 15,
        executingAgency: 'Agriculture Department',
        startDate: '2025-06-25',
        expectedCompletion: '2025-12-31',
        actualCompletion: null,
        images: [
          'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=600&h=400&fit=crop',
          'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=600&h=400&fit=crop'
        ],
        documents: [],
        remarks: 'Compost units planned for 5 villages'
      }
    ],

    allocations: [
      { date: '2025-04-05', amount: 6500000, purpose: 'Farm Pond Construction' },
      { date: '2025-04-18', amount: 4500000, purpose: 'Organic Farming Centre' },
      { date: '2025-05-08', amount: 2200000, purpose: 'Solar Drip Irrigation' },
      { date: '2025-06-02', amount: 8200000, purpose: 'Agri-Processing Unit' },
      { date: '2025-06-25', amount: 7200000, purpose: 'Paddy Straw Management' }
    ],

    startDate: '2025-04-01',
    endDate: '2026-03-31',

    block: 'Ramanujganj Block',
    panchayat: 'Multiple Panchayats',
    village: 'Multiple Villages',

    createdBy: 'Ram Vichar Netam',
    createdDate: '2025-04-01'
  }
];

// Stats Card Component
const StatsCard = ({ title, value, icon, color, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'white',
        padding: '1.25rem',
        borderRadius: '0.75rem',
        border: '1px solid #f0f0f0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div>
          <p style={{ fontSize: '0.75rem', color: '#737373' }}>{title}</p>
          <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#1a1a1a' }}>{value}</p>
          {subtitle && <p style={{ fontSize: '0.7rem', color: '#737373' }}>{subtitle}</p>}
        </div>
        <div style={{ 
          padding: '0.5rem', 
          borderRadius: '0.5rem', 
          background: color,
          color: 'white'
        }}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

// MLA Profile Card
const MlaProfileCard = ({ fund }) => {
  const utilization = Math.round((fund.utilized / fund.totalFund) * 100);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%)',
        padding: '1.5rem',
        borderRadius: '0.75rem',
        color: 'white',
        marginBottom: '1.5rem',
        border: '1px solid #fecaca'
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem'
            }}>
              🌾
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{fund.mlaName}</h3>
              <p style={{ fontSize: '0.85rem', opacity: 0.9 }}>{fund.designation}</p>
              <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>MLA, {fund.constituency} Assembly Constituency</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', opacity: 0.9 }}>
            <span>📍 {fund.district} District</span>
            <span>|</span>
            <span>🏛️ {fund.state}</span>
          </div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.7rem', opacity: 0.8 }}>Financial Year</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{fund.financialYear}</p>
          <p style={{ fontSize: '0.7rem', opacity: 0.8 }}>{fund.startDate} - {fund.endDate}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', textAlign: 'center' }}>
          <div>
            <p style={{ fontSize: '0.6rem', opacity: 0.8 }}>MLALAD Allocation</p>
            <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>₹{(fund.totalFund/10000000).toFixed(2)}Cr</p>
          </div>
          <div>
            <p style={{ fontSize: '0.6rem', opacity: 0.8 }}>Utilized</p>
            <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>₹{(fund.utilized/10000000).toFixed(2)}Cr</p>
          </div>
          <div>
            <p style={{ fontSize: '0.6rem', opacity: 0.8 }}>Projects</p>
            <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{fund.projects.length}</p>
          </div>
        </div>
      </div>
      
      {/* Utilization Bar */}
      <div style={{ marginTop: '1rem', background: 'rgba(255,255,255,0.15)', borderRadius: '0.5rem', padding: '0.5rem 1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
          <span>Overall Utilization</span>
          <span style={{ fontWeight: 'bold' }}>{utilization}%</span>
        </div>
        <div style={{ height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '9999px', overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${utilization}%` }}
            transition={{ duration: 1 }}
            style={{ 
              height: '100%', 
              background: utilization >= 70 ? '#22c55e' : utilization >= 40 ? '#f59e0b' : '#ef4444',
              borderRadius: '9999px'
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

// Image Lightbox Modal
const ImageLightbox = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <div 
      className="modal-overlay" 
      style={{ 
        zIndex: 3000, 
        background: 'rgba(0,0,0,0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{
          maxWidth: '90vw',
          maxHeight: '90vh',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '-40px',
            right: '-40px',
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '2rem',
            cursor: 'pointer',
            zIndex: 3001
          }}
        >
          ×
        </button>
        <img
          src={image}
          alt="Project"
          style={{
            maxWidth: '90vw',
            maxHeight: '85vh',
            objectFit: 'contain',
            borderRadius: '8px'
          }}
        />
      </motion.div>
    </div>
  );
};

// Detail Modal
const MlaLedFundDetailModal = ({ fund, onClose, isOpen }) => {
  const [lightboxImage, setLightboxImage] = useState(null);

  if (!isOpen || !fund) return null;

  const utilizationPercentage = Math.round((fund.utilized / fund.totalFund) * 100);
  const completedProjects = fund.projects.filter(p => p.status === 'Completed').length;
  const inProgressProjects = fund.projects.filter(p => p.status === 'In Progress').length;
  const approvedProjects = fund.projects.filter(p => p.status === 'Approved').length;

  return (
    <div className="modal-overlay" style={{ zIndex: 2000 }}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="modal-content"
        style={{ maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem' }}
      >
        {/* Image Lightbox */}
        {lightboxImage && (
          <ImageLightbox 
            image={lightboxImage} 
            onClose={() => setLightboxImage(null)} 
          />
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sprout size={22} color="#b91c1c" /> Agriculture Project Details
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#737373' }}>
              {fund.mlaName} · {fund.constituency} · FY {fund.financialYear}
            </p>
          </div>
          <button 
            onClick={onClose} 
            style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#737373' }}
          >
            ×
          </button>
        </div>

        {/* Fund Summary */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr 1fr 1fr', 
          gap: '0.75rem',
          marginBottom: '1.5rem',
          padding: '1rem',
          background: '#fafafa',
          borderRadius: '0.75rem',
          border: '1px solid #f0f0f0'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.6rem', color: '#737373' }}>Total Fund</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#b91c1c' }}>
              ₹{(fund.totalFund / 10000000).toFixed(2)}Cr
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.6rem', color: '#737373' }}>Utilized</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#2563eb' }}>
              ₹{(fund.utilized / 10000000).toFixed(2)}Cr
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.6rem', color: '#737373' }}>Balance</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#22c55e' }}>
              ₹{(fund.balance / 10000000).toFixed(2)}Cr
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.6rem', color: '#737373' }}>Progress</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#f59e0b' }}>
              {utilizationPercentage}%
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
            <span style={{ color: '#404040' }}>Utilization Progress</span>
            <span style={{ fontWeight: '600', color: '#b91c1c' }}>{utilizationPercentage}%</span>
          </div>
          <div style={{ height: '10px', background: '#f0f0f0', borderRadius: '9999px', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${utilizationPercentage}%` }}
              transition={{ duration: 1 }}
              style={{ 
                height: '100%', 
                background: utilizationPercentage >= 70 ? 'linear-gradient(90deg, #22c55e, #16a34a)' : 
                           utilizationPercentage >= 40 ? 'linear-gradient(90deg, #f59e0b, #d97706)' : 
                           'linear-gradient(90deg, #ef4444, #dc2626)',
                borderRadius: '9999px'
              }}
            />
          </div>
        </div>

        {/* Projects Section */}
        <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Building2 size={16} color="#b91c1c" /> Projects ({fund.projects.length})
          <span style={{ fontSize: '0.7rem', fontWeight: '400', color: '#737373' }}>
            · {completedProjects} Completed · {inProgressProjects} In Progress · {approvedProjects} Approved
          </span>
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {fund.projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{ 
                padding: '0.75rem 1rem',
                background: '#fafafa',
                borderRadius: '0.5rem',
                border: '1px solid #f0f0f0'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: '600' }}>{project.name}</span>
                    <span className={`status-badge ${
                      project.status === 'Completed' ? 'status-completed' : 
                      project.status === 'In Progress' ? 'status-scheduled' : 
                      'status-pending'
                    }`} style={{ fontSize: '0.6rem' }}>
                      {project.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#737373', marginTop: '0.25rem' }}>
                    <span>📂 {project.category}</span>
                    <span style={{ marginLeft: '0.75rem' }}>📍 {project.location}</span>
                    <span style={{ marginLeft: '0.75rem' }}>🏢 {project.executingAgency}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: '600', color: '#b91c1c' }}>₹{(project.amount/100000).toFixed(1)}L</div>
                  <div style={{ fontSize: '0.7rem', color: '#737373' }}>
                    {project.progress}% Complete
                  </div>
                </div>
              </div>

              {/* Images Gallery */}
              {project.images && project.images.length > 0 && (
                <div style={{ marginTop: '0.75rem' }}>
                  <div style={{ fontSize: '0.7rem', color: '#737373', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <ImageIcon size={14} /> Project Images ({project.images.length})
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {project.images.map((img, idx) => (
                      <motion.img
                        key={idx}
                        src={img}
                        alt={`${project.name} - ${idx + 1}`}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setLightboxImage(img)}
                        style={{
                          width: '80px',
                          height: '80px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          border: '1px solid #e5e5e5',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div style={{ height: '4px', background: '#f0f0f0', borderRadius: '9999px', overflow: 'hidden', marginTop: '0.75rem' }}>
                <div style={{ 
                  width: `${project.progress}%`, 
                  height: '100%', 
                  background: project.progress === 100 ? '#22c55e' : project.progress >= 50 ? '#f59e0b' : '#ef4444',
                  borderRadius: '9999px'
                }} />
              </div>
              {project.remarks && (
                <div style={{ fontSize: '0.7rem', color: '#404040', marginTop: '0.25rem', fontStyle: 'italic' }}>
                  💬 {project.remarks}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Allocations */}
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={16} color="#b91c1c" /> Fund Allocations
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {fund.allocations.map((alloc, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '0.5rem 1rem',
                background: '#fafafa',
                borderRadius: '0.5rem',
                border: '1px solid #f0f0f0'
              }}>
                <div>
                  <span style={{ fontWeight: '500' }}>{alloc.purpose}</span>
                  <span style={{ fontSize: '0.7rem', color: '#737373', marginLeft: '0.5rem' }}>{alloc.date}</span>
                </div>
                <span style={{ fontWeight: '600', color: '#b91c1c' }}>₹{(alloc.amount/100000).toFixed(1)}L</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', borderTop: '1px solid #f0f0f0', paddingTop: '1rem' }}>
          <button className="btn-primary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Plus size={18} /> Allocate Fund
          </button>
          <button className="btn-outline" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Edit size={18} /> Edit
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// Create Fund Modal
const CreateMlaLedFundModal = ({ isOpen, onClose, onFundCreated }) => {
  const [formData, setFormData] = useState({
    projectName: '',
    category: '',
    location: '',
    amount: '',
    startDate: '',
    expectedCompletion: '',
    executingAgency: ''
  });

  const [errors, setErrors] = useState({});
  const categories = [
    'Agriculture Infrastructure', 
    'Agriculture Extension', 
    'Irrigation', 
    'Agri-Processing', 
    'Agriculture Waste Management',
    'Farm Mechanization',
    'Crop Development',
    'Soil Conservation'
  ];
  const agencies = ['Agriculture Department', 'Irrigation Department', 'Soil Conservation Department', 'Rural Development'];

  if (!isOpen) return null;

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.projectName) newErrors.projectName = 'Project name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.amount) newErrors.amount = 'Amount is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const fund = MLA_LED_FUND_DATA[0];
    const newProject = {
      id: `P${String(fund.projects.length + 1).padStart(3, '0')}`,
      name: formData.projectName,
      category: formData.category,
      location: formData.location,
      amount: parseFloat(formData.amount),
      status: 'Approved',
      progress: 0,
      executingAgency: formData.executingAgency || 'Agriculture Department',
      startDate: formData.startDate,
      expectedCompletion: formData.expectedCompletion || '2026-03-31',
      actualCompletion: null,
      images: [],
      documents: [],
      remarks: 'New agriculture project approved'
    };

    fund.projects.push(newProject);
    fund.allocations.push({
      date: new Date().toISOString().split('T')[0],
      amount: parseFloat(formData.amount),
      purpose: formData.projectName
    });

    if (onFundCreated) onFundCreated();
    onClose();
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 2000 }}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="modal-content"
        style={{ maxWidth: '600px', padding: '2rem' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sprout size={22} color="#b91c1c" /> Add New Agriculture Project
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#737373' }}>Add a new agriculture project under MLALAD fund</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#737373' }}>×</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Project Name <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              value={formData.projectName}
              onChange={(e) => setFormData({...formData, projectName: e.target.value})}
              placeholder="Enter project name"
              style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.projectName ? '#ef4444' : '#e5e5e5'}`, borderRadius: '0.5rem', outline: 'none' }}
            />
            {errors.projectName && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.projectName}</span>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Category <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.category ? '#ef4444' : '#e5e5e5'}`, borderRadius: '0.5rem', background: 'white' }}
            >
              <option value="">Select Category</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.category && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.category}</span>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Location <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="Enter location"
              style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.location ? '#ef4444' : '#e5e5e5'}`, borderRadius: '0.5rem', outline: 'none' }}
            />
            {errors.location && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.location}</span>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Amount (₹) <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              placeholder="Enter amount"
              style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.amount ? '#ef4444' : '#e5e5e5'}`, borderRadius: '0.5rem', outline: 'none' }}
            />
            {errors.amount && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.amount}</span>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Start Date <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.startDate ? '#ef4444' : '#e5e5e5'}`, borderRadius: '0.5rem', outline: 'none' }}
            />
            {errors.startDate && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.startDate}</span>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Expected Completion
            </label>
            <input
              type="date"
              value={formData.expectedCompletion}
              onChange={(e) => setFormData({...formData, expectedCompletion: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', outline: 'none' }}
            />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Executing Agency
            </label>
            <select
              value={formData.executingAgency}
              onChange={(e) => setFormData({...formData, executingAgency: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white' }}
            >
              <option value="">Select Agency</option>
              {agencies.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', borderTop: '1px solid #f0f0f0', paddingTop: '1rem' }}>
          <button className="btn-primary" onClick={handleSubmit} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Sprout size={18} /> Add Project
          </button>
          <button className="btn-outline" onClick={onClose} style={{ flex: 1 }}>Cancel</button>
        </div>
      </motion.div>
    </div>
  );
};

const Mlalad = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [funds, setFunds] = useState(MLA_LED_FUND_DATA);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const canUpdate = canWrite(user);
  const isUser = user?.role === 'USER';

  if (!canAccessPage(user, 'mla-led-fund')) {
    return (
      <LayoutWrapper>
        <div style={{ textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '0.75rem', border: '1px solid #f0f0f0' }}>
          <Wallet size={48} color="#737373" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.5rem', color: '#b91c1c', marginTop: '1rem' }}>Access Denied</h2>
          <p style={{ color: '#737373' }}>You don't have permission to view MLA LED Fund.</p>
        </div>
      </LayoutWrapper>
    );
  }

  const fund = funds[0];
  const totalFunds = fund ? fund.totalFund : 0;
  const totalUtilized = fund ? fund.utilized : 0;
  const totalBalance = fund ? fund.balance : 0;

  // Get unique categories from projects
  const categories = fund ? [...new Set(fund.projects.map(p => p.category))] : [];
  const statuses = ['All', 'Completed', 'In Progress', 'Approved'];

  // Filter projects
  const filteredProjects = fund ? fund.projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === '' || p.category === selectedCategory;
    const matchesStatus = selectedStatus === '' || p.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  }) : [];

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setSelectedStatus('');
  };

  const hasActiveFilters = search || selectedCategory || selectedStatus;

  // Get project stats
  const completedProjects = fund ? fund.projects.filter(p => p.status === 'Completed').length : 0;
  const inProgressProjects = fund ? fund.projects.filter(p => p.status === 'In Progress').length : 0;
  const approvedProjects = fund ? fund.projects.filter(p => p.status === 'Approved').length : 0;

  // Export CSV
  const exportCSV = () => {
    if (!fund) return;
    const headers = ['S.No', 'Project Name', 'Category', 'Location', 'Amount', 'Status', 'Progress', 'Executing Agency', 'Start Date', 'Expected Completion'];
    const rows = filteredProjects.map((p, i) => [
      i + 1,
      p.name,
      p.category,
      p.location,
      p.amount,
      p.status,
      p.progress,
      p.executingAgency || 'N/A',
      p.startDate || 'N/A',
      p.expectedCompletion || 'N/A'
    ]);

    let csvContent = '\uFEFF';
    csvContent += headers.join(',') + '\n';
    rows.forEach(row => {
      const escapedRow = row.map(field => {
        if (typeof field === 'string' && (field.includes(',') || field.includes('"') || field.includes('\n'))) {
          return `"${field.replace(/"/g, '""')}"`;
        }
        return field;
      });
      csvContent += escapedRow.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `mlalad_projects_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handle view project details
  const handleViewProject = (projectId) => {
    setSelectedProjectId(projectId);
    setShowModal(true);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProjectId(null);
  };

  if (!fund) {
    return (
      <LayoutWrapper>
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <p>No fund data available</p>
        </div>
      </LayoutWrapper>
    );
  }

  // Get selected project for modal
  const selectedProject = fund.projects.find(p => p.id === selectedProjectId);
  const selectedFundForModal = selectedProject ? {
    ...fund,
    projects: [selectedProject]
  } : null;

  return (
    <LayoutWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div style={{ 
          marginBottom: '1.5rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sprout size={24} color="#b91c1c" /> Ram Vichar Netam MLALAD Dashboard
            </h2>
            <p style={{ color: '#737373' }}>
              Agriculture Minister · MLA Local Area Development Fund Utilization · {fund.constituency} · FY {fund.financialYear}
            </p>
          </div>
          {!isUser && (
            <button className="btn-primary" onClick={() => setShowCreateModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sprout size={18} /> Add Project
            </button>
          )}
        </div>

        {/* MLA Profile Card */}
        <MlaProfileCard fund={fund} />

        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <StatsCard 
            title="Total Allocation" 
            value={`₹${(totalFunds / 10000000).toFixed(2)} Cr`} 
            icon={<IndianRupee size={20} />} 
            color="#b91c1c"
          />
          <StatsCard 
            title="Utilized" 
            value={`₹${(totalUtilized / 10000000).toFixed(2)} Cr`} 
            icon={<TrendingUp size={20} />} 
            color="#2563eb"
            subtitle={`${Math.round((totalUtilized / totalFunds) * 100)}% utilized`}
          />
          <StatsCard 
            title="Remaining" 
            value={`₹${(totalBalance / 10000000).toFixed(2)} Cr`} 
            icon={<Wallet size={20} />} 
            color="#22c55e"
          />
          <StatsCard 
            title="Agriculture Projects" 
            value={fund.projects.length} 
            icon={<Sprout size={20} />} 
            color="#8b5cf6"
            subtitle={`${completedProjects} Completed · ${inProgressProjects} In Progress · ${approvedProjects} Approved`}
          />
        </div>

        {/* Filters */}
        <div style={{ 
          background: 'white',
          padding: '1rem',
          borderRadius: '0.75rem',
          border: '1px solid #f0f0f0',
          marginBottom: '1rem'
        }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
            <div style={{ flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fafafa', border: '1px solid #e5e5e5', borderRadius: '0.5rem', padding: '0 0.75rem' }}>
              <Search size={16} color="#737373" />
              <input
                type="text"
                placeholder="Search projects or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ flex: 1, padding: '0.4rem 0', border: 'none', outline: 'none', fontSize: '0.85rem', background: 'transparent' }}
              />
              {search && <XCircle size={14} color="#737373" style={{ cursor: 'pointer' }} onClick={() => setSearch('')} />}
            </div>

            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ padding: '0.4rem 0.8rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white', outline: 'none', minWidth: '160px' }}
            >
              <option value="">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select 
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{ padding: '0.4rem 0.8rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white', outline: 'none', minWidth: '120px' }}
            >
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            {hasActiveFilters && (
              <button onClick={clearFilters} className="btn-outline btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.3rem 0.6rem' }}>
                <XCircle size={14} /> Clear All
              </button>
            )}
          </div>

          {/* Filter Summary */}
          {hasActiveFilters && (
            <div style={{ 
              display: 'flex', 
              gap: '0.3rem', 
              flexWrap: 'wrap',
              paddingTop: '0.3rem',
              borderTop: '1px solid #f5f5f5',
              fontSize: '0.7rem'
            }}>
              <span style={{ fontWeight: '600', color: '#404040' }}>Active Filters:</span>
              {search && <span className="status-badge status-active" style={{ fontSize: '0.55rem', padding: '0.1rem 0.4rem' }}>🔍 {search}</span>}
              {selectedCategory && <span className="status-badge" style={{ fontSize: '0.55rem', padding: '0.1rem 0.4rem', background: '#dbeafe', color: '#1e40af' }}>📂 {selectedCategory}</span>}
              {selectedStatus && selectedStatus !== 'All' && <span className="status-badge status-completed" style={{ fontSize: '0.55rem', padding: '0.1rem 0.4rem' }}>📊 {selectedStatus}</span>}
            </div>
          )}
        </div>

        {/* Results Count & Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ fontSize: '0.85rem', color: '#737373' }}>
            Showing {filteredProjects.length} of {fund.projects.length} agriculture projects
          </p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn-outline btn-sm" onClick={exportCSV} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Download size={14} /> Export CSV
            </button>
            <button className="btn-outline btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Printer size={14} /> Print
            </button>
          </div>
        </div>

        {/* Project Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid #f0f0f0', overflow: 'hidden', transition: 'all 0.3s' }}
            >
              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <div>
                    <h4 style={{ fontWeight: '600', fontSize: '1rem', color: '#1a1a1a' }}>{project.name}</h4>
                    <p style={{ fontSize: '0.75rem', color: '#737373' }}>{project.category}</p>
                  </div>
                  <span className={`status-badge ${
                    project.status === 'Completed' ? 'status-completed' : 
                    project.status === 'In Progress' ? 'status-scheduled' : 
                    'status-pending'
                  }`}>
                    {project.status}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', fontSize: '0.7rem', color: '#737373', marginBottom: '0.75rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <MapPin size={12} /> {project.location}
                  </span>
                  {project.executingAgency && (
                    <><span>·</span><span>🏢 {project.executingAgency}</span></>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem', padding: '0.5rem', background: '#fafafa', borderRadius: '0.5rem' }}>
                  <div>
                    <div style={{ fontSize: '0.55rem', color: '#737373' }}>Amount</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#b91c1c' }}>₹{(project.amount/100000).toFixed(1)}L</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.55rem', color: '#737373' }}>Progress</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: project.progress === 100 ? '#22c55e' : project.progress >= 50 ? '#f59e0b' : '#ef4444' }}>
                      {project.progress}%
                    </div>
                  </div>
                </div>

                {/* Project Images Thumbnails */}
                {project.images && project.images.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    {project.images.slice(0, 3).map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt=""
                        style={{
                          width: '40px',
                          height: '40px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                          border: '1px solid #e5e5e5'
                        }}
                      />
                    ))}
                    {project.images.length > 3 && (
                      <span style={{ fontSize: '0.6rem', color: '#737373', display: 'flex', alignItems: 'center' }}>
                        +{project.images.length - 3}
                      </span>
                    )}
                  </div>
                )}

                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ height: '5px', background: '#f0f0f0', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: `${project.progress}%`, 
                      height: '100%', 
                      background: project.progress === 100 ? '#22c55e' : project.progress >= 50 ? '#f59e0b' : '#ef4444',
                      borderRadius: '9999px'
                    }} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.65rem', color: '#737373', marginBottom: '0.75rem' }}>
                  <span><Calendar size={12} style={{ display: 'inline' }} /> {project.startDate || 'N/A'}</span>
                  <span>→</span>
                  <span>{project.expectedCompletion || 'N/A'}</span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid #f0f0f0', paddingTop: '0.75rem' }}>
                  <button 
                    onClick={() => handleViewProject(project.id)}
                    className="btn-primary" 
                    style={{ flex: 1, padding: '0.4rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}
                  >
                    <Eye size={14} /> View Details
                  </button>
                  {canUpdate && (
                    <button 
                      className="btn-outline" 
                      style={{ flex: 1, padding: '0.4rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}
                    >
                      <Edit size={14} /> Edit
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '0.75rem', border: '1px solid #f0f0f0' }}>
            <Sprout size={48} color="#737373" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1a1a1a' }}>No agriculture projects found</h3>
            <p style={{ color: '#737373', marginTop: '0.25rem' }}>Try adjusting your filters or add a new project</p>
            {!isUser && <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={() => setShowCreateModal(true)}><Sprout size={16} /> Add Project</button>}
          </div>
        )}

        {/* Modals */}
        <MlaLedFundDetailModal 
          fund={selectedFundForModal}
          isOpen={showModal}
          onClose={handleCloseModal}
        />

        <CreateMlaLedFundModal 
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onFundCreated={() => setFunds([...MLA_LED_FUND_DATA])}
        />
      </motion.div>
    </LayoutWrapper>
  );
};

export default Mlalad;
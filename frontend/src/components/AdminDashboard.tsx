import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Ticket,
  Calendar,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  Save,
  RefreshCw,
  TrendingUp,
  DollarSign,
  MapPin,
  Plane,
  Image,
  Award
} from 'lucide-react';
import { fetchBookings, updateBookingStatus, deleteBooking } from '../lib/bookingApi';
import { fetchConsultations, updateConsultationStatus, deleteConsultation } from '../lib/consultationApi';
import { Booking, VisaConsultation } from '../types';

interface AdminDashboardProps {
  siteContent: any;
  onSaveContent: (updatedContent: any) => Promise<boolean>;
  onLogout: () => void;
  token: string;
}

export default function AdminDashboard({ siteContent, onSaveContent, onLogout, token }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'consultations' | 'content'>('overview');
  const [contentSubTab, setContentSubTab] = useState<'general' | 'destinations' | 'packages' | 'hajj' | 'visas' | 'airlines' | 'gallery'>('general');

  // Data lists
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [consultations, setConsultations] = useState<VisaConsultation[]>([]);
  const [loadingLists, setLoadingLists] = useState(false);

  // Local copy of site content for edits
  const [localContent, setLocalContent] = useState<any>(null);
  const [isSavingContent, setIsSavingContent] = useState(false);

  // Modal / Add Edit state helpers
  const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null);
  const [editingItemType, setEditingItemType] = useState<string | null>(null);
  const [tempItem, setTempItem] = useState<any>({});

  // Custom confirmation dialog state (replaces browser confirm() to avoid blinking)
  const [confirmDialog, setConfirmDialog] = useState<{ message: string; onConfirm: () => void } | null>(null);

  // Toast notification state (replaces browser alert() to avoid blinking)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (siteContent) {
      setLocalContent(JSON.parse(JSON.stringify(siteContent)));
    }
  }, [siteContent]);

  const loadBackendData = async () => {
    setLoadingLists(true);
    try {
      const bData = await fetchBookings(token);
      const cData = await fetchConsultations(token);
      setBookings(bData);
      setConsultations(cData);
    } catch (err) {
      console.error('Error fetching admin list data:', err);
    } finally {
      setLoadingLists(false);
    }
  };

  useEffect(() => {
    loadBackendData();
  }, [token]);

  if (!localContent) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center font-sans">
        <div className="text-center space-y-4">
          <RefreshCw className="w-10 h-10 text-accent animate-spin mx-auto" />
          <p className="text-sm font-semibold tracking-wider text-gray-400">LOADING CONTROL DATABASE...</p>
        </div>
      </div>
    );
  }

  // Statistics calculation
  const totalRevenue = bookings
    .filter((b) => b.status === 'Confirmed')
    .reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  const activeBookingsCount = bookings.length;
  const activeConsultationsCount = consultations.length;

  // Handle general copy change (deep-clone nested objects so React detects changes)
  const handleGeneralChange = (section: string, key: string, value: any) => {
    setLocalContent((prev: any) => {
      const copy = JSON.parse(JSON.stringify(prev));
      if (!copy[section]) copy[section] = {};
      copy[section][key] = value;
      return copy;
    });
  };

  const handleGeneralDeepChange = (section: string, subkey: string, key: string, value: any) => {
    setLocalContent((prev: any) => {
      const copy = JSON.parse(JSON.stringify(prev));
      if (!copy[section]) copy[section] = {};
      if (!copy[section][subkey]) copy[section][subkey] = {};
      copy[section][subkey][key] = value;
      return copy;
    });
  };

  // Save the entire edited content JSON to backend
  const handleSaveAllContent = async () => {
    setIsSavingContent(true);
    try {
      const success = await onSaveContent(localContent);
      if (success) {
        setToast({ message: ' System database updated dynamically!', type: 'success' });
      } else {
        setToast({ message: 'Error synchronizing adjustments. Try again.', type: 'error' });
      }
    } catch (err) {
      console.error(err);
      setToast({ message: 'Unexpected error occurred.', type: 'error' });
    } finally {
      setIsSavingContent(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  // Bookings list operations
  const handleToggleBooking = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Confirmed' ? 'Pending' : 'Confirmed';
    try {
      await updateBookingStatus(id, nextStatus, token);
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: nextStatus } : b))
      );
    } catch (err) {
      alert('Unable to shift booking status.');
    }
  };

  const handleDeleteBooking = (id: string) => {
    setConfirmDialog({
      message: 'Are you sure you want to delete this booking entry permanently?',
      onConfirm: async () => {
        try {
          await deleteBooking(id, token);
          setBookings((prev) => prev.filter((b) => b.id !== id));
        } catch (err) {
          alert('Delete failed.');
        }
        setConfirmDialog(null);
      }
    });
  };

  // Consultations list operations
  const handleToggleConsultation = async (id: string, currentStatus: 'Scheduled' | 'Pending') => {
    const nextStatus = currentStatus === 'Scheduled' ? 'Pending' : 'Scheduled';
    try {
      await updateConsultationStatus(id, nextStatus, token);
      setConsultations((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: nextStatus } : c))
      );
    } catch (err) {
      alert('Unable to shift consultation status.');
    }
  };

  const handleDeleteConsultation = (id: string) => {
    setConfirmDialog({
      message: 'Delete this visa consultation request?',
      onConfirm: async () => {
        try {
          await deleteConsultation(id, token);
          setConsultations((prev) => prev.filter((c) => c.id !== id));
        } catch (err) {
          alert('Delete failed.');
        }
        setConfirmDialog(null);
      }
    });
  };

  // Dynamic content array builders
  const openItemModal = (type: string, index: number | null = null) => {
    setEditingItemType(type);
    setEditingItemIndex(index);
    if (index !== null) {
      // Edit existing
      setTempItem({ ...localContent[type][index] });
    } else {
      // Add new
      if (type === 'destinations') {
        setTempItem({ id: `dest-${Date.now()}`, name: '', country: '', rating: 4.8, image: '', description: '', attractionsCount: 10, averagePrice: 500 });
      } else if (type === 'packages') {
        setTempItem({ id: `pkg-${Date.now()}`, name: '', type: 'tour', destination: '', description: '', price: 299, duration: '5 Days, 4 Nights', image: '', rating: 4.8, reviewsCount: 12, inclusions: [], itinerary: [], spots: [], isFeatured: false });
      } else if (type === 'hajjPackages') {
        setTempItem({ id: `hu-${Date.now()}`, name: '', category: 'Umrah', tier: 'Standard', price: 999, duration: '14 Days', makkahHotel: '', makkahHotelRating: 4, madinahHotel: '', madinahHotelRating: 4, distanceToHaram: '', transportation: '', inclusions: [], features: [], registrationDeadline: '', itinerary: [] });
      } else if (type === 'visas') {
        setTempItem({ id: `visa-${Date.now()}`, country: '', flag: '🗺️', subtitle: '', processingTime: '', validity: '', fee: 100, requirements: [], requiredDocuments: [], explanation: '' });
      } else if (type === 'airlines') {
        setTempItem({ id: Date.now(), name: '', code: '', color: 'border-zinc-800', iconBg: 'bg-zinc-800', textColor: 'text-white', logoChar: '', type: 'international', rating: '4.5' });
      } else if (type === 'gallery') {
        setTempItem({ id: Date.now(), url: '', title: '', location: '', tag: 'Tour', aspectClass: 'h-80' });
      }
    }
  };

  const handleSaveTempItem = () => {
    if (!editingItemType) return;
    // Create a proper deep copy so we never mutate existing state
    const array = JSON.parse(JSON.stringify(localContent[editingItemType] || []));

    if (editingItemIndex !== null) {
      // Update existing item
      array[editingItemIndex] = { ...tempItem };
    } else {
      // Add new item
      array.push({ ...tempItem });
    }

    setLocalContent((prev: any) => ({
      ...prev,
      [editingItemType]: array
    }));

    // Reset Modal status
    setEditingItemType(null);
    setEditingItemIndex(null);
    setTempItem({});
  };

  const handleDeleteItem = (type: string, index: number) => {
    setConfirmDialog({
      message: 'Are you sure you want to remove this item?',
      onConfirm: () => {
        const array = JSON.parse(JSON.stringify(localContent[type] || []));
        array.splice(index, 1);
        setLocalContent((prev: any) => ({
          ...prev,
          [type]: array
        }));
        setConfirmDialog(null);
      }
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-gray-100 flex flex-col font-sans selection:bg-accent selection:text-white">

      {/* Top Navbar */}
      <header className="bg-zinc-900/90 border-b border-zinc-800 backdrop-blur-md px-8 py-4 flex justify-between items-center sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <div className="bg-accent/15 text-accent p-2 rounded-xl border border-accent/25">
            <Settings className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg text-white tracking-wide">TR Travel</h1>
            <span className="text-[10px] text-accent font-mono tracking-widest uppercase">Admin Operations Dashboard</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={loadBackendData}
            className="p-2 bg-zinc-800 hover:bg-zinc-700 text-gray-300 hover:text-white rounded-xl transition-all cursor-pointer flex items-center space-x-1.5 text-xs"
            title="Reload lists"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingLists ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>

          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-950/80 hover:bg-red-900 border border-red-900/35 hover:border-red-600 text-red-300 hover:text-white rounded-xl text-xs font-bold uppercase transition-all cursor-pointer flex items-center space-x-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Control Area */}
      <div className="flex-1 flex flex-col lg:flex-row">

        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-64 bg-zinc-900/40 lg:border-r border-zinc-800 p-6 flex flex-col space-y-2 shrink-0">
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-3 mb-2">Navigation Console</div>

          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full px-4 py-3 rounded-xl text-xs font-bold uppercase transition-all flex items-center space-x-3 cursor-pointer ${activeTab === 'overview'
              ? 'bg-accent/10 border border-accent/35 text-accent'
              : 'text-gray-400 hover:bg-zinc-800/50 hover:text-white border border-transparent'
              }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview Metrics</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`w-full px-4 py-3 rounded-xl text-xs font-bold uppercase transition-all flex items-center space-x-3 cursor-pointer ${activeTab === 'bookings'
              ? 'bg-accent/10 border border-accent/35 text-accent'
              : 'text-gray-400 hover:bg-zinc-800/50 hover:text-white border border-transparent'
              }`}
          >
            <Ticket className="w-4 h-4" />
            <span>User Tickets ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('consultations')}
            className={`w-full px-4 py-3 rounded-xl text-xs font-bold uppercase transition-all flex items-center space-x-3 cursor-pointer ${activeTab === 'consultations'
              ? 'bg-accent/10 border border-accent/35 text-accent'
              : 'text-gray-400 hover:bg-zinc-800/50 hover:text-white border border-transparent'
              }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Visa Chats ({consultations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`w-full px-4 py-3 rounded-xl text-xs font-bold uppercase transition-all flex items-center space-x-3 cursor-pointer ${activeTab === 'content'
              ? 'bg-accent/10 border border-accent/35 text-accent'
              : 'text-gray-400 hover:bg-zinc-800/50 hover:text-white border border-transparent'
              }`}
          >
            <Settings className="w-4 h-4" />
            <span>Edit Site Content</span>
          </button>

          {activeTab === 'content' && (
            <div className="pl-4 mt-2 space-y-1.5 border-l border-zinc-800 animate-slide-right">
              <button
                onClick={() => setContentSubTab('general')}
                className={`w-full text-left px-3 py-1.5 text-[11px] font-medium rounded transition-colors ${contentSubTab === 'general' ? 'text-accent font-bold' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Hero & Copy
              </button>
              <button
                onClick={() => setContentSubTab('destinations')}
                className={`w-full text-left px-3 py-1.5 text-[11px] font-medium rounded transition-colors ${contentSubTab === 'destinations' ? 'text-accent font-bold' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Destinations Matrix
              </button>
              <button
                onClick={() => setContentSubTab('packages')}
                className={`w-full text-left px-3 py-1.5 text-[11px] font-medium rounded transition-colors ${contentSubTab === 'packages' ? 'text-accent font-bold' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Tour Packages
              </button>
              <button
                onClick={() => setContentSubTab('hajj')}
                className={`w-full text-left px-3 py-1.5 text-[11px] font-medium rounded transition-colors ${contentSubTab === 'hajj' ? 'text-accent font-bold' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Hajj & Umrah Tiers
              </button>
              <button
                onClick={() => setContentSubTab('visas')}
                className={`w-full text-left px-3 py-1.5 text-[11px] font-medium rounded transition-colors ${contentSubTab === 'visas' ? 'text-accent font-bold' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Visa Service Info
              </button>
              <button
                onClick={() => setContentSubTab('airlines')}
                className={`w-full text-left px-3 py-1.5 text-[11px] font-medium rounded transition-colors ${contentSubTab === 'airlines' ? 'text-accent font-bold' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Partner Airlines
              </button>
              <button
                onClick={() => setContentSubTab('gallery')}
                className={`w-full text-left px-3 py-1.5 text-[11px] font-medium rounded transition-colors ${contentSubTab === 'gallery' ? 'text-accent font-bold' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Shared Memories
              </button>
            </div>
          )}
        </aside>

        {/* Dynamic Display Panel */}
        <main className="flex-1 p-8 overflow-y-auto max-w-7xl mx-auto w-full">

          {/* TAB 1: OVERVIEW METRICS */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold font-display text-white mb-1">Overview Dashboard</h2>
                <p className="text-xs text-gray-400">Continuous business metrics synced from live MongoDB server.</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Estimated Income</span>
                    <strong className="text-xl sm:text-2xl font-bold text-accent font-sans mt-1 block">${totalRevenue.toLocaleString()}</strong>
                  </div>
                  <div className="bg-accent/10 text-accent p-3.5 rounded-xl">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Total Bookings</span>
                    <strong className="text-xl sm:text-2xl font-bold text-white mt-1 block">{activeBookingsCount}</strong>
                  </div>
                  <div className="bg-emerald-500/10 text-emerald-400 p-3.5 rounded-xl">
                    <Ticket className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Visa Inquiries</span>
                    <strong className="text-xl sm:text-2xl font-bold text-white mt-1 block">{activeConsultationsCount}</strong>
                  </div>
                  <div className="bg-indigo-500/10 text-indigo-400 p-3.5 rounded-xl">
                    <Calendar className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Active Packages</span>
                    <strong className="text-xl sm:text-2xl font-bold text-white mt-1 block">
                      {localContent.packages?.length + localContent.hajjPackages?.length}
                    </strong>
                  </div>
                  <div className="bg-amber-500/10 text-amber-400 p-3.5 rounded-xl">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>

              </div>

              {/* Submissions Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Recent Bookings */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-zinc-800">
                    <h3 className="font-bold text-xs uppercase tracking-widest text-white">Recent Ticket Orders</h3>
                    <button onClick={() => setActiveTab('bookings')} className="text-[10px] font-bold text-accent uppercase hover:underline">View All</button>
                  </div>

                  {bookings.length === 0 ? (
                    <div className="text-center py-8 text-xs text-gray-500">No bookings logged yet.</div>
                  ) : (
                    <div className="space-y-3">
                      {bookings.slice(0, 5).map((b) => (
                        <div key={b.id} className="flex justify-between items-center text-xs p-3 bg-zinc-950 rounded-xl border border-zinc-850">
                          <div>
                            <strong className="text-gray-200 block truncate max-w-[200px]">{b.customerName}</strong>
                            <span className="text-[10px] text-gray-500">{b.packageName} • {b.travelDate}</span>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${b.status === 'Confirmed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' : 'bg-amber-950 text-amber-400 border border-amber-900'}`}>
                            {b.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recent Consultations */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-zinc-800">
                    <h3 className="font-bold text-xs uppercase tracking-widest text-white">Scheduled Visa Chats</h3>
                    <button onClick={() => setActiveTab('consultations')} className="text-[10px] font-bold text-accent uppercase hover:underline">View All</button>
                  </div>

                  {consultations.length === 0 ? (
                    <div className="text-center py-8 text-xs text-gray-500">No consultations scheduled.</div>
                  ) : (
                    <div className="space-y-3">
                      {consultations.slice(0, 5).map((c) => (
                        <div key={c.id} className="flex justify-between items-center text-xs p-3 bg-zinc-950 rounded-xl border border-zinc-850">
                          <div>
                            <strong className="text-gray-200 block">{c.name} ({c.country})</strong>
                            <span className="text-[10px] text-gray-500">{c.date} • {c.timeSlot}</span>
                          </div>
                          <span className="bg-indigo-950 text-indigo-400 border border-indigo-900 px-2 py-0.5 rounded text-[9px] font-bold uppercase">
                            {c.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: BOOKINGS TABLE */}
          {activeTab === 'bookings' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold font-display text-white mb-1">Booked Packages</h2>
                <p className="text-xs text-gray-400">Verify client receipts, modify booking status, or delete entries.</p>
              </div>

              {bookings.length === 0 ? (
                <div className="bg-zinc-900 border border-zinc-800 p-12 text-center text-sm text-gray-400 rounded-2xl">
                  No bookings matching search.
                </div>
              ) : (
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-sans text-gray-300">
                      <thead className="bg-zinc-950 text-[10px] text-zinc-500 font-bold uppercase tracking-wider border-b border-zinc-850">
                        <tr>
                          <th className="p-4">Ref Code / Date</th>
                          <th className="p-4">Customer</th>
                          <th className="p-4">Selected Package</th>
                          <th className="p-4">Seats / Date</th>
                          <th className="p-4">Total Settled</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-855">
                        {bookings.map((b) => (
                          <tr key={b.id} className="hover:bg-zinc-800/30 transition-colors">
                            <td className="p-4">
                              <span className="font-mono font-bold text-white block">{b.id}</span>
                              <span className="text-[10px] text-gray-500">{b.bookingDate}</span>
                            </td>
                            <td className="p-4">
                              <strong className="text-gray-150 block">{b.customerName}</strong>
                              <span className="text-[10px] text-gray-400">{b.customerEmail} • {b.customerPhone}</span>
                            </td>
                            <td className="p-4">
                              <span className="font-bold text-accent block">{b.packageName}</span>
                              <span className="text-[9px] uppercase tracking-wider text-gray-500">{b.packageType}</span>
                            </td>
                            <td className="p-4">
                              <span>{b.travelersCount} seat(s)</span>
                              <span className="block text-[10px] text-gray-400">{b.travelDate}</span>
                            </td>
                            <td className="p-4 font-bold text-white">${b.totalPrice}</td>
                            <td className="p-4">
                              <button
                                onClick={() => handleToggleBooking(b.id, b.status)}
                                className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider cursor-pointer border hover:opacity-85 ${b.status === 'Confirmed'
                                  ? 'bg-emerald-950 text-emerald-400 border-emerald-900'
                                  : 'bg-amber-950 text-amber-400 border-amber-900'
                                  }`}
                              >
                                {b.status}
                              </button>
                            </td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => handleDeleteBooking(b.id)}
                                className="p-2 bg-red-950/30 hover:bg-red-900 text-red-400 hover:text-white rounded-lg transition-colors border border-red-900/30 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CONSULTATIONS TABLE */}
          {activeTab === 'consultations' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold font-display text-white mb-1">Visa Consultation Requests</h2>
                <p className="text-xs text-gray-400">View virtual consultations requests, update schedule confirmation, or clear tickets.</p>
              </div>

              {consultations.length === 0 ? (
                <div className="bg-zinc-900 border border-zinc-800 p-12 text-center text-sm text-gray-400 rounded-2xl">
                  No consultation scheduling recorded.
                </div>
              ) : (
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-sans text-gray-300">
                      <thead className="bg-zinc-950 text-[10px] text-zinc-500 font-bold uppercase tracking-wider border-b border-zinc-850">
                        <tr>
                          <th className="p-4">Consult ID</th>
                          <th className="p-4">Contact</th>
                          <th className="p-4">Country Requested</th>
                          <th className="p-4">Preferred Slot</th>
                          <th className="p-4">Notes</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-855">
                        {consultations.map((c) => (
                          <tr key={c.id} className="hover:bg-zinc-800/30 transition-colors">
                            <td className="p-4 font-mono font-bold text-white">{c.id}</td>
                            <td className="p-4">
                              <strong className="text-gray-150 block">{c.name}</strong>
                              <span className="text-[10px] text-gray-400">{c.email} • {c.phone}</span>
                            </td>
                            <td className="p-4 font-bold text-accent">{c.country}</td>
                            <td className="p-4">
                              <span className="block">{c.date}</span>
                              <span className="text-[10px] text-gray-400">{c.timeSlot}</span>
                            </td>
                            <td className="p-4 max-w-[200px] truncate" title={c.notes}>{c.notes || 'None'}</td>
                            <td className="p-4">
                              <button
                                onClick={() => handleToggleConsultation(c.id, c.status as any)}
                                className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase border cursor-pointer hover:opacity-85 ${c.status === 'Scheduled'
                                  ? 'bg-emerald-950 text-emerald-400 border-emerald-900'
                                  : 'bg-amber-950 text-amber-400 border-amber-900'
                                  }`}
                              >
                                {c.status}
                              </button>
                            </td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => handleDeleteConsultation(c.id)}
                                className="p-2 bg-red-950/30 hover:bg-red-900 text-red-400 hover:text-white rounded-lg transition-colors border border-red-900/30 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CONTENT MANAGER */}
          {activeTab === 'content' && (
            <div className="space-y-8 animate-fade-in pb-16">

              {/* Header with Save Switch */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
                <div>
                  <h2 className="text-xl font-bold font-display text-white">Dynamic Content Customizer</h2>
                  <p className="text-xs text-gray-400">Edit fields locally first. Click "Save Config Database" to push changes live.</p>
                </div>
                <button
                  onClick={handleSaveAllContent}
                  disabled={isSavingContent}
                  className="px-6 py-3 bg-accent hover:bg-accent-dark disabled:bg-gray-700 text-zinc-950 disabled:text-gray-400 font-sans font-bold text-xs tracking-widest uppercase rounded-xl transition-all shadow-lg flex items-center space-x-2 cursor-pointer self-stretch sm:self-auto justify-center"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSavingContent ? 'Syncing...' : 'Save Config Database'}</span>
                </button>
              </div>

              {/* Sub-tab General COPY Editor */}
              {contentSubTab === 'general' && (
                <div className="space-y-8">

                  {/* Hero Copy */}
                  <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-accent border-b border-zinc-800 pb-2 flex items-center">
                      <Award className="w-4 h-4 mr-2" />
                      Hero Section Copy
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Badge Copy</label>
                        <input
                          type="text"
                          value={localContent.hero.badge}
                          onChange={(e) => handleGeneralChange('hero', 'badge', e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-850 p-3 text-xs text-white rounded-lg focus:outline-none focus:border-accent"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Background Image URL</label>
                        <input
                          type="text"
                          value={localContent.hero.backgroundImage}
                          onChange={(e) => handleGeneralChange('hero', 'backgroundImage', e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-850 p-3 text-xs text-white rounded-lg focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Main Headline</label>
                      <input
                        type="text"
                        value={localContent.hero.title}
                        onChange={(e) => handleGeneralChange('hero', 'title', e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-850 p-3 text-xs text-white rounded-lg focus:outline-none focus:border-accent"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Description Subtitle</label>
                      <textarea
                        rows={2}
                        value={localContent.hero.subtitle}
                        onChange={(e) => handleGeneralChange('hero', 'subtitle', e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-850 p-3 text-xs text-white rounded-lg focus:outline-none focus:border-accent resize-none"
                      />
                    </div>
                  </div>

                  {/* Brand Navbar & Footer details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-accent border-b border-zinc-800 pb-2">Navbar Header</h3>
                      <div>
                        <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Brand Name</label>
                        <input
                          type="text"
                          value={localContent.navbar.brand}
                          onChange={(e) => handleGeneralChange('navbar', 'brand', e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-850 p-3 text-xs text-white rounded-lg focus:outline-none focus:border-accent"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Tagline</label>
                        <input
                          type="text"
                          value={localContent.navbar.tagline}
                          onChange={(e) => handleGeneralChange('navbar', 'tagline', e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-850 p-3 text-xs text-white rounded-lg focus:outline-none focus:border-accent"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Navbar Phone</label>
                        <input
                          type="text"
                          value={localContent.navbar.phone}
                          onChange={(e) => handleGeneralChange('navbar', 'phone', e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-850 p-3 text-xs text-white rounded-lg focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-accent border-b border-zinc-800 pb-2">Footer Setup</h3>
                      <div>
                        <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={localContent.footer.description}
                          onChange={(e) => handleGeneralChange('footer', 'description', e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-850 p-3 text-xs text-white rounded-lg focus:outline-none focus:border-accent resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Copyright Statement</label>
                        <input
                          type="text"
                          value={localContent.footer.copyright}
                          onChange={(e) => handleGeneralChange('footer', 'copyright', e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-850 p-3 text-xs text-white rounded-lg focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>

                  </div>

                  {/* About Section copy */}
                  <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-accent border-b border-zinc-800 pb-2">Corporate Heritage (About Section)</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Eyebrow Headline</label>
                        <input
                          type="text"
                          value={localContent.about.eyebrow}
                          onChange={(e) => handleGeneralChange('about', 'eyebrow', e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-850 p-3 text-xs text-white rounded-lg focus:outline-none focus:border-accent"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Title</label>
                        <input
                          type="text"
                          value={localContent.about.title}
                          onChange={(e) => handleGeneralChange('about', 'title', e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-850 p-3 text-xs text-white rounded-lg focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Mission Title</label>
                        <input
                          type="text"
                          value={localContent.about.mission.title}
                          onChange={(e) => handleGeneralDeepChange('about', 'mission', 'title', e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-850 p-3 text-xs text-white rounded-lg focus:outline-none focus:border-accent"
                        />
                        <textarea
                          rows={2}
                          value={localContent.about.mission.description}
                          onChange={(e) => handleGeneralDeepChange('about', 'mission', 'description', e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-850 p-3 text-xs text-white rounded-lg focus:outline-none focus:border-accent resize-none mt-2"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Vision Title</label>
                        <input
                          type="text"
                          value={localContent.about.vision.title}
                          onChange={(e) => handleGeneralDeepChange('about', 'vision', 'title', e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-850 p-3 text-xs text-white rounded-lg focus:outline-none focus:border-accent"
                        />
                        <textarea
                          rows={2}
                          value={localContent.about.vision.description}
                          onChange={(e) => handleGeneralDeepChange('about', 'vision', 'description', e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-850 p-3 text-xs text-white rounded-lg focus:outline-none focus:border-accent resize-none mt-2"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Values Title</label>
                        <input
                          type="text"
                          value={localContent.about.values.title}
                          onChange={(e) => handleGeneralDeepChange('about', 'values', 'title', e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-850 p-3 text-xs text-white rounded-lg focus:outline-none focus:border-accent"
                        />
                        <textarea
                          rows={2}
                          value={localContent.about.values.description}
                          onChange={(e) => handleGeneralDeepChange('about', 'values', 'description', e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-850 p-3 text-xs text-white rounded-lg focus:outline-none focus:border-accent resize-none mt-2"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* Destinations Grid subeditor */}
              {contentSubTab === 'destinations' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-xs uppercase tracking-widest text-white">Active Destinations</h3>
                    <button
                      onClick={() => openItemModal('destinations')}
                      className="px-3.5 py-2 bg-accent text-zinc-950 text-xs font-bold uppercase rounded-lg flex items-center space-x-1 hover:opacity-90 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Destination</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(localContent.destinations || []).map((dest: any, index: number) => (
                      <div key={dest.id || index} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col justify-between">
                        <div>
                          <img src={dest.image} alt={dest.name} className="w-full h-36 object-cover" />
                          <div className="p-5 space-y-2">
                            <span className="text-[10px] text-accent font-bold uppercase tracking-wide flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {dest.country}
                            </span>
                            <h4 className="text-base font-bold text-white font-display">{dest.name}</h4>
                            <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">{dest.description}</p>
                          </div>
                        </div>
                        <div className="p-5 pt-0 border-t border-zinc-850/40 mt-2 flex justify-between items-center">
                          <span className="text-[10px] text-gray-500 font-mono">From: <strong>${dest.averagePrice}</strong></span>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openItemModal('destinations', index)}
                              className="p-2 bg-zinc-800 hover:bg-zinc-700 text-accent rounded-lg border border-zinc-700 cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem('destinations', index)}
                              className="p-2 bg-red-950/20 hover:bg-red-900/50 text-red-400 rounded-lg border border-red-900/30 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tour Packages subeditor */}
              {contentSubTab === 'packages' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-xs uppercase tracking-widest text-white">Active Tour Packages</h3>
                    <button
                      onClick={() => openItemModal('packages')}
                      className="px-3.5 py-2 bg-accent text-zinc-950 text-xs font-bold uppercase rounded-lg flex items-center space-x-1 hover:opacity-90 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Package</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(localContent.packages || []).map((pkg: any, index: number) => (
                      <div key={pkg.id || index} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col justify-between">
                        <div>
                          <img src={pkg.image} alt={pkg.name} className="w-full h-36 object-cover" />
                          <div className="p-5 space-y-2">
                            <div className="flex justify-between">
                              <span className="text-[9px] font-bold text-accent uppercase bg-accent/10 px-2 py-0.5 rounded">{pkg.type}</span>
                              {pkg.isFeatured && <span className="text-[9px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">Featured</span>}
                            </div>
                            <h4 className="text-sm font-bold text-white line-clamp-1">{pkg.name}</h4>
                            <p className="text-[11px] text-gray-500 font-medium">Destination: {pkg.destination} • {pkg.duration}</p>
                            <p className="text-[11px] text-gray-400 line-clamp-2">{pkg.description}</p>
                          </div>
                        </div>
                        <div className="p-5 pt-0 border-t border-zinc-850/40 mt-2 flex justify-between items-center">
                          <span className="text-xs font-bold text-white font-sans">${pkg.price} <span className="text-[10px] text-gray-500 font-normal">USD</span></span>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openItemModal('packages', index)}
                              className="p-2 bg-zinc-800 hover:bg-zinc-700 text-accent rounded-lg border border-zinc-700 cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem('packages', index)}
                              className="p-2 bg-red-950/20 hover:bg-red-900/50 text-red-400 rounded-lg border border-red-900/30 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hajj and Umrah subeditor */}
              {contentSubTab === 'hajj' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-xs uppercase tracking-widest text-white">Hajj & Umrah Tiers</h3>
                    <button
                      onClick={() => openItemModal('hajjPackages')}
                      className="px-3.5 py-2 bg-accent text-zinc-950 text-xs font-bold uppercase rounded-lg flex items-center space-x-1 hover:opacity-90 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Pilgrimage pkg</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {(localContent.hajjPackages || []).map((pkg: any, index: number) => (
                      <div key={pkg.id || index} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-emerald-500/10 text-emerald-400">{pkg.category}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-amber-500/10 text-amber-400">{pkg.tier}</span>
                          </div>
                          <h4 className="text-base font-bold text-white">{pkg.name}</h4>
                          <div className="text-[11px] text-gray-400 space-y-1 font-mono">
                            <div>🏢 Makkah: {pkg.makkahHotel} ({pkg.makkahHotelRating}★)</div>
                            <div>🏢 Madinah: {pkg.madinahHotel} ({pkg.madinahHotelRating}★)</div>
                            <div>🚌 Transport: {pkg.transportation}</div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center border-t border-zinc-850 pt-4 mt-2">
                          <strong className="text-sm font-sans text-accent">${pkg.price} USD</strong>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openItemModal('hajjPackages', index)}
                              className="p-2 bg-zinc-800 hover:bg-zinc-700 text-accent rounded-lg border border-zinc-700 cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem('hajjPackages', index)}
                              className="p-2 bg-red-950/20 hover:bg-red-900/50 text-red-400 rounded-lg border border-red-900/30 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Visas subeditor */}
              {contentSubTab === 'visas' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-xs uppercase tracking-widest text-white">Visa Information</h3>
                    <button
                      onClick={() => openItemModal('visas')}
                      className="px-3.5 py-2 bg-accent text-zinc-950 text-xs font-bold uppercase rounded-lg flex items-center space-x-1 hover:opacity-90 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Visa country</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {(localContent.visas || []).map((visa: any, index: number) => (
                      <div key={visa.id || index} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-xl">{visa.flag}</span>
                            <h4 className="text-base font-bold text-white">{visa.country}</h4>
                          </div>
                          <span className="text-[10px] text-gray-500 font-medium block">{visa.subtitle}</span>
                          <div className="text-[11px] text-gray-400 space-y-1 font-mono">
                            <div>⏱️ Processing: {visa.processingTime}</div>
                            <div>🗓️ Validity: {visa.validity}</div>
                            <div>💰 Fee: ${visa.fee} USD</div>
                          </div>
                        </div>

                        <div className="flex justify-end space-x-2 border-t border-zinc-850 pt-4 mt-2">
                          <button
                            onClick={() => openItemModal('visas', index)}
                            className="p-2 bg-zinc-800 hover:bg-zinc-700 text-accent rounded-lg border border-zinc-700 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem('visas', index)}
                            className="p-2 bg-red-950/20 hover:bg-red-900/50 text-red-400 rounded-lg border border-red-900/30 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Airlines subeditor */}
              {contentSubTab === 'airlines' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-xs uppercase tracking-widest text-white">Partner Airlines</h3>
                    <button
                      onClick={() => openItemModal('airlines')}
                      className="px-3.5 py-2 bg-accent text-zinc-950 text-xs font-bold uppercase rounded-lg flex items-center space-x-1 hover:opacity-90 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Airline</span>
                    </button>
                  </div>

                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
                    <table className="w-full text-left text-xs text-gray-300">
                      <thead className="bg-zinc-950 text-[10px] text-zinc-500 font-bold uppercase border-b border-zinc-850">
                        <tr>
                          <th className="p-4">Logo</th>
                          <th className="p-4">Carrier Name</th>
                          <th className="p-4">Code</th>
                          <th className="p-4">Type</th>
                          <th className="p-4">Rating</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-855">
                        {(localContent.airlines || []).map((air: any, index: number) => (
                          <tr key={air.id || index} className="hover:bg-zinc-800/30">
                            <td className="p-4">
                              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-white font-mono">
                                {air.code}
                              </div>
                            </td>
                            <td className="p-4 font-bold text-white">{air.name}</td>
                            <td className="p-4 font-mono">{air.code}</td>
                            <td className="p-4 capitalize">{air.type}</td>
                            <td className="p-4 font-mono text-accent">{air.rating}★</td>
                            <td className="p-4 text-right space-x-2">
                              <button
                                onClick={() => openItemModal('airlines', index)}
                                className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-accent rounded-lg cursor-pointer"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteItem('airlines', index)}
                                className="p-1.5 bg-red-950/20 hover:bg-red-900/40 text-red-400 rounded-lg cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Gallery subeditor */}
              {contentSubTab === 'gallery' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-xs uppercase tracking-widest text-white">Shared Batch Memories</h3>
                    <button
                      onClick={() => openItemModal('gallery')}
                      className="px-3.5 py-2 bg-accent text-zinc-950 text-xs font-bold uppercase rounded-lg flex items-center space-x-1 hover:opacity-90 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Memory Photo</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {(localContent.gallery || []).map((gal: any, index: number) => (
                      <div key={gal.id || index} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col justify-between">
                        <div>
                          <img src={gal.url} alt={gal.title} className="w-full h-32 object-cover" />
                          <div className="p-4 space-y-1">
                            <span className="text-[9px] text-accent font-bold uppercase tracking-wider block">📸 {gal.tag}</span>
                            <h4 className="text-xs font-bold text-white truncate">{gal.title}</h4>
                            <p className="text-[10px] text-gray-500">{gal.location}</p>
                          </div>
                        </div>
                        <div className="p-4 pt-0 border-t border-zinc-850/40 mt-1 flex justify-end space-x-2">
                          <button
                            onClick={() => openItemModal('gallery', index)}
                            className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-accent rounded-lg cursor-pointer"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem('gallery', index)}
                            className="p-1.5 bg-red-950/20 hover:bg-red-900/40 text-red-400 rounded-lg cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </main>
      </div>

      {/* DYNAMIC LIST ITEM MODAL EDITOR */}
      {editingItemType && (
        <div className="fixed inset-0 bg-dark/85 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-scale-up">

            {/* Header */}
            <div className="bg-zinc-950 px-6 py-4 flex justify-between items-center border-b border-zinc-850">
              <span className="text-xs text-accent font-bold uppercase tracking-wider">
                {editingItemIndex !== null ? 'Modify' : 'Create New'} {editingItemType.replace(/^\w/, (c) => c.toUpperCase())}
              </span>
              <button onClick={() => setEditingItemType(null)} className="text-gray-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Fields container */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">

              {/* Destinations form inputs */}
              {editingItemType === 'destinations' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Destination Name</label>
                    <input
                      type="text"
                      value={tempItem.name}
                      onChange={(e) => setTempItem({ ...tempItem, name: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Country</label>
                    <input
                      type="text"
                      value={tempItem.country}
                      onChange={(e) => setTempItem({ ...tempItem, country: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      value={tempItem.rating}
                      onChange={(e) => setTempItem({ ...tempItem, rating: Number(e.target.value) })}
                      className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Banner Image URL</label>
                    <input
                      type="text"
                      value={tempItem.image}
                      onChange={(e) => setTempItem({ ...tempItem, image: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Base Average Price ($)</label>
                    <input
                      type="number"
                      value={tempItem.averagePrice}
                      onChange={(e) => setTempItem({ ...tempItem, averagePrice: Number(e.target.value) })}
                      className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Attractions Landmarks count</label>
                    <input
                      type="number"
                      value={tempItem.attractionsCount}
                      onChange={(e) => setTempItem({ ...tempItem, attractionsCount: Number(e.target.value) })}
                      className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Card Brief Description</label>
                    <textarea
                      rows={2}
                      value={tempItem.description}
                      onChange={(e) => setTempItem({ ...tempItem, description: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Packages form inputs */}
              {editingItemType === 'packages' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Package Name</label>
                    <input
                      type="text"
                      value={tempItem.name}
                      onChange={(e) => setTempItem({ ...tempItem, name: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Category Type</label>
                      <select
                        value={tempItem.type}
                        onChange={(e) => setTempItem({ ...tempItem, type: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg cursor-pointer"
                      >
                        <option value="tour">Tour</option>
                        <option value="hajj">Hajj</option>
                        <option value="umrah">Umrah</option>
                        <option value="holiday">Holiday</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Destination Country</label>
                      <input
                        type="text"
                        value={tempItem.destination}
                        onChange={(e) => setTempItem({ ...tempItem, destination: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Cost Price ($)</label>
                      <input
                        type="number"
                        value={tempItem.price}
                        onChange={(e) => setTempItem({ ...tempItem, price: Number(e.target.value) })}
                        className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Duration text</label>
                      <input
                        type="text"
                        placeholder="e.g. 5 Days, 4 Nights"
                        value={tempItem.duration}
                        onChange={(e) => setTempItem({ ...tempItem, duration: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Image URL</label>
                    <input
                      type="text"
                      value={tempItem.image}
                      onChange={(e) => setTempItem({ ...tempItem, image: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                    />
                  </div>
                  <div className="flex items-center space-x-2 py-2">
                    <input
                      type="checkbox"
                      checked={tempItem.isFeatured}
                      onChange={(e) => setTempItem({ ...tempItem, isFeatured: e.target.checked })}
                      className="cursor-pointer"
                      id="isFeatured"
                    />
                    <label htmlFor="isFeatured" className="text-xs text-gray-300 cursor-pointer">Feature this package on the homepage banner</label>
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Brief details description</label>
                    <textarea
                      rows={2}
                      value={tempItem.description}
                      onChange={(e) => setTempItem({ ...tempItem, description: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Inclusions (Comma separated list)</label>
                    <input
                      type="text"
                      placeholder="e.g. Flights, Breakfast, transfers"
                      value={Array.isArray(tempItem.inclusions) ? tempItem.inclusions.join(', ') : ''}
                      onChange={(e) => setTempItem({ ...tempItem, inclusions: e.target.value.split(',').map((x: string) => x.trim()) })}
                      className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Hotels (Comma separated list)</label>
                    <input
                      type="text"
                      placeholder="e.g. Sayeman resort, Swissotel"
                      value={Array.isArray(tempItem.hotels) ? tempItem.hotels.join(', ') : ''}
                      onChange={(e) => setTempItem({ ...tempItem, hotels: e.target.value.split(',').map((x: string) => x.trim()) })}
                      className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                    />
                  </div>
                </div>
              )}

              {/* Hajj Packages form inputs */}
              {editingItemType === 'hajjPackages' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Pilgrimage Class Name</label>
                    <input
                      type="text"
                      value={tempItem.name}
                      onChange={(e) => setTempItem({ ...tempItem, name: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Hajj/Umrah Category</label>
                      <select
                        value={tempItem.category}
                        onChange={(e) => setTempItem({ ...tempItem, category: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg cursor-pointer"
                      >
                        <option value="Hajj">Hajj</option>
                        <option value="Umrah">Umrah</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Tier Class</label>
                      <select
                        value={tempItem.tier}
                        onChange={(e) => setTempItem({ ...tempItem, tier: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg cursor-pointer"
                      >
                        <option value="Standard">Standard</option>
                        <option value="Premium">Premium</option>
                        <option value="Luxury">Luxury</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Price per person ($)</label>
                      <input
                        type="number"
                        value={tempItem.price}
                        onChange={(e) => setTempItem({ ...tempItem, price: Number(e.target.value) })}
                        className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Duration text</label>
                      <input
                        type="text"
                        placeholder="e.g. 14 Days"
                        value={tempItem.duration}
                        onChange={(e) => setTempItem({ ...tempItem, duration: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Makkah Hotel</label>
                      <input
                        type="text"
                        value={tempItem.makkahHotel}
                        onChange={(e) => setTempItem({ ...tempItem, makkahHotel: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Madinah Hotel</label>
                      <input
                        type="text"
                        value={tempItem.madinahHotel}
                        onChange={(e) => setTempItem({ ...tempItem, madinahHotel: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Distance to Haram</label>
                      <input
                        type="text"
                        placeholder="e.g. 100 meters"
                        value={tempItem.distanceToHaram}
                        onChange={(e) => setTempItem({ ...tempItem, distanceToHaram: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Transportation info</label>
                      <input
                        type="text"
                        placeholder="e.g. Luxury AC coach"
                        value={tempItem.transportation}
                        onChange={(e) => setTempItem({ ...tempItem, transportation: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Registration Deadline</label>
                    <input
                      type="text"
                      placeholder="e.g. July 25, 2026"
                      value={tempItem.registrationDeadline}
                      onChange={(e) => setTempItem({ ...tempItem, registrationDeadline: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                    />
                  </div>
                </div>
              )}

              {/* Visas form inputs */}
              {editingItemType === 'visas' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Country Name</label>
                    <input
                      type="text"
                      value={tempItem.country}
                      onChange={(e) => setTempItem({ ...tempItem, country: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Flag Emoji</label>
                      <input
                        type="text"
                        value={tempItem.flag}
                        onChange={(e) => setTempItem({ ...tempItem, flag: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Fee Cost ($)</label>
                      <input
                        type="number"
                        value={tempItem.fee}
                        onChange={(e) => setTempItem({ ...tempItem, fee: Number(e.target.value) })}
                        className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Visa Subtitle</label>
                    <input
                      type="text"
                      value={tempItem.subtitle}
                      onChange={(e) => setTempItem({ ...tempItem, subtitle: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Processing Time</label>
                      <input
                        type="text"
                        placeholder="e.g. 3-5 Working Days"
                        value={tempItem.processingTime}
                        onChange={(e) => setTempItem({ ...tempItem, processingTime: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Validity</label>
                      <input
                        type="text"
                        placeholder="e.g. 90 Days Single Entry"
                        value={tempItem.validity}
                        onChange={(e) => setTempItem({ ...tempItem, validity: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Brief Description Explanation</label>
                    <textarea
                      rows={2}
                      value={tempItem.explanation}
                      onChange={(e) => setTempItem({ ...tempItem, explanation: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Documents Required (Comma separated list)</label>
                    <input
                      type="text"
                      placeholder="e.g. Passport, Biometric Photo, Bank statement"
                      value={Array.isArray(tempItem.requiredDocuments) ? tempItem.requiredDocuments.join(', ') : ''}
                      onChange={(e) => setTempItem({ ...tempItem, requiredDocuments: e.target.value.split(',').map((x: string) => x.trim()) })}
                      className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                    />
                  </div>
                </div>
              )}

              {/* Airlines form inputs */}
              {editingItemType === 'airlines' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Airline Carrier Name</label>
                    <input
                      type="text"
                      value={tempItem.name}
                      onChange={(e) => setTempItem({ ...tempItem, name: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Two-Letter IATA Code</label>
                      <input
                        type="text"
                        maxLength={2}
                        placeholder="e.g. BG"
                        value={tempItem.code}
                        onChange={(e) => setTempItem({ ...tempItem, code: e.target.value.toUpperCase() })}
                        className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg uppercase"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Rating value (0-5.0)</label>
                      <input
                        type="text"
                        placeholder="e.g. 4.6"
                        value={tempItem.rating}
                        onChange={(e) => setTempItem({ ...tempItem, rating: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Carrier Category Route</label>
                    <select
                      value={tempItem.type}
                      onChange={(e) => setTempItem({ ...tempItem, type: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg cursor-pointer"
                    >
                      <option value="international">International</option>
                      <option value="domestic">Domestic</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Gallery form inputs */}
              {editingItemType === 'gallery' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Photo Title</label>
                    <input
                      type="text"
                      value={tempItem.title}
                      onChange={(e) => setTempItem({ ...tempItem, title: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Photo Image URL</label>
                    <input
                      type="text"
                      value={tempItem.url}
                      onChange={(e) => setTempItem({ ...tempItem, url: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Location (City, Country)</label>
                      <input
                        type="text"
                        placeholder="e.g. Makkah, Saudi Arabia"
                        value={tempItem.location}
                        onChange={(e) => setTempItem({ ...tempItem, location: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Tag label</label>
                      <input
                        type="text"
                        placeholder="e.g. Umrah, Nature"
                        value={tempItem.tag}
                        onChange={(e) => setTempItem({ ...tempItem, tag: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">Layout height aspectClass</label>
                    <select
                      value={tempItem.aspectClass}
                      onChange={(e) => setTempItem({ ...tempItem, aspectClass: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white rounded-lg cursor-pointer"
                    >
                      <option value="h-72">Small height (h-72)</option>
                      <option value="h-80">Medium height (h-80)</option>
                      <option value="h-96">Large height (h-96)</option>
                    </select>
                  </div>
                </div>
              )}

            </div>

            {/* Actions Footer */}
            <div className="bg-zinc-950 p-4 border-t border-zinc-850 flex justify-end space-x-3">
              <button
                onClick={() => setEditingItemType(null)}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-gray-300 text-xs font-bold uppercase rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTempItem}
                className="px-5 py-2 bg-accent hover:bg-accent-dark text-zinc-950 text-xs font-bold uppercase rounded-lg cursor-pointer flex items-center space-x-1"
              >
                <Check className="w-4 h-4" />
                <span>Confirm Item</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* CUSTOM CONFIRMATION DIALOG (replaces browser confirm() to prevent blinking) */}
      {confirmDialog && (
        <div className="fixed inset-0 bg-dark/85 backdrop-blur-xs z-[60] flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl animate-scale-up">
            <div className="p-6 text-center space-y-4">
              <div className="bg-red-950/50 border border-red-900/30 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto text-red-400">
                <Trash2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white font-display">Confirm Action</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{confirmDialog.message}</p>
            </div>
            <div className="bg-zinc-950 p-4 border-t border-zinc-850 flex justify-center space-x-3">
              <button
                onClick={() => setConfirmDialog(null)}
                className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-gray-300 text-xs font-bold uppercase rounded-lg cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDialog.onConfirm}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase rounded-lg cursor-pointer transition-colors flex items-center space-x-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION — appears top-right after Save Config */}
      {toast && (
        <div className="fixed top-6 right-6 z-[70] animate-scale-up">
          <div className={`
            flex items-center space-x-3 px-5 py-4 rounded-2xl shadow-2xl border backdrop-blur-sm
            ${toast.type === 'success'
              ? 'bg-zinc-900/95 border-emerald-500/30'
              : 'bg-zinc-900/95 border-red-500/30'
            }`}
          >
            {/* Icon */}
            <div className={`
              ${toast.type === 'success'
                ? 'bg-emerald-500/15 border border-emerald-500/20'
                : 'bg-red-500/15 border border-red-500/20'
              }
              p-1.5 rounded-lg flex-shrink-0
            `}>
              {toast.type === 'success' ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <X className="w-4 h-4 text-red-400" />
              )}
            </div>

            {/* Message */}
            <span className={`
              text-xs font-semibold font-sans tracking-wide
              ${toast.type === 'success' ? 'text-emerald-300' : 'text-red-300'}
            `}>
              {toast.message}
            </span>

            {/* Close button */}
            <button
              onClick={() => setToast(null)}
              className="ml-2 pl-3 border-l border-zinc-700 text-gray-500 hover:text-white transition-colors cursor-pointer flex-shrink-0"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

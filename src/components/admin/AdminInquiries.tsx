import React, { useState, useEffect } from 'react';
import { MessageSquare, Eye, Trash2, X, AlertCircle, CheckCircle2, MessageCircle, Mail, Clock } from 'lucide-react';
import { dbService } from '@/services/db';
import { ContactInquiry, InquiryStatus } from '@/types/database';

export const AdminInquiries: React.FC = () => {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('Semua');

  // Detail Modal
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);

  // Delete Confirm Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ContactInquiry | null>(null);

  // Toast notification
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await dbService.getInquiries();
      setInquiries(data);
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleStatusChange = async (id: string, newStatus: InquiryStatus) => {
    try {
      const updated = await dbService.updateInquiryStatus(id, newStatus);
      setInquiries((prev) => prev.map((i) => (i.id === id ? updated : i)));
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(updated);
      }
      showToast('success', `Status inquiry diperbarui menjadi "${newStatus}".`);
    } catch (err: any) {
      showToast('error', err.message || 'Gagal mengubah status inquiry.');
    }
  };

  const confirmDelete = (inquiry: ContactInquiry) => {
    setItemToDelete(inquiry);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    setSubmitting(true);
    try {
      await dbService.deleteInquiry(itemToDelete.id);
      showToast('success', 'Inquiry berhasil dihapus.');
      if (selectedInquiry?.id === itemToDelete.id) {
        setSelectedInquiry(null);
      }
      setDeleteModalOpen(false);
      setItemToDelete(null);
      loadData();
    } catch (err: any) {
      showToast('error', err.message || 'Gagal menghapus inquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  const openDetail = (inquiry: ContactInquiry) => {
    setSelectedInquiry(inquiry);
    if (inquiry.status === 'new') {
      handleStatusChange(inquiry.id, 'read');
    }
  };

  const filteredInquiries =
    statusFilter === 'Semua' ? inquiries : inquiries.filter((i) => i.status === statusFilter);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-cocoa/10 pb-5">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-cocoa">Kelola Inquiry & Pesan Masuk</h1>
          <p className="text-xs text-cocoa/65 mt-1">
            Lihat dan respon pertanyaan pengunjung dari formulir kontak website.
          </p>
        </div>
      </div>

      {/* ALERT TOAST */}
      {notification && (
        <div
          className={`flex items-center justify-between p-4 text-xs ${
            notification.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4 text-red-600" />}
            <span className="font-medium">{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="opacity-70 hover:opacity-100">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* FILTER TABS */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-cocoa/10 pb-3">
        {['Semua', 'new', 'read', 'replied', 'archived'].map((status) => {
          const count =
            status === 'Semua' ? inquiries.length : inquiries.filter((i) => i.status === status).length;

          return (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1.5 ${
                statusFilter === status
                  ? 'bg-cocoa text-ivory'
                  : 'bg-ivory border border-cocoa/15 text-cocoa hover:border-cocoa'
              }`}
            >
              <span>{status === 'Semua' ? 'Semua Inquiry' : status}</span>
              <span className="px-1.5 py-0.2 bg-cocoa/20 text-[10px] rounded-full">{count}</span>
            </button>
          );
        })}
      </div>

      {/* INQUIRIES LIST TABLE */}
      <div className="border border-cocoa/10 bg-ivory overflow-hidden shadow-xs">
        {loading ? (
          <div className="py-16 text-center text-xs text-cocoa/60">Memuat data inquiry...</div>
        ) : filteredInquiries.length === 0 ? (
          <div className="py-16 text-center text-xs text-cocoa/60">Tidak ada inquiry dengan status ini.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-cocoa-dark text-ivory text-[10px] uppercase tracking-wider">
                  <th className="py-3 px-4">Waktu</th>
                  <th className="py-3 px-4">Nama Pengirim</th>
                  <th className="py-3 px-4">Kontak</th>
                  <th className="py-3 px-4">Subjek</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cocoa/10">
                {filteredInquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    className={`hover:bg-ivory-50 transition-colors ${
                      inq.status === 'new' ? 'bg-amber-500/5 font-medium' : ''
                    }`}
                  >
                    {/* Timestamp */}
                    <td className="py-3 px-4 text-cocoa/60 font-mono text-[11px] whitespace-nowrap">
                      {inq.created_at
                        ? new Date(inq.created_at).toLocaleString('id-ID', {
                            day: '2-digit',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : '-'}
                    </td>

                    {/* Name */}
                    <td className="py-3 px-4">
                      <div className="font-serif font-semibold text-cocoa">{inq.name}</div>
                    </td>

                    {/* Contact Info */}
                    <td className="py-3 px-4">
                      <div className="text-cocoa/80">{inq.email}</div>
                      <div className="text-[10px] text-cocoa/60">{inq.whatsapp}</div>
                    </td>

                    {/* Subject */}
                    <td className="py-3 px-4 max-w-[220px] truncate text-cocoa/80">{inq.subject}</td>

                    {/* Status Select */}
                    <td className="py-3 px-4 text-center">
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value as InquiryStatus)}
                        className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-1 border outline-none rounded-xs cursor-pointer ${
                          inq.status === 'new'
                            ? 'bg-red-100 text-red-800 border-red-300'
                            : inq.status === 'read'
                            ? 'bg-blue-100 text-blue-800 border-blue-300'
                            : inq.status === 'replied'
                            ? 'bg-green-100 text-green-800 border-green-300'
                            : 'bg-gray-100 text-gray-700 border-gray-300'
                        }`}
                      >
                        <option value="new">new</option>
                        <option value="read">read</option>
                        <option value="replied">replied</option>
                        <option value="archived">archived</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openDetail(inq)}
                          className="p-1.5 text-blue-700 hover:bg-blue-50 rounded transition-colors"
                          title="Lihat Detail Inquiry"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => confirmDelete(inq)}
                          className="p-1.5 text-red-700 hover:bg-red-50 rounded transition-colors"
                          title="Hapus Inquiry"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* DETAIL MODAL */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa-dark/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg bg-ivory border border-cocoa/20 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between bg-cocoa-dark text-ivory px-6 py-4">
              <h2 className="font-serif text-base font-semibold">Detail Inquiry Pelanggan</h2>
              <button onClick={() => setSelectedInquiry(null)} className="text-ivory/70 hover:text-ivory">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-cocoa/10 pb-3">
                <div>
                  <span className="text-[10px] text-cocoa/50 uppercase tracking-wider block">Pengirim</span>
                  <h3 className="font-serif text-lg font-semibold text-cocoa">{selectedInquiry.name}</h3>
                </div>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value as InquiryStatus)}
                  className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 border border-cocoa/20 bg-ivory"
                >
                  <option value="new">new</option>
                  <option value="read">read</option>
                  <option value="replied">replied</option>
                  <option value="archived">archived</option>
                </select>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 text-xs">
                <div className="p-3 bg-ivory-50 border border-cocoa/10">
                  <span className="text-[10px] font-semibold text-cocoa/50 uppercase tracking-wider block">Email</span>
                  <a href={`mailto:${selectedInquiry.email}`} className="text-cocoa font-medium hover:underline mt-0.5 block">
                    {selectedInquiry.email}
                  </a>
                </div>
                <div className="p-3 bg-ivory-50 border border-cocoa/10">
                  <span className="text-[10px] font-semibold text-cocoa/50 uppercase tracking-wider block">WhatsApp</span>
                  <a
                    href={`https://wa.me/${selectedInquiry.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Halo ${selectedInquiry.name}, terima kasih telah menghubungi kami mengenai ${selectedInquiry.subject}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 font-medium hover:underline mt-0.5 flex items-center gap-1"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>{selectedInquiry.whatsapp}</span>
                  </a>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-semibold text-cocoa/50 uppercase tracking-wider block">Subjek Inquiry</span>
                <p className="font-semibold text-cocoa mt-0.5">{selectedInquiry.subject}</p>
              </div>

              <div>
                <span className="text-[10px] font-semibold text-cocoa/50 uppercase tracking-wider block">Isi Pesan</span>
                <div className="mt-1 p-3 bg-ivory-50 border border-cocoa/10 text-cocoa/80 leading-relaxed font-sans whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-cocoa/10 text-cocoa/50 text-[11px]">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {selectedInquiry.created_at ? new Date(selectedInquiry.created_at).toLocaleString('id-ID') : '-'}
                </span>
                <a
                  href={`https://wa.me/${selectedInquiry.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Halo ${selectedInquiry.name}, menanggapi pesan Anda mengenai "${selectedInquiry.subject}"...`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleStatusChange(selectedInquiry.id, 'replied')}
                  className="inline-flex items-center gap-1.5 bg-[#25D366] text-white px-3 py-1.5 font-semibold uppercase tracking-wider hover:bg-[#1EBE5D] transition-colors rounded-xs text-[10px]"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>Balas via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteModalOpen && itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa-dark/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-ivory border border-red-200 shadow-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-cocoa">Konfirmasi Hapus Inquiry</h3>
                <p className="mt-1 text-xs text-cocoa/70 leading-relaxed">
                  Apakah Anda yakin ingin menghapus inquiry dari <strong className="text-cocoa font-semibold">"{itemToDelete.name}"</strong>?
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 border border-cocoa/20 text-cocoa text-xs font-semibold uppercase tracking-wider"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={submitting}
                className="px-4 py-2 bg-red-600 text-white text-xs font-semibold uppercase tracking-wider hover:bg-red-700 disabled:opacity-50"
              >
                {submitting ? 'Menghapus...' : 'Ya, Hapus Inquiry'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

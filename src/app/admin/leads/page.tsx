'use client'

import { useEffect, useState, useCallback } from 'react'
import { toast } from 'sonner'
import { format } from 'date-fns'
import {
  Search,
  Mail,
  Phone,
  Building2,
  MessageSquare,
  StickyNote,
  Trash2,
  Eye,
  Users,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface Lead {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  service: string | null
  message: string | null
  status: string
  notes: string | null
  createdAt: string
  updatedAt: string
}

const STATUS_OPTIONS = ['new', 'contacted', 'qualified', 'converted', 'lost'] as const

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800 border-blue-200',
  contacted: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  qualified: 'bg-green-100 text-green-800 border-green-200',
  converted: 'bg-teal-100 text-teal-800 border-teal-200',
  lost: 'bg-red-100 text-red-800 border-red-200',
}

const STATUS_LABELS: Record<string, string> = {
  new: 'Baru',
  contacted: 'Dihubungi',
  qualified: 'Qualified',
  converted: 'Konversi',
  lost: 'Hilang',
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editNotes, setEditNotes] = useState('')
  const [editStatus, setEditStatus] = useState('')

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/leads')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setLeads(data)
    } catch {
      toast.error('Gagal memuat data leads')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error('Failed to update')
      toast.success('Status berhasil diubah')
      fetchLeads()
      if (selectedLead?.id === leadId) {
        setSelectedLead({ ...selectedLead, status: newStatus })
      }
    } catch {
      toast.error('Gagal mengubah status')
    }
  }

  const handleSaveNotes = async () => {
    if (!selectedLead) return
    try {
      const res = await fetch(`/api/admin/leads/${selectedLead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: editNotes, status: editStatus }),
      })
      if (!res.ok) throw new Error('Failed to update')
      toast.success('Lead berhasil diperbarui')
      fetchLeads()
      setDetailOpen(false)
    } catch {
      toast.error('Gagal memperbarui lead')
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      const res = await fetch(`/api/admin/leads/${deleteId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      toast.success('Lead berhasil dihapus')
      fetchLeads()
    } catch {
      toast.error('Gagal menghapus lead')
    } finally {
      setDeleteId(null)
    }
  }

  const filteredLeads = leads
    .filter((lead) => {
      if (statusFilter !== 'all' && lead.status !== statusFilter) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        return (
          lead.name.toLowerCase().includes(q) ||
          lead.email.toLowerCase().includes(q) ||
          (lead.company?.toLowerCase().includes(q) ?? false) ||
          (lead.service?.toLowerCase().includes(q) ?? false)
        )
      }
      return true
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const statusCounts = leads.reduce<Record<string, number>>((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1
    return acc
  }, {})

  const openDetail = (lead: Lead) => {
    setSelectedLead(lead)
    setEditNotes(lead.notes || '')
    setEditStatus(lead.status)
    setDetailOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
              <Users className="h-5 w-5 text-teal-700" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Leads
              </h1>
              <p className="text-sm text-gray-500">
                {leads.length} total leads
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Cari nama, email, perusahaan..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('all')}
            >
              Semua
              <Badge variant="secondary" className="ml-1.5">
                {leads.length}
              </Badge>
            </Button>
            {STATUS_OPTIONS.map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {STATUS_LABELS[status]}
                {statusCounts[status] ? (
                  <Badge variant="secondary" className="ml-1.5">
                    {statusCounts[status]}
                  </Badge>
                ) : null}
              </Button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg border bg-white shadow-sm">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-200 border-t-teal-600" />
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <Users className="mb-3 h-12 w-12" />
              <p className="text-sm">Tidak ada leads ditemukan</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="hidden md:table-cell">Perusahaan</TableHead>
                  <TableHead className="hidden lg:table-cell">Layanan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">Tanggal</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow
                    key={lead.id}
                    className="cursor-pointer"
                    onClick={() => openDetail(lead)}
                  >
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell className="text-gray-600">{lead.email}</TableCell>
                    <TableCell className="hidden md:table-cell text-gray-600">
                      {lead.company || '-'}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-gray-600">
                      {lead.service || '-'}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${STATUS_COLORS[lead.status] || 'bg-gray-100 text-gray-800'} border text-xs`}
                      >
                        {STATUS_LABELS[lead.status] || lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-gray-500 text-sm">
                      {format(new Date(lead.createdAt), 'd MMM yyyy')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDetail(lead)}
                          title="Lihat Detail"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteId(lead.id)}
                          title="Hapus"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Detail Dialog */}
        <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedLead?.name}
                {selectedLead && (
                  <Badge
                    className={`${STATUS_COLORS[selectedLead.status] || 'bg-gray-100 text-gray-800'} border text-xs`}
                  >
                    {STATUS_LABELS[selectedLead.status] || selectedLead.status}
                  </Badge>
                )}
              </DialogTitle>
              <DialogDescription>Detail lead</DialogDescription>
            </DialogHeader>

            {selectedLead && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700">{selectedLead.email}</span>
                  </div>
                  {selectedLead.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-700">{selectedLead.phone}</span>
                    </div>
                  )}
                  {selectedLead.company && (
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-700">{selectedLead.company}</span>
                    </div>
                  )}
                  {selectedLead.service && (
                    <div className="flex items-center gap-2 text-sm">
                      <MessageSquare className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-700">{selectedLead.service}</span>
                    </div>
                  )}
                </div>

                {selectedLead.message && (
                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-xs font-medium text-gray-500 mb-1">Pesan</p>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedLead.message}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Ubah Status</Label>
                  <Select value={editStatus} onValueChange={setEditStatus}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((s) => (
                        <SelectItem key={s} value={s}>
                          {STATUS_LABELS[s]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-1">
                    <StickyNote className="h-3.5 w-3.5" />
                    Catatan Internal
                  </Label>
                  <Textarea
                    placeholder="Tambahkan catatan internal..."
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex justify-between pt-2">
                  <p className="text-xs text-gray-400 self-center">
                    Dibuat {format(new Date(selectedLead.createdAt), 'd MMM yyyy, HH:mm')}
                  </p>
                  <Button onClick={handleSaveNotes} size="sm">
                    Simpan Perubahan
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus Lead?</AlertDialogTitle>
              <AlertDialogDescription>
                Tindakan ini tidak dapat dibatalkan. Data lead akan dihapus secara permanen.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

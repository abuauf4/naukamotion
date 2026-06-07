'use client'

import { useEffect, useState, useCallback } from 'react'
import { toast } from 'sonner'
import {
  Plus,
  Pencil,
  Trash2,
  Layers,
  GripVertical,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
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

interface Service {
  id: string
  slug: string
  title: string
  summary: string
  icon: string
  order: number
  status: string
  createdAt: string
  updatedAt: string
}

const SERVICE_STATUS_COLORS: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-700 border-gray-200',
  published: 'bg-green-100 text-green-800 border-green-200',
}

const SERVICE_STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  published: 'Published',
}

interface ServiceForm {
  title: string
  summary: string
  slug: string
  icon: string
  order: number
  status: string
}

const EMPTY_FORM: ServiceForm = {
  title: '',
  summary: '',
  slug: '',
  icon: 'Globe',
  order: 0,
  status: 'draft',
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [form, setForm] = useState<ServiceForm>(EMPTY_FORM)
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/services')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setServices(data)
    } catch {
      toast.error('Gagal memuat data layanan')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  const openAddForm = () => {
    setEditingService(null)
    setForm(EMPTY_FORM)
    setSlugManuallyEdited(false)
    setFormOpen(true)
  }

  const openEditForm = (service: Service) => {
    setEditingService(service)
    setForm({
      title: service.title,
      summary: service.summary,
      slug: service.slug,
      icon: service.icon,
      order: service.order,
      status: service.status,
    })
    setSlugManuallyEdited(true) // don't auto-generate on edit
    setFormOpen(true)
  }

  const handleTitleChange = (title: string) => {
    setForm((prev) => ({
      ...prev,
      title,
      ...(slugManuallyEdited ? {} : { slug: generateSlug(title) }),
    }))
  }

  const handleSave = async () => {
    if (!form.title.trim() || !form.summary.trim()) {
      toast.error('Judul dan ringkasan wajib diisi')
      return
    }
    setSaving(true)
    try {
      const slug = form.slug || generateSlug(form.title)
      const payload = { ...form, slug }

      if (editingService) {
        const res = await fetch(`/api/admin/services/${editingService.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error('Failed to update')
        toast.success('Layanan berhasil diperbarui')
      } else {
        const res = await fetch('/api/admin/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error('Failed to create')
        toast.success('Layanan berhasil ditambahkan')
      }
      setFormOpen(false)
      fetchServices()
    } catch {
      toast.error('Gagal menyimpan layanan')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      const res = await fetch(`/api/admin/services/${deleteId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      toast.success('Layanan berhasil dihapus')
      fetchServices()
    } catch {
      toast.error('Gagal menghapus layanan')
    } finally {
      setDeleteId(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
              <Layers className="h-5 w-5 text-teal-700" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Layanan
              </h1>
              <p className="text-sm text-gray-500">
                {services.length} total layanan
              </p>
            </div>
          </div>
          <Button onClick={openAddForm}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Layanan
          </Button>
        </div>

        {/* Table */}
        <div className="rounded-lg border bg-white shadow-sm">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-200 border-t-teal-600" />
            </div>
          ) : services.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <Layers className="mb-3 h-12 w-12" />
              <p className="text-sm">Belum ada layanan</p>
              <Button onClick={openAddForm} variant="outline" className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Layanan Pertama
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10"></TableHead>
                  <TableHead>Icon</TableHead>
                  <TableHead>Judul</TableHead>
                  <TableHead className="hidden md:table-cell">Slug</TableHead>
                  <TableHead className="hidden sm:table-cell">Urutan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="text-gray-300">
                      <GripVertical className="h-4 w-4" />
                    </TableCell>
                    <TableCell>
                      <code className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                        {service.icon}
                      </code>
                    </TableCell>
                    <TableCell className="font-medium">{service.title}</TableCell>
                    <TableCell className="hidden md:table-cell text-gray-500 text-sm">
                      {service.slug}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-gray-500">
                      {service.order}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${SERVICE_STATUS_COLORS[service.status] || 'bg-gray-100 text-gray-700'} border text-xs`}
                      >
                        {SERVICE_STATUS_LABELS[service.status] || service.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditForm(service)}
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteId(service.id)}
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

        {/* Add/Edit Dialog */}
        <Dialog open={formOpen} onOpenChange={setFormOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingService ? 'Edit Layanan' : 'Tambah Layanan'}
              </DialogTitle>
              <DialogDescription>
                {editingService
                  ? 'Perbarui informasi layanan'
                  : 'Isi detail layanan baru'}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="svc-title">Judul *</Label>
                <Input
                  id="svc-title"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Nama layanan"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="svc-summary">Ringkasan *</Label>
                <Textarea
                  id="svc-summary"
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  placeholder="Deskripsi singkat layanan"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="svc-slug">Slug</Label>
                <Input
                  id="svc-slug"
                  value={form.slug}
                  onChange={(e) => {
                    setSlugManuallyEdited(true)
                    setForm({ ...form, slug: e.target.value })
                  }}
                  placeholder="auto-generated-from-title"
                />
                <p className="text-xs text-gray-400">
                  Akan otomatis di-generate dari judul jika dikosongkan
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="svc-icon">Icon</Label>
                  <Input
                    id="svc-icon"
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    placeholder="Globe"
                  />
                  <p className="text-xs text-gray-400">Nama ikon Lucide</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="svc-order">Urutan</Label>
                  <Input
                    id="svc-order"
                    type="number"
                    value={form.order}
                    onChange={(e) =>
                      setForm({ ...form, order: parseInt(e.target.value) || 0 })
                    }
                    min={0}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="svc-status">Status</Label>
                  <Select
                    value={form.status}
                    onValueChange={(v) => setForm({ ...form, status: v })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setFormOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Menyimpan...
                  </span>
                ) : editingService ? (
                  'Simpan Perubahan'
                ) : (
                  'Tambah Layanan'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus Layanan?</AlertDialogTitle>
              <AlertDialogDescription>
                Tindakan ini tidak dapat dibatalkan. Data layanan akan dihapus secara permanen.
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

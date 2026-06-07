'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  Plus,
  Pencil,
  Trash2,
  Quote,
  Loader2,
  Star,
  Search,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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

interface Testimonial {
  id: string
  quote: string
  author: string
  role: string | null
  company: string
  featured: boolean
  order: number
  status: string
  createdAt: string
  updatedAt: string
}

const emptyForm = {
  quote: '',
  author: '',
  role: '',
  company: '',
  featured: false,
  order: 0,
  status: 'published',
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [deleting, setDeleting] = useState<Testimonial | null>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/testimonials')
      if (!res.ok) throw new Error('Gagal memuat data')
      const data = await res.json()
      setTestimonials(data)
    } catch {
      toast.error('Gagal memuat testimoni')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const openCreate = () => {
    setEditing(null)
    setForm({ ...emptyForm, order: testimonials.length })
    setDialogOpen(true)
  }

  const openEdit = (t: Testimonial) => {
    setEditing(t)
    setForm({
      quote: t.quote,
      author: t.author,
      role: t.role || '',
      company: t.company,
      featured: t.featured,
      order: t.order,
      status: t.status,
    })
    setDialogOpen(true)
  }

  const openDelete = (t: Testimonial) => {
    setDeleting(t)
    setDeleteOpen(true)
  }

  const handleSave = async () => {
    if (!form.quote || !form.author || !form.company) {
      toast.error('Kutipan, penulis, dan perusahaan wajib diisi')
      return
    }

    setSaving(true)
    try {
      if (editing) {
        const res = await fetch('/api/admin/testimonials', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editing.id, ...form }),
        })
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || 'Gagal memperbarui')
        }
        toast.success('Testimoni berhasil diperbarui')
      } else {
        const res = await fetch('/api/admin/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || 'Gagal membuat')
        }
        toast.success('Testimoni berhasil dibuat')
      }
      setDialogOpen(false)
      fetchData()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Terjadi kesalahan')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleting) return
    try {
      const res = await fetch(`/api/admin/testimonials?id=${deleting.id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Gagal menghapus')
      toast.success('Testimoni berhasil dihapus')
      setDeleteOpen(false)
      setDeleting(null)
      fetchData()
    } catch {
      toast.error('Gagal menghapus testimoni')
    }
  }

  const filtered = testimonials.filter(
    (t) =>
      t.quote.toLowerCase().includes(search.toLowerCase()) ||
      t.author.toLowerCase().includes(search.toLowerCase()) ||
      t.company.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Testimoni
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Kelola testimoni dari klien
            </p>
          </div>
          <Button onClick={openCreate} className="gap-2">
            <Plus className="size-4" />
            Tambah Testimoni
          </Button>
        </div>

        {/* Search */}
        <Card className="mb-6 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Cari testimoni..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Table */}
        <Card>
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="size-6 animate-spin text-gray-400" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <Quote className="mb-3 size-10" />
              <p className="text-sm">Belum ada testimoni</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Kutipan</TableHead>
                  <TableHead>Penulis</TableHead>
                  <TableHead className="hidden md:table-cell">Perusahaan</TableHead>
                  <TableHead>Unggulan</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="max-w-[300px]">
                      <p className="truncate text-gray-700 italic">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                    </TableCell>
                    <TableCell className="font-medium">{t.author}</TableCell>
                    <TableCell className="hidden md:table-cell text-gray-600">
                      {t.company}
                    </TableCell>
                    <TableCell>
                      {t.featured ? (
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 gap-1">
                          <Star className="size-3" />
                          Unggulan
                        </Badge>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge
                        variant={t.status === 'published' ? 'default' : 'outline'}
                        className={
                          t.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100'
                            : ''
                        }
                      >
                        {t.status === 'published' ? 'Terbit' : 'Draf'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEdit(t)}
                          className="size-8 p-0"
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDelete(t)}
                          className="size-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editing ? 'Edit Testimoni' : 'Tambah Testimoni'}
            </DialogTitle>
            <DialogDescription>
              {editing
                ? 'Perbarui testimoni klien'
                : 'Tambahkan testimoni baru dari klien'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="quote">Kutipan *</Label>
              <Textarea
                id="quote"
                value={form.quote}
                onChange={(e) => setForm({ ...form, quote: e.target.value })}
                placeholder="Tulis kutipan testimoni..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="author">Penulis *</Label>
                <Input
                  id="author"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  placeholder="Nama penulis"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="company">Perusahaan *</Label>
                <Input
                  id="company"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="Nama perusahaan"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="role">Jabatan</Label>
                <Input
                  id="role"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="Jabatan/posisi"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="order">Urutan</Label>
                <Input
                  id="order"
                  type="number"
                  value={form.order}
                  onChange={(e) =>
                    setForm({ ...form, order: parseInt(e.target.value) || 0 })
                  }
                  min={0}
                />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <Label htmlFor="featured" className="cursor-pointer">
                  Testimoni Unggulan
                </Label>
                <p className="text-xs text-gray-500">
                  Tampilkan sebagai testimoni utama
                </p>
              </div>
              <Switch
                id="featured"
                checked={form.featured}
                onCheckedChange={(checked) =>
                  setForm({ ...form, featured: checked })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm({ ...form, status: v })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">Terbit</SelectItem>
                  <SelectItem value="draft">Draf</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={saving}
            >
              Batal
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving && <Loader2 className="mr-2 size-4 animate-spin" />}
              {editing ? 'Simpan Perubahan' : 'Tambah Testimoni'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Testimoni?</AlertDialogTitle>
            <AlertDialogDescription>
              Testimoni dari &quot;{deleting?.author}&quot; akan dihapus secara
              permanen. Tindakan ini tidak dapat dibatalkan.
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
  )
}

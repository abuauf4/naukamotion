'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  Plus,
  Pencil,
  Trash2,
  FileText,
  Loader2,
  Search,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
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

interface Insight {
  id: string
  slug: string
  title: string
  excerpt: string
  body: string
  topic: string
  author: string
  thumbnail: string | null
  status: string
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

const TOPIC_OPTIONS = [
  { value: 'Strategi', label: 'Strategi' },
  { value: 'Sistem', label: 'Sistem' },
  { value: 'Otomotif', label: 'Otomotif' },
  { value: 'Lainnya', label: 'Lainnya' },
]

const TOPIC_COLORS: Record<string, string> = {
  Strategi: 'bg-emerald-100 text-emerald-800',
  Sistem: 'bg-sky-100 text-sky-800',
  Otomotif: 'bg-amber-100 text-amber-800',
  Lainnya: 'bg-slate-100 text-slate-800',
}

const emptyForm = {
  title: '',
  excerpt: '',
  body: '',
  topic: 'Strategi',
  author: 'Abu Aufa',
  thumbnail: '',
  status: 'draft',
}

export default function InsightsPage() {
  const [insights, setInsights] = useState<Insight[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editing, setEditing] = useState<Insight | null>(null)
  const [deleting, setDeleting] = useState<Insight | null>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/insights')
      if (!res.ok) throw new Error('Gagal memuat data')
      const data = await res.json()
      setInsights(data)
    } catch {
      toast.error('Gagal memuat wawasan')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setDialogOpen(true)
  }

  const openEdit = (insight: Insight) => {
    setEditing(insight)
    setForm({
      title: insight.title,
      excerpt: insight.excerpt,
      body: insight.body,
      topic: insight.topic,
      author: insight.author,
      thumbnail: insight.thumbnail || '',
      status: insight.status,
    })
    setDialogOpen(true)
  }

  const openDelete = (insight: Insight) => {
    setDeleting(insight)
    setDeleteOpen(true)
  }

  const handleSave = async () => {
    if (!form.title || !form.excerpt || !form.body || !form.topic) {
      toast.error('Judul, ringkasan, konten, dan topik wajib diisi')
      return
    }

    setSaving(true)
    try {
      if (editing) {
        const res = await fetch('/api/admin/insights', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editing.id, ...form }),
        })
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || 'Gagal memperbarui')
        }
        toast.success('Wawasan berhasil diperbarui')
      } else {
        const res = await fetch('/api/admin/insights', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || 'Gagal membuat')
        }
        toast.success('Wawasan berhasil dibuat')
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
      const res = await fetch(`/api/admin/insights?id=${deleting.id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Gagal menghapus')
      toast.success('Wawasan berhasil dihapus')
      setDeleteOpen(false)
      setDeleting(null)
      fetchData()
    } catch {
      toast.error('Gagal menghapus wawasan')
    }
  }

  const filtered = insights.filter(
    (i) =>
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.topic.toLowerCase().includes(search.toLowerCase()) ||
      i.author.toLowerCase().includes(search.toLowerCase())
  )

  const formatDate = (date: string | null) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div>
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Wawasan
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Kelola artikel dan konten wawasan
            </p>
          </div>
          <Button onClick={openCreate} className="gap-2">
            <Plus className="size-4" />
            Tulis Artikel
          </Button>
        </div>

        {/* Search */}
        <Card className="mb-6 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Cari artikel..."
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
              <FileText className="mb-3 size-10" />
              <p className="text-sm">Belum ada artikel</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul</TableHead>
                  <TableHead>Topik</TableHead>
                  <TableHead className="hidden md:table-cell">Penulis</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">Tanggal</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((insight) => (
                  <TableRow key={insight.id}>
                    <TableCell className="font-medium max-w-[200px] truncate">
                      {insight.title}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={TOPIC_COLORS[insight.topic] || TOPIC_COLORS.Lainnya}
                      >
                        {insight.topic}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-gray-600">
                      {insight.author}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={insight.status === 'published' ? 'default' : 'outline'}
                        className={
                          insight.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100'
                            : ''
                        }
                      >
                        {insight.status === 'published' ? 'Terbit' : 'Draf'}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-gray-500 text-sm">
                      {formatDate(insight.publishedAt || insight.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEdit(insight)}
                          className="size-8 p-0"
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDelete(insight)}
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editing ? 'Edit Artikel' : 'Tulis Artikel Baru'}
            </DialogTitle>
            <DialogDescription>
              {editing
                ? 'Perbarui konten artikel Anda'
                : 'Buat artikel wawasan baru'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Judul *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Judul artikel"
              />
              {form.title && (
                <p className="text-xs text-gray-400">
                  Slug: {handleSlug(form.title)}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="excerpt">Ringkasan *</Label>
              <Textarea
                id="excerpt"
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                placeholder="Ringkasan singkat artikel"
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="body">Konten *</Label>
              <Textarea
                id="body"
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                placeholder="Tulis konten artikel di sini..."
                rows={10}
                className="min-h-[200px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Topik *</Label>
                <Select
                  value={form.topic}
                  onValueChange={(v) => setForm({ ...form, topic: v })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TOPIC_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                    <SelectItem value="draft">Draf</SelectItem>
                    <SelectItem value="published">Terbit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="author">Penulis</Label>
                <Input
                  id="author"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  placeholder="Nama penulis"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="thumbnail">Thumbnail</Label>
                <Input
                  id="thumbnail"
                  value={form.thumbnail}
                  onChange={(e) =>
                    setForm({ ...form, thumbnail: e.target.value })
                  }
                  placeholder="/path/to/image.jpg"
                />
              </div>
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
              {editing ? 'Simpan Perubahan' : 'Buat Artikel'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Artikel?</AlertDialogTitle>
            <AlertDialogDescription>
              Artikel &quot;{deleting?.title}&quot; akan dihapus secara permanen.
              Tindakan ini tidak dapat dibatalkan.
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

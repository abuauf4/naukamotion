'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  Plus,
  Pencil,
  Trash2,
  HelpCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
  GripVertical,
  Search,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface Faq {
  id: string
  question: string
  answer: string
  category: string
  order: number
  status: string
  createdAt: string
  updatedAt: string
}

const CATEGORY_OPTIONS = [
  { value: 'general', label: 'Umum' },
  { value: 'layanan', label: 'Layanan' },
  { value: 'teknis', label: 'Teknis' },
  { value: 'harga', label: 'Harga' },
]

const CATEGORY_COLORS: Record<string, string> = {
  general: 'bg-slate-100 text-slate-800',
  layanan: 'bg-teal-100 text-teal-800',
  teknis: 'bg-violet-100 text-violet-800',
  harga: 'bg-amber-100 text-amber-800',
}

const emptyForm = {
  question: '',
  answer: '',
  category: 'general',
  order: 0,
  status: 'published',
}

export default function FaqPage() {
  const [faqs, setFaqs] = useState<Faq[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editing, setEditing] = useState<Faq | null>(null)
  const [deleting, setDeleting] = useState<Faq | null>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/faqs')
      if (!res.ok) throw new Error('Gagal memuat data')
      const data = await res.json()
      setFaqs(data)
    } catch {
      toast.error('Gagal memuat FAQ')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const openCreate = () => {
    setEditing(null)
    setForm({ ...emptyForm, order: faqs.length })
    setDialogOpen(true)
  }

  const openEdit = (faq: Faq) => {
    setEditing(faq)
    setForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      order: faq.order,
      status: faq.status,
    })
    setDialogOpen(true)
  }

  const openDelete = (faq: Faq) => {
    setDeleting(faq)
    setDeleteOpen(true)
  }

  const handleSave = async () => {
    if (!form.question || !form.answer) {
      toast.error('Pertanyaan dan jawaban wajib diisi')
      return
    }

    setSaving(true)
    try {
      if (editing) {
        const res = await fetch('/api/admin/faqs', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editing.id, ...form }),
        })
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || 'Gagal memperbarui')
        }
        toast.success('FAQ berhasil diperbarui')
      } else {
        const res = await fetch('/api/admin/faqs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || 'Gagal membuat')
        }
        toast.success('FAQ berhasil dibuat')
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
      const res = await fetch(`/api/admin/faqs?id=${deleting.id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Gagal menghapus')
      toast.success('FAQ berhasil dihapus')
      setDeleteOpen(false)
      setDeleting(null)
      fetchData()
    } catch {
      toast.error('Gagal menghapus FAQ')
    }
  }

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const filtered = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase())
  )

  const getCategoryLabel = (value: string) => {
    return CATEGORY_OPTIONS.find((c) => c.value === value)?.label || value
  }

  return (
    <div>
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              FAQ
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Kelola pertanyaan yang sering diajukan
            </p>
          </div>
          <Button onClick={openCreate} className="gap-2">
            <Plus className="size-4" />
            Tambah FAQ
          </Button>
        </div>

        {/* Search */}
        <Card className="mb-6 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Cari FAQ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* FAQ List */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="size-6 animate-spin text-gray-400" />
          </div>
        ) : filtered.length === 0 ? (
          <Card>
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <HelpCircle className="mb-3 size-10" />
              <p className="text-sm">Belum ada FAQ</p>
            </div>
          </Card>
        ) : (
          <div className="space-y-3">
            {filtered.map((faq) => (
              <Card key={faq.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-start">
                    <div className="flex items-center gap-2 px-4 py-4 text-gray-400">
                      <GripVertical className="size-4" />
                      <span className="text-xs font-mono w-6 text-center">
                        {faq.order}
                      </span>
                    </div>

                    <div className="flex-1 border-l">
                      <button
                        type="button"
                        onClick={() => toggleExpand(faq.id)}
                        className="flex w-full items-center justify-between px-4 py-4 text-left hover:bg-gray-50/50 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <span className="font-medium text-gray-900 truncate">
                            {faq.question}
                          </span>
                          <Badge
                            variant="secondary"
                            className={
                              CATEGORY_COLORS[faq.category] ||
                              CATEGORY_COLORS.general
                            }
                          >
                            {getCategoryLabel(faq.category)}
                          </Badge>
                          {faq.status !== 'published' && (
                            <Badge variant="outline" className="text-gray-500">
                              Draf
                            </Badge>
                          )}
                        </div>
                        {expanded.has(faq.id) ? (
                          <ChevronUp className="size-4 text-gray-400 shrink-0 ml-2" />
                        ) : (
                          <ChevronDown className="size-4 text-gray-400 shrink-0 ml-2" />
                        )}
                      </button>

                      {expanded.has(faq.id) && (
                        <div className="border-t px-4 py-3 bg-gray-50/50">
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1 px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEdit(faq)}
                        className="size-8 p-0"
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDelete(faq)}
                        className="size-8 p-0 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editing ? 'Edit FAQ' : 'Tambah FAQ'}
            </DialogTitle>
            <DialogDescription>
              {editing
                ? 'Perbarui pertanyaan dan jawaban'
                : 'Tambahkan pertanyaan baru ke daftar FAQ'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="question">Pertanyaan *</Label>
              <Input
                id="question"
                value={form.question}
                onChange={(e) =>
                  setForm({ ...form, question: e.target.value })
                }
                placeholder="Tulis pertanyaan..."
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="answer">Jawaban *</Label>
              <Textarea
                id="answer"
                value={form.answer}
                onChange={(e) => setForm({ ...form, answer: e.target.value })}
                placeholder="Tulis jawaban..."
                rows={5}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label>Kategori</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm({ ...form, category: v })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="order">Urutan</Label>
                <Input
                  id="order"
                  type="number"
                  value={form.order}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      order: parseInt(e.target.value) || 0,
                    })
                  }
                  min={0}
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
              {editing ? 'Simpan Perubahan' : 'Tambah FAQ'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus FAQ?</AlertDialogTitle>
            <AlertDialogDescription>
              FAQ &quot;{deleting?.question}&quot; akan dihapus secara permanen.
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

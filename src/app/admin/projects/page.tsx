'use client'

import { useEffect, useState, useCallback } from 'react'
import { toast } from 'sonner'
import Image from 'next/image'
import {
  Plus,
  Pencil,
  Trash2,
  FolderOpen,
  ExternalLink,
  Star,
  Upload,
  ImageIcon,
  X,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
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

interface Project {
  id: string
  slug: string
  title: string
  client: string
  category: string
  description: string
  approach: string | null
  liveUrl: string | null
  image: string | null
  color: string
  featured: boolean
  order: number
  status: string
  createdAt: string
  updatedAt: string
}

const PROJECT_STATUS_COLORS: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-700 border-gray-200',
  published: 'bg-green-100 text-green-800 border-green-200',
  archived: 'bg-orange-100 text-orange-800 border-orange-200',
}

const PROJECT_STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  published: 'Published',
  archived: 'Arsip',
}

const CATEGORY_OPTIONS = [
  'Automotive Sales Website',
  'Business Premium Website',
  'Business System',
  'CMS Platform',
  'Digital Invitation',
  'Digital Experience Strategy',
]

interface ProjectForm {
  title: string
  client: string
  category: string
  description: string
  approach: string
  liveUrl: string
  image: string
  color: string
  featured: boolean
  order: number
  status: string
}

const EMPTY_FORM: ProjectForm = {
  title: '',
  client: '',
  category: '',
  description: '',
  approach: '',
  liveUrl: '',
  image: '',
  color: '#0d9488',
  featured: false,
  order: 0,
  status: 'draft',
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [form, setForm] = useState<ProjectForm>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/projects')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setProjects(data)
    } catch {
      toast.error('Gagal memuat data proyek')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Hanya file gambar yang diizinkan')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Ukuran file maksimal 5MB')
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'portfolio')

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Upload gagal')
      }

      const data = await res.json()
      setForm({ ...form, image: data.url })
      toast.success('Gambar berhasil diupload')
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Upload gagal')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleImageUpload(file)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleImageUpload(file)
  }

  const openAddForm = () => {
    setEditingProject(null)
    setForm(EMPTY_FORM)
    setFormOpen(true)
  }

  const openEditForm = (project: Project) => {
    setEditingProject(project)
    setForm({
      title: project.title,
      client: project.client,
      category: project.category,
      description: project.description,
      approach: project.approach || '',
      liveUrl: project.liveUrl || '',
      image: project.image || '',
      color: project.color,
      featured: project.featured,
      order: project.order,
      status: project.status,
    })
    setFormOpen(true)
  }

  const handleSave = async () => {
    if (!form.title.trim() || !form.client.trim() || !form.category.trim()) {
      toast.error('Judul, klien, dan kategori wajib diisi')
      return
    }
    setSaving(true)
    try {
      const slug = form.title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
      const payload = {
        ...form,
        slug,
        approach: form.approach || null,
        liveUrl: form.liveUrl || null,
        image: form.image || null,
      }

      if (editingProject) {
        const res = await fetch(`/api/admin/projects/${editingProject.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error('Failed to update')
        toast.success('Proyek berhasil diperbarui')
      } else {
        const res = await fetch('/api/admin/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error('Failed to create')
        toast.success('Proyek berhasil ditambahkan')
      }
      setFormOpen(false)
      fetchProjects()
    } catch {
      toast.error('Gagal menyimpan proyek')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      const res = await fetch(`/api/admin/projects/${deleteId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      toast.success('Proyek berhasil dihapus')
      fetchProjects()
    } catch {
      toast.error('Gagal menghapus proyek')
    } finally {
      setDeleteId(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
              <FolderOpen className="h-5 w-5 text-teal-700" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Proyek
              </h1>
              <p className="text-sm text-gray-500">
                {projects.length} total proyek
              </p>
            </div>
          </div>
          <Button onClick={openAddForm}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Proyek
          </Button>
        </div>

        {/* Card Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-200 border-t-teal-600" />
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <FolderOpen className="mb-3 h-12 w-12" />
            <p className="text-sm">Belum ada proyek</p>
            <Button onClick={openAddForm} variant="outline" className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Proyek Pertama
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="group overflow-hidden py-0 gap-0 transition-shadow hover:shadow-md"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <FolderOpen className="h-10 w-10 text-gray-300" />
                    </div>
                  )}
                  {/* Status badge overlay */}
                  <div className="absolute top-3 left-3">
                    <Badge
                      className={`${PROJECT_STATUS_COLORS[project.status] || 'bg-gray-100 text-gray-700'} border text-xs backdrop-blur-sm`}
                    >
                      {PROJECT_STATUS_LABELS[project.status] || project.status}
                    </Badge>
                  </div>
                  {/* Featured star */}
                  {project.featured && (
                    <div className="absolute top-3 right-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100">
                        <Star className="h-3.5 w-3.5 text-amber-600 fill-amber-600" />
                      </div>
                    </div>
                  )}
                  {/* Color bar */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{ backgroundColor: project.color }}
                  />
                </div>

                {/* Content */}
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5 truncate">
                    {project.client}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-teal-600 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-3 flex items-center gap-2 border-t pt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => openEditForm(project)}
                    >
                      <Pencil className="mr-1.5 h-3.5 w-3.5" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
                      onClick={() => setDeleteId(project.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Add/Edit Dialog */}
        <Dialog open={formOpen} onOpenChange={setFormOpen}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? 'Edit Proyek' : 'Tambah Proyek'}
              </DialogTitle>
              <DialogDescription>
                {editingProject
                  ? 'Perbarui informasi proyek'
                  : 'Isi detail proyek baru'}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Judul *</Label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Nama proyek"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client">Klien *</Label>
                  <Input
                    id="client"
                    value={form.client}
                    onChange={(e) => setForm({ ...form, client: e.target.value })}
                    placeholder="Nama klien"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori *</Label>
                  <Select
                    value={form.category}
                    onValueChange={(v) => setForm({ ...form, category: v })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORY_OPTIONS.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-status">Status</Label>
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
                      <SelectItem value="archived">Arsip</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Deskripsi singkat proyek"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="approach">Pendekatan</Label>
                <Textarea
                  id="approach"
                  value={form.approach}
                  onChange={(e) => setForm({ ...form, approach: e.target.value })}
                  placeholder="Pendekatan yang digunakan"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                  <Label htmlFor="liveUrl">URL Live</Label>
                  <Input
                    id="liveUrl"
                    value={form.liveUrl}
                    onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>

              <div className="space-y-2">
                  <Label>Gambar Proyek</Label>
                  {form.image ? (
                    <div className="relative group rounded-lg overflow-hidden border border-gray-200">
                      <div className="relative aspect-[16/10] bg-gray-50">
                        <Image
                          src={form.image}
                          alt="Preview"
                          fill
                          className="object-cover object-top"
                          sizes="600px"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, image: '' })}
                        className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <div className="absolute bottom-2 left-2 right-2">
                        <label className="flex items-center justify-center gap-2 h-8 rounded-md bg-black/50 text-white text-xs font-medium cursor-pointer hover:bg-black/70 transition-colors backdrop-blur-sm">
                          <Upload className="h-3.5 w-3.5" />
                          Ganti Gambar
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp,image/gif"
                            onChange={handleFileSelect}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleDrop}
                      className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors cursor-pointer ${
                        dragOver
                          ? 'border-teal-500 bg-teal-50'
                          : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
                      }`}
                    >
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/gif"
                        onChange={handleFileSelect}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      {uploading ? (
                        <div className="flex flex-col items-center gap-2">
                          <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-200 border-t-teal-600" />
                          <p className="text-sm text-gray-500">Mengupload...</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <ImageIcon className="h-8 w-8 text-gray-400" />
                          <p className="text-sm text-gray-600 font-medium">
                            Drag & drop gambar di sini
                          </p>
                          <p className="text-xs text-gray-400">
                            atau klik untuk pilih file (PNG, JPEG, WebP, GIF — max 5MB)
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="color">Warna</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={form.color}
                      onChange={(e) => setForm({ ...form, color: e.target.value })}
                      className="h-9 w-12 cursor-pointer rounded border"
                    />
                    <Input
                      value={form.color}
                      onChange={(e) => setForm({ ...form, color: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order">Urutan</Label>
                  <Input
                    id="order"
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                    min={0}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="featured" className="mb-1 block">Featured</Label>
                  <div className="flex items-center gap-2 pt-1">
                    <Switch
                      id="featured"
                      checked={form.featured}
                      onCheckedChange={(v) => setForm({ ...form, featured: v })}
                    />
                    <span className="text-sm text-gray-500">
                      {form.featured ? 'Ya' : 'Tidak'}
                    </span>
                  </div>
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
                ) : editingProject ? (
                  'Simpan Perubahan'
                ) : (
                  'Tambah Proyek'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus Proyek?</AlertDialogTitle>
              <AlertDialogDescription>
                Tindakan ini tidak dapat dibatalkan. Data proyek akan dihapus secara permanen.
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

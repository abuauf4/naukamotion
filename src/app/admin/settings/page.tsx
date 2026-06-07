'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Settings, Loader2, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface Setting {
  id: string
  key: string
  value: string
}

const SETTINGS_CONFIG = [
  {
    key: 'site_name',
    label: 'Nama Situs',
    placeholder: 'Nauka Motion',
    description: 'Nama situs yang ditampilkan di header dan tab browser',
    group: 'Umum',
  },
  {
    key: 'tagline',
    label: 'Tagline',
    placeholder: 'Small Movement. Real Impact.',
    description: 'Tagline singkat yang mewakili brand Anda',
    group: 'Umum',
  },
  {
    key: 'seo_description',
    label: 'Deskripsi SEO',
    placeholder: 'Nauka Motion — studio digital yang membangun produk digital dengan dampak nyata',
    description: 'Deskripsi untuk mesin pencari (meta description)',
    group: 'Umum',
  },
  {
    key: 'founder_name',
    label: 'Nama Founder',
    placeholder: 'Abu Aufa',
    description: 'Nama pendiri yang ditampilkan di footer',
    group: 'Umum',
  },
  {
    key: 'instagram_url',
    label: 'URL Instagram',
    placeholder: 'https://instagram.com/naukamotion',
    description: 'Link profil Instagram',
    group: 'Sosial Media',
  },
  {
    key: 'linkedin_url',
    label: 'URL LinkedIn',
    placeholder: 'https://linkedin.com/company/naukamotion',
    description: 'Link halaman LinkedIn',
    group: 'Sosial Media',
  },
]

const DEFAULT_VALUES: Record<string, string> = {
  site_name: 'Nauka Motion',
  tagline: 'Small Movement. Real Impact.',
  seo_description: 'Nauka Motion — studio digital yang membangun produk digital dengan dampak nyata untuk pertumbuhan bisnis Anda.',
  founder_name: 'Abu Aufa',
  instagram_url: '',
  linkedin_url: '',
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [original, setOriginal] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/settings')
      if (!res.ok) throw new Error('Gagal memuat data')
      const data: Setting[] = await res.json()

      const settingsMap: Record<string, string> = {}
      for (const s of data) {
        settingsMap[s.key] = s.value
      }

      // Fill in defaults for missing keys
      for (const config of SETTINGS_CONFIG) {
        if (!(config.key in settingsMap)) {
          settingsMap[config.key] = DEFAULT_VALUES[config.key] || ''
        }
      }

      setSettings(settingsMap)
      setOriginal({ ...settingsMap })
    } catch {
      toast.error('Gagal memuat pengaturan')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const hasChanges = Object.keys(settings).some(
    (key) => settings[key] !== original[key]
  )

  const handleSave = async () => {
    const changes: { key: string; value: string }[] = []
    for (const config of SETTINGS_CONFIG) {
      if (settings[config.key] !== original[config.key]) {
        changes.push({ key: config.key, value: settings[config.key] })
      }
    }

    if (changes.length === 0) {
      toast.info('Tidak ada perubahan untuk disimpan')
      return
    }

    setSaving(true)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(changes),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Gagal menyimpan')
      }
      toast.success(`${changes.length} pengaturan berhasil disimpan`)
      setOriginal({ ...settings })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Gagal menyimpan pengaturan')
    } finally {
      setSaving(false)
    }
  }

  const groups = [...new Set(SETTINGS_CONFIG.map((c) => c.group))]

  return (
    <div>
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Pengaturan
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Konfigurasi situs dan informasi umum
            </p>
          </div>
          <Button
            onClick={handleSave}
            disabled={!hasChanges || saving}
            className="gap-2"
          >
            {saving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            Simpan Perubahan
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="size-6 animate-spin text-gray-400" />
          </div>
        ) : (
          <div className="space-y-6">
            {groups.map((group) => (
              <Card key={group}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Settings className="size-5 text-gray-400" />
                    {group}
                  </CardTitle>
                  <CardDescription>
                    Pengaturan {group.toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {SETTINGS_CONFIG.filter((c) => c.group === group).map(
                    (config, idx, arr) => (
                      <div key={config.key}>
                        <div className="grid gap-2">
                          <Label
                            htmlFor={config.key}
                            className="flex items-center justify-between"
                          >
                            <span>{config.label}</span>
                            {settings[config.key] !== original[config.key] && (
                              <span className="text-xs text-teal-600 font-normal">
                                Diubah
                              </span>
                            )}
                          </Label>
                          <Input
                            id={config.key}
                            value={settings[config.key] || ''}
                            onChange={(e) =>
                              setSettings({ ...settings, [config.key]: e.target.value })
                            }
                            placeholder={config.placeholder}
                          />
                          <p className="text-xs text-gray-400">
                            {config.description}
                          </p>
                        </div>
                        {idx < arr.length - 1 && <Separator className="mt-6" />}
                      </div>
                    )
                  )}
                </CardContent>
              </Card>
            ))}

            {hasChanges && (
              <div className="flex justify-end">
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="gap-2"
                >
                  {saving ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Save className="size-4" />
                  )}
                  Simpan Perubahan
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
  )
}

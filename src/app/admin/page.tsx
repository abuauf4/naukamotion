'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Mail, Briefcase, FileText, MessageSquare, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardData {
  totalLeads: number;
  newLeadsThisMonth: number;
  activeProjects: number;
  publishedInsights: number;
  totalTestimonials: number;
  recentLeads: {
    id: string;
    name: string;
    service: string | null;
    status: string;
    createdAt: string;
  }[];
  recentProjects: {
    id: string;
    title: string;
    client: string;
    category: string;
    status: string;
  }[];
}

const statusColors: Record<string, string> = {
  new: 'bg-green-100 text-green-700',
  contacted: 'bg-blue-100 text-blue-700',
  qualified: 'bg-amber-100 text-amber-700',
  converted: 'bg-teal-100 text-teal-700',
  lost: 'bg-red-100 text-red-700',
};

const statusLabels: Record<string, string> = {
  new: 'Baru',
  contacted: 'Dihubungi',
  qualified: 'Terkualifikasi',
  converted: 'Konversi',
  lost: 'Hilang',
};

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/admin/dashboard');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error('Failed to load dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-20 text-slate-400">
        Gagal memuat data dashboard
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Leads',
      value: data.totalLeads,
      subtitle: `${data.newLeadsThisMonth} baru bulan ini`,
      icon: Mail,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
    },
    {
      title: 'Proyek Aktif',
      value: data.activeProjects,
      subtitle: 'proyek dipublikasikan',
      icon: Briefcase,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      title: 'Wawasan',
      value: data.publishedInsights,
      subtitle: 'artikel dipublikasikan',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Testimoni',
      value: data.totalTestimonials,
      subtitle: 'testimoni dipublikasikan',
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">
          Ringkasan data Nauka Motion
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">
                  {stat.title}
                </CardTitle>
                <div className={cn('p-2 rounded-lg', stat.bgColor)}>
                  <Icon className={cn('size-4', stat.color)} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">
                  {stat.value}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {stat.subtitle}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-900">
              Leads Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            {data.recentLeads.length === 0 ? (
              <div className="px-6 pb-4 text-sm text-slate-400">
                Belum ada leads
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Layanan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tanggal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.recentLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium text-slate-900">
                        {lead.name}
                      </TableCell>
                      <TableCell className="text-slate-500">
                        {lead.service || '-'}
                      </TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                            statusColors[lead.status] || 'bg-slate-100 text-slate-600'
                          )}
                        >
                          {statusLabels[lead.status] || lead.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-slate-400 text-xs">
                        {new Date(lead.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Recent Projects */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-900">
              Proyek Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            {data.recentProjects.length === 0 ? (
              <div className="px-6 pb-4 text-sm text-slate-400">
                Belum ada proyek
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Judul</TableHead>
                    <TableHead>Klien</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.recentProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium text-slate-900">
                        {project.title}
                      </TableCell>
                      <TableCell className="text-slate-500">
                        {project.client}
                      </TableCell>
                      <TableCell className="text-slate-500">
                        {project.category}
                      </TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                            project.status === 'published'
                              ? 'bg-green-100 text-green-700'
                              : project.status === 'draft'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-slate-100 text-slate-600'
                          )}
                        >
                          {project.status === 'published' ? 'Dipublikasi' : project.status === 'draft' ? 'Draft' : 'Diarsipkan'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

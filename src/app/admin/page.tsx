import { prisma } from '@/lib/cms/db';

export default async function AdminDashboardPage() {
  const [
    totalCategories,
    totalProjects,
    publishedProjects,
    developmentProjects,
    draftProjects,
    publicProjects,
    privateProjects,
    clientProjects,
    personalProjects,
    collaborationProjects,
    internalProjects,
    totalSections,
    totalTechnologies,
  ] = await Promise.all([
    prisma.category.count(),
    prisma.project.count(),
    prisma.project.count({ where: { status: 'published' } }),
    prisma.project.count({ where: { status: 'development' } }),
    prisma.project.count({ where: { status: 'draft' } }),
    prisma.project.count({ where: { visibility: 'public' } }),
    prisma.project.count({ where: { visibility: 'private' } }),
    prisma.project.count({ where: { type: 'client' } }),
    prisma.project.count({ where: { type: 'personal' } }),
    prisma.project.count({ where: { type: 'collaboration' } }),
    prisma.project.count({ where: { type: 'internal' } }),
    prisma.caseStudySection.count(),
    prisma.projectTechnology.count(),
  ]);

  const stats = [
    { label: 'Categories', value: totalCategories },
    { label: 'Total Projects', value: totalProjects },
    { label: 'Case Study Sections', value: totalSections },
    { label: 'Technologies', value: totalTechnologies },
  ];

  const statusBreakdown = [
    { label: 'Published', value: publishedProjects, color: 'var(--ink)' },
    { label: 'Development', value: developmentProjects, color: 'var(--burnt)' },
    { label: 'Draft', value: draftProjects, color: 'var(--ink-faint)' },
  ];

  const typeBreakdown = [
    { label: 'Client', value: clientProjects },
    { label: 'Personal', value: personalProjects },
    { label: 'Collaboration', value: collaborationProjects },
    { label: 'Internal', value: internalProjects },
  ];

  const visibilityBreakdown = [
    { label: 'Public', value: publicProjects },
    { label: 'Private', value: privateProjects },
  ];

  return (
    <main style={{ flex: 1, padding: '32px clamp(16px, 4vw, 40px)' }}>
      <h1 style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 500, fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--ink)', margin: '0 0 32px 0' }}>
        Dashboard
      </h1>

      <div className="admin-stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="admin-stat-card">
            <p className="admin-stat-value">{stat.value}</p>
            <p className="admin-stat-label">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="admin-breakdown-grid">
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', color: 'var(--ink-faint)', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 16px 0' }}>By Status</h2>
          {statusBreakdown.map((item) => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--line)' }}>
              <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '0.9rem', color: 'var(--ink-soft)' }}>{item.label}</span>
              <span style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 500, fontSize: '0.9rem', color: item.color }}>{item.value}</span>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', color: 'var(--ink-faint)', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 16px 0' }}>By Type</h2>
          {typeBreakdown.map((item) => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--line)' }}>
              <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '0.9rem', color: 'var(--ink-soft)' }}>{item.label}</span>
              <span style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 500, fontSize: '0.9rem', color: 'var(--ink)' }}>{item.value}</span>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.7rem', color: 'var(--ink-faint)', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 16px 0' }}>By Visibility</h2>
          {visibilityBreakdown.map((item) => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--line)' }}>
              <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '0.9rem', color: 'var(--ink-soft)' }}>{item.label}</span>
              <span style={{ fontFamily: 'var(--font-body), sans-serif', fontWeight: 500, fontSize: '0.9rem', color: 'var(--ink)' }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .admin-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 32px;
        }
        .admin-stat-card {
          background: var(--bg-card);
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 20px;
          overflow: hidden;
        }
        .admin-stat-value {
          font-family: var(--font-fraunces), serif;
          font-style: italic;
          font-size: 2rem;
          color: var(--ink);
          margin: 0;
          line-height: 1;
        }
        .admin-stat-label {
          font-family: var(--font-mono), monospace;
          font-size: 0.65rem;
          color: var(--ink-faint);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin: 8px 0 0 0;
          word-break: break-word;
        }
        .admin-breakdown-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 769px) {
          .admin-stats-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 16px;
          }
          .admin-stat-value {
            font-size: 2.5rem;
          }
          .admin-stat-label {
            font-size: 0.7rem;
          }
          .admin-breakdown-grid {
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
            gap: 16px;
          }
        }
      `}</style>
    </main>
  );
}

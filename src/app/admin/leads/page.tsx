import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/cms/db";
import { Inbox } from "lucide-react";

export default async function LeadInboxPage() {
  if (!(await getAdminSession())) redirect("/admin/login");
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return (
    <main className="nm-lead-inbox">
      <p className="nm-eyebrow">NAUKA MOTION / INQUIRIES</p>
      <h1>Brief proyek masuk</h1>
      <p className="nm-lead-intro">
        100 brief terbaru dari form kontak. Buka email atau WhatsApp untuk
        menindaklanjuti kebutuhan calon pelanggan.
      </p>
      {leads.length === 0 ? (
        <div className="nm-empty">
          <Inbox size={30} />
          <p>
            Belum ada brief proyek. Kiriman dari halaman kontak akan tampil di
            sini setelah tersimpan.
          </p>
        </div>
      ) : (
        <div className="nm-lead-list">
          {leads.map((lead) => {
            let phone = lead.phone?.replace(/\D/g, "") ?? "";
            if (phone.startsWith("0")) phone = "62" + phone.slice(1);
            const whatsapp = phone
              ? `https://wa.me/${phone}?text=${encodeURIComponent(`Halo ${lead.name}, saya dari Nauka Motion. Saya ingin menindaklanjuti brief ${lead.service ?? "proyek"} Anda.`)}`
              : undefined;
            return (
              <article className="nm-lead-card" key={lead.id}>
                <div className="nm-lead-top">
                  <div>
                    <h2>{lead.name}</h2>
                    <a
                      href={`mailto:${encodeURIComponent(lead.email)}?subject=${encodeURIComponent("Diskusi proyek bersama Nauka Motion")}`}
                    >
                      {lead.email}
                    </a>
                  </div>
                  <time dateTime={lead.createdAt.toISOString()}>
                    {new Intl.DateTimeFormat("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                      timeZone: "Asia/Jakarta",
                    }).format(lead.createdAt)}
                  </time>
                </div>
                <div className="nm-lead-meta">
                  <span>{lead.service ?? "Proyek custom"}</span>
                  {lead.phone && <span>{lead.phone}</span>}
                </div>
                <p className="nm-lead-message">{lead.message}</p>
                {lead.notes && <p className="nm-lead-notes">{lead.notes}</p>}
                <div className="nm-lead-actions">
                  <a
                    className="nm-button nm-button-small nm-button-ghost"
                    href={`mailto:${encodeURIComponent(lead.email)}?subject=${encodeURIComponent("Diskusi proyek bersama Nauka Motion")}`}
                  >
                    Tindak lanjuti via email
                  </a>
                  {whatsapp && (
                    <a
                      href={whatsapp}
                      className="nm-button nm-button-small"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Buka WhatsApp
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}

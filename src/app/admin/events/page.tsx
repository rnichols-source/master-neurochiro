import { createClient } from "@/lib/supabase/server";
import { EliteCard } from "@/components/ui/elite-ui";
import { Users, Ticket, DollarSign, Calendar } from "lucide-react";

export default async function AdminEventsPage() {
  const supabase = await createClient();

  // 1. Fetch Event Stats
  const { data: event } = await supabase
    .from("events")
    .select("*, ticket_types(*)")
    .eq("slug", "adelaide-2026")
    .single();

  // 2. Fetch Attendees
  const { data: attendees } = await supabase
    .from("event_attendees")
    .select("*, ticket_types(category, tier, price)")
    .eq("event_id", event?.id)
    .order("created_at", { ascending: false });

  const totalRevenue = attendees?.reduce((acc, a: any) => acc + Number(a.ticket_types.price), 0) || 0;
  const totalAttendees = attendees?.length || 0;

  return (
    <div className="p-8 space-y-8 bg-brand-cream min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-brand-navy tracking-tight uppercase">{event?.title || "Event Management"}</h1>
          <p className="text-sm font-bold text-brand-orange uppercase tracking-widest">{event?.location} &bull; {new Date(event?.start_date).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <EliteCard title="Total Attendees" icon={Users}>
          <p className="text-4xl font-black text-brand-navy">{totalAttendees} / {event?.max_capacity}</p>
        </EliteCard>
        <EliteCard title="Total Revenue" icon={DollarSign}>
          <p className="text-4xl font-black text-brand-navy">${totalRevenue}</p>
        </EliteCard>
        <EliteCard title="Ticket Availability" icon={Ticket}>
           <div className="space-y-2 mt-4">
              {event?.ticket_types.map((t: any) => (
                <div key={t.id} className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-brand-navy/60">
                  <span>{t.category} ({t.tier})</span>
                  <span>{t.sold_count} Sold</span>
                </div>
              ))}
           </div>
        </EliteCard>
        <EliteCard title="Next Checkpoint" icon={Calendar}>
           <p className="text-sm font-bold text-brand-navy/60 uppercase tracking-widest leading-relaxed">
             Room capacity is at {Math.round((totalAttendees / (event?.max_capacity || 1)) * 100)}%. <br />
             Increase marketing at 50% capacity.
           </p>
        </EliteCard>
      </div>

      <div className="bg-white rounded-3xl border border-brand-navy/5 overflow-hidden elite-shadow">
        <div className="px-8 py-6 border-b border-brand-navy/5 bg-brand-navy/5">
          <h2 className="text-xs font-black uppercase tracking-widest text-brand-navy">Attendee List</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-brand-navy/5 text-[10px] font-black uppercase tracking-widest text-brand-navy/40">
                <th className="px-8 py-4">Name</th>
                <th className="px-8 py-4">Email</th>
                <th className="px-8 py-4">Category</th>
                <th className="px-8 py-4">Tier</th>
                <th className="px-8 py-4">Price</th>
                <th className="px-8 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendees?.map((a: any) => (
                <tr key={a.id} className="border-b border-brand-navy/5 hover:bg-brand-navy/5 transition-colors">
                  <td className="px-8 py-4 font-bold text-brand-navy">{a.full_name}</td>
                  <td className="px-8 py-4 text-xs font-medium text-brand-navy/60">{a.email}</td>
                  <td className="px-8 py-4">
                    <span className="px-2 py-1 bg-brand-navy text-white text-[8px] font-black uppercase tracking-widest rounded-full">
                      {a.ticket_types.category}
                    </span>
                  </td>
                  <td className="px-8 py-4">
                    <span className={`px-2 py-1 text-[8px] font-black uppercase tracking-widest rounded-full ${a.ticket_types.tier === 'inner_circle' ? 'bg-brand-orange text-white' : 'bg-brand-navy/10 text-brand-navy'}`}>
                      {a.ticket_types.tier}
                    </span>
                  </td>
                  <td className="px-8 py-4 font-bold text-brand-navy">${a.ticket_types.price}</td>
                  <td className="px-8 py-4">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block mr-2" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-green-600">Paid</span>
                  </td>
                </tr>
              ))}
              {attendees?.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center text-brand-navy/20 font-black uppercase tracking-[1em]">No Attendees Yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import { TEAM, TEAM_LEAD, initials, type TeamMember } from "@/lib/team";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

// Portrait or, until a photo is added in lib/team.ts, a gold monogram
function Portrait({ member, sizes, className }: { member: TeamMember; sizes: string; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden bg-brand-midnight", className)}>
      {member.photo ? (
        <Image src={member.photo} alt={member.name} fill sizes={sizes} className="object-cover" />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center font-headline italic text-brand-gold text-2xl">
          {initials(member.name)}
        </span>
      )}
    </div>
  );
}

// Compact team block: the managing director highlighted, everyone else in one row
export function TeamSection() {
  return (
    <section className="py-section px-6 md:px-12">
      <div className="max-w-site mx-auto">
        <Reveal className="mb-12 md:mb-16">
          <SectionHeading eyebrow="Our team" title={<>The people <em>behind Mohak</em></>} />
        </Reveal>

        <Reveal className="max-w-3xl mx-auto grid sm:grid-cols-[auto_1fr] gap-8 items-center">
          <Portrait member={TEAM_LEAD} sizes="176px" className="size-44 rounded-full mx-auto" />
          <div className="text-center sm:text-left">
            <h3 className="font-headline text-2xl">{TEAM_LEAD.name}</h3>
            <p className="mt-2 text-eyebrow uppercase text-brand-gold">{TEAM_LEAD.role}</p>
            <p className="mt-4 text-sm text-foreground/70 font-light leading-relaxed">{TEAM_LEAD.note}</p>
          </div>
        </Reveal>

        {/* Centred wrapping row: any team size stays balanced (a short last row is centred, not left-aligned) */}
        <ul className="mt-14 md:mt-16 flex flex-wrap justify-center gap-x-6 gap-y-10">
          {TEAM.map((member, i) => (
            <li key={member.name} className="w-[calc(50%-0.75rem)] sm:w-40 text-center">
              <Reveal delay={i * 75}>
                <Portrait member={member} sizes="96px" className="size-24 rounded-full mx-auto" />
                <h3 className="mt-4 font-headline text-lg">{member.name}</h3>
                <p className="mt-1 text-xs text-foreground/60 font-light">{member.role}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import type { CSSProperties, MouseEvent } from "react";

type SocialLink = {
  label: string;
  href: string;
  icon: string;
};

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
  accent: string;
  socials: SocialLink[];
};

const sharedLinks = {
  discord: "https://discord.gg/KEWZHDQq6X",
};

const teamGroups: { title: string; members: TeamMember[] }[] = [
  {
    title: "Leadership",
    members: [
      {
        name: "CeroCee",
        role: "Zentux Director",
        image: "/team-cerocee.png",
        accent: "#b45cff",
        bio:
          "Leads the vision, product direction, and final decisions behind Zentux. As director, CeroCee turns community feedback into clear priorities, protects the brand standard, and keeps every release focused on premium gaming tools.",
        socials: [
          { label: "YouTube", href: "https://www.youtube.com/@CeroCee", icon: "/social-yt.png" },
          { label: "TikTok", href: "https://www.tiktok.com/@cero_cee", icon: "/social-tt.png" },
          {
            label: "Instagram",
            href: "https://www.instagram.com/cerocee?igsh=MTNxYnoxdHBsMXU5Mw%3D%3D&utm_source=qr",
            icon: "/social-ig.png",
          },
          { label: "Discord", href: sharedLinks.discord, icon: "/social-dc.png" },
          {
            label: "Roblox",
            href: "https://www.roblox.com/es/users/492800898/profile",
            icon: "/social-roblox.png",
          },
        ],
      },
      {
        name: "BeltranCee",
        role: "Zentux Director",
        image: "/team-polocee.png",
        accent: "#d85cff",
        bio:
          "Guides Zentux with leadership focused on structure, trust, and long-term growth. As a director, BeltranCee helps shape priorities, support team decisions, and keep the brand moving with a professional standard.",
        socials: [
          {
            label: "Roblox",
            href: "https://www.roblox.com/users/10690376642/profile",
            icon: "/social-roblox.png",
          },
        ],
      },
    ],
  },
  {
    title: "Moderation",
    members: [
      {
        name: "DorixmCee",
        role: "𝐙𝐞𝐧𝐭𝐮𝐱 | 𝐇𝐞𝐚𝐝 𝐌𝐨𝐝𝐞𝐫𝐚𝐭𝐨𝐫",
        image: "/team-dorixm-head-moderator.png",
        accent: "#ff2f76",
        bio:
          "Leads the Zentux moderation team, helps moderators support customers, and keeps the community organized, respectful, and informed. As Head Moderator, DorixmCee coordinates moderation and brings community feedback to the team.",
        socials: [
          {
            label: "TikTok",
            href: "https://www.tiktok.com/@dorixm1?_r=1&_t=ZS-97HCteifyK7",
            icon: "/social-tt.png",
          },
        ],
      },
    ],
  },
];

function handleCardTilt(event: MouseEvent<HTMLElement>) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const rotateY = (x / rect.width - 0.5) * 14;
  const rotateX = (0.5 - y / rect.height) * 14;

  card.style.setProperty("--team-rotate-x", `${rotateX.toFixed(2)}deg`);
  card.style.setProperty("--team-rotate-y", `${rotateY.toFixed(2)}deg`);
  card.style.setProperty("--team-glow-x", `${x}px`);
  card.style.setProperty("--team-glow-y", `${y}px`);
}

function resetCardTilt(event: MouseEvent<HTMLElement>) {
  const card = event.currentTarget;
  card.style.setProperty("--team-rotate-x", "0deg");
  card.style.setProperty("--team-rotate-y", "0deg");
  card.style.setProperty("--team-glow-x", "50%");
  card.style.setProperty("--team-glow-y", "50%");
}

function TeamCard({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  return (
    <article
      onMouseMove={handleCardTilt}
      onMouseLeave={resetCardTilt}
      className="team-card group relative min-h-[420px] overflow-hidden rounded-[28px] border border-white/10 bg-black/45 p-[1px] shadow-[0_0_80px_rgba(168,85,247,0.10)] backdrop-blur-2xl"
      style={
        {
          "--team-accent": member.accent,
          "--team-delay": `${index * 90}ms`,
        } as CSSProperties
      }
    >
      <div className="team-card-inner relative h-full rounded-[27px] bg-[#080512]/92 p-6">
        <span className="team-particle left-[12%] top-[18%]" />
        <span className="team-particle right-[18%] top-[10%]" />
        <span className="team-particle bottom-[22%] left-[18%]" />
        <span className="team-particle bottom-[14%] right-[12%]" />

        <div className="relative flex items-start justify-between gap-4">
          <div className="relative">
            <div className="team-avatar-glow absolute inset-[-10px] rounded-full" />
            <Image
              src={member.image}
              alt={`${member.name} avatar`}
              width={112}
              height={112}
              className="relative h-28 w-28 rounded-full border border-white/20 object-cover shadow-[0_0_36px_rgba(168,85,247,0.28)]"
            />
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#d8c8ef]">
            Zentux
          </span>
        </div>

        <div className="mt-7">
          <h3 className="text-3xl font-black leading-tight text-white">
            {member.name}
          </h3>
          <p className="mt-2 text-sm font-black uppercase tracking-[0.16em] text-[var(--team-accent)]">
            {member.role}
          </p>
          <p className="mt-5 text-sm font-semibold leading-7 text-[#bfb5c9]">
            {member.bio}
          </p>
        </div>

        {member.socials.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-2">
            {member.socials.map((social) => (
              <a
                key={`${member.name}-${social.label}`}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${member.name} on ${social.label}`}
                className="team-social inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] p-1.5 transition"
                title={social.label}
              >
                <Image
                  src={social.icon}
                  alt=""
                  width={30}
                  height={30}
                  className="h-full w-full object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.18)]"
                />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default function TeamShowcase() {
  return (
    <section className="relative py-14">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]">
        <div className="team-star-field absolute inset-0 opacity-70" />
      </div>

      <div className="mb-10">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#b989ff]">
          Team Showcase
        </p>
        <h2 className="mt-3 text-4xl font-black text-white sm:text-5xl">
          Meet The Team
        </h2>
        <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-[#a69bb3]">
          The people building the future of Zentux.
        </p>
      </div>

      <div className="space-y-10">
        {teamGroups.map((group, groupIndex) => {
          const groupOffset = teamGroups
            .slice(0, groupIndex)
            .reduce((total, item) => total + item.members.length, 0);

          return <div key={group.title}>
            <div className="mb-5 flex items-center gap-4">
              <h3 className="shrink-0 text-sm font-black uppercase tracking-[0.24em] text-[#d8c8ef]">
                {group.title}
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-[#a855f7]/70 via-[#20e8f2]/35 to-transparent" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {group.members.map((member, memberIndex) => (
                <TeamCard
                  key={member.name}
                  member={member}
                  index={groupOffset + memberIndex}
                />
              ))}
            </div>
          </div>
        })}
      </div>
    </section>
  );
}

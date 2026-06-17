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
  github: "https://github.com/CeroCee/zentux-web",
  x: "https://x.com",
  instagram: "https://instagram.com",
};

const teamMembers: TeamMember[] = [
  {
    name: "CeroCee",
    role: "Director de Zentux",
    image: "/team-cerocee.png",
    accent: "#b45cff",
    bio:
      "Leads the vision, product direction, and final decisions behind Zentux. As director, CeroCee turns community feedback into clear priorities, protects the brand standard, and keeps every release focused on premium gaming tools.",
    socials: [
      { label: "YouTube", href: "https://www.youtube.com/@CeroCee", icon: "YT" },
      { label: "TikTok", href: "https://www.tiktok.com/@cero_cee", icon: "TT" },
      { label: "Discord", href: sharedLinks.discord, icon: "DC" },
      { label: "GitHub", href: sharedLinks.github, icon: "GH" },
    ],
  },
  {
    name: "Core Team Member",
    role: "Core Team Member",
    image: "/zentux-icon.png",
    accent: "#20e8f2",
    bio:
      "Supports the daily momentum of Zentux by testing builds, reviewing user needs, and helping the team keep releases polished, stable, and aligned with the brand.",
    socials: [
      { label: "Discord", href: sharedLinks.discord, icon: "DC" },
      { label: "GitHub", href: sharedLinks.github, icon: "GH" },
      { label: "X", href: sharedLinks.x, icon: "X" },
      { label: "Instagram", href: sharedLinks.instagram, icon: "IG" },
    ],
  },
  {
    name: "Tmozz",
    role: "Director de Zentux",
    image: "/team-tmozz.png",
    accent: "#ff335f",
    bio:
      "Helps direct the future of Zentux through product decisions, team coordination, and release planning. Tmozz keeps the project grounded in quality, trust, and a sharper experience for every user.",
    socials: [
      { label: "Discord", href: sharedLinks.discord, icon: "DC" },
      { label: "GitHub", href: sharedLinks.github, icon: "GH" },
      { label: "X", href: sharedLinks.x, icon: "X" },
      { label: "Instagram", href: sharedLinks.instagram, icon: "IG" },
    ],
  },
  {
    name: "Lead Developer",
    role: "Lead Developer",
    image: "/zentux-icon.png",
    accent: "#8cff5f",
    bio:
      "Builds the technical foundation of Zentux apps, turning ideas into reliable tools with clean systems, license checks, and performance-minded execution.",
    socials: [
      { label: "Discord", href: sharedLinks.discord, icon: "DC" },
      { label: "GitHub", href: sharedLinks.github, icon: "GH" },
      { label: "X", href: sharedLinks.x, icon: "X" },
      { label: "Instagram", href: sharedLinks.instagram, icon: "IG" },
    ],
  },
  {
    name: "Community Manager",
    role: "UI/UX Designer & Community Manager",
    image: "/zentux-icon.png",
    accent: "#d85cff",
    bio:
      "Shapes how Zentux feels across the website, product screens, and support channels, keeping the experience sharp, readable, and connected to the community.",
    socials: [
      { label: "Discord", href: sharedLinks.discord, icon: "DC" },
      { label: "GitHub", href: sharedLinks.github, icon: "GH" },
      { label: "X", href: sharedLinks.x, icon: "X" },
      { label: "Instagram", href: sharedLinks.instagram, icon: "IG" },
    ],
  },
];

function handleCardTilt(event: MouseEvent<HTMLElement>) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const rotateY = ((x / rect.width) - 0.5) * 14;
  const rotateX = ((0.5 - y / rect.height)) * 14;

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

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {teamMembers.map((member, index) => (
          <article
            key={member.name}
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

              <div className="mt-7 flex flex-wrap gap-2">
                {member.socials.map((social) => (
                  <a
                    key={`${member.name}-${social.label}`}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} on ${social.label}`}
                    className="team-social inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[11px] font-black text-white transition"
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

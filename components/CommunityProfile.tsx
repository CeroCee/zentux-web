"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { CSSProperties, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import "./community-profile.css";
import { loadCommunityProfile, PublicCommunityProfile } from './community-public-profile';
import { RoleBadgeIcon } from './CommunityRoleBadge';

export type ProfileSelection = { userId: string; anchor: HTMLButtonElement; key: string };

export default function CommunityProfile({ selection, onClose }: { selection: ProfileSelection; onClose: () => void }) {
  const dialog = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [profile, setProfile] = useState<PublicCommunityProfile | null>(null);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [closing, setClosing] = useState(false);
  const [position, setPosition] = useState<CSSProperties>({ visibility: "hidden" });
  const onCloseRef = useRef(onClose);
  useLayoutEffect(() => { onCloseRef.current = onClose; }, [onClose]);

  const close = useCallback((restoreFocus = true) => {
    if (timer.current) return;
    setClosing(true);
    if (restoreFocus && selection.anchor.isConnected) selection.anchor.focus({ preventScroll: true });
    timer.current = setTimeout(() => onCloseRef.current(), window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 150);
  }, [selection.anchor]);

  useEffect(() => {
    let active = true;
    setProfile(null); setError("");
    void (async () => {
      try {
        const data = await loadCommunityProfile(selection.userId, attempt > 0);
        if (!active) return;
        setProfile(data);
      } catch (failure) { if (active) setError(failure instanceof Error ? failure.message : "No se pudo cargar el perfil."); }
    })();
    return () => { active = false; };
  }, [selection.userId, attempt]);

  useLayoutEffect(() => {
    const update = () => {
      const el = dialog.current;
      if (!el) return;
      const viewport = window.visualViewport;
      const zoom = Number.parseFloat(getComputedStyle(document.documentElement).zoom) || 1;
      const width = document.documentElement.clientWidth;
      const height = viewport?.height || window.innerHeight;
      const offsetY = viewport?.offsetTop || 0;
      const mobile = window.matchMedia("(max-width: 600px)").matches;
      const cardWidth = Math.min(360, width - 24);
      const rect = selection.anchor.getBoundingClientRect();
      const cardHeight = Math.min(el.scrollHeight * zoom, height - 24);
      const chat = document.querySelector(".community-chat-panel")?.getBoundingClientRect();
      const preferred = (chat?.left ?? rect.left) - cardWidth - 12;
      const left = mobile ? (width - cardWidth) / 2 : Math.max(12, Math.min(preferred >= 12 ? preferred : rect.right + 12, width - cardWidth - 12));
      const top = mobile ? offsetY + height - cardHeight - 12 : Math.max(offsetY + 12, Math.min(rect.top - 18, offsetY + height - cardHeight - 12));
      setPosition({ left: left / zoom, top: top / zoom, width: cardWidth / zoom, maxHeight: (height - 24) / zoom, visibility: "visible" });
    };
    update();
    const observer = new ResizeObserver(update);
    if (dialog.current) observer.observe(dialog.current);
    window.addEventListener("resize", update); window.addEventListener("scroll", update, true);
    window.visualViewport?.addEventListener("resize", update); window.visualViewport?.addEventListener("scroll", update);
    return () => { observer.disconnect(); window.removeEventListener("resize", update); window.removeEventListener("scroll", update, true);
      window.visualViewport?.removeEventListener("resize", update); window.visualViewport?.removeEventListener("scroll", update); };
  }, [selection.anchor]);

  useLayoutEffect(() => {
    if (position.visibility === "visible") closeButton.current?.focus({ preventScroll: true });
  }, [position.visibility]);

  useEffect(() => {
    const outside = (event: PointerEvent) => {
      const target = event.target as Element;
      if (!dialog.current?.contains(target) && !target.closest("[data-profile-user]")) close(false);
    };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); close(); } };
    document.addEventListener("pointerdown", outside); document.addEventListener("keydown", escape, true);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape, true); clearTimeout(timer.current); };
  }, [close]);

  const date = profile?.memberSince && !Number.isNaN(Date.parse(profile.memberSince)) ? new Date(profile.memberSince).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" }) : null;
  return createPortal(<div ref={dialog} className={`community-profile${closing ? " is-closing" : ""}`} style={position} role="dialog" aria-labelledby="community-profile-title" aria-busy={!profile && !error} onKeyDown={event => {
    event.stopPropagation();
    if (event.key !== "Tab") return;
    const buttons = Array.from(dialog.current!.querySelectorAll<HTMLElement>("button:not([disabled]),a[href]"));
    const first = buttons[0], last = buttons[buttons.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus({ preventScroll: true }); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus({ preventScroll: true }); }
  }}>
    <button ref={closeButton} className="community-profile-close" onClick={() => close()} aria-label="Cerrar perfil">×</button>
    <div className="community-profile-banner">{profile?.banner && <Image src={profile.banner} alt="" fill unoptimized sizes="360px" onError={event => { event.currentTarget.style.visibility = "hidden"; }} />}</div>
    {!profile && !error ? <div className="community-profile-skeleton" role="status"><span className="community-profile-skeleton-avatar" /><h3 id="community-profile-title">Cargando perfil…</h3><span /><span /><div /><span /></div>
      : error ? <div className="community-profile-error"><h3 id="community-profile-title">Perfil no disponible</h3><p role="alert">{error}</p><button onClick={() => { closeButton.current?.focus({ preventScroll: true }); setAttempt(value => value + 1); }}>Reintentar</button></div>
      : profile && <div className="community-profile-content">
        <Image className="community-profile-avatar" src={profile.avatar || "/icon-48.png"} alt="" width={80} height={80} unoptimized onError={event => { event.currentTarget.src = "/icon-48.png"; }} />
        <h3 id="community-profile-title">{profile.name}<RoleBadgeIcon badge={profile.badge} /></h3>
        <p className="community-profile-username">@{profile.username}</p>
        <section className="community-profile-info" aria-label="Información del perfil"><h4>Información del perfil</h4><dl><div><dt>Usuario</dt><dd>{profile.username}</dd></div>{date && <div><dt>Miembro desde</dt><dd>{date}</dd></div>}</dl></section>
        {profile.roles.length > 0 && <section className="community-profile-roles" aria-label="Roles de Zentux"><h4>Roles de Zentux</h4><div>{profile.roles.map((role, i) => <span key={`${role.name}-${i}`}><i style={{ backgroundColor: role.color }} />{role.name}</span>)}</div></section>}
      </div>}
  </div>, document.body);
}

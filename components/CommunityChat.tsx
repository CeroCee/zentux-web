"use client";

import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import "./community-chat.css";
import CommunityProfile, { ProfileSelection } from "./CommunityProfile";
import CommunityRoleBadge, { CommunityChatAvatar } from "./CommunityRoleBadge";

type Message = { id: string; userId: string; name: string; avatar: string | null; role: "admin" | "moderator" | null; content: string; createdAt: string };
type Snapshot = { revision: string; messages: Message[]; eventsUrl?: string };
type Access = { canModerate: boolean; muted: boolean };
const emojis = ["😀", "😊", "🔥", "💜", "🎮", "🙌", "😂", "👀", "💀", "🤝", "✅", "🚀", "❤️", "👍", "🎉", "⚡"];
const time = (date: string) => new Intl.DateTimeFormat("es", { hour: "2-digit", minute: "2-digit" }).format(new Date(date));

async function request(action: string, body: Record<string, unknown> = {}) {
  const response = await fetch(`/api/community-chat/${action}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "No se pudo completar la acción.");
  return data;
}

export default function CommunityChat() {
  const [selectedProfile, setSelectedProfile] = useState<ProfileSelection | null>(null);
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [unread, setUnread] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [access, setAccess] = useState<Access>({ canModerate: false, muted: false });
  const [moderating, setModerating] = useState(false);
  const [target, setTarget] = useState<Message | null>(null);
  const [muteId, setMuteId] = useState("");
  const list = useRef<HTMLDivElement>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const revision = useRef(BigInt(-1));
  const current = useRef<Message[]>([]);
  const view = useRef({ open: false, bottom: true });
  const anchor = useRef<{ id: string; top: number } | null>(null);
  const pending = useRef<{ content: string; requestId: string } | null>(null);
  const busy = useRef(false);
  const statusRef = useRef(status);
  const refreshAccessRef = useRef<() => void>(() => {});
  statusRef.current = status;

  const refreshAccess = useCallback(async () => {
    if (status !== "authenticated") { setAccess({ canModerate: false, muted: false }); return; }
    try { setAccess(await request("status")); }
    catch { setAccess({ canModerate: false, muted: false }); }
  }, [status]);
  refreshAccessRef.current = refreshAccess;
  useEffect(() => { void refreshAccess(); }, [refreshAccess]);

  useEffect(() => {
    // A direct link can open the panel without moving the page's content.
    const openFromLink = () => {
      if (window.location.hash !== "#community-chat") return;
      view.current = { open: true, bottom: true };
      setOpen(true); setUnread([]);
    };
    openFromLink();
    window.addEventListener("hashchange", openFromLink);
    return () => window.removeEventListener("hashchange", openFromLink);
  }, []);

  useEffect(() => {
    let disposed = false;
    let source: EventSource | undefined;
    let retry: ReturnType<typeof setTimeout>;
    const controller = new AbortController();
    const apply = (packet: Snapshot) => {
      if (disposed || BigInt(packet.revision) <= revision.current) return;
      const previous = current.current;
      const bottom = view.current.bottom;
      const container = list.current;
      if (container && !bottom) {
        const elements = Array.from(container.querySelectorAll<HTMLElement>("[data-message-id]"));
        const visible = elements.find(el => el.getBoundingClientRect().bottom > container.getBoundingClientRect().top);
        anchor.current = visible ? { id: visible.dataset.messageId!, top: visible.getBoundingClientRect().top } : null;
      }
      const latest = previous.length ? BigInt(previous[previous.length - 1].id) : BigInt(0);
      const added = revision.current < BigInt(0) ? [] : packet.messages.filter(message => BigInt(message.id) > latest).map(message => message.id);
      const seen = view.current.open && bottom && document.visibilityState === "visible";
      setUnread(ids => seen ? [] : [...new Set([...ids, ...added])].filter(id => packet.messages.some(message => message.id === id)));
      revision.current = BigInt(packet.revision);
      current.current = packet.messages;
      setMessages(packet.messages);
      setLoading(false);
      if (statusRef.current === "authenticated") refreshAccessRef.current();
    };
    const connect = async () => {
      try {
        const response = await fetch("/api/community-chat", { cache: "no-store", signal: controller.signal });
        if (!response.ok) throw new Error("Unavailable");
        const packet: Snapshot = await response.json();
        if (disposed) return;
        apply(packet);
        if (!packet.eventsUrl) throw new Error("Unavailable");
        source = new EventSource(packet.eventsUrl);
        source.onopen = () => { if (!disposed) setConnected(true); };
        source.onmessage = event => {
          try { apply(JSON.parse(event.data)); } catch { setConnected(false); }
        };
        source.onerror = () => { if (!disposed) setConnected(false); };
      } catch {
        if (!disposed) { setConnected(false); setLoading(false); retry = setTimeout(connect, 5000); }
      }
    };
    void connect();
    return () => { disposed = true; controller.abort(); source?.close(); clearTimeout(retry); };
  }, []);

  useEffect(() => {
    const viewport = window.visualViewport;
    const resize = () => {
      const zoom = Number.parseFloat(getComputedStyle(document.documentElement).zoom) || 1;
      document.documentElement.style.setProperty("--community-viewport", `${(viewport?.height || window.innerHeight) / zoom}px`);
      document.documentElement.style.setProperty("--community-keyboard", `${Math.max(0, window.innerHeight - (viewport?.height || window.innerHeight) - (viewport?.offsetTop || 0)) / zoom}px`);
    };
    resize(); viewport?.addEventListener("resize", resize); viewport?.addEventListener("scroll", resize); window.addEventListener("resize", resize);
    return () => { viewport?.removeEventListener("resize", resize); viewport?.removeEventListener("scroll", resize); window.removeEventListener("resize", resize); };
  }, []);

  useLayoutEffect(() => {
    const container = list.current;
    if (!container) return;
    if (view.current.bottom) container.scrollTop = container.scrollHeight;
    else if (anchor.current) {
      const element = Array.from(container.querySelectorAll<HTMLElement>("[data-message-id]")).find(el => el.dataset.messageId === anchor.current?.id);
      if (element) container.scrollTop += element.getBoundingClientRect().top - anchor.current.top;
    }
    anchor.current = null;
  }, [messages, open]);

  useEffect(() => {
    const visible = () => { if (view.current.open && view.current.bottom && document.visibilityState === "visible") setUnread([]); };
    document.addEventListener("visibilitychange", visible);
    return () => document.removeEventListener("visibilitychange", visible);
  }, []);

  const toggle = () => {
    setSelectedProfile(null);
    const next = !open;
    view.current.open = next;
    setOpen(next);
    setEmojiOpen(false); setTarget(null);
    if (next) { view.current.bottom = true; setUnread([]); void refreshAccess(); }
    else launcher.current?.focus({ preventScroll: true });
  };
  const send = async () => {
    const content = draft.trim();
    if (busy.current || !content || Array.from(content).length > 500 || access.muted || status !== "authenticated") return;
    busy.current = true; setSending(true); setError("");
    if (pending.current?.content !== content) pending.current = { content, requestId: crypto.randomUUID() };
    try {
      await request("send", pending.current);
      setDraft(""); pending.current = null;
      textarea.current?.focus({ preventScroll: true });
    } catch (err) { setError(err instanceof Error ? err.message : "No se pudo enviar. Puedes reintentarlo."); void refreshAccess(); }
    finally { busy.current = false; setSending(false); }
  };
  const moderate = async (action: string, message?: Message, userId?: string) => {
    if (moderating) return;
    setModerating(true); setError("");
    try { await request("moderate", { action, messageId: message?.id, userId: userId || message?.userId }); setTarget(null); setMuteId(""); }
    catch (err) { setError(err instanceof Error ? err.message : "No se pudo moderar."); }
    finally { setModerating(false); }
  };
  const chars = Array.from(draft.trim()).length;

  return <aside className="community-chat" aria-label="Chat de la comunidad">
    {open && <section className="community-chat-panel" aria-labelledby="community-chat-title" onKeyDown={event => { if (event.key === "Escape") toggle(); }}>
      <header className="community-chat-header">
        <button className="community-chat-minimize" aria-label="Minimizar chat" onClick={toggle}>−</button>
        <h2 id="community-chat-title">Community Chat</h2>
        <span className={`community-chat-connection ${connected ? "is-connected" : ""}`} title={connected ? "Chat conectado" : "Reconectando"} aria-label={connected ? "Chat conectado" : "Conexión interrumpida"} />
      </header>
      {!connected && !loading && <p className="community-chat-notice" role="status">Conexión interrumpida. Reconectando…</p>}
      <div ref={list} className="community-chat-messages" role="log" tabIndex={0} aria-label="Mensajes de la comunidad" aria-live="off" onScroll={() => {
        const el = list.current;
        if (!el) return;
        view.current.bottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
        if (view.current.bottom) setUnread([]);
      }}>
        {loading ? <p className="community-chat-empty" role="status">Cargando conversación…</p> : messages.length === 0 && <p className="community-chat-empty">Todavía no hay mensajes.<br />Sé el primero en saludar a la comunidad.</p>}
        {messages.map(message => <article className={`community-chat-message role-${message.role || "member"}`} key={message.id} data-message-id={message.id}>
          <button className="community-chat-avatar-button" data-profile-user={message.userId} aria-label={`Ver perfil de ${message.name}`} aria-haspopup="dialog" onPointerDown={event => { event.preventDefault(); event.currentTarget.focus({ preventScroll: true }); }} onClick={event => setSelectedProfile({ userId: message.userId, anchor: event.currentTarget, key: crypto.randomUUID() })}><CommunityChatAvatar userId={message.userId} src={message.avatar} /></button>
          <div className="community-chat-message-body"><div className="community-chat-message-meta">
            <button className="community-chat-name" data-profile-user={message.userId} aria-label={`Ver perfil de ${message.name} por nombre`} aria-haspopup="dialog" onPointerDown={event => { event.preventDefault(); event.currentTarget.focus({ preventScroll: true }); }} onClick={event => setSelectedProfile({ userId: message.userId, anchor: event.currentTarget, key: crypto.randomUUID() })}>{message.name}</button>
            <CommunityRoleBadge userId={message.userId} />
            <time dateTime={message.createdAt} title={new Date(message.createdAt).toLocaleString("es")}>{time(message.createdAt)}</time>
            {access.canModerate && <button className="community-chat-more" onClick={() => setTarget(target?.id === message.id ? null : message)} aria-label={`Moderar mensaje de ${message.name}`}>⋯</button>}
          </div><p>{message.content}</p>
          {target?.id === message.id && <div className="community-chat-mod-actions">
            <button disabled={moderating} onClick={() => void moderate("delete", message)}>Eliminar mensaje</button>
            {message.userId !== session?.user?.discordId && <><button disabled={moderating} onClick={() => void moderate("mute", message)}>Silenciar 24 h</button><button disabled={moderating} onClick={() => void moderate("unmute", message)}>Quitar silencio</button></>}
          </div>}
          </div>
        </article>)}
      </div>
      {unread.length > 0 && <button className="community-chat-new" onClick={() => { view.current.bottom = true; if (list.current) list.current.scrollTop = list.current.scrollHeight; setUnread([]); }}>↓ {unread.length} mensajes nuevos</button>}
      <div className="community-chat-footer">
        <p className="community-chat-retention">Solo se conservan los últimos 100 mensajes</p>
        {error && <p className="community-chat-error" role="alert">{error}</p>}
        {status !== "authenticated" ? <button className="community-chat-login" disabled={status === "loading"} onClick={() => void signIn("discord", { callbackUrl: window.location.href })}>Inicia sesión para participar</button>
          : access.muted ? <p className="community-chat-notice" role="status">Estás silenciado. Puedes seguir leyendo.</p>
          : <div className="community-chat-composer">
            <button className="community-chat-emoji-toggle" aria-label="Seleccionar emoji" aria-expanded={emojiOpen} onClick={() => setEmojiOpen(!emojiOpen)}>😊</button>
            {emojiOpen && <div className="community-chat-emojis" role="group" aria-label="Emojis">{emojis.map(emoji => <button key={emoji} aria-label={`Añadir ${emoji}`} onClick={() => { setDraft(value => value + emoji); setEmojiOpen(false); textarea.current?.focus({ preventScroll: true }); }}>{emoji}</button>)}</div>}
            <textarea ref={textarea} value={draft} disabled={sending} rows={1} aria-label="Tu mensaje" placeholder="Escribe tu mensaje…" onChange={event => setDraft(event.target.value)} onKeyDown={event => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); void send(); } }} />
            <button className="community-chat-send" aria-label={sending ? "Enviando mensaje" : error ? "Reintentar envío" : "Enviar mensaje"} disabled={sending || !chars || chars > 500} onClick={() => void send()}>{sending ? "…" : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 3 19 9-19 9 4-9-4-9Zm4 9h15" /></svg>}</button>
          </div>}
        {status === "authenticated" && !access.muted && chars > 0 && <p className={`community-chat-count ${chars > 500 ? "is-over" : ""}`}>{chars}/500 · Shift+Enter para una nueva línea</p>}
        {access.canModerate && <details className="community-chat-moderation"><summary>Moderación</summary><label>Discord ID<input value={muteId} onChange={event => setMuteId(event.target.value)} inputMode="numeric" /></label><button disabled={moderating || !/^\d{16,22}$/.test(muteId)} onClick={() => void moderate("unmute", undefined, muteId)}>Quitar silencio</button></details>}
        <div className="community-chat-brand"><span>powered by</span><Image src="/logo-web.png" alt="Zentux" width={24} height={24} /><strong>Zentux</strong></div>
      </div>
    </section>}
    <button ref={launcher} className="community-chat-launcher" onClick={toggle} aria-label={open ? "Minimizar chat comunitario" : `Abrir chat comunitario${unread.length ? `, ${unread.length} mensajes sin leer` : ""}`} aria-expanded={open} aria-controls={open ? "community-chat-title" : undefined}>
      {open ? "−" : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H7l-5 2 2-5v-5.5a8.5 8.5 0 0 1 17 0Z"/><circle cx="8" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="16" cy="12" r="1"/></svg>}
      {!open && unread.length > 0 && <span className="community-chat-unread">{unread.length > 99 ? "99+" : unread.length}</span>}
    </button>
    {open && selectedProfile && <CommunityProfile key={selectedProfile.key} selection={selectedProfile} onClose={() => setSelectedProfile(null)} />}
  </aside>;
}

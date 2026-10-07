"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, RotateCcw, Send } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SportIcon from "@/components/ui/SportIcon";
import { sports, team, site, loc } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Form = {
  first: string; last: string; dob: string; gender: string; guardian: string; email: string; phone: string; language: string;
  sports: string[]; experience: string;
  medical: string; shirt: string; emergency: string; emergencyPhone: string; notes: string;
};
const EMPTY: Form = { first: "", last: "", dob: "", gender: "", guardian: "", email: "", phone: "", language: "", sports: [], experience: "", medical: "", shirt: "", emergency: "", emergencyPhone: "", notes: "" };
const KEY = "sohc-register-draft";

export default function RegisterClient() {
  const { lang, dict: d } = useLang();
  const r = d.register;
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(EMPTY);
  const [hadDraft, setHadDraft] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<Form>;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setForm({ ...EMPTY, ...saved });
        setHadDraft(true);
      }
    } catch {}
  }, []);

  function update(patch: Partial<Form>) {
    const next = { ...form, ...patch };
    setForm(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  }
  function reset() {
    setForm(EMPTY);
    setStep(0);
    setHadDraft(false);
    setErrors([]);
    try {
      localStorage.removeItem(KEY);
    } catch {}
  }

  const steps = [r.s1, r.s2, r.s3, r.s4];
  const required: Record<number, (keyof Form)[]> = { 0: ["first", "last", "dob", "email", "phone"], 1: ["sports"], 2: ["medical", "shirt", "emergency", "emergencyPhone"], 3: [] };

  function validate(s: number) {
    const bad = required[s].filter((k) => (Array.isArray(form[k]) ? (form[k] as string[]).length === 0 : !String(form[k]).trim()));
    setErrors(bad);
    return bad.length === 0;
  }
  function next() {
    if (validate(step)) setStep((s) => Math.min(s + 1, 3));
  }

  const coordinator = team.find((t) => t.role === "Local Coordinator");
  function send() {
    const lines = [
      `ATHLETE REGISTRATION — ${site.name}`,
      ``,
      `Athlete: ${form.first} ${form.last}`,
      `Date of birth: ${form.dob}`,
      `Gender: ${form.gender || "—"}`,
      `Parent/guardian: ${form.guardian || "(self)"}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Preferred language: ${form.language || "—"}`,
      ``,
      `Sports: ${form.sports.map((s) => sports.find((x) => x.slug === s)?.name ?? s).join(", ")}`,
      `Experience: ${form.experience || "—"}`,
      ``,
      `Medical form: ${form.medical}`,
      `T-shirt: ${form.shirt}`,
      `Emergency contact: ${form.emergency} — ${form.emergencyPhone}`,
      `Notes: ${form.notes || "—"}`,
    ];
    const to = coordinator?.email ?? site.email;
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(`Athlete registration: ${form.first} ${form.last}`)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(true);
    try {
      localStorage.removeItem(KEY);
    } catch {}
  }

  const field = (k: keyof Form) => cn("focus-ring mt-1.5 w-full rounded-2xl border bg-white px-4 py-3 text-ink placeholder:text-ink-soft/60 focus:border-teal", errors.includes(k) ? "border-red" : "border-mist-dark");
  const label = "block text-sm font-semibold text-ink";
  const radio = (name: keyof Form, opts: readonly string[]) => (
    <div className={cn("mt-2 grid gap-2 sm:grid-cols-3", errors.includes(name) && "rounded-2xl ring-2 ring-red")}>
      {opts.map((o) => (
        <label key={o} className={cn("flex cursor-pointer items-center gap-3 rounded-2xl border bg-white p-3 text-sm transition", form[name] === o ? "border-teal ring-2 ring-teal/30" : "border-mist-dark hover:border-teal/50")}>
          <input type="radio" name={name} value={o} checked={form[name] === o} onChange={() => update({ [name]: o } as Partial<Form>)} className="accent-teal" />
          {o}
        </label>
      ))}
    </div>
  );

  return (
    <>
      <PageHero curve="mist" eyebrow={r.eyebrow} title={r.title} image="/images/basketball-team.jpg" description={r.text} />
      <section className="bg-dots bg-mist py-16 sm:py-24">
        <div className="container-x max-w-4xl">
          <ol className="flex items-center gap-2 sm:gap-4" aria-label="Progress">
            {steps.map((s, i) => (
              <li key={s} className="flex flex-1 items-center gap-2">
                <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-heading text-lg font-bold", i < step ? "bg-teal text-white" : i === step ? "bg-ink text-white" : "bg-white text-ink-soft")}>{i < step ? <Check className="h-4 w-4" /> : i + 1}</span>
                <span className={cn("hidden font-heading text-lg font-bold uppercase sm:block", i === step ? "text-ink" : "text-ink-soft")}>{s}</span>
                {i < steps.length - 1 && <span className={cn("h-0.5 flex-1", i < step ? "bg-teal" : "bg-mist-dark")} />}
              </li>
            ))}
          </ol>
          <p className="mt-3 text-sm text-ink-soft sm:hidden">{r.step} {step + 1} {r.of} {steps.length}: {steps[step]}</p>

          {hadDraft && !sent && (
            <p className="mt-6 flex items-center justify-between gap-3 rounded-2xl bg-gold/30 px-4 py-2.5 text-sm text-ink">
              {r.draft}
              <button type="button" onClick={reset} className="focus-ring inline-flex items-center gap-1 font-semibold hover:underline"><RotateCcw className="h-3.5 w-3.5" /> {r.clear}</button>
            </p>
          )}

          <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-xl shadow-ink/5 sm:p-10">
            {sent ? (
              <div className="text-center">
                <CheckCircle2 className="mx-auto h-16 w-16 text-teal" />
                <h2 className="mt-4 text-4xl font-extrabold uppercase text-ink">{r.sentT}</h2>
                <p className="mx-auto mt-3 max-w-xl text-ink-soft">{r.sentX}</p>
                <a href={`mailto:${coordinator?.email ?? site.email}`} className="mt-6 inline-block font-semibold text-teal hover:underline">{coordinator?.email ?? site.email}</a>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
                  {step === 0 && (
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className={label}>{r.athleteFirst} *<input value={form.first} onChange={(e) => update({ first: e.target.value })} className={field("first")} /></label>
                      <label className={label}>{r.athleteLast} *<input value={form.last} onChange={(e) => update({ last: e.target.value })} className={field("last")} /></label>
                      <label className={label}>{r.dob} *<input type="date" value={form.dob} onChange={(e) => update({ dob: e.target.value })} className={field("dob")} /></label>
                      <div><span className={label}>{r.gender}</span>{radio("gender", r.genderOpts)}</div>
                      <label className={cn(label, "sm:col-span-2")}>{r.guardian}<input value={form.guardian} onChange={(e) => update({ guardian: e.target.value })} className={field("guardian")} /><span className="mt-1 block text-xs font-normal text-ink-soft">{r.guardianHint}</span></label>
                      <label className={label}>{r.email} *<input type="email" value={form.email} onChange={(e) => update({ email: e.target.value })} className={field("email")} /></label>
                      <label className={label}>{r.phone} *<input type="tel" value={form.phone} onChange={(e) => update({ phone: e.target.value })} className={field("phone")} /></label>
                      <div className="sm:col-span-2"><span className={label}>{r.language}</span>{radio("language", r.languages)}</div>
                    </div>
                  )}
                  {step === 1 && (
                    <div>
                      <p className={label}>{r.pickSports} *</p>
                      <p className="text-xs text-ink-soft">{r.pickHint}</p>
                      <ul className={cn("mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3", errors.includes("sports") && "rounded-2xl ring-2 ring-red")}>
                        {sports.map((s) => {
                          const on = form.sports.includes(s.slug);
                          return (
                            <li key={s.slug}>
                              <button type="button" aria-pressed={on} onClick={() => update({ sports: on ? form.sports.filter((x) => x !== s.slug) : [...form.sports, s.slug] })} className={cn("focus-ring flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition", on ? "border-teal bg-teal text-white" : "border-mist-dark bg-white hover:border-teal/50")}>
                                <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", on ? "bg-white/20" : "bg-teal text-white")}><SportIcon icon={s.icon} className="h-5 w-5" /></span>
                                <span><span className="block font-heading text-xl font-bold uppercase">{loc(lang, s, "name")}</span><span className={cn("block text-xs", on ? "text-white/80" : "text-ink-soft")}>{d.common.seasons[s.season]} · {s.months}</span></span>
                                {on && <Check className="ml-auto h-5 w-5" />}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                      <div className="mt-8"><span className={label}>{r.experience}</span>{radio("experience", r.expOpts)}</div>
                    </div>
                  )}
                  {step === 2 && (
                    <div className="grid gap-6">
                      <div><span className={label}>{r.medical} *</span>{radio("medical", r.medicalOpts)}</div>
                      <div>
                        <span className={label}>{r.shirt} *</span>
                        <div className={cn("mt-2 flex flex-wrap gap-2", errors.includes("shirt") && "rounded-2xl ring-2 ring-red")}>
                          {r.shirtOpts.map((o) => (
                            <button key={o} type="button" onClick={() => update({ shirt: o })} aria-pressed={form.shirt === o} className={cn("focus-ring rounded-full border px-4 py-2 font-heading text-base font-bold uppercase", form.shirt === o ? "border-teal bg-teal text-white" : "border-mist-dark bg-white hover:border-teal/50")}>{o}</button>
                          ))}
                        </div>
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <label className={label}>{r.emergency} *<input value={form.emergency} onChange={(e) => update({ emergency: e.target.value })} className={field("emergency")} /></label>
                        <label className={label}>{r.emergencyPhone} *<input type="tel" value={form.emergencyPhone} onChange={(e) => update({ emergencyPhone: e.target.value })} className={field("emergencyPhone")} /></label>
                      </div>
                      <label className={label}>{r.notes}<textarea rows={4} value={form.notes} onChange={(e) => update({ notes: e.target.value })} className={field("notes")} /><span className="mt-1 block text-xs font-normal text-ink-soft">{r.notesHint}</span></label>
                    </div>
                  )}
                  {step === 3 && (
                    <div>
                      <h2 className="text-3xl font-extrabold uppercase text-ink">{r.reviewT}</h2>
                      <p className="mt-2 text-sm text-ink-soft">{r.reviewX}</p>
                      <dl className="mt-6 grid gap-x-6 gap-y-3 rounded-2xl bg-mist p-5 text-sm sm:grid-cols-2">
                        {[
                          [r.s1, `${form.first} ${form.last}`], [r.dob, form.dob], [r.guardian, form.guardian || "—"], [r.email, form.email], [r.phone, form.phone], [r.language, form.language || "—"],
                          [r.s2, form.sports.map((s) => sportLabel(s, lang)).join(", ")], [r.experience, form.experience || "—"],
                          [r.medical, form.medical], [r.shirt, form.shirt], [r.emergency, `${form.emergency} — ${form.emergencyPhone}`], [r.notes, form.notes || "—"],
                        ].map(([k, v]) => (
                          <div key={k}><dt className="text-xs font-bold uppercase tracking-wider text-ink-soft">{k}</dt><dd className="font-medium text-ink">{v}</dd></div>
                        ))}
                      </dl>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}

            {!sent && (
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-mist-dark pt-6">
                {errors.length > 0 && <p className="w-full text-sm font-semibold text-red">{r.fixErrors}</p>}
                <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="focus-ring inline-flex items-center gap-2 rounded-full border-2 border-ink px-5 py-2.5 font-heading text-lg font-bold uppercase tracking-wide text-ink transition hover:bg-ink hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"><ArrowLeft className="h-4 w-4" /> {d.common.back}</button>
                {step < 3 ? (
                  <button type="button" onClick={next} className="focus-ring inline-flex items-center gap-2 rounded-full bg-teal px-6 py-3 font-heading text-lg font-bold uppercase tracking-wide text-white hover:bg-teal-dark">{d.common.continue} <ArrowRight className="h-4 w-4" /></button>
                ) : (
                  <button type="button" onClick={send} className="focus-ring inline-flex items-center gap-2 rounded-full bg-red px-6 py-3 font-heading text-lg font-bold uppercase tracking-wide text-white hover:bg-red-dark"><Send className="h-4 w-4" /> {r.sendBtn}</button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function sportLabel(slug: string, lang: "en" | "es") {
  const s = sports.find((x) => x.slug === slug);
  return s ? loc(lang, s, "name") : slug;
}

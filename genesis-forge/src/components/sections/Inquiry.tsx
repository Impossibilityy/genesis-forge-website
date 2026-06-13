import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft, Paperclip, Send, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ease } from '@/lib/motion';

interface FormState {
  name: string;
  email: string;
  projectType: string;
  description: string;
  use: string;
  size: string;
  quantity: string;
  timeline: string;
  details: string;
}

const initialState: FormState = {
  name: '',
  email: '',
  projectType: '',
  description: '',
  use: '',
  size: '',
  quantity: '',
  timeline: '',
  details: '',
};

const projectTypes = [
  'Create something new',
  'Solve a problem',
  'Develop an idea',
  'Build for business',
  'Not sure yet',
];

const timelines = ['No rush', 'Within a few weeks', 'This month', 'As soon as possible'];

const fieldLabels: Record<string, string> = {
  name: 'Your name',
  email: 'Email',
  projectType: 'What kind of project is this?',
  description: 'What do you want to create?',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(name: keyof FormState, value: string): string | undefined {
  switch (name) {
    case 'name':
      return value.trim() ? undefined : 'Let us know what to call you.';
    case 'email':
      if (!value.trim()) return 'We need an email to reply to.';
      return EMAIL_RE.test(value.trim()) ? undefined : 'That email doesn\u2019t look right \u2014 check the format.';
    case 'projectType':
      return value ? undefined : 'Pick the closest match \u2014 you can change it later.';
    case 'description':
      return value.trim().length >= 10
        ? undefined
        : 'A sentence or two helps us understand the idea.';
    default:
      return undefined;
  }
}

const STEP1_FIELDS: Array<keyof FormState> = ['name', 'email', 'projectType', 'description'];

export function Inquiry() {
  const reduced = useReducedMotion();
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [showSummary, setShowSummary] = useState(false);
  const [fileName, setFileName] = useState<string>('');

  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLLegendElement>(null);

  function setField(name: keyof FormState, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
    if (touched[name]) {
      setErrors((e) => ({ ...e, [name]: validate(name, value) }));
    }
  }

  function onBlur(name: keyof FormState) {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((e) => ({ ...e, [name]: validate(name, values[name]) }));
  }

  function validateStep1(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    STEP1_FIELDS.forEach((f) => {
      const err = validate(f, values[f]);
      if (err) next[f] = err;
    });
    setErrors((e) => ({ ...e, ...next }));
    setTouched((t) => ({ ...t, name: true, email: true, projectType: true, description: true }));
    const invalid = Object.keys(next);
    if (invalid.length > 0) {
      setShowSummary(true);
      requestAnimationFrame(() => {
        summaryRef.current?.focus();
      });
      return false;
    }
    setShowSummary(false);
    return true;
  }

  function goToStep2() {
    if (!validateStep1()) return;
    setStep(2);
    requestAnimationFrame(() => step2Ref.current?.focus());
  }

  function focusField(id: string) {
    const el = document.getElementById(id) as HTMLElement | null;
    el?.focus();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'submitting') return;
    // Step 1 must still be valid even if the user jumped back.
    if (!validateStep1()) {
      setStep(1);
      return;
    }
    setStatus('submitting');
    // NOTE: front-end demo only — not wired to a backend. See README to connect a real endpoint.
    await new Promise((res) => setTimeout(res, 1400));
    setStatus('success');
    requestAnimationFrame(() => successRef.current?.focus());
  }

  function reset() {
    setValues(initialState);
    setErrors({});
    setTouched({});
    setFileName('');
    setStep(1);
    setStatus('idle');
    setShowSummary(false);
  }

  const summaryErrors = STEP1_FIELDS.filter((f) => errors[f]).map((f) => ({
    id: f,
    label: fieldLabels[f],
    message: errors[f] as string,
  }));

  return (
    <section className="gf-section gf-inquiry" id="start" aria-labelledby="start-title">
      <div className="gf-container gf-inquiry__inner">
        <div className="gf-inquiry__intro">
          <p className="gf-eyebrow">Start a project</p>
          <h2 className="gf-inquiry__title" id="start-title">
            Bring us the idea
          </h2>
          <p className="gf-inquiry__lead gf-text-secondary gf-measure">
            Tell us what you&rsquo;re picturing. It doesn&rsquo;t have to be polished &mdash;
            we&rsquo;ll figure out the details together. Most people hear back within a couple of
            days.
          </p>
          <p className="gf-inquiry__privacy">
            <ShieldCheck size={16} aria-hidden="true" />
            We&rsquo;ll only use your details to talk about your project. No spam, no sharing.
          </p>
        </div>

        <div className="gf-inquiry__panel">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                className="gf-inquiry__success"
                ref={successRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: reduced ? 0 : 0.32, ease: ease.out }}
              >
                <span className="gf-inquiry__success-mark" aria-hidden="true">
                  <Check size={28} strokeWidth={2.4} />
                </span>
                <h3 className="gf-inquiry__success-title">Your idea is in the forge</h3>
                <p className="gf-text-secondary">
                  Thanks, {values.name.split(' ')[0] || 'there'}. We&rsquo;ve got your project and
                  we&rsquo;ll be in touch at {values.email || 'your email'} soon.
                </p>
                <Button variant="secondary" size="md" onClick={reset}>
                  Submit another idea
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="gf-inquiry__form"
                onSubmit={handleSubmit}
                noValidate
                initial={false}
              >
                {/* Progress */}
                <div className="gf-inquiry__progress">
                  <span className="gf-inquiry__step-label">Step {step} of 2</span>
                  <div className="gf-inquiry__progress-track" aria-hidden="true">
                    <motion.div
                      className="gf-inquiry__progress-fill"
                      animate={{ width: step === 1 ? '50%' : '100%' }}
                      transition={{ duration: reduced ? 0 : 0.3, ease: ease.out }}
                    />
                  </div>
                </div>

                {/* Error summary */}
                <AnimatePresence>
                  {showSummary && summaryErrors.length > 0 && (
                    <motion.div
                      className="gf-inquiry__summary"
                      role="alert"
                      ref={summaryRef}
                      tabIndex={-1}
                      initial={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduced ? 0 : 0.2 }}
                    >
                      <p className="gf-inquiry__summary-title">
                        Please fix {summaryErrors.length}{' '}
                        {summaryErrors.length === 1 ? 'thing' : 'things'} before continuing:
                      </p>
                      <ul>
                        {summaryErrors.map((err) => (
                          <li key={err.id}>
                            <button type="button" onClick={() => focusField(err.id)}>
                              {err.label}: {err.message}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* STEP 1 */}
                <fieldset className="gf-inquiry__fieldset" hidden={step !== 1}>
                  <legend className="gf-inquiry__legend">The essentials</legend>

                  <div className="gf-field gf-field--half">
                    <label htmlFor="name" className="gf-field__label">
                      {fieldLabels.name} <span className="gf-field__req" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      className={`gf-field__input ${errors.name ? 'has-error' : ''}`}
                      value={values.name}
                      onChange={(e) => setField('name', e.target.value)}
                      onBlur={() => onBlur('name')}
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p className="gf-field__error" id="name-error">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="gf-field gf-field--half">
                    <label htmlFor="email" className="gf-field__label">
                      {fieldLabels.email} <span className="gf-field__req" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      className={`gf-field__input ${errors.email ? 'has-error' : ''}`}
                      value={values.email}
                      onChange={(e) => setField('email', e.target.value)}
                      onBlur={() => onBlur('email')}
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p className="gf-field__error" id="email-error">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="gf-field">
                    <label htmlFor="projectType" className="gf-field__label">
                      {fieldLabels.projectType}{' '}
                      <span className="gf-field__req" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      className={`gf-field__input gf-field__select ${errors.projectType ? 'has-error' : ''}`}
                      value={values.projectType}
                      onChange={(e) => setField('projectType', e.target.value)}
                      onBlur={() => onBlur('projectType')}
                      aria-required="true"
                      aria-invalid={!!errors.projectType}
                      aria-describedby={errors.projectType ? 'projectType-error' : undefined}
                    >
                      <option value="" disabled>
                        Choose one&hellip;
                      </option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    {errors.projectType && (
                      <p className="gf-field__error" id="projectType-error">
                        {errors.projectType}
                      </p>
                    )}
                  </div>

                  <div className="gf-field">
                    <label htmlFor="description" className="gf-field__label">
                      {fieldLabels.description}{' '}
                      <span className="gf-field__req" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      className={`gf-field__input gf-field__textarea ${errors.description ? 'has-error' : ''}`}
                      placeholder="e.g. A replacement knob for an old stereo, or a small dinosaur planter for a desk."
                      value={values.description}
                      onChange={(e) => setField('description', e.target.value)}
                      onBlur={() => onBlur('description')}
                      aria-required="true"
                      aria-invalid={!!errors.description}
                      aria-describedby={errors.description ? 'description-error' : 'description-help'}
                    />
                    {errors.description ? (
                      <p className="gf-field__error" id="description-error">
                        {errors.description}
                      </p>
                    ) : (
                      <p className="gf-field__help" id="description-help">
                        No technical terms needed &mdash; describe it however makes sense to you.
                      </p>
                    )}
                  </div>

                  <div className="gf-inquiry__actions">
                    <Button type="button" variant="primary" size="lg" onClick={goToStep2} iconRight={<ArrowRight size={18} />}>
                      Continue
                    </Button>
                    <span className="gf-inquiry__actions-note gf-text-muted">Two short steps. That&rsquo;s it.</span>
                  </div>
                </fieldset>

                {/* STEP 2 */}
                <fieldset className="gf-inquiry__fieldset" hidden={step !== 2}>
                  <legend className="gf-inquiry__legend" tabIndex={-1} ref={step2Ref}>
                    A few more details <span className="gf-text-muted">(all optional)</span>
                  </legend>

                  <div className="gf-field gf-field--half">
                    <label htmlFor="use" className="gf-field__label">
                      Where will it be used?
                    </label>
                    <input
                      id="use"
                      name="use"
                      type="text"
                      className="gf-field__input"
                      placeholder="Indoors, outdoors, a gift&hellip;"
                      value={values.use}
                      onChange={(e) => setField('use', e.target.value)}
                    />
                  </div>

                  <div className="gf-field gf-field--half">
                    <label htmlFor="size" className="gf-field__label">
                      Roughly how big?
                    </label>
                    <input
                      id="size"
                      name="size"
                      type="text"
                      className="gf-field__input"
                      placeholder="Palm-sized, ~20cm, fits a shelf&hellip;"
                      value={values.size}
                      onChange={(e) => setField('size', e.target.value)}
                    />
                  </div>

                  <div className="gf-field gf-field--half">
                    <label htmlFor="quantity" className="gf-field__label">
                      How many?
                    </label>
                    <input
                      id="quantity"
                      name="quantity"
                      type="number"
                      inputMode="numeric"
                      min={1}
                      className="gf-field__input"
                      placeholder="1"
                      value={values.quantity}
                      onChange={(e) => setField('quantity', e.target.value)}
                    />
                  </div>

                  <div className="gf-field gf-field--half">
                    <label htmlFor="timeline" className="gf-field__label">
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      className="gf-field__input gf-field__select"
                      value={values.timeline}
                      onChange={(e) => setField('timeline', e.target.value)}
                    >
                      <option value="">No preference</option>
                      {timelines.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="gf-field">
                    <span className="gf-field__label">Reference image or file</span>
                    <label htmlFor="file" className="gf-field__file">
                      <Paperclip size={17} aria-hidden="true" />
                      <span>{fileName || 'Attach a photo, sketch, or model'}</span>
                      <input
                        id="file"
                        name="file"
                        type="file"
                        accept="image/*,.pdf,.stl,.obj,.step,.stp,.3mf"
                        className="gf-sr-only"
                        onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')}
                      />
                    </label>
                    <p className="gf-field__help">Helpful, but not required. Images, PDFs, or 3D files.</p>
                  </div>

                  <div className="gf-field">
                    <label htmlFor="details" className="gf-field__label">
                      Anything else?
                    </label>
                    <textarea
                      id="details"
                      name="details"
                      rows={3}
                      className="gf-field__input gf-field__textarea"
                      placeholder="Colors, materials, deadlines, references&hellip;"
                      value={values.details}
                      onChange={(e) => setField('details', e.target.value)}
                    />
                  </div>

                  <div className="gf-inquiry__actions">
                    <Button
                      type="button"
                      variant="ghost"
                      size="lg"
                      onClick={() => setStep(1)}
                      iconLeft={<ArrowLeft size={18} />}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      loading={status === 'submitting'}
                      iconRight={status === 'submitting' ? undefined : <Send size={17} />}
                    >
                      {status === 'submitting' ? 'Sending\u2026' : 'Send it to the forge'}
                    </Button>
                  </div>
                </fieldset>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

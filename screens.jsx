/* Screens for Paw Print Pedigrees prototype */
const { useState, useRef, useEffect } = React;

function Dropdown({ value, options, onChange, ariaLabel, className = '', placeholder = 'Select…', searchable = false, disabled = false }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onEsc = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onEsc);
    if (searchable && inputRef.current) {
      setTimeout(()=>inputRef.current && inputRef.current.focus(), 10);
    }
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open, searchable]);
  useEffect(() => { if (!open) setQuery(''); }, [open]);
  const items = options.map(o => typeof o === 'string' ? { value: o, label: o } : o);
  const current = items.find(o => o.value === value);
  const q = query.trim().toLowerCase();
  const filtered = q ? items.filter(o => o.label.toLowerCase().includes(q)) : items;
  return (
    <div className={"dd " + (open ? 'is-open ' : '') + (disabled ? 'is-disabled ' : '') + className} ref={ref}>
      <button
        type="button"
        className="dd-trigger"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
        onClick={()=>!disabled && setOpen(o=>!o)}
      >
        <span className={"dd-value" + (!current ? ' is-placeholder' : '')}>{current ? current.label : placeholder}</span>
        <svg className="dd-chev" width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 2 6 6 10 2"/></svg>
      </button>
      {open && (
        <div className="dd-menu-wrap">
          {searchable && (
            <div className="dd-search">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>
              <input
                ref={inputRef}
                placeholder="Search…"
                value={query}
                onChange={e=>setQuery(e.target.value)}
              />
            </div>
          )}
          <ul className="dd-menu" role="listbox">
            {filtered.length === 0 ? (
              <li className="dd-empty">No matches</li>
            ) : filtered.map(o => (
              <li key={o.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={o.value === value}
                  className={"dd-item" + (o.value === value ? ' is-selected' : '')}
                  onClick={()=>{ onChange(o.value); setOpen(false); }}
                >
                  <span className="dd-item-label">{o.label}</span>
                  {o.value === value && (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const Icon = {
  arrowRight: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
  ),
  arrowDown: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
  ),
  search: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>
  ),
  check: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  ),
  paw: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="6" cy="9" r="2"/><circle cx="10" cy="5" r="2"/><circle cx="14" cy="5" r="2"/><circle cx="18" cy="9" r="2"/><path d="M12 11c-3 0-6 2.5-6 5.5C6 19 8 20 10 20c1 0 1.5-.5 2-.5s1 .5 2 .5c2 0 4-1 4-3.5 0-3-3-5.5-6-5.5z"/></svg>
  ),
  shield: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  ),
  user: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  globe: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20"/></svg>
  ),
  dna: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4c4 0 8 4 8 8s4 8 8 8M4 20c4 0 8-4 8-8s4-8 8-8"/></svg>
  ),
  mark: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  ),
  x: (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  ),
  ext: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
  ),
  eye: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  eyeOff: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
  ),
};

function FieldEye({ initial = true }) {
  const [pub, setPub] = useState(initial);
  return (
    <button
      type="button"
      className={"field-eye " + (pub?'on':'off')}
      onClick={()=>setPub(!pub)}
      data-tooltip={pub ? 'Hide in public profile' : 'Show in public profile'}
      aria-label={pub ? 'Hide in public profile' : 'Show in public profile'}
    >
      {pub ? Icon.eye : Icon.eyeOff}
    </button>
  );
}

function Field({label, children, full, error, locked, required, mandatoryPublic, noEye, initialPublic = true}) {
  return (
    <div className={"field" + (full?' full':'') + (error?' has-error':'') + (locked?' is-locked':'')}>
      <label>
        {label}
        {required && <span className="req"> *</span>}
        {locked && <span className="lock-note"> · from Orivet</span>}
      </label>
      <div className="field-input-wrap">
        {children}
        {mandatoryPublic && (
          <span
            className="field-eye locked-public"
            data-tooltip="Always public — required field"
            aria-label="Always public — required field"
          >
            {Icon.eye}
          </span>
        )}
        {!mandatoryPublic && !noEye && <FieldEye initial={initialPublic} />}
      </div>
      {error && <div className="field-error">{error}</div>}
    </div>
  );
}

function TopNav({ onDark, onNav, active, isLoggedIn, setLoggedIn, onboardingComplete, minimal }) {
  const profileTarget = onboardingComplete ? 'myprofile' : 'kennel';
  return (
    <div className={"topnav" + (onDark ? " on-dark" : "")}>
      <a
        href="#"
        onClick={e=>{e.preventDefault(); onNav('landing');}}
        className="brand brand-wordmark"
        aria-label="Paw Print Pedigrees home"
      >
        <img src={(typeof window !== 'undefined' && window.__resources && window.__resources.orivetLogo) || 'assets/orivet-logo.png'} alt="Orivet — Paw Print Genetics" className="wordmark" />
      </a>
      {!minimal && (
        <div className="navlinks">
          <a href="#" onClick={e=>{e.preventDefault(); onNav('search');}} className={active==='search'?'active':''}>Breeders</a>
          <a href="#" onClick={e=>{e.preventDefault(); onNav('about');}} className={active==='about'?'active':''}>About</a>
          {isLoggedIn && (
            <button
              className="btn btn-ghost btn-sm nav-logout"
              onClick={()=>{ setLoggedIn && setLoggedIn(false); onNav('landing'); }}
            >
              Log Out
            </button>
          )}
          {!(isLoggedIn && active === 'myprofile') && (
            <button
              className={"btn " + (onDark ? "btn-light" : "btn-primary")}
              onClick={()=>onNav(isLoggedIn ? profileTarget : 'signup')}
            >
              {isLoggedIn ? 'My Profile' : 'Log In'} {Icon.arrowRight}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ─────── 1. LANDING ─────── */
function Landing({ onNav, isLoggedIn, onboardingComplete }) {
  const primaryAction = !isLoggedIn ? 'signup' : (onboardingComplete ? 'myprofile' : 'kennel');
  const primaryLabel = !isLoggedIn ? 'Create Breeder Profile' : (onboardingComplete ? 'Go to My Profile' : 'Continue Onboarding');
  return (
    <div>
      <TopNav onDark onNav={onNav} active="landing" isLoggedIn={isLoggedIn} onboardingComplete={onboardingComplete} />
      <section className="hero">
        <div className="page">
          <h1>Paw Print <em>Pedigrees</em></h1>
          <p className="sub">
            Welcome to Paw Print Pedigrees. Connecting responsible breeders with health-conscious pet owners.
          </p>
          <div className="role-cards">
            <div className="role-card is-primary">
              <div className="badge">{Icon.paw}</div>
              <h3>I'm a Breeder</h3>
              <p>Show your commitment to excellence through transparent genetic testing and health screening.</p>
              <div className="actions">
                <button className="btn btn-primary" onClick={()=>onNav(primaryAction)}>
                  {primaryLabel} {Icon.arrowRight}
                </button>
                <a className="secondary" href="#" onClick={e=>{e.preventDefault(); onNav('about');}}>Learn more</a>
              </div>
            </div>
            <div className="role-card">
              <div className="badge">{Icon.user}</div>
              <h3>I'm a Pet Owner</h3>
              <p>Find breeders who meet the highest standards in genetic testing and long-term health.</p>
              <div className="actions">
                <button className="btn btn-accent" onClick={()=>onNav('search')}>
                  Explore Breeders {Icon.arrowRight}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="page">
          <div className="row">
            {[
              {ic: Icon.dna, h: 'Verified Genetic Testing'},
              {ic: Icon.shield, h: 'Trusted Breeders'},
              {ic: Icon.paw, h: 'Transparent Practices'},
              {ic: Icon.globe, h: 'Health-Focused Standards'},
            ].map((it,i)=>(
              <div className="trust-item" key={i}>
                <div className="ic">{it.ic}</div>
                <h4>{it.h}</h4>
              </div>
            ))}
          </div>
          <div className="trust-tagline">
            <div className="ic">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
            <span>Elevating breeding standards through genetic insight</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="page">
          <div className="head">
            <h2>Why This Matters <em>to Clients</em></h2>
            <p className="lede">Four Simple Steps to Unlock Pet's Genetic Insights</p>
          </div>
          <div className="matters-grid">
            {[
              {ic: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="11" r="2.5"/><path d="M5 18c0-2.2 1.8-4 4-4s4 1.8 4 4"/><line x1="15" y1="9" x2="19" y2="9"/><line x1="15" y1="13" x2="19" y2="13"/></svg>), h:'Present your kennel like a pro', items:[
                'Upload your logo and image',
                'Describe what sets you apart',
                'Showcase your animals',
                'Share your contact details',
                'Share your website and social links',
                'Share a link to your profile',
              ]},
              {ic: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/><circle cx="12" cy="16" r="1.4" fill="currentColor"/></svg>), h:'Publish ONLY What you Choose', items:[
                'Disease screens',
                'Traits test results',
                'Parentage confirmation',
                'Heterozygosity scores',
                'Breed and ancestry tests results',
                'Keep any of your personal data and/or selected animals and data private',
              ]},
              {ic: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11.5 14.5 16 10"/></svg>), h:'Build Trust & Stand Out', items:[
                'Verification of DNA test results',
                'Clear and simple presentation — results anyone can understand',
                'Transparency — sharing your results for everyone to see',
                'Differentiation — stand out by demonstrating your commitment to health and excellence',
                'Build Trust — here is the evidence',
                'Be part of like-minded, health-focused breeder community',
              ]},
            ].map((c,i)=>(
              <div className="matters-card" key={i}>
                <div className="num matters-ic">{c.ic}</div>
                <h3>{c.h}</h3>
                <ul>
                  {c.items.map((it,j)=>(<li key={j}>{it}</li>))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="page">
          <div className="row">
            <div>
              <h3>Orivet Responsible Breeders Program</h3>
              <p>The benchmark for ethical, transparent breeding worldwide.</p>
            </div>
            <button className="btn btn-light">Browse Program {Icon.arrowRight}</button>
          </div>
        </div>
      </section>

      <section className="faq">
        <div className="page">
          <div className="faq-grid">
            <div>
              <h2>Frequently Asked Questions</h2>
              <p className="lede">Orivet works with many professional Breeders in Australia, New Zealand.</p>
            </div>
            <div className="faq-list">
              {[
                {q:'Is anything public by default?', a:'Simply collect a cheek swab from your cat or dog using the kit provided and send it back to our lab. Once processed, you\u2019ll receive a detailed report with clear, easy-to-understand results.'},
                {q:'Can I publish only certain results?', a:'Yes \u2014 every test result, photo, and field on your profile has its own visibility toggle. Publish what you want, keep the rest private.'},
                {q:'Can I change or remove information later?', a:'Absolutely. Update, hide, or remove any part of your profile at any time from your dashboard.'},
                {q:'Can I change or remove information later?', a:'You retain full control. Information you withdraw is removed from search and breed pages within minutes.'},
              ].map((it,i)=>(
                <details className="faq-item" key={i} open={i===0}>
                  <summary>{it.q}</summary>
                  <div className="body">{it.a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="foot">
        <div className="page">
          <div className="row">
            <div>© 2026 Paw Print Pedigrees — an Orivet service</div>
            <div>Privacy · Terms · Contact</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─────── 2. SIGN-UP ─────── */
function SignUp({ onNav, setLoggedIn, onboardingComplete, setOnboardingComplete }) {
  const [email, setEmail] = useState('gayan@pawprint.com.au');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  function fireToast(t) {
    setToast(t);
    setTimeout(()=>setToast(null), 4600);
  }

  function validate() {
    const e = {};
    if (!email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid Orivet email.';
    if (!password.trim()) e.password = 'Password is required.';
    else if (password.length < 6) e.password = 'Password must be at least 6 characters.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function onLogIn() {
    if (!validate()) {
      fireToast({type:'error', msg:'Please fix the errors below and try again.'});
      return;
    }
    const e = email.trim().toLowerCase();
    // ishini@ → first-time user, route through onboarding
    if (e === 'ishini@pawprint.com.au') {
      fireToast({type:'success', msg:'Login successful. Let\'s set up your profile.'});
      setLoggedIn && setLoggedIn(true);
      setOnboardingComplete && setOnboardingComplete(false);
      setTimeout(()=>onNav && onNav('kennel'), 1200);
      return;
    }
    // gayan@ (or anyone else) → onboarded user, go to their profile
    fireToast({type:'success', msg:'Login successful. Welcome back, Gayan.'});
    setLoggedIn && setLoggedIn(true);
    setOnboardingComplete && setOnboardingComplete(true);
    setTimeout(()=>onNav && onNav('myprofile'), 1200);
  }

  function onExistingOrivet() {
    fireToast({type:'info', msg:'Redirecting to orivet.com/login — once you sign in we\'ll opt you in to Paw Print and bring you back here to log in.'});
  }

  function onNewAccount() {
    fireToast({type:'info', msg:'Redirecting to orivet.com/register/breeder — once your account is created and activated, come back here to log in.'});
  }

  return (
    <div className="modal-stage">
      {toast && (
        <div className={"toast toast-" + (toast.type === 'info' ? 'success' : toast.type)} role="status">
          <span className="toast-ic">
            {toast.type === 'success' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            ) : toast.type === 'info' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="8"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12" y2="16"/></svg>
            )}
          </span>
          <span>{toast.msg}</span>
          <button className="toast-close" onClick={()=>setToast(null)} aria-label="Dismiss">{Icon.x}</button>
        </div>
      )}
      <div className="modal-shell">
        <div className="modal-form">
          <h3>Log in to Paw Print Pedigrees</h3>
          <p className="lede">Use your Orivet account email and password.</p>
          <div className={"field" + (errors.email ? ' has-error' : '')}>
            <label>Orivet account email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>
          <div className={"field" + (errors.password ? ' has-error' : '')}>
            <label>Orivet account password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Your Orivet password" />
            {errors.password && <div className="field-error">{errors.password}</div>}
          </div>
          <button className="btn btn-primary" onClick={onLogIn}>Log in {Icon.arrowRight}</button>

          <div className="path-divider"><span>First time here?</span></div>

          <div className="path-stack">
            <a href="https://www.orivet.com/login" target="_blank" rel="noreferrer" className="path-row" data-tooltip="We'll send you to orivet.com/login. After you sign in, we'll opt you in to Paw Print and bring you back here to log in." onClick={(e)=>{e.preventDefault(); onExistingOrivet();}}>
              <div className="path-row-body">
                <div className="path-row-title">I have an Orivet account but haven't opted in to PPP</div>
              </div>
              <span className="path-row-arrow">{Icon.arrowRight}</span>
            </a>

            <a href="https://www.orivet.com/register/breeder" target="_blank" rel="noreferrer" className="path-row" data-tooltip="We'll send you to orivet.com/register/breeder. Once your account is activated, you'll be opted in to Paw Print — return here to log in." onClick={(e)=>{e.preventDefault(); onNewAccount();}}>
              <div className="path-row-body">
                <div className="path-row-title">I don't have an Orivet account</div>
              </div>
              <span className="path-row-arrow">{Icon.arrowRight}</span>
            </a>
          </div>

          <div className="demo-row">
            <span className="demo-label">Preview state:</span>
            <button type="button" className="demo-chip" onClick={()=>{setEmail(''); setPassword(''); validate(); fireToast({type:'error', msg:'Please fix the errors below and try again.'});}}>Validation errors</button>
            <button type="button" className="demo-chip" onClick={()=>{setErrors({}); fireToast({type:'success', msg:'Login successful. Welcome back, Gayan.'});}}>Login success</button>
            <button type="button" className="demo-chip" onClick={onExistingOrivet}>Case 2: opt-in flow</button>
            <button type="button" className="demo-chip" onClick={onNewAccount}>Case 1: new account flow</button>
          </div>
        </div>
        <div className="modal-side">
          <h2>Welcome to the <em>Paw Print Pedigree</em></h2>
          <ul>
            <li>
              <span className="ic">{Icon.mark}</span>
              <div>
                <div className="t">Log in with your Orivet account</div>
                <div className="d">Already opted in to PPP? Just enter your Orivet email and password — that's it.</div>
              </div>
            </li>
            <li>
              <span className="ic">{Icon.mark}</span>
              <div>
                <div className="t">First time? We'll handle the linking</div>
                <div className="d">If you have an Orivet account, we'll opt you in. If you don't, we'll help you register one.</div>
              </div>
            </li>
            <li>
              <span className="ic">{Icon.mark}</span>
              <div>
                <div className="t">Choose what to publish on your profile</div>
                <div className="d">Pick the animals, tests, and details you want public. Everything else stays private.</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ─────── 3. KENNEL PROFILE ─────── */
/* Countries — synced from Orivet directory */
const COUNTRIES = [
  'Australia','United States','United Kingdom','Canada','New Zealand','Ireland',
  'Germany','France','Netherlands','Belgium','Spain','Portugal','Italy','Switzerland',
  'Austria','Denmark','Sweden','Norway','Finland','Iceland','Poland','Czechia',
  'Hungary','Greece','Turkey','Japan','South Korea','China','Singapore','Malaysia',
  'Thailand','Vietnam','Philippines','Indonesia','India','Pakistan','Bangladesh',
  'United Arab Emirates','Saudi Arabia','Israel','South Africa','Kenya','Nigeria',
  'Egypt','Morocco','Mexico','Brazil','Argentina','Chile','Colombia','Peru',
];
/* States/Provinces — only USA & Australia per spec */
const STATES_BY_COUNTRY = {
  'Australia': [
    'New South Wales','Victoria','Queensland','Western Australia','South Australia',
    'Tasmania','Australian Capital Territory','Northern Territory',
  ],
  'United States': [
    'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut',
    'Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
    'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
    'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire',
    'New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio',
    'Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota',
    'Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia',
    'Wisconsin','Wyoming',
  ],
};

function ReportGroup({title, helper, items, emptyText, reportPublic, onTogglePublic}) {
  return (
    <div className="report-group">
      <div className="report-group-head">
        <h5>{title}</h5>
        <p>{helper}</p>
      </div>
      {items.length === 0 ? (
        <div className="report-empty">{emptyText}</div>
      ) : (
        <div className="report-list">
          {items.map(r => {
            const pub = !!reportPublic[r.id];
            return (
              <div
                key={r.id}
                className={"report-row" + (pub ? ' is-opted' : '')}
                onClick={()=>onTogglePublic(r.id)}
                role="button"
                tabIndex={0}
                onKeyDown={e=>{ if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onTogglePublic(r.id); } }}
              >
                <div className="report-body">
                  <div className="report-name">{r.name}</div>
                  <div className="report-result">{r.result}</div>
                </div>
                <button
                  type="button"
                  className={"row-eye " + (pub ? 'on' : 'off')}
                  onClick={e=>{e.preventDefault(); e.stopPropagation(); onTogglePublic(r.id);}}
                  data-tooltip={pub ? 'Hide on public profile' : 'Show on public profile'}
                  aria-label={pub ? 'Hide on public profile' : 'Show on public profile'}
                >
                  {pub ? Icon.eye : Icon.eyeOff}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const KP_TABS = ['Profile Details', 'Address Details', 'Social Details', 'Opt-in an Animal'];

/* Shared animal directory (mocking Orivet) — used by onboarding + My Profile */
const PROFILE_ANIMALS = [
  {id:1, breed:'Golden Retriever',      pet:'Buddy',   regName:'Buddy of Stonebridge',   regNum:'ANKC-2391-22', chip:'956000003434511', species:'Canine', gender:'Male'},
  {id:2, breed:'Australian Shepherd',   pet:'Skye',    regName:'Stonebridge Skye Blue',  regNum:'ANKC-2412-22', chip:'956000003434820', species:'Canine', gender:'Female'},
  {id:3, breed:'French Bulldog',        pet:'Maple',   regName:'Maple Joy of Toorak',    regNum:'ANKC-2502-23', chip:'956000003502211', species:'Canine', gender:'Female'},
  {id:4, breed:'Border Collie',         pet:'Finn',    regName:'Stonebridge Finn',       regNum:'ANKC-2611-23', chip:'956000003711204', species:'Canine', gender:'Male'},
  {id:5, breed:'Cavoodle',              pet:'Luna',    regName:'Luna Belle',             regNum:'N/A',           chip:'956000003914002', species:'Canine', gender:'Female'},
  {id:6, breed:'Golden Retriever',      pet:'Atlas',   regName:'Highridge Atlas',        regNum:'ANKC-2614-23', chip:'956000004112005', species:'Canine', gender:'Male'},
  {id:7, breed:'Border Collie',         pet:'Pippa',   regName:'Bluegum Pippa',          regNum:'ANKC-2701-23', chip:'956000004251122', species:'Canine', gender:'Female'},
  {id:8, breed:'Australian Shepherd',   pet:'Juno',    regName:"Coopers Run Juno",       regNum:'ANKC-2712-24', chip:'956000004412889', species:'Canine', gender:'Female'},
  {id:9, breed:'Border Collie',         pet:'Banjo',   regName:'Saltline Banjo',         regNum:'ANKC-2814-24', chip:'956000004552103', species:'Canine', gender:'Male'},
  {id:10, breed:'Australian Shepherd',  pet:'Aria',    regName:'Saltline Aria',          regNum:'ANKC-2841-24', chip:'956000004690055', species:'Canine', gender:'Female'},
  {id:11, breed:'Australian Shepherd',  pet:'Marlowe', regName:'Highridge Marlowe',      regNum:'ANKC-2902-24', chip:'956000004812330', species:'Canine', gender:'Male'},
  {id:12, breed:'Border Collie',        pet:'June',    regName:'Westwind June',          regNum:'ANKC-2914-24', chip:'956000004917702', species:'Canine', gender:'Female'},
];

function getReportsFor(animal) {
  if (!animal) return {sample: null, traits: [], diseases: []};
  return {
    sample: { profile: `${animal.breed} - Full Breed Profile`, barcode: '19B' + (54000 + animal.id * 13) },
    traits: animal.id % 2 === 0 ? [
      { id: 't1', name: 'Coat Length',          result: 'SHORT (L/L)' },
      { id: 't2', name: 'Coat Colour - Brown',  result: 'BROWN (b/b)' },
      { id: 't3', name: 'Furnishings',          result: 'IMPROPER COAT (FF)' },
    ] : [
      { id: 't1', name: 'Coat Length',          result: 'LONG (l/l)' },
    ],
    diseases: [
      { id: 'd1', name: 'Degenerative Myelopathy',                                  result: 'NORMAL (N/N)' },
      { id: 'd2', name: 'Generalised PRA 1 (Golden Retriever Type)',                result: 'CARRIER (P/N)' },
      { id: 'd3', name: 'Progressive Rod Cone Degeneration (prcd) - PRA',           result: 'NORMAL (N/N)' },
      { id: 'd4', name: 'Skeletal Dysplasia 2 (Mild Disproportionate Dwarfism)',    result: 'INDETERMINABLE' },
      { id: 'd5', name: 'Ichthyosis A',                                             result: 'NORMAL (N/N)' },
      { id: 'd6', name: 'Generalised PRA 2 (Golden Retriever Type)',                result: 'PENDING' },
      { id: 'd7', name: 'Osteogenesis Imperfecta',                                  result: 'NORMAL (N/N)' },
      { id: 'd8', name: 'Dystrophic Epidermolysis Bullosa',                         result: 'NORMAL (N/N)' },
    ],
  };
}

function SyncedFieldsBanner({editing, onToggle}) {
  return (
    <div className="locked-banner">
      <div className="lb-text">
        <span className="lb-ic">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </span>
        <span><strong>Some fields are synced from your Orivet account.</strong> Click Edit to override locally — changes made here won't update your Orivet account.</span>
      </div>
      <button type="button" className={"btn btn-ghost btn-sm" + (editing?' is-on':'')} onClick={onToggle}>
        {editing ? (
          <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Done editing</>
        ) : (
          <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Edit synced fields</>
        )}
      </button>
    </div>
  );
}

function KennelProfile({ onNav, variant, isLoggedIn, setLoggedIn, onboardingComplete, setOnboardingComplete }) {
  const [tab, setTab] = useState(variant || KP_TABS[0]);
  const tabIndex = KP_TABS.indexOf(tab);
  const isFirstTab = tabIndex <= 0;
  const isLastTab = tabIndex === KP_TABS.length - 1;
  const goNextTab = () => { if (!isLastTab) setTab(KP_TABS[tabIndex + 1]); };
  const goPrevTab = () => { if (!isFirstTab) setTab(KP_TABS[tabIndex - 1]); };
  const [breeds, setBreeds] = useState(['Australian Shepherd', 'Border Collie']);
  const [breedInput, setBreedInput] = useState('');
  const [breedFocused, setBreedFocused] = useState(false);
  const breedQuery = breedInput.trim().toLowerCase();
  const breedSuggestions = breedQuery
    ? BREEDS.filter(b => !breeds.includes(b) && b.toLowerCase().includes(breedQuery)).slice(0, 8)
    : [];
  function addBreed(b) {
    if (!b || breeds.includes(b)) return;
    setBreeds([...breeds, b]);
    setBreedInput('');
    if (errors.breeds) setErrors({...errors, breeds: undefined});
  }
  function onBreedKeyDown(e) {
    if (e.key === 'Enter' && breedSuggestions[0]) {
      e.preventDefault();
      addBreed(breedSuggestions[0]);
    } else if (e.key === 'Backspace' && !breedInput && breeds.length) {
      setBreeds(breeds.slice(0, -1));
    }
  }
  // Profile Details state (first/last/regNumber are locked, pulled from Orivet)
  const [editOrivet, setEditOrivet] = useState(false);
  const [firstName, setFirstName] = useState('Ishini');
  const [lastName, setLastName] = useState('Perera');
  const [regNumber, setRegNumber] = useState('ORV-AU-3915-26');
  const [avatarUrl, setAvatarUrl] = useState(null);
  const fileInputRef = React.useRef(null);
  const onAvatarPick = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
  };
  const [about, setAbout] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  // Address Details state
  const [editAddrOrivet, setEditAddrOrivet] = useState(false);
  const [addrCountry, setAddrCountry] = useState('Australia');
  const [addrState, setAddrState] = useState('Victoria');
  const [addrPostal, setAddrPostal] = useState('3000');
  const [addrLine1, setAddrLine1] = useState('');
  const [addrLine2, setAddrLine2] = useState('');
  const [postalPublic, setPostalPublic] = useState(false);
  const [line1Public, setLine1Public] = useState(false);
  const [line2Public, setLine2Public] = useState(false);
  const [addrErrors, setAddrErrors] = useState({});

  const stateOptions = STATES_BY_COUNTRY[addrCountry] || [];
  const stateRequired = stateOptions.length > 0;

  // Social Details state
  const [website, setWebsite] = useState('');
  const [phone, setPhone] = useState('');
  const [socialEmail, setSocialEmail] = useState('ishini@pawprint.com.au'); // autofilled from Orivet
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [websitePublic, setWebsitePublic] = useState(true);
  const [phonePublic, setPhonePublic] = useState(true);
  const [emailPublic, setEmailPublic] = useState(true);
  const [facebookPublic, setFacebookPublic] = useState(false);
  const [instagramPublic, setInstagramPublic] = useState(true);
  const [socialErrors, setSocialErrors] = useState({});
  const [editSocialOrivet, setEditSocialOrivet] = useState(false);

  // My Animals — shared source of truth
  const [animals] = useState(PROFILE_ANIMALS.slice(0, 5));

  const [selectedAnimalId, setSelectedAnimalId] = useState(null);
  const [reportPublic, setReportPublic] = useState({}); // {reportId: true} — visible on public profile
  const selectedAnimal = animals.find(a => a.id === selectedAnimalId);
  const animalReports = getReportsFor(selectedAnimal);
  const allReports = [...animalReports.traits, ...animalReports.diseases];
  const totalOpted = allReports.filter(r => reportPublic[r.id]).length;

  function toggleReportPublic(id) {
    setReportPublic(prev => ({...prev, [id]: !prev[id]}));
  }
  function optInAll() {
    const next = {...reportPublic};
    allReports.forEach(r => { next[r.id] = true; });
    setReportPublic(next);
  }
  function optOutAll() {
    setReportPublic({});
  }
  function changeAnimal() {
    setSelectedAnimalId(null);
    setReportPublic({});
  }

  function validateSocial() {
    const e = {};
    if (!phone.trim()) e.phone = 'Phone is required.';
    else if (!/^[+0-9\s\-()]{6,}$/.test(phone.trim())) e.phone = 'Enter a valid phone number.';
    if (!socialEmail.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(socialEmail)) e.email = 'Enter a valid email address.';
    setSocialErrors(e);
    return Object.keys(e).length === 0;
  }
  function onSaveSocial() {
    if (!validateSocial()) {
      fireToast({type:'error', msg:'Please fix the errors below and try again.'});
      return;
    }
    fireToast({type:'success', msg:'Social details saved successfully.'});
  }

  function fireToast(t) {
    setToast(t);
    setTimeout(()=>setToast(null), 3200);
  }

  function validateProfile() {
    const e = {};
    if (editOrivet) {
      if (!firstName.trim()) e.firstName = 'First name is required.';
      if (!lastName.trim()) e.lastName = 'Last name is required.';
      if (!regNumber.trim()) e.regNumber = 'Registration number is required.';
    }
    if (!about.trim()) e.about = 'About is required.';
    if (breeds.length === 0) e.breeds = 'Select at least one breed.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function onSave() {
    if (!validateProfile()) {
      fireToast({type:'error', msg:'Please fix the errors below and try again.'});
      return;
    }
    fireToast({type:'success', msg:'Profile saved successfully.'});
  }

  function validateAddress() {
    const e = {};
    if (!addrCountry.trim()) e.country = 'Country is required.';
    if (stateRequired && !addrState.trim()) e.state = 'State is required.';
    if (!addrPostal.trim()) e.postal = 'Postal code is required.';
    else if (!/^[A-Za-z0-9\s\-]{3,10}$/.test(addrPostal.trim())) e.postal = 'Enter a valid postal code.';
    if (!addrLine1.trim()) e.line1 = 'Address Line 1 is required.';
    setAddrErrors(e);
    return Object.keys(e).length === 0;
  }
  function onSaveAddress() {
    if (!validateAddress()) {
      fireToast({type:'error', msg:'Please fix the errors below and try again.'});
      return;
    }
    fireToast({type:'success', msg:'Address details saved successfully.'});
  }
  function onChangeCountry(v) {
    setAddrCountry(v);
    // Reset state when country changes
    const next = STATES_BY_COUNTRY[v] || [];
    setAddrState(next[0] || '');
    if (addrErrors.country || addrErrors.state) {
      setAddrErrors({...addrErrors, country: undefined, state: undefined});
    }
  }

  return (
    <div>
      {toast && (
        <div className={"toast toast-" + toast.type} role="status">
          <span className="toast-ic">
            {toast.type === 'success' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12" y2="16"/></svg>
            )}
          </span>
          <span>{toast.msg}</span>
          <button className="toast-close" onClick={()=>setToast(null)} aria-label="Dismiss">{Icon.x}</button>
        </div>
      )}
      <TopNav onNav={onNav} active="kennel" isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} onboardingComplete={onboardingComplete} minimal />
      <div className="page kp-page">
        <div className="crumb"><a href="#">← Back to Home Page</a></div>
        <div className="kp-head">
          <h2>{
            tab === 'Profile Details' ? 'Setup your Profile' :
            tab === 'Address Details' ? 'Enter Address Details' :
            tab === 'Social Details' ? 'Add Socials' :
            tab === 'Opt-in an Animal' ? 'Almost there.. Let\'s Opt-In your first Animal!' :
            'Setup your Profile'
          }</h2>
          <p className="lede">Choose which details appear in your public profile.</p>
        </div>
        <div className="stepper" role="tablist">
          {KP_TABS.map((t, i) => {
            const state = i < tabIndex ? 'done' : i === tabIndex ? 'current' : 'todo';
            return (
              <button
                key={t}
                type="button"
                className={"stepper-step " + state}
                onClick={() => setTab(t)}
                aria-current={state === 'current' ? 'step' : undefined}
              >
                <span className="stepper-circle">
                  {state === 'done' ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : (
                    <span className="stepper-num">{i + 1}</span>
                  )}
                </span>
                <span className="stepper-label">{t}</span>
              </button>
            );
          })}
        </div>

        {tab === 'Profile Details' && (
          <>
            <div
              className={"kp-banner kp-banner-clickable" + (avatarUrl ? ' has-image' : '')}
              onClick={()=>fileInputRef.current && fileInputRef.current.click()}
              onDragOver={e=>{e.preventDefault();}}
              onDrop={e=>{
                e.preventDefault();
                const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
                if (f) onAvatarPick(f);
              }}
            >
              <div className="kp-avatar" style={avatarUrl ? {backgroundImage: `url(${avatarUrl})`} : null}>
                {avatarUrl ? '' : ((firstName[0]||'') + (lastName[0]||'')).toUpperCase()}
              </div>
              <div className="name">{firstName} {lastName}</div>
              <div className="tag">{avatarUrl ? 'Click to change logo' : 'Drag a logo here or click to upload'}</div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{display: 'none'}}
                onChange={e=>onAvatarPick(e.target.files && e.target.files[0])}
              />
            </div>
            <SyncedFieldsBanner editing={editOrivet} onToggle={()=>setEditOrivet(!editOrivet)} />
            <div className="form-grid">
              <Field label="First Name" required mandatoryPublic locked={!editOrivet} error={errors.firstName}><input value={firstName} onChange={e=>{setFirstName(e.target.value); if(errors.firstName) setErrors({...errors, firstName: undefined});}} disabled={!editOrivet} /></Field>
              <Field label="Last Name" required mandatoryPublic locked={!editOrivet} error={errors.lastName}><input value={lastName} onChange={e=>{setLastName(e.target.value); if(errors.lastName) setErrors({...errors, lastName: undefined});}} disabled={!editOrivet} /></Field>
              <Field label="Registration Number" required noEye locked={!editOrivet} error={errors.regNumber}><input value={regNumber} onChange={e=>{setRegNumber(e.target.value); if(errors.regNumber) setErrors({...errors, regNumber: undefined});}} disabled={!editOrivet} /></Field>
              <Field label="Select Breed" required mandatoryPublic full error={errors.breeds}>
                <div className={"multiselect ms-autocomplete" + (breedFocused && breedSuggestions.length ? ' is-open' : '')}>
                  {breeds.map(b=>(
                    <span className="chip" key={b}>
                      {b}
                      <span className="x" onClick={()=>setBreeds(breeds.filter(x=>x!==b))}>{Icon.x}</span>
                    </span>
                  ))}
                  <input
                    className="ms-input"
                    placeholder={breeds.length ? 'Add another breed…' : 'Search for a breed'}
                    value={breedInput}
                    onChange={e=>setBreedInput(e.target.value)}
                    onFocus={()=>setBreedFocused(true)}
                    onBlur={()=>setTimeout(()=>setBreedFocused(false), 120)}
                    onKeyDown={onBreedKeyDown}
                  />
                  {breedFocused && breedSuggestions.length > 0 && (
                    <ul className="ms-suggest" role="listbox">
                      {breedSuggestions.map(b => (
                        <li key={b}>
                          <button
                            type="button"
                            className="ms-suggest-item"
                            onMouseDown={e=>{ e.preventDefault(); addBreed(b); }}
                          >
                            <span>{b}</span>
                            <span className="ms-suggest-hint">↵</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Field>
              <Field label="About" required mandatoryPublic full error={errors.about}><textarea rows="4" placeholder="Enter your details" value={about} onChange={e=>setAbout(e.target.value)} /></Field>
              <Field label="Additional Notes" full initialPublic={false}><textarea rows="4" placeholder="Enter your skills" value={notes} onChange={e=>setNotes(e.target.value)} /></Field>
            </div>
            <div className="form-actions">
              <div className="demo-row">
                <span className="demo-label">Preview state:</span>
                <button type="button" className="demo-chip" onClick={()=>{
                  setAbout(''); setBreeds([]);
                  const next = {about:'About is required.', breeds:'Select at least one breed.'};
                  if (editOrivet) {
                    setFirstName(''); setLastName(''); setRegNumber('');
                    next.firstName='First name is required.';
                    next.lastName='Last name is required.';
                    next.regNumber='Registration number is required.';
                  }
                  setErrors(next);
                  fireToast({type:'error', msg:'Please fix the errors below and try again.'});
                }}>Validation errors</button>
                <button type="button" className="demo-chip" onClick={()=>{setErrors({}); fireToast({type:'success', msg:'Profile saved successfully.'});}}>Success toast</button>
                <button type="button" className="demo-chip" onClick={()=>{setErrors({}); fireToast({type:'error', msg:'Save failed. Please try again.'});}}>Error toast</button>
              </div>
              <button className="btn btn-primary" onClick={goNextTab}>Continue {Icon.arrowRight}</button>
            </div>
          </>
        )}

        {tab === 'Address Details' && (
          <>
            <SyncedFieldsBanner editing={editAddrOrivet} onToggle={()=>setEditAddrOrivet(!editAddrOrivet)} />
            <div className="form-grid">
              {/* COUNTRY — required, always public (mandatory) */}
              <div className={"field" + (addrErrors.country?' has-error':'')}>
                <label>Country <span className="req">*</span></label>
                <div className="field-input-wrap">
                  <Dropdown
                    ariaLabel="Country"
                    value={addrCountry}
                    onChange={onChangeCountry}
                    className={"dd-field" + (!editAddrOrivet ? ' is-disabled' : '')}
                    searchable
                    placeholder="Select a country…"
                    options={COUNTRIES.map(c => ({ value: c, label: c }))}
                    disabled={!editAddrOrivet}
                  />
                  <span
                    className="field-eye locked-public"
                    data-tooltip="Always public — required for breeder search"
                    aria-label="Always public — required for breeder search"
                  >
                    {Icon.eye}
                  </span>
                </div>
                {addrErrors.country && <div className="field-error">{addrErrors.country}</div>}
              </div>

              {/* STATE — dropdown depending on country, only USA & Australia */}
              <div className={"field" + (addrErrors.state?' has-error':'') + (!stateRequired?' is-locked':'')}>
                <label>
                  State {stateRequired && <span className="req">*</span>}
                  {!stateRequired && <span className="lock-note"> · not available for {addrCountry || 'this country'}</span>}
                </label>
                <div className="field-input-wrap">
                  <Dropdown
                    ariaLabel="State"
                    value={addrState}
                    onChange={(v)=>{setAddrState(v); if(addrErrors.state) setAddrErrors({...addrErrors, state: undefined});}}
                    className={"dd-field" + (!editAddrOrivet || !stateRequired ? ' is-disabled' : '')}
                    searchable={stateRequired && stateOptions.length > 8}
                    placeholder={stateRequired ? 'Select a state…' : '—'}
                    options={stateRequired ? stateOptions.map(s => ({ value: s, label: s })) : []}
                    disabled={!editAddrOrivet || !stateRequired}
                  />
                  {stateRequired && (
                    <span
                      className="field-eye locked-public"
                      data-tooltip="Always public — required for breeder search"
                      aria-label="Always public — required for breeder search"
                    >
                      {Icon.eye}
                    </span>
                  )}
                </div>
                {addrErrors.state && <div className="field-error">{addrErrors.state}</div>}
              </div>

              {/* POSTAL CODE — required, optional visibility */}
              <div className={"field" + (addrErrors.postal?' has-error':'')}>
                <label>Postal Code <span className="req">*</span></label>
                <div className="field-input-wrap">
                  <input
                    value={addrPostal}
                    onChange={e=>{setAddrPostal(e.target.value); if(addrErrors.postal) setAddrErrors({...addrErrors, postal: undefined});}}
                    placeholder="e.g. 3000"
                    disabled={!editAddrOrivet}
                  />
                  <button
                    type="button"
                    className={"field-eye " + (postalPublic?'on':'off')}
                    onClick={()=>setPostalPublic(!postalPublic)}
                    data-tooltip={postalPublic ? 'Hide in public profile' : 'Show in public profile'}
                    aria-label={postalPublic ? 'Hide in public profile' : 'Show in public profile'}
                  >
                    {postalPublic ? Icon.eye : Icon.eyeOff}
                  </button>
                </div>
                {addrErrors.postal && <div className="field-error">{addrErrors.postal}</div>}
              </div>

              {/* ADDRESS LINE 1 — required, optional visibility */}
              <div className={"field full" + (addrErrors.line1?' has-error':'')}>
                <label>Address Line 1 <span className="req">*</span></label>
                <div className="field-input-wrap">
                  <input
                    value={addrLine1}
                    onChange={e=>{setAddrLine1(e.target.value); if(addrErrors.line1) setAddrErrors({...addrErrors, line1: undefined});}}
                    placeholder="Street address"
                    disabled={!editAddrOrivet}
                  />
                  <button
                    type="button"
                    className={"field-eye " + (line1Public?'on':'off')}
                    onClick={()=>setLine1Public(!line1Public)}
                    data-tooltip={line1Public ? 'Hide in public profile' : 'Show in public profile'}
                    aria-label={line1Public ? 'Hide in public profile' : 'Show in public profile'}
                  >
                    {line1Public ? Icon.eye : Icon.eyeOff}
                  </button>
                </div>
                {addrErrors.line1 && <div className="field-error">{addrErrors.line1}</div>}
              </div>

              {/* ADDRESS LINE 2 — optional, optional visibility */}
              <div className="field full">
                <label>Address Line 2 <span className="opt">(optional)</span></label>
                <div className="field-input-wrap">
                  <input
                    value={addrLine2}
                    onChange={e=>setAddrLine2(e.target.value)}
                    placeholder="Apartment, suite, etc."
                    disabled={!editAddrOrivet}
                  />
                  <button
                    type="button"
                    className={"field-eye " + (line2Public?'on':'off')}
                    onClick={()=>setLine2Public(!line2Public)}
                    data-tooltip={line2Public ? 'Hide in public profile' : 'Show in public profile'}
                    aria-label={line2Public ? 'Hide in public profile' : 'Show in public profile'}
                  >
                    {line2Public ? Icon.eye : Icon.eyeOff}
                  </button>
                </div>
              </div>
            </div>
            <div className="form-actions">
              <div className="demo-row">
                <span className="demo-label">Preview state:</span>
                <button type="button" className="demo-chip" onClick={()=>{
                  setAddrPostal(''); setAddrLine1(''); setAddrState('');
                  setAddrErrors({
                    state: stateRequired ? 'State is required.' : undefined,
                    postal: 'Postal code is required.',
                    line1: 'Address Line 1 is required.',
                  });
                  fireToast({type:'error', msg:'Please fix the errors below and try again.'});
                }}>Validation errors</button>
                <button type="button" className="demo-chip" onClick={()=>{setAddrErrors({}); fireToast({type:'success', msg:'Address details saved successfully.'});}}>Success toast</button>
              </div>
              <button className="btn btn-ghost" onClick={goPrevTab}>← Back</button>
              <button className="btn btn-primary" onClick={goNextTab}>Continue {Icon.arrowRight}</button>
            </div>
          </>
        )}

        {tab === 'Social Details' && (
          <>
            <div className="form-grid">
              {/* WEBSITE — full width, optional */}
              <div className="field full">
                <label>Website URL</label>
                <div className="field-input-wrap">
                  <input
                    value={website}
                    onChange={e=>setWebsite(e.target.value)}
                    placeholder="Enter Your Website URL"
                  />
                  <button
                    type="button"
                    className={"field-eye " + (websitePublic?'on':'off')}
                    onClick={()=>setWebsitePublic(!websitePublic)}
                    data-tooltip={websitePublic ? 'Hide in public profile' : 'Show in public profile'}
                    aria-label={websitePublic ? 'Hide in public profile' : 'Show in public profile'}
                  >
                    {websitePublic ? Icon.eye : Icon.eyeOff}
                  </button>
                </div>
              </div>

              {/* PHONE — required */}
              <div className={"field" + (socialErrors.phone?' has-error':'')}>
                <label>Phone <span className="req">*</span></label>
                <div className="field-input-wrap">
                  <input
                    type="tel"
                    value={phone}
                    onChange={e=>{setPhone(e.target.value); if(socialErrors.phone) setSocialErrors({...socialErrors, phone: undefined});}}
                    placeholder="Enter Phone Number"
                  />
                  <button
                    type="button"
                    className={"field-eye " + (phonePublic?'on':'off')}
                    onClick={()=>setPhonePublic(!phonePublic)}
                    data-tooltip={phonePublic ? 'Hide in public profile' : 'Show in public profile'}
                    aria-label={phonePublic ? 'Hide in public profile' : 'Show in public profile'}
                  >
                    {phonePublic ? Icon.eye : Icon.eyeOff}
                  </button>
                </div>
                {socialErrors.phone && <div className="field-error">{socialErrors.phone}</div>}
              </div>

              {/* EMAIL — required, synced from Orivet but editable for display */}
              <div className={"field" + (socialErrors.email?' has-error':'')}>
                <label>
                  Email <span className="req">*</span>
                  <span className="lock-note"> · from Orivet</span>
                </label>
                <div className="field-input-wrap">
                  <input
                    type="email"
                    value={socialEmail}
                    onChange={e=>{setSocialEmail(e.target.value); if(socialErrors.email) setSocialErrors({...socialErrors, email: undefined});}}
                    placeholder="Enter Email Address"
                  />
                  <button
                    type="button"
                    className={"field-eye " + (emailPublic?'on':'off')}
                    onClick={()=>setEmailPublic(!emailPublic)}
                    data-tooltip={emailPublic ? 'Hide in public profile' : 'Show in public profile'}
                    aria-label={emailPublic ? 'Hide in public profile' : 'Show in public profile'}
                  >
                    {emailPublic ? Icon.eye : Icon.eyeOff}
                  </button>
                </div>
                <div className="field-hint">Editing this only changes your public display email — your Orivet login email stays the same.</div>
                {socialErrors.email && <div className="field-error">{socialErrors.email}</div>}
              </div>

              {/* FACEBOOK — optional */}
              <div className="field">
                <label>Facebook</label>
                <div className="field-input-wrap">
                  <input
                    value={facebook}
                    onChange={e=>setFacebook(e.target.value)}
                    placeholder="Enter Facebook URL"
                  />
                  <button
                    type="button"
                    className={"field-eye " + (facebookPublic?'on':'off')}
                    onClick={()=>setFacebookPublic(!facebookPublic)}
                    data-tooltip={facebookPublic ? 'Hide in public profile' : 'Show in public profile'}
                    aria-label={facebookPublic ? 'Hide in public profile' : 'Show in public profile'}
                  >
                    {facebookPublic ? Icon.eye : Icon.eyeOff}
                  </button>
                </div>
              </div>

              {/* INSTAGRAM — optional */}
              <div className="field">
                <label>Instagram</label>
                <div className="field-input-wrap">
                  <input
                    value={instagram}
                    onChange={e=>setInstagram(e.target.value)}
                    placeholder="Enter Instagram URL"
                  />
                  <button
                    type="button"
                    className={"field-eye " + (instagramPublic?'on':'off')}
                    onClick={()=>setInstagramPublic(!instagramPublic)}
                    data-tooltip={instagramPublic ? 'Hide in public profile' : 'Show in public profile'}
                    aria-label={instagramPublic ? 'Hide in public profile' : 'Show in public profile'}
                  >
                    {instagramPublic ? Icon.eye : Icon.eyeOff}
                  </button>
                </div>
              </div>
            </div>
            <div className="form-actions">
              <div className="demo-row">
                <span className="demo-label">Preview state:</span>
                <button type="button" className="demo-chip" onClick={()=>{
                  setPhone(''); setSocialEmail('');
                  setSocialErrors({
                    phone:'Phone is required.',
                    email:'Email is required.',
                  });
                  fireToast({type:'error', msg:'Please fix the errors below and try again.'});
                }}>Validation errors</button>
                <button type="button" className="demo-chip" onClick={()=>{setSocialErrors({}); fireToast({type:'success', msg:'Social details saved successfully.'});}}>Success toast</button>
              </div>
              <button className="btn btn-ghost" onClick={goPrevTab}>← Back</button>
              <button className="btn btn-primary" onClick={goNextTab}>Continue {Icon.arrowRight}</button>
            </div>
          </>
        )}

        {tab === 'Opt-in an Animal' && (
          <>
            {/* Step A: pick which animal to opt in */}
            {!selectedAnimal && (
              <>
                <div className="ob-tip">
                  <span className="ob-tip-step">Step 1 of 2</span>
                  <h3>Pick the animal you want to feature first</h3>
                  <p>You only need to opt in <strong>one animal</strong> to publish your profile. You can add more later from your dashboard. Tap a card below to select.</p>
                </div>
                <div className="animal-picker">
                  {animals.map(a => (
                    <button
                      type="button"
                      key={a.id}
                      className="animal-pick-card"
                      onClick={()=>setSelectedAnimalId(a.id)}
                    >
                      <div className="ap-avatar">{a.pet.slice(0,1)}</div>
                      <div className="ap-body">
                        <div className="ap-name">{a.pet}</div>
                        <div className="ap-meta">{a.breed} · {a.gender}</div>
                      </div>
                      <span className="ap-arrow">{Icon.arrowRight}</span>
                    </button>
                  ))}
                </div>
                <div className="form-actions onboarding-finish">
                  <button className="btn btn-ghost" onClick={goPrevTab}>← Back</button>
                  <div className="onboarding-finish-text">
                    Don't see an animal? You can <a href="#" onClick={e=>e.preventDefault()}>add one in Orivet</a> — it'll appear here automatically.
                  </div>
                  <button className="btn btn-primary" disabled>
                    Pick an animal to continue
                  </button>
                </div>
              </>
            )}

            {/* Step B: opt in reports for the selected animal */}
            {selectedAnimal && (
              <>
                <div className="ob-tip">
                  <div className="ob-tip-row">
                    <div>
                      <span className="ob-tip-step">Step 2 of 2</span>
                      <h3>Choose which results to publish for {selectedAnimal.pet}</h3>
                      <p>Tap the eye next to a result to publish it on your profile. Pick one, several, or all.</p>
                    </div>
                    <button type="button" className="btn btn-ghost btn-sm" onClick={changeAnimal}>Change animal</button>
                  </div>
                </div>

                <div className="animal-summary">
                  <div className="ap-avatar lg">{selectedAnimal.pet.slice(0,1)}</div>
                  <div className="animal-summary-body">
                    <div className="animal-summary-name">{selectedAnimal.pet}</div>
                    <div className="animal-summary-grid">
                      <div><span className="lbl">Breed</span><span className="val">{selectedAnimal.breed}</span></div>
                      <div><span className="lbl">Species</span><span className="val">{selectedAnimal.species}</span></div>
                      <div><span className="lbl">Registration #</span><span className="val">{selectedAnimal.regNum}</span></div>
                      <div><span className="lbl">Chip #</span><span className="val">{selectedAnimal.chip}</span></div>
                      <div><span className="lbl">Gender</span><span className="val">{selectedAnimal.gender}</span></div>
                    </div>
                  </div>
                  <div className="animal-summary-tag">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    Synced from Orivet · read-only
                  </div>
                </div>

                <div className="reports-section">
                  <div className="reports-section-head">
                    <div>
                      <h4>Available Results</h4>
                      <p className="reports-sample">{animalReports.sample.profile} <span className="dot">·</span> Barcode {animalReports.sample.barcode}</p>
                    </div>
                    <div className="reports-actions">
                      <span className="reports-count">{totalOpted} of {allReports.length} visible</span>
                      <button type="button" className="btn btn-ghost btn-sm" onClick={optInAll}>Show all</button>
                      <button type="button" className="btn btn-ghost btn-sm" onClick={optOutAll} disabled={totalOpted===0}>Hide all</button>
                    </div>
                  </div>

                  <ReportGroup
                    title="Traits"
                    helper="Coat colour, length, furnishings and other physical traits."
                    items={animalReports.traits}
                    emptyText="No traits results available for this animal yet."
                    reportPublic={reportPublic}
                    onTogglePublic={toggleReportPublic}
                  />

                  <ReportGroup
                    title="Diseases"
                    helper="Hereditary disease screens. Showing these builds trust with clients."
                    items={animalReports.diseases}
                    emptyText="No disease results available for this animal yet."
                    reportPublic={reportPublic}
                    onTogglePublic={toggleReportPublic}
                  />
                </div>

                <div className="form-actions onboarding-finish">
                  <button className="btn btn-ghost" onClick={goPrevTab}>← Back</button>
                  <div className="onboarding-finish-text">
                    {totalOpted === 0 ? (
                      <><strong>Tip:</strong> Tap the eye on at least one result to make it public, or finish without any to keep the animal listed with no results shown.</>
                    ) : (
                      <><strong>{totalOpted} result{totalOpted===1?'':'s'} will be visible.</strong> You can change any of this later.</>
                    )}
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={()=>{
                      fireToast({type:'success', msg:`Profile published! ${selectedAnimal.pet} is now on Paw Print.`});
                      setOnboardingComplete && setOnboardingComplete(true);
                      setTimeout(()=>onNav && onNav('myprofile'), 1400);
                    }}
                  >
                    Finish & Publish {Icon.arrowRight}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ─────── 4. SEARCH ─────── */
const BREEDS = [
  'Australian Shepherd','Dachshund Short Hair','French Bulldog','Labrador Retriever',
  'Border Collie','Bulldog','Cavoodle','Golden Retriever',
  'German Shepherd','Beagle','Poodle','Bernese Mountain Dog',
  'Water Spaniel','Shar Pei','Shih Tzu','Pug',
  'Labradoodle','Old English Mastiff','Irish Setter','Greyhound',
  'Border Terrier','Australian Cattle Dog',
  'British Shorthair','Maine Coon','Ragdoll','Bengal',
];

const BREED_SPECIES = {
  'British Shorthair':'Feline','Maine Coon':'Feline','Ragdoll':'Feline','Bengal':'Feline',
};
function speciesOf(breed) { return BREED_SPECIES[breed] || 'Canine'; }

/* Mock breeder index — searchable across name, breed, country, species */
const SEARCH_BREEDERS = [
  {name:'Highridge Breeders',     breed:'Australian Shepherd',    country:'Australia',      loc:'Yarra Valley, VIC',         initials:'HB'},
  {name:'Saltline Aussies',       breed:'Australian Shepherd',    country:'Australia',      loc:'Byron Bay, NSW',            initials:'SA'},
  {name:'Coopers Run',            breed:'Border Collie',          country:'Australia',      loc:'Bendigo, VIC',              initials:'CR'},
  {name:'Westwind Pastoral',      breed:'Border Collie',          country:'Australia',      loc:'Adelaide Hills, SA',        initials:'WP'},
  {name:'Bluegum Shepherds',      breed:'German Shepherd',        country:'Australia',      loc:'Hobart, TAS',               initials:'BS'},
  {name:'Stonebrook Dogs',        breed:'Golden Retriever',       country:'Australia',      loc:'Toowoomba, QLD',            initials:'SD'},
  {name:'Tablelands Stud',        breed:'Labrador Retriever',     country:'Australia',      loc:'Atherton, QLD',             initials:'TS'},
  {name:'Macleod & Co.',          breed:'Cavoodle',               country:'Australia',      loc:'Perth Hills, WA',           initials:'MC'},
  {name:'Driftwood Farm',         breed:'French Bulldog',         country:'Australia',      loc:'Margaret River, WA',        initials:'DF'},
  {name:'Foxglen Dachshunds',     breed:'Dachshund Short Hair',   country:'Australia',      loc:'Geelong, VIC',              initials:'FD'},
  {name:'Pacifica Poodles',       breed:'Poodle',                 country:'New Zealand',    loc:'Auckland',                  initials:'PP'},
  {name:'Highcountry Beagles',    breed:'Beagle',                 country:'New Zealand',    loc:'Queenstown',                initials:'HC'},
  {name:'Mountainview Berners',   breed:'Bernese Mountain Dog',   country:'United States',  loc:'Boulder, CO',               initials:'MV'},
  {name:'Brooklyn Bulldogs',      breed:'Bulldog',                country:'United States',  loc:'Brooklyn, NY',              initials:'BB'},
  {name:'Cotswold Frenchies',     breed:'French Bulldog',         country:'United Kingdom', loc:'Cotswolds',                 initials:'CF'},
  {name:'Whisker Hollow',         breed:'British Shorthair',      country:'United Kingdom', loc:'Yorkshire',                 initials:'WH'},
  {name:'Coastal Coons',          breed:'Maine Coon',              country:'Australia',      loc:'Sunshine Coast, QLD',       initials:'CC'},
  {name:'Velvet Ragdolls',        breed:'Ragdoll',                 country:'Australia',      loc:'Melbourne, VIC',            initials:'VR'},
  {name:'Rivermouth Spaniels',    breed:'Water Spaniel',           country:'Australia',      loc:'Coffs Harbour, NSW',        initials:'RS'},
  {name:'Wrinkle Ridge',          breed:'Shar Pei',                country:'Australia',      loc:'Newcastle, NSW',            initials:'WR'},
  {name:'Toorak Shih Tzus',       breed:'Shih Tzu',                country:'Australia',      loc:'Toorak, VIC',               initials:'TS'},
  {name:'Snubnose Pugs',          breed:'Pug',                     country:'United Kingdom', loc:'Brighton',                  initials:'SP'},
  {name:'Sunny Doodles',          breed:'Labradoodle',             country:'Australia',      loc:'Gold Coast, QLD',           initials:'SD'},
  {name:'Highmoor Mastiffs',      breed:'Old English Mastiff',     country:'United Kingdom', loc:'Devon',                     initials:'HM'},
  {name:'Emerald Setters',        breed:'Irish Setter',            country:'Ireland',        loc:'Galway',                    initials:'ES'},
  {name:'Sprint Hounds',          breed:'Greyhound',               country:'Australia',      loc:'Geelong, VIC',              initials:'SH'},
  {name:'Tweed Terriers',         breed:'Border Terrier',          country:'United Kingdom', loc:'Northumberland',            initials:'TT'},
  {name:'Outback Heelers',        breed:'Australian Cattle Dog',   country:'Australia',      loc:'Alice Springs, NT',         initials:'OH'},
];

function resolveAsset(key, fallback) {
  if (typeof window !== 'undefined' && window.__resources && window.__resources[key]) {
    return window.__resources[key];
  }
  return fallback;
}

const BREED_IMAGES = {
  'Australian Shepherd':   resolveAsset('breedAustralianShepherd', 'assets/breeds/australian-shepherd.png'),
  'Dachshund Short Hair':  resolveAsset('breedDachshundShortHair', 'assets/breeds/dachshund-short-hair.png'),
  'Bulldog':               resolveAsset('breedBulldog',            'assets/breeds/bulldog.png'),
  'Poodle':                resolveAsset('breedPoodle',             'assets/breeds/poodle.png'),
  'Water Spaniel':         resolveAsset('breedWaterSpaniel',       'assets/breeds/water-spaniel.png'),
  'Shar Pei':              resolveAsset('breedSharPei',            'assets/breeds/shar-pei.png'),
  'Shih Tzu':              resolveAsset('breedShihTzu',            'assets/breeds/shih-tzu.png'),
  'Pug':                   resolveAsset('breedPug',                'assets/breeds/pug.png'),
  'Labradoodle':           resolveAsset('breedLabradoodle',        'assets/breeds/labradoodle.png'),
  'Old English Mastiff':   resolveAsset('breedOldEnglishMastiff',  'assets/breeds/old-english-mastiff.png'),
  'Irish Setter':          resolveAsset('breedIrishSetter',        'assets/breeds/irish-setter.png'),
  'Greyhound':             resolveAsset('breedGreyhound',          'assets/breeds/greyhound.png'),
  'Border Terrier':        resolveAsset('breedBorderTerrier',      'assets/breeds/border-terrier.png'),
  'Australian Cattle Dog': resolveAsset('breedAustralianCattleDog','assets/breeds/australian-cattle-dog.png'),
  'French Bulldog':        resolveAsset('breedFrenchBulldog',      'assets/breeds/french-bulldog.png'),
  'Labrador Retriever':    resolveAsset('breedLabradorRetriever',  'assets/breeds/labrador-retriever.png'),
  'Border Collie':         resolveAsset('breedBorderCollie',       'assets/breeds/border-collie.png'),
  'German Shepherd':       resolveAsset('breedGermanShepherd',     'assets/breeds/german-shepherd.png'),
  'Bernese Mountain Dog':  resolveAsset('breedBerneseMountainDog', 'assets/breeds/bernese-mountain-dog.png'),
};

function SearchPage({ onNav, isLoggedIn, setLoggedIn }) {
  const [mode, setMode] = useState('Search by Breed');
  const [species, setSpecies] = useState('Any');
  const [country, setCountry] = useState('Any');
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  // Country options derived from data so filters never miss
  const availableCountries = Array.from(new Set(SEARCH_BREEDERS.map(b => b.country))).sort();

  // Apply species + country to breeder pool (used for both modes)
  const filteredBreeders = SEARCH_BREEDERS.filter(b => {
    if (species !== 'Any' && speciesOf(b.breed) !== species) return false;
    if (country !== 'Any' && b.country !== country) return false;
    return true;
  });

  // Breed list filtered by query + species (country implicitly via breeders that exist)
  const breedsInScope = Array.from(new Set(filteredBreeders.map(b => b.breed)));
  const filteredBreeds = BREEDS.filter(b => {
    if (!breedsInScope.includes(b)) return false;
    if (q && !b.toLowerCase().includes(q)) return false;
    return true;
  });

  // Breeder mode: filter by name OR breed match
  const breederResults = mode === 'Search by Breeder'
    ? filteredBreeders.filter(b => {
        if (!q) return true;
        return b.name.toLowerCase().includes(q) || b.breed.toLowerCase().includes(q);
      })
    : [];

  // Breeder count per breed in current scope
  const breederCountByBreed = filteredBreeders.reduce((acc, b) => {
    acc[b.breed] = (acc[b.breed] || 0) + 1;
    return acc;
  }, {});

  const hasFilters = species !== 'Any' || country !== 'Any' || q.length > 0;

  return (
    <div>
      <TopNav onNav={onNav} active="search" isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
      <div className="page">
        <div className="search-hero">
          <h2>Search for Responsible Breeders</h2>
          <div className="search-mode">
            {['Search by Breed','Search by Breeder'].map(m=>(
              <button key={m} className={mode===m?'active':''} onClick={()=>{setMode(m); setQuery('');}}>{m}</button>
            ))}
          </div>
          <div className="search-input">
            <Dropdown
              ariaLabel="Species"
              value={species}
              onChange={setSpecies}
              className="dd-species"
              options={[
                { value:'Any', label:'Any species' },
                { value:'Canine', label:'Canine' },
                { value:'Feline', label:'Feline' },
              ]}
            />
            <Dropdown
              ariaLabel="Country"
              value={country}
              onChange={setCountry}
              className="dd-country"
              options={[
                { value:'Any', label:'Any country' },
                ...availableCountries.map(c => ({ value: c, label: c })),
              ]}
            />
            <input
              placeholder={mode === 'Search by Breed' ? 'Search a breed…' : 'Search a breeder or breed…'}
              value={query}
              onChange={e=>setQuery(e.target.value)}
            />
            <button className="go" onClick={()=>setQuery(query)} aria-label="Search">{Icon.search}</button>
          </div>
          {hasFilters && (
            <div className="search-summary">
              <span>{mode === 'Search by Breed' ? `${filteredBreeds.length} breeds` : `${breederResults.length} breeders`} match your filters</span>
              <button type="button" className="link-btn" onClick={()=>{setSpecies('Any'); setCountry('Any'); setQuery('');}}>Clear all</button>
            </div>
          )}
        </div>

        {mode === 'Search by Breed' && !hasFilters && (
          <>
            <div className="section-title">
              <h3>Popular Breeds</h3>
              <a href="#">See all →</a>
            </div>
            <div className="breed-grid">
              {BREEDS.slice(0,4).map(b=>(
                <div className="breed-card" key={b} onClick={()=>onNav('breed')}>
                  <div
                    className={"img" + (BREED_IMAGES[b] ? ' has-image' : '')}
                    data-label={b}
                    style={BREED_IMAGES[b] ? {backgroundImage: `url(${BREED_IMAGES[b]})`} : null}
                  ></div>
                  <h4>{b}</h4>
                  <div className="meta">
                    <span>{breederCountByBreed[b] || 0} breeders</span>
                    <span>{speciesOf(b) === 'Feline' ? 'CAT' : 'DOG'}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {mode === 'Search by Breed' && (
          <>
            <div className="section-title">
              <h3>{hasFilters ? 'Matching Breeds' : 'All Breeds'}</h3>
              <span className="result-count">{filteredBreeds.length} result{filteredBreeds.length===1?'':'s'}</span>
            </div>
            {filteredBreeds.length === 0 ? (
              <div className="empty-state">
                <h4>No breeds match those filters</h4>
                <p>Try clearing your search or switching country/species.</p>
              </div>
            ) : (
              <div className="breed-grid">
                {filteredBreeds.map(b=>(
                  <div className="breed-card" key={b+'-r'} onClick={()=>onNav('breed')}>
                    <div
                      className={"img" + (BREED_IMAGES[b] ? ' has-image' : '')}
                      data-label={b}
                      style={BREED_IMAGES[b] ? {backgroundImage: `url(${BREED_IMAGES[b]})`} : null}
                    ></div>
                    <h4>{b}</h4>
                    <div className="meta">
                      <span>{breederCountByBreed[b] || 0} breeders</span>
                      <span>{speciesOf(b) === 'Feline' ? 'CAT' : 'DOG'}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {mode === 'Search by Breeder' && (
          <>
            <div className="section-title">
              <h3>Breeders</h3>
              <span className="result-count">{breederResults.length} result{breederResults.length===1?'':'s'}</span>
            </div>
            {breederResults.length === 0 ? (
              <div className="empty-state">
                <h4>No breeders match those filters</h4>
                <p>Try a different name, or clear the country/species filter.</p>
              </div>
            ) : (
              <div className="breeder-grid">
                {breederResults.map(b=>(
                  <div className="breeder-card" key={b.name} onClick={()=>onNav('profile')}>
                    <div className="img"></div>
                    <div className="top">
                      <div className="av">{b.initials}</div>
                      <div>
                        <div className="name">{b.name}</div>
                        <div className="loc">{b.breed} · {b.loc} · {b.country}</div>
                      </div>
                    </div>
                    <div className="badges">
                      <span className="badge-soft is-positive">Verified</span>
                      <span className="badge-soft">DNA tested</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <footer className="foot">
        <div className="page">
          <div className="row">
            <div>© 2026 Paw Print Pedigrees — an Orivet service</div>
            <div>Privacy · Terms · Contact</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─────── 5. BREED PAGE ─────── */
const BREEDERS = [
  {name:'Highridge Breeders', loc:'Yarra Valley, VIC', initials:'HB'},
  {name:'Saltline Aussies', loc:'Byron Bay, NSW', initials:'SA'},
  {name:'Coopers Run', loc:'Bendigo, VIC', initials:'CR'},
  {name:'Westwind Pastoral', loc:'Adelaide Hills, SA', initials:'WP'},
  {name:'Bluegum Shepherds', loc:'Hobart, TAS', initials:'BS'},
  {name:'Stonebrook Dogs', loc:'Toowoomba, QLD', initials:'SD'},
  {name:'Marrabel Working', loc:'Clare Valley, SA', initials:'MW'},
  {name:'Tablelands Stud', loc:'Atherton, QLD', initials:'TS'},
  {name:'Macleod & Co.', loc:'Perth Hills, WA', initials:'MC'},
  {name:'Karri Forest Aussies', loc:'Pemberton, WA', initials:'KA'},
  {name:'Mossvale Breeders', loc:'Southern Highlands, NSW', initials:'MB'},
  {name:'Driftwood Farm', loc:'Margaret River, WA', initials:'DF'},
];

function BreedPage({ onNav, isLoggedIn, setLoggedIn }) {
  return (
    <div>
      <TopNav onNav={onNav} active="search" isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
      <div className="page">
        <div className="crumb"><a href="#" onClick={e=>{e.preventDefault(); onNav('search');}}>← Back to search</a></div>
        <div className="breed-hero">
          <div>
            <h1>Australian Shepherd</h1>
            <p className="lede">A workman's herder with a discerning gaze. Intelligent, athletic and devoted — they thrive with purpose and structure.</p>
          </div>
        </div>

        <div className="breeder-grid">
          {BREEDERS.map(b=>(
            <div className="breeder-card" key={b.name} onClick={()=>onNav('profile')}>
              <div className="img"></div>
              <div className="top">
                <div className="av">{b.initials}</div>
                <div>
                  <div className="name">{b.name}</div>
                  <div className="loc">{b.loc}</div>
                </div>
              </div>
              <div className="badges">
                <span className="badge-soft is-positive">Verified</span>
                <span className="badge-soft">DNA tested</span>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button>‹</button>
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>›</button>
        </div>
      </div>

      <footer className="foot">
        <div className="page">
          <div className="row">
            <div>© 2026 Paw Print Pedigrees — an Orivet service</div>
            <div>Privacy · Terms · Contact</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─────── 6. BREEDER PROFILE (public view) ─────── */
/* Mirrors the data structure that My Profile produces; values shown here
   correspond to the defaults set in onboarding + My Profile state. */
const BREEDER_PROFILE = {
  firstName: 'Gayan',
  lastName: 'Jayanath',
  initials: 'GJ',
  memberSince: 2019,
  about: 'Family-run breeder in regional Victoria specialising in working-line Australian Shepherds. Every litter is genetically screened and raised in-home.',
  breeds: ['Australian Shepherd', 'Border Collie'],
  // Address — always-public fields
  country: 'Australia',
  state: 'Victoria',
  // Social/contact — only fields the user opted to publish
  contact: {
    website: 'https://highridge.example.com',
    instagram: '@highridge.aussies',
    email: 'gayan@pawprint.com.au',
    phone: '+61 412 345 678',
    facebook: null,
  },
};

/* Public animals — mirror the first 3 animals in onboarding state with
   their published reports. */
const PUBLIC_ANIMALS = [
  {
    id: 1,
    pet: 'Buddy',
    breed: 'Golden Retriever',
    species: 'Canine',
    gender: 'Male',
    regName: 'Buddy of Stonebridge',
    regNum: 'ANKC-2391-22',
    chip: '956000003434511',
    publicResults: {
      traits: [
        { name: 'Coat Length', result: 'LONG (l/l)' },
      ],
      diseases: [
        { name: 'Degenerative Myelopathy', result: 'NORMAL (N/N)' },
        { name: 'Progressive Rod Cone Degeneration (prcd) - PRA', result: 'NORMAL (N/N)' },
      ],
    },
  },
  {
    id: 2,
    pet: 'Skye',
    breed: 'Australian Shepherd',
    species: 'Canine',
    gender: 'Female',
    regName: 'Stonebridge Skye Blue',
    regNum: 'ANKC-2412-22',
    chip: '956000003434820',
    publicResults: {
      traits: [
        { name: 'Coat Length', result: 'SHORT (L/L)' },
      ],
      diseases: [
        { name: 'Degenerative Myelopathy', result: 'NORMAL (N/N)' },
      ],
    },
  },
  {
    id: 3,
    pet: 'Maple',
    breed: 'French Bulldog',
    species: 'Canine',
    gender: 'Female',
    regName: 'Maple Joy of Toorak',
    regNum: 'ANKC-2502-23',
    chip: '956000003502211',
    publicResults: {
      traits: [
        { name: 'Coat Length', result: 'SHORT (L/L)' },
        { name: 'Coat Colour - Brown', result: 'BROWN (b/b)' },
      ],
      diseases: [],
    },
  },
];

function ResultRow({ r }) {
  return (
    <li className="bp-result-row">
      <span className="bp-result-name">{r.name}</span>
      <span className="bp-result-pill">{r.result}</span>
    </li>
  );
}

function BreederProfile({ onNav, isLoggedIn, setLoggedIn }) {
  const p = BREEDER_PROFILE;
  const [animalQuery, setAnimalQuery] = useState('');
  const [breedFilter, setBreedFilter] = useState('All breeds');
  const q = animalQuery.trim().toLowerCase();
  const breedsPresent = Array.from(new Set(PUBLIC_ANIMALS.map(a => a.breed)));
  const filteredAnimals = PUBLIC_ANIMALS.filter(a => {
    if (breedFilter !== 'All breeds' && a.breed !== breedFilter) return false;
    if (!q) return true;
    return (a.pet + ' ' + a.breed + ' ' + a.regName + ' ' + a.regNum).toLowerCase().includes(q);
  });
  const totalResults = PUBLIC_ANIMALS.reduce((n, a) => n + a.publicResults.traits.length + a.publicResults.diseases.length, 0);
  const years = new Date().getFullYear() - p.memberSince;

  return (
    <div>
      <TopNav onNav={onNav} active="search" isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
      <div className="page bp-page">
        <div className="crumb"><a href="#" onClick={e=>{e.preventDefault(); onNav('search');}}>← Back to search</a></div>

        {/* Hero */}
        <div className="bp-hero">
          <div className="bp-hero-cover"></div>
          <div className="bp-hero-body">
            <div className="bp-avatar">{p.initials}</div>
            <div className="bp-id">
              <div className="bp-name-row">
                <h1>{p.firstName} {p.lastName}</h1>
                <span className="bp-verified" title="Verified Orivet Breeder">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.39 4.84L20 8l-4 3.9.94 5.48L12 14.77 7.06 17.38 8 11.9 4 8l5.61-1.16z"/></svg>
                  Verified
                </span>
              </div>
              <div className="bp-tags">
                {p.breeds.map(b => (
                  <span key={b} className="bp-breed-chip">{b}</span>
                ))}
              </div>
              <div className="bp-loc">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {p.state}, {p.country}
                <span className="dot">·</span>
                <span>Member since {p.memberSince} · {years} year{years===1?'':'s'}</span>
              </div>
            </div>
            <div className="bp-hero-cta">
              <div className="bp-contact-row">
                {p.contact.website && (
                  <a href={p.contact.website} target="_blank" rel="noreferrer" className="bp-contact-pill" aria-label="Website">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20"/></svg>
                  </a>
                )}
                {p.contact.instagram && (
                  <a href="#" className="bp-contact-pill" aria-label="Instagram" title={p.contact.instagram}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
                  </a>
                )}
                {p.contact.facebook && (
                  <a href="#" className="bp-contact-pill" aria-label="Facebook">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                )}
                {p.contact.email && (
                  <a href={`mailto:${p.contact.email}`} className="btn btn-ghost btn-sm">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    Email
                  </a>
                )}
              </div>
              {p.contact.phone && (
                <a className="btn btn-primary" href={`tel:${p.contact.phone.replace(/\s/g,'')}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  {p.contact.phone}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="bp-stats">
          <div className="bp-stat"><div className="num">{PUBLIC_ANIMALS.length}</div><div className="label">Animals listed</div></div>
          <div className="bp-stat"><div className="num">{p.breeds.length}</div><div className="label">Breeds</div></div>
          <div className="bp-stat"><div className="num">{totalResults}</div><div className="label">Public DNA results</div></div>
          <div className="bp-stat"><div className="num">{years}</div><div className="label">Years on Orivet</div></div>
        </div>

        {/* About */}
        <div className="bp-section">
          <div className="bp-section-head">
            <h3>About</h3>
          </div>
          <p className="bp-about">{p.about}</p>
        </div>

        {/* Public animals */}
        <div className="bp-section">
          <div className="bp-section-head">
            <h3>Our animals</h3>
            <span className="result-count">{filteredAnimals.length} of {PUBLIC_ANIMALS.length}</span>
          </div>
          <div className="bp-animals-toolbar">
            <div className="mp-animals-search">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>
              <input placeholder="Search this breeder's animals" value={animalQuery} onChange={e=>setAnimalQuery(e.target.value)} />
              {animalQuery && <button type="button" className="clear-x" onClick={()=>setAnimalQuery('')} aria-label="Clear">{Icon.x}</button>}
            </div>
            <div className="mp-animals-filters">
              {['All breeds', ...breedsPresent].map(b => (
                <button key={b} type="button" className={"mp-pill" + (breedFilter===b?' active':'')} onClick={()=>setBreedFilter(b)}>
                  {b}
                </button>
              ))}
            </div>
          </div>

          {filteredAnimals.length === 0 ? (
            <div className="empty-state">
              <h4>No animals match your filters</h4>
              <p>Try a different breed or clear the search.</p>
            </div>
          ) : (
            <div className="bp-animal-grid">
              {filteredAnimals.map(a => {
                const resultCount = a.publicResults.traits.length + a.publicResults.diseases.length;
                return (
                <article key={a.id} className="bp-animal-card">
                  <div className="bp-animal-img" style={BREED_IMAGES[a.breed] ? {backgroundImage: `url(${BREED_IMAGES[a.breed]})`} : null}>
                    {!BREED_IMAGES[a.breed] && <span className="bp-animal-placeholder">{a.pet.slice(0,1)}</span>}
                  </div>
                  <div className="bp-animal-body">
                    <div className="bp-animal-head">
                      <h4>{a.pet}</h4>
                      <span className="bp-animal-gender">{a.gender}</span>
                    </div>
                    <div className="bp-animal-breed">{a.breed}</div>
                    <dl className="bp-animal-facts">
                      <div><dt>Reg. name</dt><dd>{a.regName}</dd></div>
                      <div><dt>Reg. #</dt><dd>{a.regNum}</dd></div>
                      <div><dt>Chip #</dt><dd>{a.chip}</dd></div>
                    </dl>
                    <div className="bp-animal-foot">
                      <span className="bp-results-tally">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        {resultCount > 0 ? `${resultCount} public result${resultCount===1?'':'s'}` : 'No public results'}
                      </span>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={()=>onNav('animal', { animal: a })}
                      >
                        View Animal {Icon.arrowRight}
                      </button>
                    </div>
                  </div>
                </article>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <footer className="foot">
        <div className="page">
          <div className="row">
            <div>© 2026 Paw Print Pedigrees — an Orivet service</div>
            <div>Privacy · Terms · Contact</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─────── ANIMAL PROFILE (full page) ─────── */
function AnimalPage({ onNav, isLoggedIn, setLoggedIn, selectedAnimal }) {
  const p = BREEDER_PROFILE;
  const [viewReport, setViewReport] = useState(null);
  const animal = selectedAnimal || PUBLIC_ANIMALS[0];
  if (!animal) {
    return (
      <div>
        <TopNav onNav={onNav} active="search" isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
        <div className="page">
          <div className="empty-state">
            <h4>No animal selected</h4>
            <p>Pick an animal from a breeder profile to view it.</p>
            <button className="btn btn-primary" onClick={()=>onNav('search')} style={{marginTop:14}}>Browse breeders</button>
          </div>
        </div>
      </div>
    );
  }
  const allReports = [
    ...animal.publicResults.traits.map(r => ({ group: 'Traits', result: r })),
    ...animal.publicResults.diseases.map(r => ({ group: 'Disease Screens', result: r })),
  ];
  return (
    <div>
      <TopNav onNav={onNav} active="search" isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
      <div className="page ap-page">
        <div className="crumb"><a href="#" onClick={e=>{e.preventDefault(); onNav('profile');}}>← Back to {p.firstName} {p.lastName}</a></div>

        <div className="ap-hero">
          <div className="ap-hero-photo" style={BREED_IMAGES[animal.breed] ? {backgroundImage: `url(${BREED_IMAGES[animal.breed]})`} : null}>
            {!BREED_IMAGES[animal.breed] && <div className="am-hero-placeholder">{animal.pet.slice(0,1)}</div>}
          </div>
          <div className="ap-hero-body">
            <div className="ap-hero-name">
              <h1>{animal.pet}</h1>
              <span className="bp-animal-gender">{animal.gender}</span>
            </div>
            <div className="ap-hero-breed">{animal.breed} · {animal.species}</div>
            <div className="ap-hero-bred-by">
              <div className="ap-bred-mark">{p.initials}</div>
              <div>
                <div className="ap-bred-line">Bred by <strong>{p.firstName} {p.lastName}</strong></div>
                <div className="ap-bred-loc">{p.state}, {p.country}</div>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={()=>onNav('profile')}>View breeder profile</button>
            </div>
          </div>
        </div>

        <div className="bp-stats ap-stats">
          <div className="bp-stat"><div className="num">{allReports.length}</div><div className="label">Public results</div></div>
          <div className="bp-stat"><div className="num">{animal.publicResults.traits.length}</div><div className="label">Traits</div></div>
          <div className="bp-stat"><div className="num">{animal.publicResults.diseases.length}</div><div className="label">Disease screens</div></div>
          <div className="bp-stat"><div className="num">Orivet</div><div className="label">Verified by</div></div>
        </div>

        <div className="bp-section">
          <div className="bp-section-head"><h3>Registration details</h3></div>
          <dl className="ap-facts">
            <div><dt>Registered name</dt><dd>{animal.regName}</dd></div>
            <div><dt>Registration #</dt><dd>{animal.regNum}</dd></div>
            <div><dt>Chip #</dt><dd>{animal.chip}</dd></div>
            <div><dt>Species</dt><dd>{animal.species}</dd></div>
            <div><dt>Gender</dt><dd>{animal.gender}</dd></div>
            <div><dt>Breed</dt><dd>{animal.breed}</dd></div>
          </dl>
        </div>

        <div className="bp-section">
          <div className="bp-section-head">
            <h3>Public reports</h3>
            <span className="result-count">{allReports.length} available · click a report to view & download</span>
          </div>
          {allReports.length === 0 ? (
            <div className="empty-state">
              <h4>No public reports yet</h4>
              <p>{p.firstName} hasn't published any DNA results for {animal.pet}.</p>
            </div>
          ) : (
            <div className="ap-reports">
              {['Traits', 'Disease Screens'].map(group => {
                const items = allReports.filter(r => r.group === group);
                if (items.length === 0) return null;
                return (
                  <div key={group} className="ap-reports-group">
                    <h4 className="ap-reports-title">{group}</h4>
                    <ul className="ap-reports-list">
                      {items.map((r, i) => (
                        <li key={group + i}>
                          <button
                            type="button"
                            className="ap-report-card"
                            onClick={()=>setViewReport({ group, result: r.result })}
                          >
                            <span className="ap-report-ic">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                            </span>
                            <span className="ap-report-body">
                              <span className="ap-report-name">{r.result.name}</span>
                              <span className="ap-report-result">{r.result.result}</span>
                            </span>
                            <span className="ap-report-actions">
                              <span className="ap-report-cta">View</span>
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <footer className="foot">
        <div className="page">
          <div className="row">
            <div>© 2026 Paw Print Pedigrees — an Orivet service</div>
            <div>Privacy · Terms · Contact</div>
          </div>
        </div>
      </footer>

      {viewReport && (
        <ReportModal
          animal={animal}
          breeder={p}
          group={viewReport.group}
          result={viewReport.result}
          onClose={()=>setViewReport(null)}
        />
      )}
    </div>
  );
}

function ReportModal({ animal, breeder, group, result, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);
  const today = new Date().toLocaleDateString('en-AU', { day:'2-digit', month:'short', year:'numeric' });
  const reportId = `PPP-${animal.regNum.replace(/[^A-Z0-9]/gi,'')}-${(result.name).replace(/\s/g,'').slice(0,8).toUpperCase()}`;
  return (
    <div className="report-modal-backdrop report-cert-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="report-modal" onClick={e=>e.stopPropagation()}>
        <div className="report-modal-bar no-print">
          <div className="report-modal-bar-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            {group} · {result.name}
          </div>
          <div className="report-modal-bar-actions">
            <button className="btn btn-ghost btn-sm" onClick={onClose}>Close</button>
            <button className="btn btn-primary btn-sm" onClick={()=>window.print()}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download PDF
            </button>
          </div>
        </div>

        <div id="report-print-area" className="report-doc">
          <header className="report-doc-head">
            <div className="report-doc-brand">
              <div className="report-doc-mark">{breeder.initials}</div>
              <div>
                <div className="report-doc-breeder">{breeder.firstName} {breeder.lastName}</div>
                <div className="report-doc-meta">{breeder.state}, {breeder.country} · Verified Orivet Breeder</div>
              </div>
            </div>
            <div className="report-doc-stamp">
              <div className="report-doc-stamp-label">Report ID</div>
              <div className="report-doc-stamp-date">{reportId}</div>
              <div className="report-doc-stamp-label" style={{marginTop:6}}>Issued</div>
              <div className="report-doc-stamp-date">{today}</div>
            </div>
          </header>

          <div className="report-doc-title">
            <div className="report-doc-eyebrow">{group}</div>
            <h1>{result.name}</h1>
            <div className="report-doc-callout">
              <span className="report-doc-callout-label">Result</span>
              <span className="report-doc-callout-value">{result.result}</span>
            </div>
          </div>

          <div className="report-doc-section">
            <h2>Animal</h2>
            <div className="report-doc-facts">
              <div><dt>Name</dt><dd>{animal.pet}</dd></div>
              <div><dt>Breed</dt><dd>{animal.breed}</dd></div>
              <div><dt>Species</dt><dd>{animal.species}</dd></div>
              <div><dt>Gender</dt><dd>{animal.gender}</dd></div>
              <div><dt>Registered name</dt><dd>{animal.regName}</dd></div>
              <div><dt>Registration #</dt><dd>{animal.regNum}</dd></div>
              <div><dt>Chip #</dt><dd>{animal.chip}</dd></div>
            </div>
          </div>

          <div className="report-doc-section">
            <h2>About this test</h2>
            <p className="report-doc-para">
              This {group.toLowerCase().replace(/s$/,'')} test was performed by Orivet using buccal swab samples. Results are
              displayed in standard genotype notation. For interpretation guidance, consult your veterinarian or visit
              orivet.com.
            </p>
          </div>

          <footer className="report-doc-foot">
            <div>
              <div className="rd-foot-line">Issued by Paw Print Pedigrees · an Orivet service</div>
              <div className="rd-foot-meta">Published by {breeder.firstName} {breeder.lastName}. Verify the authenticity at pawprintpedigrees.com.</div>
            </div>
            <div className="rd-foot-logo">PPP</div>
          </footer>
        </div>
      </div>
    </div>
  );
}

/* ─────── ABOUT (placeholder) ─────── */
function AboutPage({ onNav, isLoggedIn, setLoggedIn, onboardingComplete }) {
  return (
    <div>
      <TopNav onNav={onNav} active="about" isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} onboardingComplete={onboardingComplete} />
      <div className="page">
        <div className="placeholder-screen">
          <div className="placeholder-tag">Coming next</div>
          <h2>About Paw Print Pedigrees</h2>
          <p>This page hasn't been designed yet. We'll build the About page together — it will live here and be linked from the "Learn more" CTA and the top nav.</p>
          <div className="placeholder-actions">
            <button className="btn btn-primary" onClick={()=>onNav('landing')}>← Back to Home {Icon.arrowRight}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────── MY PROFILE (editable) ─────── */
function AnimalPhoto({ animal, onUpload }) {
  const ref = useRef(null);
  return (
    <button
      type="button"
      className={"ap-avatar ap-avatar-editable" + (animal.photo ? ' has-image' : '')}
      onClick={e=>{ e.stopPropagation(); ref.current && ref.current.click(); }}
      onDragOver={e=>{e.preventDefault(); e.stopPropagation();}}
      onDrop={e=>{e.preventDefault(); e.stopPropagation(); const f=e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]; if(f) onUpload(f);}}
      aria-label={`Change photo for ${animal.pet}`}
      style={animal.photo ? {backgroundImage: `url(${animal.photo})`} : null}
    >
      {!animal.photo && <span>{animal.pet.slice(0,1)}</span>}
      <span className="ap-avatar-edit" aria-hidden="true">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
      </span>
      <input ref={ref} type="file" accept="image/*" style={{display:'none'}} onChange={e=>onUpload(e.target.files && e.target.files[0])} onClick={e=>e.stopPropagation()} />
    </button>
  );
}

function ProfileToast({toast, onClose}) {
  if (!toast) return null;
  return (
    <div className={"toast toast-" + (toast.type === 'info' ? 'success' : toast.type)} role="status">
      <span className="toast-ic">
        {toast.type === 'success' ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12" y2="16"/></svg>
        )}
      </span>
      <span>{toast.msg}</span>
      <button className="toast-close" onClick={onClose} aria-label="Dismiss">{Icon.x}</button>
    </div>
  );
}

function MyProfilePage({ onNav, isLoggedIn, setLoggedIn, onboardingComplete }) {
  const [section, setSection] = useState('details');
  const [toast, setToast] = useState(null);
  function fireToast(t) { setToast(t); setTimeout(()=>setToast(null), 3200); }

  // ─── Breeder details state ───
  const [editProfile, setEditProfile] = useState(false);
  const [firstName, setFirstName] = useState('Gayan');
  const [lastName, setLastName] = useState('Jayanath');
  const [regNumber] = useState('ORV-AU-2847-19');
  const [breeds, setBreeds] = useState(['Australian Shepherd', 'Border Collie']);
  const [breedInput, setBreedInput] = useState('');
  const [breedFocused, setBreedFocused] = useState(false);
  const breedQ = breedInput.trim().toLowerCase();
  const breedSugg = breedQ ? BREEDS.filter(b => !breeds.includes(b) && b.toLowerCase().includes(breedQ)).slice(0, 8) : [];
  function addBreed(b) { if (!b || breeds.includes(b)) return; setBreeds([...breeds, b]); setBreedInput(''); }
  const [about, setAbout] = useState('Family-run breeder in regional Victoria specialising in working-line Australian Shepherds. Every litter is genetically screened and raised in-home.');
  const [notes, setNotes] = useState('');

  const [editAddr, setEditAddr] = useState(false);
  const [country, setCountry] = useState('Australia');
  const [stateVal, setStateVal] = useState('Victoria');
  const [postal, setPostal] = useState('3000');
  const [addrLine1, setAddrLine1] = useState('14 Collins Street');
  const [addrLine2, setAddrLine2] = useState('');
  const stateOpts = STATES_BY_COUNTRY[country] || [];
  const stateReq = stateOpts.length > 0;

  const [website, setWebsite] = useState('https://highridge.example.com');
  const [phone, setPhone] = useState('+61 412 345 678');
  const [socialEmail, setSocialEmail] = useState('gayan@pawprint.com.au');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('@highridge.aussies');

  const [avatarUrl, setAvatarUrl] = useState(null);
  const avatarFileRef = useRef(null);
  const onAvatarPick = (file) => {
    if (!file) return;
    setAvatarUrl(URL.createObjectURL(file));
    fireToast({type:'success', msg:'Profile photo updated.'});
  };

  // ─── Animals state ───
  const [animals, setAnimals] = useState(() => PROFILE_ANIMALS.map((a, i) => ({
    ...a,
    published: i < 3, // first 3 already published from onboarding
    reportsPublic: i < 3 ? { d1: true, t1: true, d3: i < 2 } : {},
  })));
  const [animalQuery, setAnimalQuery] = useState('');
  const [animalFilter, setAnimalFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const [refetching, setRefetching] = useState(false);

  const q = animalQuery.trim().toLowerCase();
  const filteredAnimals = animals.filter(a => {
    if (animalFilter === 'public' && !a.published) return false;
    if (animalFilter === 'private' && a.published) return false;
    if (!q) return true;
    return (a.pet + ' ' + a.breed + ' ' + a.species + ' ' + a.regName + ' ' + a.regNum).toLowerCase().includes(q);
  });
  const publicCount = animals.filter(a => a.published).length;

  function toggleReportPublic(animalId, reportId) {
    setAnimals(prev => prev.map(a => {
      if (a.id !== animalId) return a;
      const nextReports = { ...a.reportsPublic, [reportId]: !a.reportsPublic[reportId] };
      const anyPublic = Object.values(nextReports).some(Boolean);
      let nextPublished = a.published;
      // Auto-publish first result, auto-unpublish last one
      if (!a.published && anyPublic) {
        nextPublished = true;
        fireToast({type:'success', msg:`${a.pet} is now public on your profile.`});
      } else if (a.published && !anyPublic) {
        nextPublished = false;
        fireToast({type:'info', msg:`${a.pet} hidden — at least one result must be public to publish them.`});
      }
      return { ...a, reportsPublic: nextReports, published: nextPublished };
    }));
  }
  function togglePublished(animalId) {
    const a = animals.find(x => x.id === animalId);
    if (!a) return;
    if (!a.published) {
      const reports = getReportsFor(a);
      const anyPublic = [...reports.traits, ...reports.diseases].some(r => a.reportsPublic[r.id]);
      if (!anyPublic) {
        setExpandedId(animalId);
        fireToast({type:'error', msg:'Select at least one result to make public before publishing this animal.'});
        return;
      }
      setAnimals(animals.map(x => x.id === animalId ? { ...x, published: true } : x));
      fireToast({type:'success', msg:`${a.pet} is now public on your profile.`});
    } else {
      setAnimals(animals.map(x => x.id === animalId ? { ...x, published: false } : x));
      fireToast({type:'success', msg:`${a.pet} is now private.`});
    }
  }
  function setAnimalPhoto(animalId, file) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAnimals(prev => prev.map(a => a.id === animalId ? { ...a, photo: url } : a));
    fireToast({type:'success', msg:'Photo updated.'});
  }
  function refetchAnimals() {
    setRefetching(true);
    setTimeout(() => {
      setRefetching(false);
      fireToast({type:'success', msg:'Synced 12 animals from Orivet. Your published selections were preserved.'});
    }, 1100);
  }

  return (
    <div>
      <ProfileToast toast={toast} onClose={()=>setToast(null)} />
      <TopNav onNav={onNav} active="myprofile" isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} onboardingComplete={onboardingComplete} />      <div className="page mp-page">
        <div className="mp-head">
          <button
            type="button"
            className={"mp-avatar mp-avatar-editable" + (avatarUrl ? ' has-image' : '')}
            onClick={()=>avatarFileRef.current && avatarFileRef.current.click()}
            onDragOver={e=>e.preventDefault()}
            onDrop={e=>{ e.preventDefault(); const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]; if (f) onAvatarPick(f); }}
            aria-label="Change profile photo"
            style={avatarUrl ? {backgroundImage: `url(${avatarUrl})`} : null}
          >
            {!avatarUrl && <span>GJ</span>}
            <span className="mp-avatar-edit">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </span>
            <input ref={avatarFileRef} type="file" accept="image/*" style={{display:'none'}} onChange={e=>onAvatarPick(e.target.files && e.target.files[0])} />
          </button>
          <div className="mp-id">
            <h1>My Profile</h1>
            <div className="mp-sub">
              <span>{firstName} {lastName}</span>
              <span className="dot">·</span>
              <span>{breeds.join(', ')}</span>
              <span className="dot">·</span>
              <span>{publicCount} of {animals.length} animals public</span>
            </div>
          </div>
          <div className="mp-actions">
            <button className="btn btn-ghost" onClick={()=>onNav('profile')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View public profile
            </button>
          </div>
        </div>

        <div className="mp-nav">
          <button className={"mp-nav-btn" + (section === 'details' ? ' active' : '')} onClick={()=>setSection('details')}>Breeder details</button>
          <button className={"mp-nav-btn" + (section === 'animals' ? ' active' : '')} onClick={()=>setSection('animals')}>
            My Animals <span className="mp-nav-count">{animals.length}</span>
          </button>
        </div>

        {section === 'details' && (
          <div className="mp-section">
            {/* Profile details */}
            <div className="mp-card">
              <div className="mp-card-head">
                <h3>Profile details</h3>
                <button className={"btn btn-ghost btn-sm" + (editProfile?' is-on':'')} onClick={()=>setEditProfile(!editProfile)}>
                  {editProfile ? '✓ Done editing' : 'Edit synced fields'}
                </button>
              </div>
              <p className="mp-card-help">Fields locked with <span className="lock-mini">🔒</span> are synced from your Orivet account. Editing here won't change your Orivet account.</p>
              <div className="form-grid">
                <Field label="First Name" required mandatoryPublic locked={!editProfile}><input value={firstName} onChange={e=>setFirstName(e.target.value)} disabled={!editProfile} /></Field>
                <Field label="Last Name" required mandatoryPublic locked={!editProfile}><input value={lastName} onChange={e=>setLastName(e.target.value)} disabled={!editProfile} /></Field>
                <Field label="Registration Number" required noEye locked><input value={regNumber} disabled /></Field>
                <Field label="Select Breed" required mandatoryPublic full>
                  <div className={"multiselect ms-autocomplete" + (breedFocused && breedSugg.length ? ' is-open' : '')}>
                    {breeds.map(b => (
                      <span className="chip" key={b}>{b}<span className="x" onClick={()=>setBreeds(breeds.filter(x=>x!==b))}>{Icon.x}</span></span>
                    ))}
                    <input className="ms-input" placeholder={breeds.length ? 'Add another breed…' : 'Search for a breed'} value={breedInput} onChange={e=>setBreedInput(e.target.value)} onFocus={()=>setBreedFocused(true)} onBlur={()=>setTimeout(()=>setBreedFocused(false), 120)} onKeyDown={e=>{ if(e.key==='Enter' && breedSugg[0]){e.preventDefault(); addBreed(breedSugg[0]);} else if(e.key==='Backspace' && !breedInput && breeds.length){setBreeds(breeds.slice(0,-1));} }} />
                    {breedFocused && breedSugg.length > 0 && (
                      <ul className="ms-suggest" role="listbox">
                        {breedSugg.map(b => <li key={b}><button type="button" className="ms-suggest-item" onMouseDown={e=>{e.preventDefault(); addBreed(b);}}><span>{b}</span><span className="ms-suggest-hint">↵</span></button></li>)}
                      </ul>
                    )}
                  </div>
                </Field>
                <Field label="About" required mandatoryPublic full><textarea rows="4" value={about} onChange={e=>setAbout(e.target.value)} /></Field>
                <Field label="Additional Notes" full initialPublic={false}><textarea rows="3" placeholder="Anything else you'd like to share" value={notes} onChange={e=>setNotes(e.target.value)} /></Field>
              </div>
              <div className="mp-card-foot">
                <button className="btn btn-primary" onClick={()=>fireToast({type:'success', msg:'Profile details saved.'})}>Save changes</button>
              </div>
            </div>

            {/* Address */}
            <div className="mp-card">
              <div className="mp-card-head">
                <h3>Address</h3>
                <button className={"btn btn-ghost btn-sm" + (editAddr?' is-on':'')} onClick={()=>setEditAddr(!editAddr)}>
                  {editAddr ? '✓ Done editing' : 'Edit synced fields'}
                </button>
              </div>
              <p className="mp-card-help">Country and State are always public — needed for breeder search.</p>
              <div className="form-grid">
                <div className="field">
                  <label>Country <span className="req">*</span></label>
                  <div className="field-input-wrap">
                    <Dropdown ariaLabel="Country" value={country} onChange={(v)=>{setCountry(v); const n=STATES_BY_COUNTRY[v]||[]; setStateVal(n[0]||'');}} className={"dd-field" + (!editAddr?' is-disabled':'')} searchable placeholder="Select a country…" options={COUNTRIES.map(c=>({value:c,label:c}))} disabled={!editAddr} />
                    <span className="field-eye locked-public" data-tooltip="Always public — required for breeder search">{Icon.eye}</span>
                  </div>
                </div>
                <div className={"field" + (!stateReq?' is-locked':'')}>
                  <label>State {stateReq && <span className="req">*</span>}{!stateReq && <span className="lock-note"> · not available for {country}</span>}</label>
                  <div className="field-input-wrap">
                    <Dropdown ariaLabel="State" value={stateVal} onChange={setStateVal} className={"dd-field" + (!editAddr||!stateReq?' is-disabled':'')} searchable={stateReq && stateOpts.length>8} placeholder={stateReq?'Select a state…':'—'} options={stateReq?stateOpts.map(s=>({value:s,label:s})):[]} disabled={!editAddr||!stateReq} />
                    {stateReq && <span className="field-eye locked-public" data-tooltip="Always public — required for breeder search">{Icon.eye}</span>}
                  </div>
                </div>
                <Field label="Postal Code" required initialPublic={false}><input value={postal} onChange={e=>setPostal(e.target.value)} disabled={!editAddr} /></Field>
                <Field label="Address Line 1" required full initialPublic={false}><input value={addrLine1} onChange={e=>setAddrLine1(e.target.value)} disabled={!editAddr} /></Field>
                <Field label="Address Line 2" full initialPublic={false}><input value={addrLine2} onChange={e=>setAddrLine2(e.target.value)} disabled={!editAddr} /></Field>
              </div>
              <div className="mp-card-foot">
                <button className="btn btn-primary" onClick={()=>fireToast({type:'success', msg:'Address details saved.'})}>Save changes</button>
              </div>
            </div>

            {/* Social */}
            <div className="mp-card">
              <div className="mp-card-head">
                <h3>Social & Contact</h3>
              </div>
              <div className="form-grid">
                <Field label="Website URL" full><input value={website} onChange={e=>setWebsite(e.target.value)} placeholder="Enter Website URL" /></Field>
                <Field label="Phone Number" required><input value={phone} onChange={e=>setPhone(e.target.value)} /></Field>
                <Field label="Email" required>
                  <input type="email" value={socialEmail} onChange={e=>setSocialEmail(e.target.value)} />
                </Field>
                <Field label="Facebook" initialPublic={false}><input value={facebook} onChange={e=>setFacebook(e.target.value)} placeholder="Enter Facebook URL" /></Field>
                <Field label="Instagram"><input value={instagram} onChange={e=>setInstagram(e.target.value)} placeholder="@yourhandle" /></Field>
              </div>
              <p className="field-hint" style={{marginTop:4}}>Email is from Orivet by default. Changing it here only updates your public display email — your Orivet login email stays the same.</p>
              <div className="mp-card-foot">
                <button className="btn btn-primary" onClick={()=>fireToast({type:'success', msg:'Social details saved.'})}>Save changes</button>
              </div>
            </div>
          </div>
        )}

        {section === 'animals' && (
          <div className="mp-section">
            <div className="mp-animals-toolbar">
              <div className="mp-animals-search">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>
                <input placeholder="Search by name, breed, species…" value={animalQuery} onChange={e=>setAnimalQuery(e.target.value)} />
                {animalQuery && <button type="button" className="clear-x" onClick={()=>setAnimalQuery('')} aria-label="Clear">{Icon.x}</button>}
              </div>
              <div className="mp-animals-filters">
                {[
                  {v:'all', label:'All', count: animals.length},
                  {v:'public', label:'Public', count: publicCount},
                  {v:'private', label:'Private', count: animals.length - publicCount},
                ].map(o => (
                  <button key={o.v} type="button" className={"mp-pill" + (animalFilter===o.v?' active':'')} onClick={()=>setAnimalFilter(o.v)}>
                    {o.label} <span className="mp-pill-count">{o.count}</span>
                  </button>
                ))}
              </div>
              <button type="button" className="btn btn-ghost btn-sm mp-refetch" onClick={refetchAnimals} disabled={refetching}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={refetching?'spin':''}><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                {refetching ? 'Syncing…' : 'Refetch from Orivet'}
              </button>
            </div>
            <p className="mp-help">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="8"/></svg>
              Refetch pulls any new animals from Orivet — your published selections stay in place. To publish an animal, expand the row and turn on at least one result.
            </p>

            {filteredAnimals.length === 0 ? (
              <div className="empty-state">
                <h4>No animals match those filters</h4>
                <p>Try clearing your search or switching the status filter.</p>
              </div>
            ) : (
              <ul className="mp-animals-list">
                {filteredAnimals.map(a => {
                  const reports = getReportsFor(a);
                  const open = expandedId === a.id;
                  const publicResultCount = [...reports.traits, ...reports.diseases].filter(r => a.reportsPublic[r.id]).length;
                  return (
                    <li key={a.id} className={"mp-animal-row" + (a.published?' is-public':'') + (open?' is-open':'')}>
                      <div className="mp-animal-main" onClick={()=>setExpandedId(open?null:a.id)} role="button" tabIndex={0}>
                        <AnimalPhoto animal={a} onUpload={(file)=>setAnimalPhoto(a.id, file)} />
                        <div className="mp-animal-info">
                          <div className="mp-animal-name">{a.pet}</div>
                          <div className="mp-animal-meta">{a.breed} · {a.gender} · {a.regNum}</div>
                        </div>
                        <div className="mp-animal-status">
                          <span className={"status-pill " + (a.published?'on':'off')}>
                            <span className="dot-status"></span>
                            {a.published ? 'Public' : 'Private'}
                          </span>
                          {a.published && <span className="mp-animal-results">{publicResultCount} result{publicResultCount===1?'':'s'} shown</span>}
                        </div>
                        <button type="button" className={"toggle-switch " + (a.published?'on':'off')} onClick={e=>{e.stopPropagation(); togglePublished(a.id);}} aria-label={a.published?'Make private':'Make public'} role="switch" aria-checked={a.published}>
                          <span className="toggle-knob"></span>
                        </button>
                        <span className={"mp-chev " + (open?'open':'')}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                        </span>
                      </div>
                      {open && (
                        <div className="mp-animal-expand">
                          <div className="animal-summary-grid">
                            <div><span className="lbl">Breed</span><span className="val">{a.breed}</span></div>
                            <div><span className="lbl">Species</span><span className="val">{a.species}</span></div>
                            <div><span className="lbl">Registration #</span><span className="val">{a.regNum}</span></div>
                            <div><span className="lbl">Chip #</span><span className="val">{a.chip}</span></div>
                            <div><span className="lbl">Gender</span><span className="val">{a.gender}</span></div>
                          </div>
                          <div className="reports-section">
                            <ReportGroup
                              title="Traits"
                              helper="Coat colour, length, furnishings and other physical traits."
                              items={reports.traits}
                              emptyText="No traits results available for this animal yet."
                              reportPublic={a.reportsPublic}
                              onTogglePublic={(rid)=>toggleReportPublic(a.id, rid)}
                            />
                            <ReportGroup
                              title="Diseases"
                              helper="Hereditary disease screens. Showing these builds trust with clients."
                              items={reports.diseases}
                              emptyText="No disease results available for this animal yet."
                              reportPublic={a.reportsPublic}
                              onTogglePublic={(rid)=>toggleReportPublic(a.id, rid)}
                            />
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="mp-animals-foot">
              Showing {filteredAnimals.length} of {animals.length} animals
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, {
  Landing, SignUp, KennelProfile, SearchPage, BreedPage, BreederProfile, AboutPage, MyProfilePage, AnimalPage,
});

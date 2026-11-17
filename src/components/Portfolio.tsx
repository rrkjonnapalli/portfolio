import portrait from '@assets/ravikiran.webp';
import content from '../content';

// The Ravikiran Times, ported from the Claude Design build kit. content.json is the source of truth;
// a section that is missing or empty there is not rendered.
export default function Portfolio() {
  const { masthead, lead, projects, career, skills, contact } = content;
  const [first, ...rest] = lead?.story ?? [];
  const rail = career?.items.length || skills?.items.length || contact;

  return (
    <div className="page">
      <header className="masthead">
        <div className="masthead__meta label">
          {masthead.established ? <span>{masthead.established}</span> : null}
          {masthead.github ? <a href={masthead.github.href}>{masthead.github.label}</a> : null}
        </div>
        <h1 className="masthead__title">{masthead.title}</h1>
        {masthead.motto ? <p className="masthead__motto label">{masthead.motto}</p> : null}
      </header>

      <main className="front">
        {lead ? (
          <article className="lead">
            {lead.kicker ? <span className="kicker label">{lead.kicker}</span> : null}
            <h2 className="lead__headline">{lead.headline}</h2>
            {lead.deck ? <p className="lead__deck">{lead.deck}</p> : null}

            {lead.portrait || first ? (
              <div className="lead__body">
                {lead.portrait ? (
                  <figure className="portrait">
                    <img src={portrait} width={800} height={1000} alt={lead.portrait.alt} />
                    {lead.portrait.caption ? <figcaption>{lead.portrait.caption}</figcaption> : null}
                  </figure>
                ) : null}
                {first ? (
                  <div className="story">
                    <p className="story__first">{first}</p>
                    {rest.map((p) => <p key={p}>{p}</p>)}
                  </div>
                ) : null}
              </div>
            ) : null}
          </article>
        ) : null}

        {rail ? (
          <aside className="rail">
            {career?.items.length ? (
              <section className="career" aria-labelledby="career-title">
                <h3 id="career-title" className="section-label label">{career.label}</h3>
                <ul className="career__list">
                  {career.items.map((j) => (
                    <li key={j.company} className="job">
                      <span className="job__company">{j.company}</span>
                      <span className="job__role">{j.role}</span>
                      <span className="job__dates">{j.dates}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {skills?.items.length ? (
              <section className="classifieds" aria-labelledby="skills-title">
                <h3 id="skills-title" className="section-label label">{skills.label}</h3>
                <ul className="skills">
                  {skills.items.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </section>
            ) : null}

            {contact ? (
              <section className="contact" aria-labelledby="contact-title">
                <h3 id="contact-title" className="contact__title">{contact.heading}</h3>
                {contact.button ? (
                  <a className="button label" href={`mailto:${contact.email}`}>
                    {contact.button}
                    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
                  </a>
                ) : null}
                <a className="contact__email" href={`mailto:${contact.email}`}>{contact.email}</a>
              </section>
            ) : null}
          </aside>
        ) : null}

        {projects?.items.length ? (
          <section className="desk" aria-labelledby="desk-title">
            <h3 id="desk-title" className="section-label label">{projects.label}</h3>
            <ul className="desk__grid">
              {projects.items.map((p) => (
                <li key={p.name}>
                  <a className="brief" href={p.href}>
                    <span className="brief__name">{p.name}</span>
                    <span className="brief__text">{p.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>
    </div>
  );
}

import { useState, useEffect } from 'react';
import me from '../assets/rrkjonnapalli.png';
import * as yml from 'yaml';
import { user as USER_DATA } from '../data';
import Toast from './Toast'; // Add this import
import './Portfolio.css';

function useQueryParams() {
  return new URLSearchParams(window.location.search);
}

function isValidURL(str: string) {
  const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function loadYaml(url: string): Promise<any> {
  // return Promise.resolve(null);
  return fetch(url)
    .then(res => {
      if (res.status !== 200) {
        throw new Error(`Failed to fetch YAML status - ${res.status}`);
      }
      return res.text()
    })
    .then(data => yml.parse(data));
}

function getURL(q: string) {
  return `https://raw.githubusercontent.com/${q}/${q}/main/${q}.yml`;
}

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'error' });

  const showError = (message: string) => {
    setToast({ show: true, message, type: 'error' });
  };

  const hideToast = () => {
    setToast({ ...toast, show: false });
  };

  const [user, setUser] = useState(USER_DATA);
  const query = useQueryParams();
  const source = 'rrkjonnapalli'
  const _q = query.get('q') || source;
  const [q] = useState(_q.toLowerCase());

  useEffect(() => {
    setIsLoading(true);
    const url = getURL(q);
    loadYaml(url).then((d) => {
      document.title = `${q}'s Portfolio`;
      return d;
    }).catch(e => {
      console.error('Error loading user YAML:', e);
      showError(`Could not load data for "${q}". Loading default ...`);
      return loadYaml(getURL(source));
    }).then(_user => {
      if (!_user) { return;}
      if (!_user.dp || !isValidURL(_user.dp)) {
        _user.dp = me;
      }
      setUser(_user);
    }).finally(() => setIsLoading(false));
  }, [q]);




  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark';
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    document.documentElement.className = darkMode ? 'dark' : 'light';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="portfolio">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="theme-toggle"
        aria-label="Toggle theme"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

      {/* Toast component */}
      {toast.show && (
        <Toast
          message={toast.message}
          type='error'
          onClose={hideToast}
        />
      )}

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            {/* <div className="avatar">RRK</div> */}
            <div className="photo-container">
              <img
                src={me}
                alt={user.title}
                className="professional-photo"
              />
            </div>
            <h1>{user.title}</h1>
            <p className="subtitle">{user.headline}</p>
            <div className="hero-buttons">
              <a href="#contact" className="btn bg-alt">Get In Touch</a>
              <a href="#experience" className="btn bg-alt">View Experience</a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="card about-card">
            <p className="text-large">
              {user.aboutme}
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section bg-alt">
        <div className="container">
          <h2 className="section-title">Experience</h2>
          <div className="experience-grid">
            {
              user.timeline.map((job, index) => (
                <div key={index} className="card experience-card">
                  <div className="experience-header">
                    <div>
                      <h3 className="company">{job.name}</h3>
                      <span className="period">{job.location}</span>
                      <span className="role">{job.position}</span>
                    </div>
                    <span className="period">{job.from} - {job.to}</span>
                  </div>
                  <ul className="achievements">
                    {job.responsibilities.map((achievement, idx) => (
                      <li key={idx} className="achievement">
                        <span className="bullet">→</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section">
        <div className="container">
          <h2 className="section-title">Core Skills</h2>
          <div className="skills-grid">
            {user.skills.map((skill) => (
              <div key={skill} className="card skill-card">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section bg-alt">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-grid">
            <div className="card contact-card">
              <h3>Let's work together</h3>
              <p>I'm always open to discussing new opportunities and innovative projects.</p>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-icon">📧</div>
                  <div>
                    <div className="method-label">Email</div>
                    <a href={`mailto:${user.email}`} className="method-value">
                      {user.email}
                    </a>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-icon">🌐</div>
                  <div>
                    <div className="method-label">Website</div>
                    <a href={user.website} target="_blank" className="method-value">
                      {user.website}
                    </a>
                  </div>
                </div>

                {/* <div className="contact-method">
                  <div className="contact-icon">📱</div>
                  <div>
                    <div className="method-label">Phone</div>
                    <div className="method-value">{user.mobile}</div>
                  </div>
                </div> */}
              </div>

              <div className="contact-action">
                <a href={`mailto:${user.email}`} className="btn">
                  Send Message
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
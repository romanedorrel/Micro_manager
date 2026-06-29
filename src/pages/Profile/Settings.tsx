import {
  Bell,
  CalendarDays,
  Leaf,
  Palette,
  Shield,
  Sparkles,
} from "lucide-react";
import "./profile.css";

const Settings = () => {
  return (
    <main className="profile-section-page">
      <section className="profile-section-header">
        <h1>
          TrueNorth Settings <Leaf size={24} />
        </h1>
        <p>Adjust how TrueNorth supports your planning experience.</p>
      </section>

      <section className="settings-grid">
        <article className="profile-section-card">
          <div className="settings-card-header">
            <Palette size={22} />
            <div>
              <h2>Appearance</h2>
              <p>Your current visual theme.</p>
            </div>
          </div>

          <div className="profile-section-row">
            <span>Theme</span>
            <strong>Quiet Sage</strong>
          </div>
        </article>

        <article className="profile-section-card">
          <div className="settings-card-header">
            <CalendarDays size={22} />
            <div>
              <h2>Calendar</h2>
              <p>Calendar preferences for planning.</p>
            </div>
          </div>

          <div className="profile-section-row">
            <span>Week Starts</span>
            <strong>Sunday</strong>
          </div>

          <div className="profile-section-row">
            <span>Default View</span>
            <strong>Week</strong>
          </div>
        </article>

        <article className="profile-section-card">
          <div className="settings-card-header">
            <Sparkles size={22} />
            <div>
              <h2>AI Preferences</h2>
              <p>How suggestions are currently generated.</p>
            </div>
          </div>

          <div className="profile-section-row">
            <span>Generation Style</span>
            <strong>Balanced</strong>
          </div>

          <div className="profile-section-row">
            <span>Task Count</span>
            <strong>Smart Default</strong>
          </div>
        </article>

        <article className="profile-section-card settings-card-muted">
          <div className="settings-card-header">
            <Bell size={22} />
            <div>
              <h2>Notifications</h2>
              <p>Coming soon.</p>
            </div>
          </div>

          <div className="profile-section-row settings-row-disabled">
            <span>Daily Reminders</span>
            <strong>Coming Soon</strong>
          </div>

          <div className="profile-section-row settings-row-disabled">
            <span>Weekly Review</span>
            <strong>Coming Soon</strong>
          </div>
        </article>

        <article className="profile-section-card">
          <div className="settings-card-header">
            <Shield size={22} />
            <div>
              <h2>About</h2>
              <p>Current app version and stack.</p>
            </div>
          </div>

          <div className="profile-section-row">
            <span>Version</span>
            <strong>V1.1</strong>
          </div>

          <div className="profile-section-row">
            <span>Built With</span>
            <strong>React · Express · Supabase · OpenAI</strong>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Settings;
